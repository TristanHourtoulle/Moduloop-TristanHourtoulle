import { User } from "./User";

export interface SessionType {
  user: User;
  expires: string;
  iat: number;
  exp: number;
}
