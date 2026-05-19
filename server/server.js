console.log("SERVER FILE LOADED");

const WebSocket = require("ws");
const crypto = require("crypto");

const { worldState } =
  require("./worldState");

const { startEngine } =
  require("./engine");

const { applySpawn } =
  require("./spawnSystem");

// ----------------------
// WEBSOCKET SERVER
// ----------------------
const wss =
  new WebSocket.Server({
    port: 3000
  });

console.log(
  "SERVER RUNNING ON ws://localhost:3000"
);

// ----------------------
// CONNECTIONS
// ----------------------
wss.on("connection", (ws) => {

  const id =
    crypto.randomUUID();

  ws.id = id;
  ws.room = "lobby";

  // create player
    // create player
  const player = {

  x: 0,
  y: 0,

  targetX: 0,
  targetY: 0,

  speed: 160
};

  // apply room spawn
  applySpawn(
    player,
    "lobby"
  );

  // add to world
  worldState.lobby.players[id] =
    player;

  // send init
  ws.send(JSON.stringify({
    type: "init",
    id
  }));

  // ----------------------
  // CLIENT MESSAGES
  // ----------------------
  ws.on("message", (msg) => {

    const data =
      JSON.parse(msg);

    // ----------------------
    // MOVE INPUT
    // ----------------------
    if (data.type === "move") {

      const room =
        worldState[ws.room];

      if (!room) return;

      const player =
        room.players[ws.id];

      if (!player) return;

      player.targetX =
        data.x;

      player.targetY =
        data.y;
    }
  });

  // ----------------------
  // DISCONNECT
  // ----------------------
  ws.on("close", () => {

    const room =
      worldState[ws.room];

    if (!room) return;

    delete room.players[ws.id];
  });
});

// ----------------------
// BROADCAST
// ----------------------
function broadcast() {

  wss.clients.forEach(client => {

    if (
      client.readyState !==
      WebSocket.OPEN
    ) return;

    const room =
      worldState[client.room];

    if (!room) return;

    client.send(JSON.stringify({
      type: "state",

      time: Date.now(),

      players:
        room.players,

      room:
        client.room,

      exits:
        room.exits
    }));
  });
}

// ----------------------
// START ENGINE
// ----------------------
startEngine(
  wss,
  broadcast
);