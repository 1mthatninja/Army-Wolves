const socket = new WebSocket("ws://localhost:3000");

export let playerId = null;
export const stateBuffer = [];

export let exits = [];
export let currentRoom = "lobby";

// ----------------------
// CONNECT
// ----------------------
socket.onopen = () => {
  console.log("Connected to server");
};

// ----------------------
// RECEIVE MESSAGES
// ----------------------
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  console.log("STATE RECEIVED:", data);

  // init
  if (data.type === "init") {
    playerId = data.id;
    return;
  }

  // state
  if (data.type === "state") {
    stateBuffer.push({
      time: data.time,
      players: structuredClone(data.players)
    });

    if (stateBuffer.length > 10) {
      stateBuffer.shift();
    }

    currentRoom = data.room;
    exits = data.exits || [];
  }
};

// ----------------------
// SAFE SEND MOVE
// ----------------------
export function sendMove(x, y) {
  if (!socket || socket.readyState !== 1) return;

  socket.send(JSON.stringify({
    type: "move",
    x,
    y
  }));
}