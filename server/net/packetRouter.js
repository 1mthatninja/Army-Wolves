const { C2S } = require("./protocol");
const sessionManager = require("./sessionManager");
const playerManager = require("../player/playerManager");

function routePacket(ws, packet, wss) {
  const session = sessionManager.getSession(ws);
  if (!session) return;

  const player = playerManager.getPlayer(session);
  if (!player) return;

  switch (packet.type) {
    case C2S.MOVE:
      player.targetX = packet.x;
      player.targetY = packet.y;
      break;

    default:
      console.log(
        "[PACKET] Unknown packet:",
        packet.type
      );
  }
}

module.exports = {
  routePacket
};