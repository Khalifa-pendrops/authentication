import { JwtAuthPayload } from "../interfaces/interfaces.auth.jwt";

declare global {
  namespace Express {
    interface Request {
      user?: JwtAuthPayload;
    }
  }
}
