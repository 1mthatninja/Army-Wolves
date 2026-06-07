import { ui } from "./assets.js";
import { layoutUI } from "../ui/layout.js";

let cachedLayout = null;
let lastCanvasW = 0;
let lastCanvasH = 0;

export function drawUI(ctx, canvas) {

  // ----------------------
  // ONLY RELAYOUT WHEN SIZE CHANGES
  // ----------------------
  const resized =
    !cachedLayout ||
    canvas.width !== lastCanvasW ||
    canvas.height !== lastCanvasH;

  if (resized) {
    cachedLayout = layoutUI(canvas);
    lastCanvasW = canvas.width;
    lastCanvasH = canvas.height;
  }

  const layout = cachedLayout;

  // ----------------------
  // HUD DEBUG BORDER
  // ----------------------
  ctx.strokeStyle = "red";
  ctx.strokeRect(
    layout.hud.x,
    layout.hud.y,
    layout.hud.width,
    layout.hud.height
  );

  // ----------------------
  // TOOLBAR BACKGROUND
  // ----------------------
  ctx.drawImage(
    ui.toolbar,
    layout.toolbar.x,
    layout.toolbar.y,
    layout.toolbar.width,
    layout.toolbar.height
  );

  // ----------------------
  // TOOLBAR BUTTONS
  // ----------------------
  for (const button of layout.toolbarButtons) {

    const img = ui[button.id];

    if (!img) continue;

    ctx.drawImage(
      img,
      button.x,
      button.y,
      button.w,
      button.h
    );
  }

  // ----------------------
  // MAP BUTTON
  // ----------------------
  ctx.drawImage(
    ui.map,
    layout.mapButton.x,
    layout.mapButton.y,
    layout.mapButton.w,
    layout.mapButton.h
  );
}