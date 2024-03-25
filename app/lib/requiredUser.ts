import pool from "./database";
import { User } from "@models/User";

export function requiredUser(user: User) {
  if (!user) {
    return false;
  }
  return true;
}

export function requiredAdmin(user: User) {
  if (!user || user.role !== "admin") {
    return false;
  }
  return true;
}
