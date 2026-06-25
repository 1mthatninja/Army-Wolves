const { worldState } = require("../worldState");
const { applySpawn } = require("../engine/systems/spawnSystem");

const { S2C } = require("../net/protocol");
const { send } = require("../net/broadcaster");

// ----------------------
// SAFE ROOM INIT
// ----------------------
function ensureRoom(roomId) {
  if (!worldState[roomId]) {
    worldState[roomId] = {
      players: {},
      exits: []
    };
  }

  return worldState[roomId];
}

// ----------------------
// CREATE PLAYER
// ----------------------
function createPlayer(session) {
  const roomId = session.room || "lobby";

  const room = ensureRoom(roomId);

  const player = {
    id: session.id,

    x: 0,
    y: 0,

    targetX: 0,
    targetY: 0,

    speed: 500
  };

  applySpawn(player, roomId);

  room.players[player.id] = player;

  // SEND INIT PACKET
  send(session.ws, {
    type: S2C.INIT,
    id: player.id,
    room: roomId,
    players: room.players
  });

  return player;
}

// ----------------------
// REMOVE PLAYER
// ----------------------
function removePlayer(session) {
  const roomId = session.room;
  if (!roomId) return;

  const room = worldState[roomId];
  if (!room) return;

  delete room.players[session.id];
}

// ----------------------
// GET PLAYER
// ----------------------
function getPlayer(session) {
  const roomId = session.room;
  if (!roomId) return null;

  const room = worldState[roomId];
  if (!room) return null;

  return room.players[session.id] || null;
}

module.exports = {
  createPlayer,
  removePlayer,
  getPlayer
};