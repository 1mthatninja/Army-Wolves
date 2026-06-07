const pool = require("./database");

async function initDB() {
  try {
    console.log("🔄 Checking database connection...");

    // 1. Test DB connection
    const test = await pool.query("SELECT NOW()");
    console.log("✅ DB CONNECTED:", test.rows[0]);

    // 2. Create users table (safe, idempotent)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        color VARCHAR(20) DEFAULT 'blue',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ DB SCHEMA READY");

  } catch (err) {
    console.error("❌ DB INIT FAILED:", err);
    process.exit(1); // stop server if DB is broken
  }
}

module.exports = { initDB };