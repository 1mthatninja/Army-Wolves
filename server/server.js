console.log("SERVER FILE LOADED");

const WebSocket = require("ws");
const crypto = require("crypto");

const { createPlayer } = require("./players");
const { worldState } = require("./worldState");
const { movePlayer } = require("./movement");

const wss = new WebSocket.Server({ port: 3000 });

console.log("SERVER RUNNING ON ws://localhost:3000");

// ----------------------
// CONNECTIONS
// ----------------------
wss.on("connection", (ws) => {

  const id = crypto.randomUUID();

  ws.id = id;
  ws.room = "lobby";

  worldState.lobby.players[id] = createPlayer();

  ws.send(JSON.stringify({
    type: "init",
    id
  }));

  // 🔥 THIS WAS MISSING (movement + room switching)
  ws.on("message", (msg) => {

    const data = JSON.parse(msg);

    // ----------------------
    // MOVE INPUT
    // ----------------------
    if (data.type === "move") {

      const room = worldState[ws.room];
      if (!room) return;

      const player = room.players[ws.id];
      if (!player) return;

      player.targetX = data.x;
      player.targetY = data.y;
    }

    // ----------------------
    // ROOM SWITCH
    // ----------------------
    if (data.type === "joinRoom") {

      const newRoom = data.room;
      if (!worldState[newRoom]) return;

      const player = worldState[ws.room].players[ws.id];
      if (!player) return;

      // remove from old room
      delete worldState[ws.room].players[ws.id];

      // add to new room
      ws.room = newRoom;
      worldState[newRoom].players[ws.id] = player;
    }
  });

  // ----------------------
  // CLEANUP
  // ----------------------
  ws.on("close", () => {
    if (worldState[ws.room]) {
      delete worldState[ws.room].players[ws.id];
    }
  });
});

// ----------------------
// WORLD UPDATE LOOP
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
// BROADCAST LOOP
// ----------------------
function broadcast() {

  wss.clients.forEach(client => {

    if (client.readyState !== WebSocket.OPEN) return;

    const room = worldState[client.room];
    if (!room) return;

    client.send(JSON.stringify({
      type: "state",
      time: Date.now(),
      players: room.players,
      room: client.room,
      exits: room.exits
    }));
  });
}

// ----------------------
// MAIN LOOP
// ----------------------
setInterval(() => {
  updateWorld();
  broadcast();
}, 50);