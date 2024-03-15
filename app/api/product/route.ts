// Importez les types NextApiRequest et NextApiResponse
import pool from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';
import { ProductType } from '@models/Product';
import { User } from '@/models/User';

function substituteNewValuesFromReuseValues(newProduct, reuseProduct) {
    console.log('newProduct:', newProduct);
    console.log('reuseProduct:', reuseProduct);
    reuseProduct.reuse = {
        rc: {
            manufacturing: reuseProduct.rc.manufacturing - newProduct.rc.manufacturing,
            installation: reuseProduct.rc.installation - newProduct.rc.installation,
            usage: reuseProduct.rc.usage - newProduct.rc.usage,
            endOfLife: reuseProduct.rc.endOfLife - newProduct.rc.endOfLife,
        },
        erf: {
            manufacturing: reuseProduct.erf.manufacturing - newProduct.erf.manufacturing,
            installation: reuseProduct.erf.installation - newProduct.erf.installation,
            usage: reuseProduct.erf.usage - newProduct.erf.usage,
            endOfLife: reuseProduct.erf.endOfLife - newProduct.erf.endOfLife,
        },
        ase: {
            manufacturing: reuseProduct.ase.manufacturing - newProduct.ase.manufacturing,
            installation: reuseProduct.ase.installation - newProduct.ase.installation,
            usage: reuseProduct.ase.usage - newProduct.ase.usage,
            endOfLife: reuseProduct.ase.endOfLife - newProduct.ase.endOfLife,
        },
        em: {
            manufacturing: reuseProduct.em.manufacturing - newProduct.em.manufacturing,
            installation: reuseProduct.em.installation - newProduct.em.installation,
            usage: reuseProduct.em.usage - newProduct.em.usage,
            endOfLife: reuseProduct.em.endOfLife - newProduct.em.endOfLife,
        },
    }
    console.log('reuseProductToInsertInDb:', reuseProduct);
    return reuseProduct.reuse;
}

// Fonction pour gérer les requêtes POST
export async function POST(request: NextRequest) {
    try {
        const param: any = await request.json();
        const products = param.products;

        // Parcours de chaque produit
        for (const productName in products) {
            if (Object.hasOwnProperty.call(products, productName)) {
            const product = products[productName];
            const base = product.base;
            const unit = product.unit;

            // Vérifie si le produit existe déjà dans la base de données
            const queryText = 'SELECT * FROM products WHERE name = $1';
            const res = await pool.query(queryText, [productName]);

            if (res.rows.length === 0) {
                // Si le produit n'existe pas encore, l'ajoute à la base de données
                const result = await pool.query("INSERT INTO products (name, image, unit, base, source, new, reuse) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
                            [productName, "", unit, base, "", product.new, substituteNewValuesFromReuseValues(product.new, product.used)])
                console.log(`Produit "${productName}" ajouté à la base de données.`);
            } else {
                console.log(`Produit "${productName}" déjà présent dans la base de données.`);
            }
            }
        }
        return Response.json({success: true, data: "OK"}, {status: 200});
        // const result = await pool.query("INSERT INTO products (name, image, unit, base, source, new, reuse) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
        //                                 [product.name, product.image, product.unit, product.category, "", product.new, product.reuse])

        // if (result.rowCount == 1) {
        //     const data = result.rows[0];
        // } else {
        //     throw new Error('La requête INSERT a échoué')
        // }
    } catch (error) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur:', error);
        return Response.json({ success: false, error}, { status: 500 });
    }
}

// Fonction pour gérer les requêtes GET
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id') || '';

        const result = await pool.query('SELECT * FROM products WHERE id = $1;', [id]);
        if (result.rowCount == 1) {
            const product = result.rows[0];
            return Response.json({success: true, product}, { status: 200 })
        } else {
            return Response.json({success: false, message: 'No product found'}, { status: 404 });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        return Response.json({ success: false, error }, { status: 500 });
    }
}

// Fonction pour gérer les requêtes PUT
export async function PUT(request: NextRequest) {
    try {
        const user: User = await request.json();
        const result = await pool.query('UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *;',
            [user.name, user.email, user.password, user.role, user.id]);

        // Vérification si la requête a réussi
        if (result.rowCount === 1) {
            const data = result.rows[0];
            return Response.json({ success: true, data}, { status: 200 });
        } else {
            throw new Error('La requête UPDATE a échoué');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        return Response.json({ success: false, error}, { status: 500 });
    }
}

// Fonction pour gérer les requêtes DELETE
export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id') || '';

        const res = await pool.query('DELETE FROM products WHERE id = $1;', [id]);
        if (res.rowCount === 1) {
            return Response.json({ success: true, data: "OK"}, { status: 200 });
        } else {
            throw new Error('La requête DELETE sur le produit a échoué');
        }
        /* const user: User = await request.json();
        const result = await pool.query('DELETE FROM users WHERE id = $1;', [user.id]);

        // Vérification si la requête a réussi
        if (result.rowCount === 1) {
            const data = result.rows[0];
            return Response.json({ success: true, data}, { status: 200 });
        } else {
            throw new Error('La requête DELETE a échoué');
        } */
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        return Response.json({ success: false, error}, { status: 500 });
    }
}
