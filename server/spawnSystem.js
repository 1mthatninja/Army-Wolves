const roomDefs =
  require("./roomdefs");

function applySpawn(
  player,
  roomName
) {

  const spawn =
    roomDefs[roomName].spawn;

  player.x = spawn.x;
  player.y = spawn.y;

  player.targetX = spawn.x;
  player.targetY = spawn.y;
}

module.exports = {
  applySpawn
};