export class AppRenderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  render(screen) {
    if (!screen) return;

    this.drawBackground();

    switch (screen.type) {
      case "login":
        this.renderLogin(screen);
        break;

      case "loading":
        this.renderLoading(screen);
        break;

      case "serverSelect":
        this.renderServerSelect(screen);
        break;
    }
  }

  drawBackground() {
    const { width, height } = this.ctx.canvas;

    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, width, height);
  }

  renderLogin(screen) {
    this.drawTitle("Army Wolves");

    this.drawInput(screen.username, 350, 220);
    this.drawInput(screen.password, 350, 280);

    this.drawButton("Login", 350, 350);
  }

  drawTitle(text) {
    this.ctx.fillStyle = "white";
    this.ctx.font = "40px Arial";
    this.ctx.fillText(text, 360, 140);
  }

  drawInput(value, x, y) {
    this.ctx.strokeStyle = "white";
    this.ctx.strokeRect(x, y, 300, 40);

    this.ctx.fillText(value, x + 10, y + 25);
  }

  drawButton(text, x, y) {
    this.ctx.strokeRect(x, y, 300, 50);
    this.ctx.fillText(text, x + 120, y + 32);
  }
}