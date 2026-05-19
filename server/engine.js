console.log("ENGINE LOADED");

const { worldState } = require("./worldState");
const { movePlayer } = require("./movement");

// ----------------------
// WORLD UPDATE
// ----------------------
function updateWorld() {
  for (const roomName in worldState) {
    const room = worldState[roomName];

    for (const id in room.players) {
      const player = room.players[id];
      if (!player) continue;

      movePlayer(player);
    }
  }
}

// ----------------------
// START ENGINE (THIS IS WHAT YOU WERE MISSING)
// ----------------------
function startEngine() {
  setInterval(() => {
    updateWorld();
  }, 50);
}

module.exports = {
  startEngine
};