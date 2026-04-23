import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const firstUser = (await User.countDocuments({})) === 0;

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: firstUser ? "admin" : "user",
    });

    return NextResponse.json({ success: true, message: "User registered successfully" }, { status: 201 });
  } catch (err: any) {
    console.error("Registration Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
