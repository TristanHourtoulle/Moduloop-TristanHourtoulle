const { Pool } = require("pg");

// Chargement des variables d'environnement depuis le fichier .env
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST, // Hôte Supabase
  user: process.env.DB_USER, // Utilisateur Supabase
  password: process.env.DB_PASSWORD, // Mot de passe Supabase
  database: process.env.DB_NAME, // Nom de la base de données Supabase
  port: process.env.DB_PORT, // Port Supabase
  ssl: {
    rejectUnauthorized: false, // SSL requis pour Supabase
  },
});

export default pool;
