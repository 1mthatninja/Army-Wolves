// engine/core/GameClient.js

import { createSocket } from "../net/socket.js";
import { handlePacket } from "../net/protocol.js";

import { worldState } from "../state/worldState.js";
import { stateBuffer } from "../state/stateBuffer.js";

import { startRenderer } from "../render/renderer.js";
import { startInput } from "../input/mouse.js";

import { session } from "../../app/core/session.js";

export class GameClient {
  constructor() {
    this.socket = null;
    this.running = false;

    this.lastUpdateTime = 0;
    this.tickRate = 1000 / 60; // 60 FPS logic tick
  }

  // --------------------------------------------------
  // START GAME CLIENT
  // --------------------------------------------------
  async start() {
    console.log("[GameClient] Starting...");

    this.running = true;

    this.initWorld();
    this.initInput();
    this.initRender();
    this.connect();
  }

  // --------------------------------------------------
  // WORLD INIT
  // --------------------------------------------------
  initWorld() {
    worldState.players = {};
    worldState.room = session.server || "lobby";

    console.log("[GameClient] World initialized:", worldState.room);
  }

  // --------------------------------------------------
  // INPUT SYSTEM
  // --------------------------------------------------
  initInput() {
    startInput({
      onMove: (x, y) => {
        this.sendMove(x, y);
      }
    });
  }

  // --------------------------------------------------
  // RENDER SYSTEM
  // --------------------------------------------------
  initRender() {
    startRenderer({
      getState: () => worldState
    });
  }

  // --------------------------------------------------
  // WEBSOCKET CONNECTION
  // --------------------------------------------------
  connect() {
    this.socket = createSocket();

    this.socket.onopen = () => {
      console.log("[GameClient] WS connected");

      this.authenticate();
    };

    this.socket.onmessage = (event) => {
      const packet = JSON.parse(event.data);
      this.handlePacket(packet);
    };

    this.socket.onclose = () => {
      console.warn("[GameClient] WS disconnected");
      this.running = false;
    };
  }

  // --------------------------------------------------
  // AUTH HANDSHAKE
  // --------------------------------------------------
  authenticate() {
    this.socket.send(
      JSON.stringify({
        type: "auth",
        token: session.token,
        server: session.server
      })
    );
  }

  // --------------------------------------------------
  // PACKET HANDLER
  // --------------------------------------------------
  handlePacket(packet) {
    handlePacket(packet, {
      onInit: (data) => {
        console.log("[GameClient] INIT received");

        session.playerId = data.id;

        worldState.players = data.players || {};
        worldState.room = data.room;

        this.startLoop();
      },

      onState: (data) => {
        stateBuffer.push(data);
      },

      onPlayerJoin: (player) => {
        worldState.players[player.id] = player;
      },

      onPlayerLeave: (id) => {
        delete worldState.players[id];
      },

      onChat: (msg) => {
        console.log("[CHAT]", msg);
      }
    });
  }

  // --------------------------------------------------
  // GAME LOOP
  // --------------------------------------------------
  startLoop() {
    const loop = (time) => {
      if (!this.running) return;

      const delta = time - this.lastUpdateTime;

      if (delta >= this.tickRate) {
        this.update(delta);
        this.lastUpdateTime = time;
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  // --------------------------------------------------
  // UPDATE TICK
  // --------------------------------------------------
  update(delta) {
    this.interpolate();
    this.updateSystems(delta);
  }

  // --------------------------------------------------
  // INTERPOLATION (smooth movement)
  // --------------------------------------------------
  interpolate() {
    if (stateBuffer.length < 2) return;

    const latest = stateBuffer[stateBuffer.length - 1];

    worldState.players = latest.players;
  }

  // --------------------------------------------------
  // GAME SYSTEMS
  // --------------------------------------------------
  updateSystems(delta) {
    // future:
    // - camera update
    // - animations
    // - emotes
    // - particles
  }

  // --------------------------------------------------
  // SEND MOVE
  // --------------------------------------------------
  sendMove(x, y) {
    if (!this.socket || this.socket.readyState !== 1) return;

    this.socket.send(
      JSON.stringify({
        type: "move",
        x,
        y
      })
    );
  }

  // --------------------------------------------------
  // STOP CLIENT
  // --------------------------------------------------
  stop() {
    this.running = false;

    if (this.socket) {
      this.socket.close();
    }
  }
}