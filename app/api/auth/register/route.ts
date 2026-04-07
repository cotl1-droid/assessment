// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Connect to MongoDB (you can move this to a separate util file)
const MONGO_URI = process.env.MONGO_URI!;
if (!mongoose.connection.readyState) {
  mongoose.connect(MONGO_URI);
}

// Define User schema
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({ email, password: hashed });
    await user.save();

    return NextResponse.json({ message: "User registered successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: "Registration failed", details: err.message }, { status: 400 });
  }
}
