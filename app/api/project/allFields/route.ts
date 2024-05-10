import pool from "@/lib/database";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const group = formData.get("group") as string;
    const products = formData.get("products") as string;

    const result = await pool.query(
      `
      UPDATE projects
      SET name = $1, description = $2, group_id = $3, products = $4
      WHERE id = $5
      RETURNING *;
      `,
      [name, description, group, products, id]
    );

    // Vérification si la requête a réussi
    if (result.rowCount === 1) {
      const data = result.rows[0];
      return Response.json({ success: true, data }, { status: 200 });
    } else {
      throw new Error("La requête UPDATE sur la table project a échoué");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
