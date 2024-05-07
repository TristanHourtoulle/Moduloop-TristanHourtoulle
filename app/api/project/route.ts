// Importez les types NextApiRequest et NextApiResponse
import pool from "@/lib/database";
import { NextRequest } from "next/server";

// Fonction pour gérer les requêtes POST
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const image = "";
    let imageUrl = "";
    const user_id = data.get("user_id") as string;
    const budget = data.get("budget") as string;
    const company = data.get("company") as string;
    const location = data.get("location") as string;
    const area = data.get("area") as string;
    let group_id = data.get("group") as string;
    let group_name = "";
    let group_description = "";
    let group_budget = "";

    if (group_id === "-2") {
      group_name = data.get("group-name") as string;
      group_description = data.get("group-description") as string;
      group_budget = data.get("group-budget") as string;

      const result = await pool.query(
        "INSERT INTO groups (name, description, budget, user_id, image) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
        [group_name, group_description, group_budget, user_id, ""]
      );
      if (result.rowCount === 1) {
        group_id = result.rows[0].id;
      } else {
        throw new Error("La requête INSERT pour le groupe a échoué");
      }
    }

    const result = await pool.query(
      "INSERT INTO projects (name, description, image, budget, company, location, area, user_id, group_id, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP) RETURNING *;",
      [
        name,
        description,
        imageUrl,
        budget,
        company,
        location,
        area,
        user_id,
        Number(group_id),
      ]
    );
    if (result.rowCount === 1) {
      const project = result.rows[0];
      return Response.json(
        { success: true, project: project },
        { status: 200 }
      );
    } else {
      throw new Error("La requête INSERT pour le projet a échoué");
    }
  } catch (error) {
    console.error("Erreur lors de l'insertion du projet:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}

// Fonction pour gérer les requêtes PUT
export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id") || "";
    const name = searchParams.get("name") || "";

    const result = await pool.query(
      "UPDATE projects SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *;",
      [name, id]
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

// Fonction pour gérer les requêtes DELETE
