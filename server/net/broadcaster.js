const WebSocket = require("ws");

// ----------------------
// SEND TO ONE SOCKET
// ----------------------
function send(ws, packet) {
  if (!ws) return;
  if (ws.readyState !== WebSocket.OPEN) return;

  ws.send(JSON.stringify(packet));
}

module.exports = {
  send
};