const WebSocket = require("ws");

const { routePacket } = require("./packetRouter");
const sessionManager = require("./sessionManager");

const playerManager =
  require("../player/playerManager");

function createWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("[WS] Client connected");

    // ----------------------
    // CREATE SESSION
    // ----------------------
    const session =
      sessionManager.createSession(ws);

    // ----------------------
    // CREATE PLAYER
    // ----------------------
    const player =
      playerManager.createPlayer(session);

    console.log(
      `[WS] Player created: ${player.id}`
    );

    // ----------------------
    // INCOMING PACKETS
    // ----------------------
    ws.on("message", (rawMessage) => {
      let packet;

      try {
        packet = JSON.parse(rawMessage);
      } catch (err) {
        console.error("[WS] Invalid packet");
        return;
      }

      routePacket(ws, packet, wss);
    });

    // ----------------------
    // DISCONNECT
    // ----------------------
    ws.on("close", () => {
      console.log("[WS] Client disconnected");

      playerManager.removePlayer(session);
      sessionManager.destroySession(ws);
    });

    // ----------------------
    // SOCKET ERROR
    // ----------------------
    ws.on("error", (err) => {
      console.error("[WS] Error:", err);
    });
  });

  return wss;
}

module.exports = {
  createWebSocketServer
};