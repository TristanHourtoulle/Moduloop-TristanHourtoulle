import pool from "@/lib/database";
import { NextRequest } from "next/server";

// Fonction pour gérer les requêtes DELETE
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const idProject = searchParams.get("id_project") || "";

    const result = await pool.query(
      "UPDATE projects SET products = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *;",
      [null, idProject]
    );

    // Vérification si la requête a réussi
    if (result.rowCount === 1) {
      const data = result.rows[0];
      return Response.json({ success: true, data }, { status: 200 });
    } else {
      throw new Error("La requête DELETE a échoué");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de tous les produits du projet:",
      error
    );
    return Response.json({ success: false, error }, { status: 500 });
  }
}
