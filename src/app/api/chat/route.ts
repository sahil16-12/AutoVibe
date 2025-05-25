
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { Pinecone } from "@pinecone-database/pinecone";

// CORS helper: shared headers
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Initialize Bedrock client
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Initialize Pinecone client
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

async function getTitanEmbedding(text: string): Promise<number[]> {
  const input = { inputText: text };
  const cmd = new InvokeModelCommand({
    modelId: "amazon.titan-embed-text-v2:0",
    contentType: "application/json",
    accept: "application/json",
    body: Buffer.from(JSON.stringify(input)),
  });
  const resp = await bedrockClient.send(cmd);
  const json = JSON.parse(Buffer.from(resp.body).toString("utf8"));
  return json.embedding;
}

// Handle preflight CORS requests
export async function OPTIONS() {
  return NextResponse.json(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  try {
    const { query } = (await request.json()) as { query?: string };
    if (!query) {
      return NextResponse.json({ error: "Missing `query` in request body." }, { status: 400, headers: CORS_HEADERS });
    }

    // Load knowledge base
    const dataPath = path.join(process.cwd(), "data.json");
    const kb = JSON.parse(fs.readFileSync(dataPath, "utf8")) as Array<{ text: string; metadata?: { category?: string } }>;

    const normalizedQ = query.trim().toLowerCase().replace(/[^a-z0-9 ]/g, "");

    // FAQ shortcut
    const faqDoc = kb.find(d => d.metadata?.category === 'faq' &&
      d.text.split("\n")[0]
       .toLowerCase()
       .replace(/[^a-z0-9 ]/g, "")
       .includes(normalizedQ)
    );
    if (faqDoc) {
      const parts = faqDoc.text.split(/Answer:\s*/i);
      return NextResponse.json({ answer: parts[1]?.trim() || "" }, { headers: CORS_HEADERS });
    }

    // Embedding and Pinecone query
    const qEmbed = await getTitanEmbedding(normalizedQ);
    const pineRes = await index.query({ vector: qEmbed, topK: 5, includeMetadata: true });

    if (!pineRes.matches?.length) {
      return NextResponse.json({ answer: "Sorry, I don't have information on that right now." }, { headers: CORS_HEADERS });
    }

    // Build prompt
    const context = pineRes.matches.map((m, i) => `(${i + 1}) ${m.metadata?.content}`).join("\n\n---\n\n");
    const fullPrompt = `
You are a knowledgeable assistant. Use the following information to answer the user's question.
Do not mention snippet numbers or refer to “document snippets.” Just give a concise, user‐friendly answer.
If you don't know, say “I'm sorry, I don't know that.”

--- DOCUMENTS:
${context}

--- USER QUESTION:
${query}

--- ANSWER:
`.trim();

    // Call Bedrock Nova Pro
    const chatCmd = new InvokeModelCommand({
      modelId: "amazon.nova-pro-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: Buffer.from(JSON.stringify({ inferenceConfig: { max_new_tokens: 512 }, messages: [{ role: "user", content: [{ text: fullPrompt }] }] })),
    });
    const chatResp = await bedrockClient.send(chatCmd);
    const chatJSON = JSON.parse(Buffer.from(chatResp.body).toString("utf8"));
    const answer = chatJSON.output?.message?.content?.[0]?.text?.trim() ||
                   chatJSON.choices?.[0]?.message?.content?.[0]?.text?.trim() ||
                   "";

    return NextResponse.json({ answer }, { headers: CORS_HEADERS });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500, headers: CORS_HEADERS });
  }
}
