const pool = require("./database");

async function test() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("DB CONNECTED:", res.rows[0]);
  } catch (err) {
    console.error("DB ERROR:", err);
  } finally {
    process.exit();
  }
}

test();
