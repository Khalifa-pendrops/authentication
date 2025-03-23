import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtAuthPayload } from "../interfaces/interfaces.auth.jwt";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

interface CustomRequest extends Request {
  user?: JwtAuthPayload;
}

const filePath = path.join(__dirname, "../logs/api.log");

if (!fs.existsSync(path.dirname(filePath))) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

const logRequest = (req: CustomRequest, res: Response, next: NextFunction) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not defined. Check your environment variables."
    );
  }

  const timestamp = new Date().toISOString();
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    const message = "Access denied. Token is required!";
    logToFile(
      `[${timestamp}] ${req.method} ${req.url} - 401 Unauthorized - ${message}`
    );
    return res.status(401).json({ message });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as JwtAuthPayload;
    req.user = decoded;

    const logEntry = `[${timestamp}] ${req.method} ${req.url} - User: ${decoded.userId} - Authenticated ✅`;
    logToFile(logEntry);

    res.on("finish", () => {
      const responseLog = `[${timestamp}] ${req.method} ${req.url} - ${res.statusCode}`;
      logToFile(responseLog);
    });

    next();
  } catch (err: any) {
    const message = "Invalid or expired token 🚫";
    logToFile(
      `[${timestamp}] ${req.method} ${req.url} - 401 Unauthorized - ${message}`
    );
    return res.status(401).json({ message });
  }
};

const logToFile = (message: string) => {
  fs.appendFile(filePath, message + "\n", (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
};

export default logRequest;
