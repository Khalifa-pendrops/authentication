import bycrypt from "bcryptjs";
import { User } from "../models/models.user";
import { JwtAuthPayload } from "../interfaces/interfaces.auth.jwt";
import jwt from "jsonwebtoken";
import { validateUserInput } from "./../utils/schema.validation";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is not defined. Check your environment variables."
  );
}

class UserServices {
  async register(username: string, email: string, password: string) {
    const errors = validateUserInput(username, email, password);
    if (errors.length > 0) throw new Error(errors.join(" "));

    const existingUser = await User.findOne({
      username: username,
      email: email,
    });
    if (existingUser) {
      throw new Error("Username or Password already exists!");
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    const myPayload: JwtAuthPayload = {
      userId: newUser._id.toString(),
      username: newUser.username,
    };
    const token = jwt.sign(myPayload, JWT_SECRET!, { expiresIn: "1h" });
    return token;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Login credential(s) is not valid!");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credential(S)!");

    const myPayload: JwtAuthPayload = {
      userId: user._id.toString(),
      username: user.username,
    };
    const token = jwt.sign(myPayload, JWT_SECRET!, { expiresIn: "1h" });
    return token;
  }
}

export default new UserServices();
