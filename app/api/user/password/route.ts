import pool from "@lib/database";
import { NextRequest } from "next/server";
const bcrypt = require("bcrypt");

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      "UPDATE users SET password = $1 WHERE email = $2",
      [hashedPassword, email]
    );

    if (result.rowCount === 1) {
      return Response.json({ success: true }, { status: 200 });
    }
    return Response.json({ success: false }, { status: 404 });
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
