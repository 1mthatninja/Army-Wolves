const { worldState } =
  require("./worldState");

function movePlayerToRoom(
  client,
  id,
  fromRoom,
  toRoom,
  spawn
) {

  const player =
    worldState[fromRoom]
      .players[id];

  if (!player) return;

  // remove from old room
  delete worldState[fromRoom]
    .players[id];

  // place at exit spawn
  player.x = spawn.x;
  player.y = spawn.y;

  player.targetX = spawn.x;
  player.targetY = spawn.y;

  // add to new room
  worldState[toRoom]
    .players[id] = player;

  // update socket room
  client.room = toRoom;
}

module.exports = {
  movePlayerToRoom
};