const { Pool } = require("pg");

const pool = new Pool({
  host: "185.158.132.197",
  user: "postgres",
  password: "q3umdAVs4HIVZDOwkcXe",
  database: "moduloop",
});

// Créer la fonction qui met à jour le champ updated_at
// pool.query(
//   `
//     CREATE OR REPLACE FUNCTION update_modified_column()
//     RETURNS TRIGGER AS $$
//     BEGIN
//        NEW.updatedAt = now();
//        RETURN NEW;
//     END;
//     $$ language 'plpgsql';
// `,
//   (err, res) => {
//     if (err) {
//       console.error(err);
//     } else {
//     }
//   }
// );

// Créer le trigger qui appelle cette fonction chaque fois qu'une ligne dans la table projects est mise à jour
// pool.query(
//   `
//     CREATE TRIGGER update_projects_modtime
//     BEFORE UPDATE ON projects
//     FOR EACH ROW
//     EXECUTE PROCEDURE update_modified_column();
// `,
//   (err: any, res: any) => {
//     if (err) {
//       console.error(err);
//     } else {
//     }
//   }
// );

export default pool;
