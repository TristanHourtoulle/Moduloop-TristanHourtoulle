const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "Moduloop",
});

// Créer la fonction qui met à jour le champ updated_at
pool.query(
  `
    CREATE OR REPLACE FUNCTION update_modified_column()
    RETURNS TRIGGER AS $$
    BEGIN
       NEW.updated_at = now();
       RETURN NEW; 
    END;
    $$ language 'plpgsql';
`,
  (err, res) => {
    if (err) {
      console.error(err);
    } else {
    }
  }
);

// Créer le trigger qui appelle cette fonction chaque fois qu'une ligne dans la table projects est mise à jour
pool.query(
  `
    CREATE TRIGGER update_projects_modtime
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();
`,
  (err, res) => {
    if (err) {
      console.error(err);
    } else {
    }
  }
);

export default pool;
