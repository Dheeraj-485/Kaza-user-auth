const pool = require("./config/db"); // This should be your pg Pool file

const createUsersTable = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(100) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    console.log("✅ users table created successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error creating users table:", err);
    process.exit(1);
  }
};

createUsersTable();
