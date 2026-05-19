const roomDefs = require("./roomdefs");

const worldState = {};

for (const roomName in roomDefs) {
  worldState[roomName] = {
    ...roomDefs[roomName],
    players: {}
  };
}

console.log("WORLD LOADED:", Object.keys(worldState));

module.exports = {
  worldState
};