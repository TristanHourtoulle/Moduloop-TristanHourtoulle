const { Pool } = require("pg");

const pool = new Pool({
  host: "185.158.132.197",
  user: "postgres",
  password: "q3umdAVs4HIVZDOwkcXe",
  database: "moduloop",
});

export default pool;
