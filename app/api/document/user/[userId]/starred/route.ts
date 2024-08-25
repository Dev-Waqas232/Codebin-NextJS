import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import DocumentFile from "@/models/documentFile";
import User from "@/models/User";
import connectDB from "@/config/dbConnect";

export async function GET(request: NextRequest, context: any) {
  try {
    await connectDB();
    const user = await User.findById(context.params.userId);

    const starredFiles = user.starredFiles;
    const documents = await DocumentFile.find({ _id: { $in: starredFiles } });
    console.log(documents);

    return NextResponse.json(
      { message: "Data Fetched", ok: true, data: documents },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error", ok: false },
      { status: 500 }
    );
  }
}
