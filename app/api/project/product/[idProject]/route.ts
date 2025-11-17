import pool from "@lib/database";

export async function DELETE(request: Request, context: any) {
  try {
    const { params } = context;
    const { idProject } = await params;

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
