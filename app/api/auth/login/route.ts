import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const backendUrl = "http://localhost:5000/api/auth/login";

  const body = await req.json();

  const res = await fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // Forward cookies from backend to Next.js response
  const data = await res.json();
  const nextRes = NextResponse.json(data, { status: res.status });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    nextRes.headers.set("set-cookie", setCookie);
  }

  return nextRes;
}
