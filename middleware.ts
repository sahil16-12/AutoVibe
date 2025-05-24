import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function middleware(req: NextRequest) {

  if (req.nextUrl.pathname.startsWith("/api/")) {

    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    const res = NextResponse.next();
    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
      res.headers.set(key, value);
    });
    return res;
  }


  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
