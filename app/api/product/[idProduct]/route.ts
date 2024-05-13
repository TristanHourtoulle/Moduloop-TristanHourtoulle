import pool from "@lib/database";

// Fonction pour gérer les requêtes GET
export async function GET(request: Request, context: any) {
  try {
    const { params } = context;
    const result = await pool.query("SELECT * FROM products WHERE id = $1;", [
      params.idProduct,
    ]);
    if (result.rowCount == 1) {
      const product = result.rows[0];
      return Response.json({ success: true, product }, { status: 200 });
    } else {
      return Response.json(
        { success: false, message: "No product found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de tous les groupes: ",
      error
    );
    return Response.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const { params } = context;

    // Convertir l'ID du produit en nombre
    const productId = Number(params.idProduct);

    // Get all projects stored in the database
    const result = await pool.query("SELECT * FROM projects");
    const projects = result.rows;

    // Parse all projects and if we find the product in one of them, we have to delete this product from the project
    let indexProject = 0;
    for (const project of projects) {
      console.log("Actual project: ", project);
      const products = project.products;
      if (products) {
        for (const product of products) {
          console.log("Actual product: ", product);
          // Convertir l'ID du produit dans le projet en nombre pour la comparaison
          const productIdInProject = Number(product.product[0].id);
          console.log(
            "Product ID in project: ",
            productIdInProject,
            "Product ID to delete: ",
            productId
          );
          if (productIdInProject == productId) {
            console.log("I have found the product to delete on this project !");
            // Delete the product from the project
            if (products.length === 1) {
              projects[indexProject].products = null;
              await pool.query(
                "UPDATE projects SET products = $1 WHERE id = $2;",
                [null, project.id]
              );
            } else {
              const index = products.indexOf(product);
              products.splice(index, 1);
              // Update the project in the database
              await pool.query(
                "UPDATE projects SET products = $1 WHERE id = $2;",
                [JSON.stringify(products), project.id]
              );
            }
          }
        }
      }
      indexProject++;
    }
    const res = await pool.query("DELETE FROM products WHERE id = $1;", [
      params.idProduct,
    ]);
    if (res.rowCount === 1) {
      return Response.json({ success: true, data: "OK" }, { status: 200 });
    } else {
      throw new Error("La requête DELETE sur le produit a échoué");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
