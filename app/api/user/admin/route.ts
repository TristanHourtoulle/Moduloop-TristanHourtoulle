import { NextRequest } from "next/server";
import pool from "../../../lib/database";
import { User } from "../../../models/User";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id") || "";

    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1 ORDER BY "updatedAt" ASC;',
      [id]
    );

    // Vérification si l'utilisateur a été trouvé dans la base de données
    if (result.rowCount === 1) {
      const user = result.rows[0];
      const newUser: User = {
        id: user.id,
        firstName: user.firstName,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        avatar: user.avatar,
      };
      return Response.json({ success: true, data: user }, { status: 200 });
    } else {
      throw new Error(
        "L'utilisateur n'a pas été trouvé dans la base de données"
      );
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
