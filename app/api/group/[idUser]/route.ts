import pool from "@lib/database";

// Fonction pour gérer les requêtes GET
export async function GET(request: Request, context: any) {
  try {
    const { params } = context;
    const result = await pool.query(
      "SELECT * FROM groups WHERE user_id = $1;",
      [params.idUser]
    );
    let toSend;

    if (result.rowCount == 0) {
      toSend = JSON.stringify({});
    } else {
      toSend = result.rows;
    }
    return Response.json({ success: true, data: toSend }, { status: 200 });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de tous les groupes: ",
      error
    );
    return Response.json({ success: false }, { status: 400 });
  }
}
