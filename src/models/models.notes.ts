import mongoose, { Document, Schema, model } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  // category: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      toLowerCase: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      toLowerCase: true,
    },
    // category: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: true,
    // },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Note = model<INote>("Note", noteSchema);
