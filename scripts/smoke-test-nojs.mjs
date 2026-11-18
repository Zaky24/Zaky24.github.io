/** Uji dengan JavaScript dimatikan: semua kartu harus tetap terlihat. */
const CDP = "http://127.0.0.1:9222";
const URL = process.argv[2] || "http://127.0.0.1:8765/";

const targets = await (await fetch(`${CDP}/json/list`)).json();
const page = targets.find((t) => t.type === "page");
if (!page) throw new Error("Target page tidak ditemukan");

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
await new Promise((res) => ws.addEventListener("open", res));
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

await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setScriptExecutionDisabled", { value: true });
await send("Page.navigate", { url: URL + "?nojs=1" });
await new Promise((r) => setTimeout(r, 2500));

const res = await send("Runtime.evaluate", {
  expression: `(() => {
    const count = (s) => document.querySelectorAll(s).length;
    const vis = (s) => [...document.querySelectorAll(s)].filter(el => getComputedStyle(el).display !== "none").length;
    return {
      projectsInDom: count("#projects-grid > article"),
      projectsVisible: vis("#projects-grid > article"),
      certificatesInDom: count("#certificates-grid > article"),
      certificatesVisible: vis("#certificates-grid > article"),
      techInDom: count("#techstack-grid > div"),
      paginationVisible: vis("#projects-pagination, #certificates-pagination"),
      firstProjectTitle: document.querySelector("#projects-grid h3")?.textContent.trim(),
      sampleCert: document.querySelectorAll("#certificates-grid h3")[8]?.textContent.trim()
    };
  })()`,
  returnByValue: true
});
console.log("=== Tanpa JavaScript ===");
console.log(JSON.stringify(res.result?.result?.value, null, 2));
await send("Emulation.setScriptExecutionDisabled", { value: false });
ws.close();
process.exit(0);