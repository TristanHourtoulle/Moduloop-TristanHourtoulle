// Importez les types NextApiRequest et NextApiResponse
import pool from '@/lib/database';
import { NextRequest } from 'next/server';
import { User } from '@/models/User';
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";

// Fonction pour gérer les requêtes POST
export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const image = data.get('image') as File;
        let imageUrl = "";
        const user_id = data.get('user_id') as string;
        const budget = data.get('budget') as string;
        const company = data.get('company') as string;
        const location = data.get('location') as string;
        const area = data.get('area') as string;
        let group_id = data.get('group') as string;
        let group_name = "";
        let group_description = "";
        let group_budget = "";

        if (group_id === "-1") {
            group_name = data.get('group-name') as string;
            group_description = data.get('group-description') as string;
            group_budget = data.get('group-budget') as string;

            const result = await pool.query('INSERT INTO groups (name, description, budget, user_id, image) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
                [group_name, group_description, group_budget, user_id, ""]);
            if (result.rowCount === 1) {
                group_id = result.rows[0].id;
                console.log("GROUP CREATED, group_id: ", group_id);
            } else {
                throw new Error('La requête INSERT pour le groupe a échoué');
            }
        }

        if (image) {
            const fileBlob = await image.arrayBuffer();
            const buffer = Buffer.from(fileBlob);
            const uploadDir = path.join(process.cwd(), 'public', 'projects');
            await mkdir(uploadDir, { recursive: true });
            const filepath = path.join(uploadDir, image.name);
            await writeFile(filepath, buffer);

            const dbFilePath = filepath.replace(process.cwd(), '').replace(/\\/g, '/');
            const dbImageUrl = dbFilePath.replace('/public', '');
            imageUrl = dbImageUrl;
        }

        const result = await pool.query('INSERT INTO projects (name, description, image, budget, company, location, area, user_id, group_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;',
            [name, description, imageUrl, budget, company, location, area, user_id, group_id]);
        if (result.rowCount === 1) {
            const project = result.rows[0];
            console.log("PROJECT CREATED: ", project);
            return Response.json({ success: true, project}, { status: 200 });
        } else {
            throw new Error('La requête INSERT pour le projet a échoué');
        }

    } catch (error) {
        console.error('Erreur lors de l\'insertion du projet:', error);
        return Response.json({ success: false, error}, { status: 500 });
    }
}

// Fonction pour gérer les requêtes GET
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id') || '';
        console.log("ID: ", id);

        const result = await pool.query('SELECT * FROM products WHERE id = $1;', [id]);
        if (result.rowCount == 1) {
            const product = result.rows[0];
            console.log(product);
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
        const user: User = await request.json();
        const result = await pool.query('DELETE FROM users WHERE id = $1;', [user.id]);

        // Vérification si la requête a réussi
        if (result.rowCount === 1) {
            const data = result.rows[0];
            return Response.json({ success: true, data}, { status: 200 });
        } else {
            throw new Error('La requête DELETE a échoué');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        return Response.json({ success: false, error}, { status: 500 });
    }
}
