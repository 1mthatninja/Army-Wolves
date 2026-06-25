const crypto = require("crypto");

const sessions = new Map();

// ----------------------
// CREATE SESSION
// ----------------------
function createSession(ws) {
  const session = {
    id: crypto.randomUUID(),
    room: "lobby",
    ws
  };

  sessions.set(ws, session);

  // optional convenience reference
  ws.session = session;

  return session;
}

// ----------------------
// DESTROY SESSION
// ----------------------
function destroySession(ws) {
  sessions.delete(ws);

  if (ws.session) {
    delete ws.session;
  }
}

// ----------------------
// GET SESSION
// ----------------------
function getSession(ws) {
  return sessions.get(ws) || null;
}

module.exports = {
  createSession,
  destroySession,
  getSession
};