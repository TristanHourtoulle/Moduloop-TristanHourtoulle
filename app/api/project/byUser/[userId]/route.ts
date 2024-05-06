import pool from "@lib/database";

export async function GET(request: Request, context: any) {
  try {
    const { params } = context;
    const id = params.userId;

    const result = await pool.query(
      "SELECT * FROM projects WHERE user_id = $1 ORDER BY updated_at DESC;",
      [id]
    );
    let toSend;

    if (result.rowCount == 0) {
      toSend = JSON.stringify({});
    }
    toSend = result.rows;
    return Response.json({ success: true, data: toSend }, { status: 200 });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de tous les projets: ",
      error
    );
    return Response.json({ success: false, error }, { status: 500 });
  }
}
