import { playerId, exits, currentRoom } from "../state/network.js";
import { stateBuffer } from "../state/stateBuffer.js";
import { backgrounds } from "./assets.js";
import { drawBackground } from "./drawBackground.js";
import { drawPlayers } from "./drawPlayers.js";
import { drawExits } from "./drawExits.js";
import { drawUI } from "./drawUI.js";

console.log("RENDER RUNNING");
console.log("stateBuffer:", stateBuffer);

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// IMPORTANT: prevents blurry sprites when scaling
ctx.imageSmoothingEnabled = false;

// 🔥 CRITICAL: ensure canvas resolution is ALWAYS correct
canvas.width = 1520;
canvas.height = 960;

export function render() {

  const W = canvas.width;
  const H = canvas.height;

  // ----------------------
  // CLEAR FRAME
  // ----------------------
  ctx.clearRect(0, 0, W, H);

  // ----------------------
  // BACKGROUND
  // ----------------------
  const room = currentRoom || "lobby";
  drawBackground(ctx, room, backgrounds);

  // ----------------------
  // GET LATEST STATE
  // ----------------------
  const latest = stateBuffer[stateBuffer.length - 1];

  if (!latest || !latest.players) {
    drawUI(ctx);
    return;
  }

  // ----------------------
  // WORLD
  // ----------------------
  drawExits(ctx, exits);
  drawPlayers(ctx, latest.players);

  // ----------------------
  // UI LAST
  // ----------------------
  drawUI(ctx, canvas);
}