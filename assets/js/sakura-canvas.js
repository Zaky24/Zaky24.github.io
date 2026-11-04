/**
 * Smooth HD-2D Pixel Soft-Crimson Sakura & Cursor Spark Trail Canvas
 * - Soft Red / Crimson Rose petals (#E05263 / #F28482)
 * - Interactive pixel spark trail following cursor movement
 * - Respects prefers-reduced-motion and adapts to Dark & Light modes
 */

export function initSakuraCanvas(canvasId = "sakura-canvas") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  const ctx = canvas.getContext("2d", { alpha: true });
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let animationFrameId = null;

  const pointer = {
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    lastX: -9999,
    lastY: -9999
  };

  const petals = [];
  const motes = [];
  const cursorSparks = [];

  function getPalette() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      return {
        horizonSilhouette: "rgba(200, 62, 78, 0.05)",
        windowPixel: "rgba(2, 132, 199, 0.14)",
        petalMain: "#C83E4E",
        petalSoft: "#E05263",
        petalCore: "#FECDD3",
        moteColor: "rgba(217, 119, 6, 0.25)",
        sparkPrimary: "#C83E4E",
        sparkSecondary: "#0284C7"
      };
    }
    return {
      horizonSilhouette: "rgba(15, 23, 42, 0.65)",
      windowPixel: "rgba(56, 189, 248, 0.18)",
      petalMain: "#E05263",
      petalSoft: "#F28482",
      petalCore: "#FECDD3",
      moteColor: "rgba(56, 189, 248, 0.26)",
      sparkPrimary: "#E05263",
      sparkSecondary: "#38BDF8"
    };
  }

  function createPetal(randomY = false) {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -20 - Math.random() * 60,
      unit: Math.random() > 0.4 ? 2.5 : 2,
      speedY: 0.4 + Math.random() * 0.65,
      speedX: -0.25 - Math.random() * 0.4,
      swayAmp: 0.35 + Math.random() * 0.65,
      swayFreq: 0.01 + Math.random() * 0.015,
      phase: Math.random() * Math.PI * 2,
      flip: Math.random() * Math.PI * 2,
      flipSpeed: 0.018 + Math.random() * 0.025,
      vx: 0,
      vy: 0,
      soft: Math.random() > 0.5
    };
  }

  function createMote() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: 2,
      speedY: -0.15 - Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2
    };
  }

  function spawnCursorSparks(x, y, vx, vy) {
    if (cursorSparks.length > 36) return;
    const count = Math.min(3, Math.ceil(Math.hypot(vx, vy) / 10));
    for (let i = 0; i < count; i++) {
      cursorSparks.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 1.4 - vx * 0.04,
        vy: (Math.random() - 0.5) * 1.4 + 0.3,
        size: Math.random() > 0.5 ? 3 : 2,
        life: 1.0,
        decay: 0.028 + Math.random() * 0.02,
        isCyan: Math.random() > 0.55
      });
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const petalCount = width < 768 ? 20 : 38;
    const moteCount = width < 768 ? 12 : 24;

    petals.length = 0;
    for (let i = 0; i < petalCount; i++) petals.push(createPetal(true));

    motes.length = 0;
    for (let i = 0; i < moteCount; i++) motes.push(createMote());

    if (reducedMotionQuery.matches) {
      renderFrame();
    }
  }

  function drawSubtlePixelBackdrop(palette) {
    const baseY = height;
    const stepW = 48;
    ctx.fillStyle = palette.horizonSilhouette;

    for (let x = 0; x < width; x += stepW) {
      const idx = Math.floor(x / stepW);
      const h = 28 + ((idx * 37) % 64);
      ctx.fillRect(x, baseY - h, stepW - 2, h);

      if (idx % 2 === 0 && h > 50) {
        ctx.fillStyle = palette.windowPixel;
        ctx.fillRect(x + 10, baseY - h + 10, 3, 3);
        ctx.fillRect(x + 20, baseY - h + 10, 3, 3);
        ctx.fillRect(x + 10, baseY - h + 20, 3, 3);
        ctx.fillStyle = palette.horizonSilhouette;
      }
    }
  }

  function drawFinePixelPetal(p, palette) {
    const u = p.unit;
    const px = Math.round(p.x);
    const py = Math.round(p.y);
    const scaleY = Math.max(0.4, Math.abs(Math.cos(p.flip)));

    ctx.save();
    ctx.translate(px, py);
    ctx.scale(1, scaleY);

    ctx.fillStyle = p.soft ? palette.petalSoft : palette.petalMain;
    ctx.fillRect(-u, -u, u * 2, u);
    ctx.fillRect(-u * 1.5, 0, u * 3, u);
    ctx.fillRect(-u, u, u * 2, u);

    ctx.fillStyle = palette.petalCore;
    ctx.fillRect(-u * 0.5, 0, u, u);

    ctx.restore();
  }

  function renderFrame() {
    ctx.clearRect(0, 0, width, height);
    const palette = getPalette();

    drawSubtlePixelBackdrop(palette);

    // Draw floating ambient pixel motes
    ctx.fillStyle = palette.moteColor;
    for (let i = 0; i < motes.length; i++) {
      const m = motes[i];
      m.phase += 0.02;
      m.y += m.speedY;
      if (m.y < -10) m.y = height + 10;
      const mx = Math.round(m.x + Math.sin(m.phase) * 8);
      const my = Math.round(m.y);
      ctx.fillRect(mx, my, m.size, m.size);
    }

    // Draw & update interactive cursor pixel sparks
    for (let i = cursorSparks.length - 1; i >= 0; i--) {
      const sp = cursorSparks[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.life -= sp.decay;
      if (sp.life <= 0) {
        cursorSparks.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = Math.max(0, sp.life);
      ctx.fillStyle = sp.isCyan ? palette.sparkSecondary : palette.sparkPrimary;
      ctx.fillRect(Math.round(sp.x), Math.round(sp.y), sp.size, sp.size);
    }
    ctx.globalAlpha = 1.0;

    // Update & draw fine HD-2D sakura petals
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.phase += p.swayFreq;
      p.flip += p.flipSpeed;

      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const distSq = dx * dx + dy * dy;
      const radius = 95;

      if (distSq < radius * radius && distSq > 1) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / radius) * 0.42;
        p.vx += (dx / dist) * force + pointer.vx * 0.015;
        p.vy += (dy / dist) * force + pointer.vy * 0.015;
      }

      p.vx *= 0.94;
      p.vy *= 0.94;

      p.x += p.speedX + Math.sin(p.phase) * p.swayAmp + p.vx;
      p.y += p.speedY + Math.cos(p.phase * 0.7) * 0.15 + p.vy;

      if (p.y > height + 20) {
        p.y = -16;
        p.x = Math.random() * (width + 80);
      }
      if (p.x < -25) p.x = width + 20;
      else if (p.x > width + 25) p.x = -20;

      drawFinePixelPetal(p, palette);
    }

    pointer.vx *= 0.85;
    pointer.vy *= 0.85;
  }

  function loop() {
    if (reducedMotionQuery.matches) return;
    renderFrame();
    animationFrameId = requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener(
    "pointermove",
    (e) => {
      if (reducedMotionQuery.matches) return;
      pointer.vx = e.clientX - (pointer.lastX === -9999 ? e.clientX : pointer.lastX);
      pointer.vy = e.clientY - (pointer.lastY === -9999 ? e.clientY : pointer.lastY);
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.lastX = e.clientX;
      pointer.lastY = e.clientY;

      if (Math.hypot(pointer.vx, pointer.vy) > 3) {
        spawnCursorSparks(e.clientX, e.clientY, pointer.vx, pointer.vy);
      }
    },
    { passive: true }
  );

  resize();
  if (!reducedMotionQuery.matches) {
    animationFrameId = requestAnimationFrame(loop);
  }

  return {
    refreshTheme: () => {
      renderFrame();
    }
  };
}
