const socket = new WebSocket("ws://localhost:3000");

export let playerId = null;
export let currentRoom = "lobby";
export let exits = [];

import { pushState } from "./stateBuffer.js";

// ----------------------
// CONNECT
// ----------------------
socket.onopen = () => {
  console.log("Connected to server");
};

// ----------------------
// RECEIVE
// ----------------------
socket.onmessage = (event) => {

  const data = JSON.parse(event.data);

  if (data.type === "init") {
    playerId = data.id;
    return;
  }

  if (data.type === "state") {

    pushState({
      time: data.time,
      players: data.players || {}
    });

    currentRoom = data.room || currentRoom;

    exits = Array.isArray(data.exits) ? data.exits : [];
  }
};

// ----------------------
// SEND MOVE
// ----------------------
export function sendMove(x, y) {

  if (socket.readyState !== WebSocket.OPEN) return;

  socket.send(JSON.stringify({
    type: "move",
    x,
    y
  }));
}