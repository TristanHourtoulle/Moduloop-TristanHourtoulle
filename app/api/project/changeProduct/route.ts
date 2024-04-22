import pool from "@/lib/database";
import { AddProductType } from "@models/AddProduct";
import { ProductType } from "@models/Product";
import { ProjectType } from "@models/Project";
import {
  databaseToSingleProductModel,
  databaseToSingleProjectModel,
} from "@utils/convert";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    let res = await pool.query("SELECT * FROM products WHERE id = $1", [
      data.product.id,
    ]);
    if (res.rowCount === 0) {
      throw new Error("Le produit n'existe pas");
    } else {
      const product: ProductType = databaseToSingleProductModel(res.rows[0]);
      let storeData: AddProductType = {
        product: product,
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
        // We have to update existing product quantity
        if (project.products && Array.isArray(project.products)) {
          let index = 0;
          for (const item of project.products) {
            if (item.product.id == data.product.id) {
              project.products[index] = data;
            }
            index++;
          }
          const jsonProducts = JSON.stringify(project.products);
          res = await pool.query(
            "UPDATE projects SET products = $1 WHERE id = $2 RETURNING *;",
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
