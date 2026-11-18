/**
 * Bandingkan jumlah frame di hero (atas) vs di portfolio (bawah).
 * Kalau keduanya mirip, berarti animasi memang jalan terus (bukan berhenti),
 * dan angka ~30fps murni batas headless browser tanpa GPU.
 */
const CDP = "http://127.0.0.1:9222";
const URL = process.argv[2] || "http://127.0.0.1:8765/";

const targets = await (await fetch(`${CDP}/json/list`)).json();
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
await new Promise((r) => ws.addEventListener("open", r));
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const msgId = ++id;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

await send("Page.enable");
await send("Runtime.enable");

async function measureAt(label, scrollTo) {
  await send("Page.navigate", { url: URL });
  await new Promise((r) => setTimeout(r, 2200));

  const res = await send("Runtime.evaluate", {
    expression: `new Promise((resolve) => {
      if (${JSON.stringify(scrollTo)}) {
        document.getElementById(${JSON.stringify(scrollTo)})?.scrollIntoView({ behavior: "instant", block: "start" });
      }
      const canvas = document.getElementById("sakura-canvas");
      const ctx = canvas.getContext("2d");
      let frames = 0;
      const original = ctx.clearRect.bind(ctx);
      ctx.clearRect = (...a) => { frames++; return original(...a); };
      setTimeout(() => {
        ctx.clearRect = original;
        resolve({ frames, scrollY: Math.round(window.scrollY) });
      }, 1200);
    })`,
    awaitPromise: true,
    returnByValue: true
  });

  const v = res.result?.result?.value || {};
  console.log(`${label.padEnd(22)} frames=${v.frames}  scrollY=${v.scrollY}`);
  return v.frames;
}

const hero = await measureAt("Hero (atas)", null);
const portfolio = await measureAt("Portfolio (bawah)", "portfolio");
const contact = await measureAt("Contact (paling bawah)", "contact");

console.log("");
if (portfolio > 0 && contact > 0) {
  console.log(`Animasi tetap berjalan di semua posisi scroll (rasio bawah/atas: ${(portfolio / hero).toFixed(2)})`);
} else {
  console.log("MASIH ADA POSISI YANG BERHENTI — perlu diperbaiki");
}
ws.close();
process.exit(0);