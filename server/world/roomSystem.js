const { worldState } = require("../worldState");
const { applySpawn } = require("../engine/systems/spawnSystem");

// ----------------------
// MOVE PLAYER BETWEEN ROOMS
// ----------------------
function movePlayerToRoom(
  client,
  id,
  fromRoom,
  toRoom
) {
  const from = worldState[fromRoom];
  const to = worldState[toRoom];

  if (!from || !to) {
    console.warn(
      `[ROOM] Invalid room transition: ${fromRoom} -> ${toRoom}`
    );
    return;
  }

  const player = from.players[id];
  if (!player) return;

  // remove from old room
  delete from.players[id];

  // ensure target spawn
  applySpawn(player, toRoom);

  // add to new room
  to.players[id] = player;

  // update socket room
  client.room = toRoom;
}

module.exports = {
  movePlayerToRoom
};