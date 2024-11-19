import pool from "@/lib/database";
import { AddProductType } from "@models/AddProduct";
import { ProductType } from "@models/Product";
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
    // Vérifiez que les données nécessaires sont présentes
    if (!data.idProject || !data.product) {
      throw new Error("Missing required parameters: idProject or product");
    }

    // Si `data.product` est un ID direct, effectuez une requête pour récupérer le produit
    let res = await pool.query("SELECT * FROM products WHERE id = $1", [
      data.product,
    ]);

    if (res.rowCount === 0) {
      throw new Error("Le produit n'existe pas");
    }

    // Récupérez les données du produit
    const product: ProductType = databaseToSingleProductModel(res.rows[0]);

    // Structure des données pour le stockage
    let storeData: AddProductType = {
      product: [product], // Assurez-vous que le produit est bien un tableau
      idProject: data.idProject,
      qNew: data.qNew,
      qUsed: data.qUsed,
      addOn: Date.now().toString(),
      updatedOn: Date.now().toString(),
    };

    // Vérifiez si le projet existe
    res = await pool.query("SELECT * FROM projects WHERE id = $1", [
      data.idProject,
    ]);

    if (res.rowCount === 0) {
      throw new Error("Le projet n'existe pas");
    }

    const project: any = databaseToSingleProjectModel(res.rows[0]);

    // Vérifiez si le produit existe déjà dans le projet
    let alreadyExist = isProductInProject(storeData, project);

    if (alreadyExist) {
      // Mettre à jour les quantités d'un produit existant
      if (project.products && Array.isArray(project.products)) {
        let index = (project.products as AddProductType[]).findIndex(
          (item: AddProductType) =>
            item.product && item.product[0].id === product.id
        );

        if (index >= 0) {
          project.products[index].qNew += data.qNew;
          project.products[index].qUsed += data.qUsed;
        }
      }
    } else {
      // Ajouter un nouveau produit au projet
      if (!project.products) {
        project.products = [];
      }
      project.products.push(storeData);
    }

    const jsonProducts = JSON.stringify(project.products);

    // Mettez à jour la base de données
    res = await pool.query(
      "UPDATE projects SET products = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *;",
      [jsonProducts, data.idProject]
    );

    if (res.rowCount === 0) {
      throw new Error("Erreur lors de la mise à jour du produit");
    }

    return Response.json({ success: true, res }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    return Response.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
