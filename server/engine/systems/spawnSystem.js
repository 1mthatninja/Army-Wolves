const roomDefs = require("../roomdefs");

// ----------------------
// APPLY SPAWN POSITION
// ----------------------
function applySpawn(player, roomName) {
  const room = roomDefs[roomName];

  if (!room || !room.spawn) {
    console.warn(
      `[SPAWN] Missing spawn for room: ${roomName}`
    );
    return;
  }

  const { x, y } = room.spawn;

  player.x = x;
  player.y = y;

  player.targetX = x;
  player.targetY = y;
}

module.exports = {
  applySpawn
};