console.log("ENGINE LOADED");

const { worldState } =
  require("./worldState");

const { movePlayer } =
  require("./movement");

const { checkExit } =
  require("./interactionSystem");

const { movePlayerToRoom } =
  require("./roomSystem");

// ----------------------
// WORLD UPDATE
// ----------------------
function updateWorld(wss) {

  for (const roomName in worldState) {

    const room =
      worldState[roomName];

    for (const id in room.players) {

      const player =
        room.players[id];

      if (!player) continue;

      // ----------------------
      // MOVEMENT
      // ----------------------
      movePlayer(player);

      // ----------------------
      // COOLDOWN (PREVENT ROOM SPAM)
      // ----------------------
      player._roomCooldown =
        player._roomCooldown || 0;

      if (Date.now() - player._roomCooldown < 500) {
        continue;
      }

      // ----------------------
      // INTERACTIONS
      // ----------------------
      const interaction =
        checkExit(player, roomName);

      if (!interaction) continue;

      if (interaction.type !== "exit") continue;

      const client =
        [...wss.clients]
          .find(c => c.id === id);

      if (!client) continue;

      // mark cooldown BEFORE teleport
      player._roomCooldown = Date.now();

      movePlayerToRoom(
        client,
        id,
        roomName,
        interaction.to,
        interaction.spawn || worldState[interaction.to].spawn
      );
    }
  }
}

// ----------------------
// START ENGINE
// ----------------------
function startEngine(wss, broadcast) {

  setInterval(() => {

    updateWorld(wss);

    broadcast();

  }, 50);
}

module.exports = {
  startEngine
};