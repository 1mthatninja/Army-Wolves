const { worldState } = require("./worldState");

function movePlayerToRoom(client, id, fromRoom, toRoom) {

  const player = worldState[fromRoom].players[id];
  if (!player) return;

  delete worldState[fromRoom].players[id];

  const spawn = worldState[toRoom].spawn;

  player.x = spawn.x;
  player.y = spawn.y;
  player.targetX = spawn.x;
  player.targetY = spawn.y;

  worldState[toRoom].players[id] = player;

  client.room = toRoom;
}

module.exports = {
  movePlayerToRoom
};