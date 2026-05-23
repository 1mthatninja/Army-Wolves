export function drawBackground(ctx, room, backgrounds) {

  const bg = backgrounds[room];

  const canvas = ctx.canvas;

  const W = canvas.width;
  const H = canvas.height;

  if (!bg || !bg.complete) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, W, H);
    return;
  }

  // FULL COVER (no zoom illusion mismatch)
  ctx.drawImage(bg, 0, 0, W, H);
}