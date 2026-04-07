// app/api/user/me/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;
if (!mongoose.connection.readyState) mongoose.connect(MONGO_URI);

const User = mongoose.models.User;

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const token = cookieHeader.split("token=")[1]?.split(";")[0];

  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).lean();
    return NextResponse.json({ email: user.email, subscription: user.subscription });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
