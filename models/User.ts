import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      requird: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    starredFiles: {
      type: [Schema.Types.ObjectId],
      ref: "DocumentFile",
    },

    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
