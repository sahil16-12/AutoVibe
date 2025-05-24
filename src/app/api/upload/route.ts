// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { Pinecone } from "@pinecone-database/pinecone";
import path from "path";

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
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

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), "data.json");
    const raw = fs.readFileSync(dataPath, "utf8");
    const docs: Array<{ content?: string; text?: string; title?: string }> =
      JSON.parse(raw);

    const failures: Array<{ title?: string; content: string }> = [];

    for (const doc of docs) {
      const text = doc.content || doc.text || "";
      if (!text) continue;

      try {
        const embedding = await getTitanEmbedding(text);
        await index.upsert([
          {
            id: uuidv4(),
            values: embedding,
            metadata: { title: doc.title || "", content: text },
          },
        ]);
      } catch (err) {
        failures.push({ title: doc.title, content: text });
      }
    }

    if (failures.length) {
      const dataPath = path.join(process.cwd(), "vectors.json");
      fs.writeFileSync(dataPath, JSON.stringify(failures, null, 2));
    }

    return NextResponse.json({
      ok: true,
      processed: docs.length,
      failed: failures.length,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
