// Importez les types NextApiRequest et NextApiResponse
import pool from '@/lib/database';
import { NextRequest } from 'next/server';
import { ProductType } from '@models/Product';
import { User } from '@/models/User';

// Fonction pour gérer les requêtes POST
export async function POST(request: NextRequest) {
    try {
        return Response.json({success: true}, {status: 200});
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
        console.log("ID: ", id);
        const result = await pool.query('SELECT * FROM groups WHERE id = $1;', [id]);
        let toSend;

        if (result.rowCount == 0) {
            toSend = JSON.stringify({});
        }
        toSend = result.rows;
        return Response.json({success: true, data: toSend}, {status: 200});
    } catch (error) {
        console.error('Erreur lors de la récupération de tous les groupes: ', error);
        return Response.json({ success: false, error}, { status: 500 });
    }
}

// Fonction pour gérer les requêtes PUT
export async function PUT(request: NextRequest) {
    try {
        return Response.json({success: true}, {status: 200});
    } catch (error) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur:', error);
        return Response.json({ success: false, error}, { status: 500 });
    }
}

// Fonction pour gérer les requêtes DELETE
export async function DELETE(request: NextRequest) {
    try {
        return Response.json({success: true}, {status: 200});
    } catch (error) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur:', error);
        return Response.json({ success: false, error}, { status: 500 });
    }
}
