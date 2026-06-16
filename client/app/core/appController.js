import { ScreenManager } from "./screenManager.js";

import { LoginScreen } from "../screens/loginScreen.js";
import { ServerSelectScreen } from "../screens/serverSelectScreen.js";
import { LoadingScreen } from "../screens/loadingScrean.js";
import { GameScreen } from "../screens/gameScreen.js";

import { AppRenderer } from "../appRender/appRenderer.js";
import { GameClient } from "../../game/engine/gameClient.js";

export class AppController {
  constructor() {
    this.screenManager = new ScreenManager();

    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");

    this.appRenderer = new AppRenderer(this.ctx);

    this.gameClient = null;

    this.lastTime = 0;

    this._bindInput();
  }

  start() {
    console.log("[App] Starting...");
    this.showLogin();
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(t) {
    const dt = t - this.lastTime;
    this.lastTime = t;

    const screen = this.screenManager.current;

    // 1. UPDATE
    this.screenManager.update(dt);
    this.gameClient?.update?.(dt);

    // 2. CLEAR
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 3. RENDER (choose pipeline)
    if (screen?.type === "game") {
      this.gameClient?.render(this.ctx);
    } else {
      this.appRenderer.render(screen);
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  // ---------------- screens ----------------

  showLogin() {
    this.screenManager.set(
      new LoginScreen({
        onLoginSuccess: () => this.showServerSelect()
      }),
      "LOGIN"
    );
  }

  showServerSelect() {
    this.screenManager.set(
      new ServerSelectScreen({
        onJoin: () => this.showLoading()
      }),
      "SERVER_SELECT"
    );
  }

  showLoading() {
    this.screenManager.set(
      new LoadingScreen(),
      "LOADING"
    );

    setTimeout(() => {
      this.showGame();
    }, 1000);
  }

  showGame() {
    this.screenManager.set(
      new GameScreen(),
      "GAME"
    );

    // IMPORTANT: game is its own renderer system
    this.gameClient = new GameClient();
    this.gameClient.start();
  }

  // ---------------- input ----------------

  _bindInput() {
    window.addEventListener("keydown", (e) => {
      this.screenManager.keyDown(e);
    });

    window.addEventListener("mousedown", (e) => {
      const rect = this.canvas.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.screenManager.pointerDown(x, y);
    });
  }
}