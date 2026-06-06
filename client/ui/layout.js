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
    width: 750*1.25,
    height: 225*1.25
  };

  toolbar.x =
    hud.x +
    hud.width / 2 -
    toolbar.width / 2;

  toolbar.y =
    hud.y -40;

// ----------------------
// TOOLBAR BUTTONS
// ----------------------
const toolbarButtons =
  uiRegistry.toolbarButtons;

const buttonWidth = 60;
const buttonHeight = 60;

const leftPadding = 465;

const normalGap = -130;
const chatGap = 120;

let x =
  toolbar.x + leftPadding;

toolbarButtons.forEach((button, i) => {

  button.x = x;

  button.y =
    toolbar.y + 105;

  button.w = buttonWidth;
  button.h = buttonHeight;

  x += buttonWidth;

  if (i === 3) {
    x += chatGap;
  } else {
    x += normalGap;
  }
});
  // ----------------------
  // MAP BUTTON
  // ----------------------
  const mapButton =
    uiRegistry.map;

  mapButton.x =
    hud.width - 350;

  mapButton.y =
    hud.y - 10;

  mapButton.w = 100*1.2;
  mapButton.h = 120*1.2;

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