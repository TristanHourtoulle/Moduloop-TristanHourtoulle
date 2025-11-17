import { NextRequest } from "next/server";
import pool from "../../../lib/database";

export async function GET(request: NextRequest) {
  try {
    const result = await pool.query(
      'SELECT * FROM users ORDER BY "updatedAt" ASC;'
    );
    if (result.rowCount === 0) {
      throw new Error("Aucun utilisateur trouvé dans la base de données");
    }
    return Response.json({ success: true, data: result.rows }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error }, { status: 500 });
  }
}
