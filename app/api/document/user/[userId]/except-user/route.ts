import mongoose from "mongoose";
import DocumentFile from "@/models/documentFile";
import connectDB from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  try {
    await connectDB();
    const userId = context.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "User Not Found", ok: false },
        { status: 404 }
      );
    }

    const documents = await DocumentFile.find({ user: { $ne: userId } })
      .sort({ createdAt: "desc" })
      .exec();

    console.log(documents);

    return NextResponse.json(
      { message: "Fetched Successfully", data: documents, ok: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
