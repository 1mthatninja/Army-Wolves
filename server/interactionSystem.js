const roomDefs = require("./roomdefs");

// ----------------------
// EXIT CHECK
// ----------------------
function checkExit(player, roomName) {

  const room = roomDefs[roomName];
  if (!room || !room.interactions) return null;

  for (const interaction of room.interactions) {

    if (interaction.type !== "exit") continue;

    const inside =
      player.x > interaction.x &&
      player.x < interaction.x + interaction.w &&
      player.y > interaction.y &&
      player.y < interaction.y + interaction.h;

    if (inside) return interaction;
  }

  return null;
}
// ----------------------
// EXPORTS
// ----------------------
module.exports = {
  checkExit
};