import { Document, Schema, model, Types } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  //   isModified(arg0: string): unknown;
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  isModified: (path: string) => boolean;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const User = model<IUser>("User", userSchema);
