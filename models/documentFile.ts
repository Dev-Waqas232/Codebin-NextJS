import mongoose from "mongoose";

const documentFileSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: [true, "Please Enter Code"],
    },
    description: {
      type: String,
      required: [true, "Please Enter File Description"],
    },
    programmingLanguage: {
      type: String,
      enum: [
        "python",
        "javascript",
        "jsx",
        "html",
        "css",
        "cpp",
        "java",
        "typescript",
        "tsx",
        "go",
        "rust",
        "sql",
        "kotlin",
      ],
      required: [true, "Please Specify Programming Language"],
    },
    tags: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    starCount: {
      type: Number,
      default: 0,
    },
    starUsers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

const DocumentFile =
  mongoose.models.DocumentFile ||
  mongoose.model("DocumentFile", documentFileSchema);

export default DocumentFile;
