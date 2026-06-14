// engine/net/socket.js

import { S2C, C2S } from "./protocol.js";

export class SocketClient {
  constructor() {
    this.ws = null;
    this.handlers = {};
  }

  // -----------------------------------------
  // CONNECT
  // -----------------------------------------
  connect(url = "ws://localhost:3000") {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log("[Socket] connected");
      this.emit("open");
    };

    this.ws.onmessage = (event) => {
      const packet = JSON.parse(event.data);
      this.handlePacket(packet);
    };

    this.ws.onclose = () => {
      console.log("[Socket] disconnected");
      this.emit("close");
    };
  }

  // -----------------------------------------
  // SEND PACKET
  // -----------------------------------------
  send(type, data = {}) {
    if (!this.ws || this.ws.readyState !== 1) return;

    this.ws.send(
      JSON.stringify({
        type,
        ...data
      })
    );
  }

  // -----------------------------------------
  // RECEIVE PACKET
  // -----------------------------------------
  handlePacket(packet) {
    const handler = this.handlers[packet.type];

    if (handler) {
      handler(packet);
    } else {
      console.warn("[Socket] Unknown packet:", packet.type);
    }
  }

  // -----------------------------------------
  // EVENT SYSTEM
  // -----------------------------------------
  on(type, callback) {
    this.handlers[type] = callback;
  }

  emit(event, data) {
    const handler = this.handlers[event];
    if (handler) handler(data);
  }

  // -----------------------------------------
  // CLOSE
  // -----------------------------------------
  disconnect() {
    if (this.ws) this.ws.close();
  }
}