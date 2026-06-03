const pool = require("./db/database");
const bcrypt = require("bcrypt");

async function register(username, password) {
  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
    [username, hash]
  );

  return result.rows[0];
}

async function login(username, password) {
  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  const user = result.rows[0];
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;

  return {
    id: user.id,
    username: user.username
  };
}

module.exports = { register, login };