import pool from '@/lib/database';
import { NextRequest } from 'next/server';
import { isProductInProject } from '@utils/projects';
import { databaseToSingleProjectModel, databaseToSingleProductModel } from '@utils/convert';
import { ProductType } from '@models/Product';
import { ProjectType } from '@models/Project';
import { AddProductType } from '@models/AddProduct';

// Fonction pour gérer les requêtes POST
export async function POST(request: NextRequest) {
    const data = await request.json();
    try {

        let res = await pool.query('SELECT * FROM products WHERE id = $1', [data.product.id])
        if (res.rowCount === 0) {
            throw new Error('Le produit n\'existe pas');
        } else {
            const product: ProductType = databaseToSingleProductModel(res.rows[0])
            let storeData: AddProductType = {
                product: product,
                idProject: data.idProject,
                qNew: data.qNew,
                qUsed: data.qUsed,
                addOn: Date.now().toString(),
                updatedOn: Date.now().toString()
            };
            // Check if this product is already in the project
            res = await pool.query('SELECT * FROM projects WHERE id = $1', [data.idProject]);
            if (res.rowCount === 0) {
                throw new Error('Le projet n\'existe pas');
            } else {
                const project: ProjectType = databaseToSingleProjectModel(res.rows[0]);
                let alreadyExist = isProductInProject(storeData, project)
                if (alreadyExist) {
                    // We have to update existing product quantity
                    if (project.products && Array.isArray(project.products)) {
                        let index = 0;
                        for (const item of project.products) {
                            if (item.product.id == alreadyExist.product.id) {
                                project.products[index] = alreadyExist
                            }
                            index++;
                        }
                        const jsonProducts = JSON.stringify(project.products);
                        res = await pool.query('UPDATE projects SET products = $1 WHERE id = $2 RETURNING *;', [jsonProducts, data.idProject]);
                        if (res.rowCount === 0) {
                            throw new Error('Erreur lors de la mise à jour du produit');
                        } else {
                            return Response.json({ success: true, res }, { status: 200 });
                        }
                    }
                } else {
                    // We have to add new product
                    if (project.products === null) {
                        project.products = []; // Initialisation avec un tableau vide
                    }
                    project.products.push(storeData); // Correction ici pour initialiser project.products avec un tableau
                    const jsonProducts = JSON.stringify(project.products);
                    res = await pool.query('UPDATE projects SET products = $1 WHERE id = $2 RETURNING *;', [jsonProducts, data.idProject]);
                    if (res.rowCount === 0) {
                        throw new Error('Erreur lors de la mise à jour du produit');
                    } else {
                        return Response.json({ success: true, res }, { status: 200 });
                    }
                }
            }
            return Response.json({ success: true, storeData }, { status: 200 });
        }
    } catch (error) {
        console.log("ID product: ", data.product.id)
        console.log("ID project: ", data.idProject)
        console.error('Erreur lors de la récupération du produit:', error);
        return Response.json({ success: false, error }, { status: 500 });
    }
}