import { ui } from "./assets.js";

export function drawUI(ctx, canvas) {

  const toolbar = ui.toolbar;
  if (!toolbar || !toolbar.complete) return;

  const W = canvas.width;
  const H = canvas.height;

  // DO NOT scale using naturalWidth trick (this breaks UI often)
  const imgW = toolbar.naturalWidth;
  const imgH = toolbar.naturalHeight;

  const x = (W - imgW) / 2;

  // 🔥 MAIN FIX: simple anchor positioning
  const y = H - imgH + 110; // adjust this number

  ctx.drawImage(toolbar, x, y, imgW, imgH);
}