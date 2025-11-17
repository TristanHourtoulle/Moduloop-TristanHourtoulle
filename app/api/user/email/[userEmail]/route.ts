import pool from "../../../../lib/database";

export async function GET(request: Request, context: any) {
  try {
    const { params } = context;
    const { userEmail } = await params;

    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 ORDER BY "updatedAt" ASC;',
      [userEmail]
    );

    // Vérification si l'utilisateur a été trouvé dans la base de données
    if (result.rowCount === 1) {
      const user = result.rows[0];
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
