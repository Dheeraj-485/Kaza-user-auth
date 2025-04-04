// const { Pool } = require("pg");
// require("dotenv").config();

// const pool = new Pool({
//   //   user: process.env.DB_USER,
//   //   host: process.env.DATABASE_URL
//   //   database: process.env.DB_NAME,
//   //   password: process.env.DB_PASSWORD,
//   //   port: process.env.DB_PORT,
// });

// pool
//   .connect()
//   .then(() => console.log(" PostgreSQL connected successfully!"))
//   .catch((err) => console.error(" PostgreSQL connection error:", err));

// module.exports = pool;

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ✅ Use only this
  ssl: {
    rejectUnauthorized: false, // ✅ Required for Render PostgreSQL
  },
});

pool
  .connect()
  .then(() => console.log("✅ PostgreSQL connected successfully!"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err));

module.exports = pool;
