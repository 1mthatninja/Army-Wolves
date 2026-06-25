console.log("SERVER FILE LOADED");

// ----------------------
// IMPORTS
// ----------------------
const express = require("express");
const http = require("http");
const path = require("path");

const authRoutes = require("./api/auth");
const { initDB } = require("./db/init");
const { startEngine } = require("./engine/engine");

// Networking layer (moved out of server.js)
const {
  createWebSocketServer
} = require("./net/websocketServer");

const {
  broadcastWorldState
} = require("./net/broadcaster");

// ----------------------
// EXPRESS APP
// ----------------------
const app = express();

app.use(express.json());

// Serve client static files
app.use(
  express.static(
    path.join(__dirname, "../client/public")
  )
);

// ----------------------
// ROOT PAGE
// ----------------------
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/public/play.html")
  );
});

// ----------------------
// API ROUTES
// ----------------------
app.use("/api", authRoutes);

// ----------------------
// HTTP SERVER
// ----------------------
const server = http.createServer(app);

// ----------------------
// WEBSOCKET SERVER
// ----------------------
// WebSocket lifecycle now handled in:
// net/websocketServer.js
const wss = createWebSocketServer(server);

// ----------------------
// STARTUP FLOW
// ----------------------
async function start() {
  try {
    // Initialize database
    await initDB();

    // Start HTTP + WebSocket server
    server.listen(3000, () => {
      console.log(
        "HTTP + WS SERVER RUNNING ON http://localhost:3000"
      );
    });

    // Start game loop / simulation engine
    // Engine updates world and broadcaster sends state packets
    startEngine(
      wss,
      () => broadcastWorldState(wss)
    );

  } catch (err) {
    console.error("SERVER START FAILED:", err);
    process.exit(1);
  }
}

// ----------------------
// BOOT
// ----------------------
start();