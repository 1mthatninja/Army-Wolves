import { uiRegistry } from "./registry.js";

export function layoutUI(canvas) {

  // ----------------------
  // HUD
  // ----------------------
  const hudHeight = 140;

  const hud = {
    x: 0,
    y: canvas.height - hudHeight,
    width: canvas.width,
    height: hudHeight
  };

  // ----------------------
  // TOOLBAR
  // ----------------------
  const toolbar = {
    width: 750 * 1.25,
    height: 225 * 1.25
  };

  toolbar.x = hud.width / 2 - toolbar.width / 2;
  toolbar.y = hud.y - 40;

  // ----------------------
  // TOOLBAR BUTTONS
  // ----------------------
  const toolbarButtons = uiRegistry.toolbarButtons;

  console.log("toolbarButtons:", toolbarButtons.length);

  const buttonWidth = 60;
  const buttonHeight = 60;

  const gap = 20;

  // ✅ CENTER THE BUTTON GROUP PROPERLY (no magic 465)
  const totalWidth =
    toolbarButtons.length * buttonWidth +
    (toolbarButtons.length - 1) * gap;

  let x = toolbar.x + (toolbar.width - totalWidth) / 2;
  const y = toolbar.y + 105;

  toolbarButtons.forEach((button, i) => {
    button.x = x;
    button.y = y;
    button.w = buttonWidth;
    button.h = buttonHeight;

    x += buttonWidth + gap;
  });

  // ----------------------
  // MAP BUTTON
  // ----------------------
  const mapButton = uiRegistry.map;

  mapButton.x = hud.width - 350;
  mapButton.y = hud.y - 10;
  mapButton.w = 100 * 1.2;
  mapButton.h = 120 * 1.2;

  // ----------------------
  // RETURN LAYOUT
  // ----------------------
  return {
    hud,
    toolbar,
    toolbarButtons,
    mapButton
  };
}