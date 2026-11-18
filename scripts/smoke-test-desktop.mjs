/** Verifikasi jumlah kartu per halaman di lebar desktop. */
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
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: URL });
await new Promise((r) => setTimeout(r, 2400));

const res = await send("Runtime.evaluate", {
  expression: `(() => {
    const vis = (s) => [...document.querySelectorAll(s)].filter(c => !c.classList.contains("showcase-card-hidden")).length;
    return {
      certificatesPerPage: vis("#certificates-grid > article"),
      certificatePages: document.querySelectorAll("#certificates-pagination button[data-page]").length - 2,
      projectsPerPage: vis("#projects-grid > article"),
      projectsPagerHidden: document.getElementById("projects-pagination").hidden
    };
  })()`,
  returnByValue: true
});
console.log("=== Desktop 1440px ===");
console.log(JSON.stringify(res.result?.result?.value, null, 2));
ws.close();
process.exit(0);