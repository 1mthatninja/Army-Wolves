const roomDefs = require("../../roomdefs");

// ----------------------
// CHECK EXIT INTERACTIONS
// ----------------------
function checkExit(player, roomName) {
  const room = roomDefs[roomName];

  if (!room || !room.interactions) return null;

  for (const interaction of room.interactions) {
    if (interaction.type !== "exit") continue;

    const inside =
      player.x >= interaction.x &&
      player.x <= interaction.x + interaction.w &&
      player.y >= interaction.y &&
      player.y <= interaction.y + interaction.h;

    if (inside) {
      return interaction;
    }
  }

  return null;
}

module.exports = {
  checkExit
};