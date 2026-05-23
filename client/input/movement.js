import { sendMove } from "../state/network.js";

// optional future use (WASD / joystick / prediction)
export function updateMovement(input) {
  if (!input) return;

  sendMove(input.x, input.y);
}