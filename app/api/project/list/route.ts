// Importez les types NextApiRequest et NextApiResponse
import pool from "@/lib/database";
import { NextRequest } from "next/server";
import { ProductType } from "@models/Product";
import { User } from "@/models/User";
import { deleteProductFromProject } from "@utils/projects";
import { AddProductType } from "@models/AddProduct";

// Fonction pour gérer les requêtes POST
export async function POST(request: NextRequest) {
  try {
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}

// Fonction pour gérer les requêtes PUT
export async function PUT(request: NextRequest) {
  try {
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}

// Fonction pour gérer les requêtes DELETE
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const idProject = searchParams.get("id_project") || "";
    const idProduct = searchParams.get("id_product") || "";

    if (idProject === "" || idProduct === "") {
      throw new Error("Missing parameters for DELETE request.");
    } else {
      let res = await pool.query(`SELECT * FROM projects WHERE id = $1;`, [
        idProject,
      ]);
      if (res.rowCount === 0) {
        throw new Error("Project with this User not found.");
      } else {
        const project = res.rows[0];
        const productsInProject = project.products;
        const newProducts = deleteProductFromProject(
          Number(idProduct),
          productsInProject
        );

        if (newProducts === productsInProject) {
          throw new Error("Product not found in project.");
        } else {
          let res = await pool.query(
            `UPDATE projects SET products = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *;`,
            [JSON.stringify(newProducts), idProject]
          );
          if (!res) {
            throw new Error("Error while updating project.");
          }
          const data = res.rows[0];
          return Response.json({ success: true, data: data }, { status: 200 });
        }
      }
    }
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
