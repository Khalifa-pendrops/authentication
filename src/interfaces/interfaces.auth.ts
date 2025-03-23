import { Request, Response } from "express";
import { JwtAuthPayload } from "./interfaces.auth.jwt";

export interface AuthenticatedRequest extends Request {
  user: JwtAuthPayload;
}

interface CustomRequest extends Request {
  user?: JwtAuthPayload; 
}


export const isAuthenticatedRequest = (
  req: CustomRequest,
  res: Response
): req is AuthenticatedRequest => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized 🚫" });
    return false;
  }
  return true;
};


