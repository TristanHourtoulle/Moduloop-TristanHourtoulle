import pool from "@/lib/database";
import { AddProductType } from "@models/AddProduct";
import { ProductType } from "@models/Product";
import { ProjectType } from "@models/Project";
import {
  databaseToSingleProductModel,
  databaseToSingleProjectModel,
} from "@utils/convert";
import { isProductInProject } from "@utils/projects";
import { NextRequest } from "next/server";

// Fonction pour gérer les requêtes POST
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    let res = await pool.query("SELECT * FROM products WHERE id = $1", [
      data.product[0].id,
    ]);
    if (res.rowCount === 0) {
      throw new Error("Le produit n'existe pas");
    } else {
      const product: ProductType = databaseToSingleProductModel(res.rows[0]);
      let storeData: AddProductType = {
        product: [product], // Fix: Wrap the product object in an array
        idProject: data.idProject,
        qNew: data.qNew,
        qUsed: data.qUsed,
        addOn: Date.now().toString(),
        updatedOn: Date.now().toString(),
      };

      // Check if this product is already in the project
      res = await pool.query("SELECT * FROM projects WHERE id = $1", [
        data.idProject,
      ]);
      if (res.rowCount === 0) {
        throw new Error("Le projet n'existe pas");
      } else {
        const project: ProjectType = databaseToSingleProjectModel(res.rows[0]);
        let alreadyExist = isProductInProject(storeData, project);
        if (alreadyExist) {
          // We have to update existing product quantity
          if (project.products && Array.isArray(project.products)) {
            let index = 0;
            for (const item of project.products) {
              if (
                !alreadyExist ||
                !alreadyExist.product ||
                !alreadyExist.product === undefined ||
                !alreadyExist.product[0]
              ) {
                throw new Error("Erreur lors de la récupération du produit");
              }
              if (
                alreadyExist &&
                alreadyExist.product &&
                (item as any).product[0].id === alreadyExist.product[0].id // Fix: Access the 'id' property correctly
              ) {
                (project as any).products[index] = alreadyExist;
              } else {
              }
              index++;
            }
            const jsonProducts = JSON.stringify(project.products);
            res = await pool.query(
              "UPDATE projects SET products = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *;",
              [jsonProducts, data.idProject]
            );
            if (res.rowCount === 0) {
              throw new Error("Erreur lors de la mise à jour du produit");
            } else {
              return Response.json({ success: true, res }, { status: 200 });
            }
          }
        } else {
          // Initialisez project.products avec un tableau vide s'il est null
          if (!project.products) {
            project.products = [];
          }

          // Vérifiez si project.products est un tableau avant d'y ajouter de nouveaux éléments
          if (Array.isArray(project.products)) {
            // Ajoutez storeData à project.products
            (project as any).products.push(storeData);
          } else {
            // Gérez le cas où project.products n'est pas un tableau
          }

          const jsonProducts = JSON.stringify(project.products);
          res = await pool.query(
            "UPDATE projects SET products = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *;",
            [jsonProducts, data.idProject]
          );
          if (res.rowCount === 0) {
            throw new Error("Erreur lors de la mise à jour du produit");
          } else {
            return Response.json({ success: true, res }, { status: 200 });
          }
        }
      }
      return Response.json({ success: true, storeData }, { status: 200 });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
