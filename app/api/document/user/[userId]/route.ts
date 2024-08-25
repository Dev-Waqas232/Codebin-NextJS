import { NextRequest, NextResponse } from "next/server";
import DocumentFile from "@/models/documentFile";
import connectDB from "@/config/dbConnect";
import mongoose from "mongoose";

export const GET = async (request: NextRequest, context: any) => {
  try {
    await connectDB();
    if (!mongoose.Types.ObjectId.isValid(context.params.userId)) {
      return NextResponse.json(
        {
          message: "Data Not Found",
        },
        { status: 404 }
      );
    }
    const response = await DocumentFile.find({ user: context.params.userId });
    console.log(response);
    return NextResponse.json({ data: response, ok: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
