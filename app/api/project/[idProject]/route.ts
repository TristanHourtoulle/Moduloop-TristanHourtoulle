import pool from "@lib/database";

export async function GET(request: Request, context: any) {
  try {
    const { params } = context;
    const { idProject } = await params;
    const result = await pool.query("SELECT * FROM projects WHERE id = $1;", [
      idProject,
    ]);
    if (result.rowCount == 1) {
      const product = result.rows[0];
      return Response.json({ success: true, product }, { status: 200 });
    } else {
      return Response.json(
        { success: false, message: "No project found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du projet: ", error);
    return Response.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const { params } = context;
    const { idProject } = await params;

    const result = await pool.query("DELETE FROM projects WHERE id = $1;", [
      idProject,
    ]);

    // Vérification si la requête a réussi
    if (result.rowCount === 1) {
      const data = result.rows[0];
      return Response.json({ success: true, data }, { status: 200 });
    } else {
      throw new Error("La requête DELETE a échoué");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du projet:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(request: Request, context: any) {
  try {
    const { params } = context;
    const { idProject } = await params;

    // Get project to copy
    let res = await pool.query("SELECT * FROM projects WHERE id = $1;", [
      idProject,
    ]);
    if (res.rowCount === 0) {
      throw new Error("No project found with this id");
    }
    const project = res.rows[0];
    // Duplicate project
    const productsJSON = JSON.stringify(project.products);
    res = await pool.query(
      "INSERT INTO projects (name, description, group_id, user_id, products, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      [
        "copie de " + project.name,
        project.description,
        project.group_id,
        project.user_id,
        productsJSON,
        new Date(),
        new Date(),
      ]
    );
    if (res.rowCount === 1) {
      const newProject = res.rows[0];
      return Response.json(
        { success: true, data: newProject },
        { status: 200 }
      );
    } else if (res.rows.length === 0) {
      throw new Error("Aucune ligne retournée par la requête SQL.");
    } else {
      throw new Error("La requête SQL a retourné plusieurs lignes.");
    }
  } catch (error) {
    console.error("Erreur lors de la  duplciation du projet:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
