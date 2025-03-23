import { Request, Response } from "express";
import UserServices from "../services/services.user";

class UserController {
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;
      const token = await UserServices.register(username, email, password);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token: token,
        // data: user,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await UserServices.login(email, password);
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: token,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new UserController();
