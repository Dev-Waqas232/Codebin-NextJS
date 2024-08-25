import connectDB from "@/config/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    const user = await User.findOne({ email: data.email });
    if (user) {
      return NextResponse.json(
        { message: "User Already Exists", ok: false },
        { status: 403 }
      );
    }

    const userName = data.firstName + " " + data.lastName;

    const response = await User.create({
      email: data.email,
      username: userName,
      password: data.password,
    });

    return NextResponse.json(
      { ok: true, message: "Registered Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
}
