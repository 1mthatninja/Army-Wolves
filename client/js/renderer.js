import {
  stateBuffer,
  playerId,
  exits,
  currentRoom,
  sendMove
} from "./network.js";

const canvas =
  document.getElementById("game");

const ctx =
  canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

// ----------------------
// INTERNAL GAME SIZE
// ----------------------
const GAME_WIDTH = 1520;
const GAME_HEIGHT = 960;

// ----------------------
// DEBUG
// ----------------------
const DEBUG = false;

// ----------------------
// MOUSE
// ----------------------
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener("mousemove", (e) => {

  const rect =
    canvas.getBoundingClientRect();

  const scaleX =
    canvas.width / rect.width;

  const scaleY =
    canvas.height / rect.height;

  mouseX =
    (e.clientX - rect.left) * scaleX;

  mouseY =
    (e.clientY - rect.top) * scaleY;
});

// ----------------------
// CLICK EXITS
// ----------------------
canvas.addEventListener("click", () => {

  for (const exit of exits) {

    const hovered =
      mouseX > exit.x &&
      mouseX < exit.x + exit.w &&
      mouseY > exit.y &&
      mouseY < exit.y + exit.h;

    if (hovered) {

      sendMove(
        exit.x + exit.w / 2,
        exit.y + exit.h / 2
      );

      break;
    }
  }
});

// ----------------------
// RESIZE
// ----------------------
function resize() {

  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;

  ctx.imageSmoothingEnabled = false;
}

resize();

window.addEventListener("resize", resize);

// ----------------------
// BACKGROUNDS
// ----------------------
const backgrounds = {
  lobby: loadImage("./assets/bg.png"),
  room1: loadImage("./assets/room1.png")
};

function loadImage(src) {
  const img = new Image();

  img.onload = () => {
    console.log("Loaded:", src);
  };

  img.onerror = () => {
    console.error("FAILED:", src);
  };

  img.src = src;

  return img;
}

// ----------------------
// SNAPSHOTS
// ----------------------
function getSnapshots(time) {

  let a = null;
  let b = null;

  for (let i = 0; i < stateBuffer.length - 1; i++) {

    const s1 = stateBuffer[i];
    const s2 = stateBuffer[i + 1];

    if (s1.time <= time && time <= s2.time) {
      a = s1;
      b = s2;
      break;
    }
  }

  return { a, b };
}

// ----------------------
// EXITS
// ----------------------
function drawExits() {

  for (const exit of exits) {

    const hovered =
      mouseX > exit.x &&
      mouseX < exit.x + exit.w &&
      mouseY > exit.y &&
      mouseY < exit.y + exit.h;

    if (hovered) {
      ctx.fillStyle = "rgba(255,255,0,0.35)";
      ctx.fillRect(exit.x, exit.y, exit.w, exit.h);
    }

    if (DEBUG) {
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 2;
      ctx.strokeRect(exit.x, exit.y, exit.w, exit.h);
    }
  }
}

// ----------------------
// PLAYERS
// ----------------------
function drawPlayers(players) {

  for (const id in players) {

    const p = players[id];

    ctx.fillStyle =
      id === playerId ? "blue" : "red";

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      15,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }
}

// ----------------------
// MAIN RENDER
// ----------------------
export function render() {

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // ----------------------
  // BACKGROUND (SAFE)
  // ----------------------
  const room =
    currentRoom || "lobby";

  const bg =
    backgrounds[room];

  if (bg && bg.complete && bg.naturalWidth > 0) {
    ctx.drawImage(bg, 0, 0, GAME_WIDTH, GAME_HEIGHT);
  } else {
    // fallback so we NEVER see browser background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  // ----------------------
  // EXITS
  // ----------------------
  drawExits();

  // ----------------------
  // INTERPOLATION
  // ----------------------
  const renderTime = Date.now() - 100;

  const { a, b } = getSnapshots(renderTime);

  if (!a || !b) {

    const latest =
      stateBuffer[stateBuffer.length - 1];

    if (!latest || !latest.players) return;

    drawPlayers(latest.players);
    return;
  }

  const delta = b.time - a.time;

  const alpha =
    delta <= 0
      ? 0
      : (renderTime - a.time) / delta;

  const interpolated = {};

  for (const id in a.players) {

    const p1 = a.players[id];
    const p2 = b.players[id];

    if (!p1 || !p2) continue;

    interpolated[id] = {
      x: p1.x + (p2.x - p1.x) * alpha,
      y: p1.y + (p2.y - p1.y) * alpha
    };
  }

  drawPlayers(interpolated);
}