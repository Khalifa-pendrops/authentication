import { AuthenticatedRequest as Request } from "../interfaces/interfaces.auth";

export interface JwtAuthPayload {
  userId: string;
  username: string;
}

export interface AuthenticatedRequest extends Request {
  user: JwtAuthPayload;
}
