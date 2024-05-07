import pool from "@lib/database";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const project = await request.formData();
    let res = null;

    if (!project) {
      return Response.json(
        { success: false, error: "Le projet à créer est vide" },
        { status: 400 }
      );
    }
    if (!project.get("name")) {
      return Response.json(
        { success: false, error: "Le nom du projet est manquant" },
        { status: 400 }
      );
    }
    if (!project.get("user_id")) {
      return Response.json(
        { success: false, error: "Le projet n'est pas relié à un utilisateur" },
        { status: 400 }
      );
    }

    let group_id = "";
    if (project.get("group_id") == "-2") {
      // We have to create a new group
      let group_name = project.get("group_name") as string;

      const result = await pool.query(
        "INSERT INTO groups (name, description, budget, user_id, image) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
        [group_name, "", "", project.get("user_id"), ""]
      );
      if (result.rowCount === 1) {
        group_id = result.rows[0].id;
      } else {
        throw new Error("La requête INSERT pour le groupe a échoué");
      }
    } else {
      group_id = project.get("group_id") as string;
    }

    // Create the project
    const result = await pool.query(
      "INSERT INTO projects (name, description, image, budget, company, location, area, user_id, group_id, updated_at, products) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, $10) RETURNING *;",
      [
        project.get("name"),
        "",
        "",
        "",
        "",
        "",
        "",
        project.get("user_id"),
        group_id,
        project.get("products"),
      ]
    );
    if (result.rowCount === 1) {
      const project = result.rows[0];
      return Response.json({ success: true, data: project }, { status: 200 });
    } else {
      throw new Error("La requête INSERT pour le projet a échoué");
    }
  } catch (error) {
    console.error("Erreur lors de l'insertion du projet:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
