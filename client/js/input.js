import { sendMove } from "./network.js";

const game = document.getElementById("game");

game.addEventListener("click", (e) => {
  const rect = game.getBoundingClientRect();

const x = (e.clientX - rect.left) * (game.width / rect.width);
const y = (e.clientY - rect.top) * (game.height / rect.height);

sendMove(x, y);
});