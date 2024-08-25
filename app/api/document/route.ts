import { NextResponse, NextRequest } from "next/server";
import DocumentFile from "@/models/documentFile";
import connectDB from "@/config/dbConnect";

export async function POST(request: NextRequest) {
  connectDB();
  try {
    const data = await request.json();
    const response = await DocumentFile.create({
      value: data.value,
      description: data.description,
      programmingLanguage: data.programmingLanguage,
      tags: data.tags,
      user: data?.user?.id,
    });
    return NextResponse.json(
      { message: "Data Entered Succesfully", id: response._id },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false }, { status: 403 });
  }
}
