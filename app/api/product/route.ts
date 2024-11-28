// Importez les types NextApiRequest et NextApiResponse
import pool from "@/lib/database";
import { User } from "@/models/User";
import { NextRequest } from "next/server";

function substituteNewValuesFromReuseValues(
  newProduct: any,
  reuseProduct: any
) {
  reuseProduct.reuse = {
    rc: {
      manufacturing: reuseProduct.rc.manufacturing,
      installation: reuseProduct.rc.installation,
      usage: reuseProduct.rc.usage,
      endOfLife: reuseProduct.rc.endOfLife,
    },
    erf: {
      manufacturing: reuseProduct.erf.manufacturing,
      installation: reuseProduct.erf.installation,
      usage: reuseProduct.erf.usage,
      endOfLife: reuseProduct.erf.endOfLife,
    },
    ase: {
      manufacturing: reuseProduct.ase.manufacturing,
      installation: reuseProduct.ase.installation,
      usage: reuseProduct.ase.usage,
      endOfLife: reuseProduct.ase.endOfLife,
    },
    em: {
      manufacturing: reuseProduct.em.manufacturing,
      installation: reuseProduct.em.installation,
      usage: reuseProduct.em.usage,
      endOfLife: reuseProduct.em.endOfLife,
    },
  };
  return reuseProduct.reuse;
}

// Fonction pour gérer les requêtes POST
export async function POST(request: NextRequest) {
  try {
    const param: any = await request.json(); // Pas besoin de JSON.parse ici
    console.log("param reçu :", param);

    // Vérifie que `param` contient des produits
    const products = param.products;
    if (!products || typeof products !== "object") {
      throw new Error(
        "Les données envoyées ne contiennent pas de produits valides."
      );
    }

    // Parcours de chaque produit
    for (const productName in products) {
      if (Object.hasOwnProperty.call(products, productName)) {
        const product = products[productName];
        const base = product.base;
        const unit = product.unit;
        const image = "/products/" + productName.replaceAll(" ", "_") + ".png";

        // Vérifie si le produit existe déjà dans la base de données
        const queryText = "SELECT * FROM products WHERE name = $1";
        const res = await pool.query(queryText, [productName]);

        if (res.rows.length === 0) {
          // Si le produit n'existe pas encore, l'ajoute à la base de données
          const result = await pool.query(
            "INSERT INTO products (name, image, unit, base, source, new, reuse) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
            [
              productName,
              image,
              unit,
              base,
              "",
              product.new,
              substituteNewValuesFromReuseValues(product.new, product.used),
            ]
          );
          if (result.rowCount !== 1) {
            throw new Error("La requête INSERT a échoué");
          }
        }
      }
    }

    return Response.json({ success: true, data: "OK" }, { status: 200 });
  } catch (error: any) {
    console.error("Erreur lors du traitement des produits :", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Fonction pour gérer les requêtes PUT
export async function PUT(request: NextRequest) {
  try {
    const user: User = await request.json();
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *;",
      [user.name, user.email, user.password, user.role, user.id]
    );

    // Vérification si la requête a réussi
    if (result.rowCount === 1) {
      const data = result.rows[0];
      return Response.json({ success: true, data }, { status: 200 });
    } else {
      throw new Error("La requête UPDATE a échoué");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}

// Fonction pour gérer les requêtes DELETE
