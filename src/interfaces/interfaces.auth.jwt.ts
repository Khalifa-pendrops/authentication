import { AuthenticatedRequest as Request } from "../interfaces/interfaces.auth";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        username: string;
      };
    }
  }
}

export interface JwtAuthPayload {
  userId: string;
  username: string;
}

export interface AuthenticatedRequest extends Request {
  user: JwtAuthPayload;
}
