import pool from "@lib/database";

// Fonction pour gérer les requêtes GET
export async function GET(request: Request, context: any) {
  try {
    const { params } = context;
    const result = await pool.query("SELECT * FROM products WHERE id = $1;", [
      params.idProduct,
    ]);
    if (result.rowCount == 1) {
      const product = result.rows[0];
      return Response.json({ success: true, product }, { status: 200 });
    } else {
      return Response.json(
        { success: false, message: "No product found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de tous les groupes: ",
      error
    );
    return Response.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const { params } = context;

    const res = await pool.query("DELETE FROM products WHERE id = $1;", [
      params.idProduct,
    ]);
    if (res.rowCount === 1) {
      return Response.json({ success: true, data: "OK" }, { status: 200 });
    } else {
      throw new Error("La requête DELETE sur le produit a échoué");
    }
    /* const user: User = await request.json();
        const result = await pool.query('DELETE FROM users WHERE id = $1;', [user.id]);

        // Vérification si la requête a réussi
        if (result.rowCount === 1) {
            const data = result.rows[0];
            return Response.json({ success: true, data}, { status: 200 });
        } else {
            throw new Error('La requête DELETE a échoué');
        } */
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
