import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const backendUrl = "http://localhost:5000/api/user/me";

  const res = await fetch(backendUrl, {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
