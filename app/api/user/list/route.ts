import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/database";

export async function GET(request: NextRequest) {
  try {
    const result = await pool.query("SELECT * FROM users;");
    if (result.rowCount === 0) {
      throw new Error("Aucun utilisateur trouvé dans la base de données");
    }
    console.log("Récupération des utilisateurs:", result.rows);
    return Response.json({ success: true, data: result.rows }, { status: 200 });
  } catch (error) {
    console.log("Erreur lors de la récupération des utilisateurs:", error);
    return Response.json({ success: true, error }, { status: 500 });
  }
}
