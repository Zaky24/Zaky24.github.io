/**
 * Uji cepat di browser headless (Edge) lewat Chrome DevTools Protocol.
 * Jalankan: node scripts/smoke-test.mjs [url]
 */
const URL = process.argv[2] || "http://127.0.0.1:8765/";
const CDP = "http://127.0.0.1:9222";

const targets = await (await fetch(`${CDP}/json/list`)).json();
const page = targets.find((t) => t.type === "page" && t.url.startsWith(process.argv[3] || ""));
if (!page) {
  console.error("Target page tidak ditemukan:", targets.map((t) => t.url));
  process.exit(1);
}

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const logs = [];

await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve);
  ws.addEventListener("error", reject);
});

ws.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
    return;
  }
  if (msg.method === "Runtime.consoleAPICalled") {
    logs.push(`[${msg.params.type}] ${msg.params.args.map((a) => a.value ?? a.description).join(" ")}`);
  }
  if (msg.method === "Runtime.exceptionThrown") {
    logs.push(`[exception] ${msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text}`);
  }
  if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") {
    logs.push(`[network] ${msg.params.entry.text} ${msg.params.entry.url || ""}`);
  }
});

const send = (method, params = {}) =>
  new Promise((resolve) => {
    const msgId = ++id;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

await send("Runtime.enable");
await send("Log.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 3,
  mobile: true
});
await send("Page.navigate", { url: URL });
await new Promise((r) => setTimeout(r, 3500));

const expression = `(() => {
  const $ = (s) => document.querySelector(s);
  const cards = (grid) => document.querySelectorAll(grid + " > article");
  const visible = (grid) =>
    [...document.querySelectorAll(grid + " > article")].filter((c) => !c.classList.contains("showcase-card-hidden")).length;
  const pager = (nav) => document.querySelectorAll(nav + " button").length;

  return {
    noJsClass: document.documentElement.classList.contains("no-js"),
    tailwindApplied: getComputedStyle($(".btn-primary-modern")).borderRadius,
    projects: { total: cards("#projects-grid").length, visible: visible("#projects-grid"), buttons: pager("#projects-pagination") },
    certificates: { total: cards("#certificates-grid").length, visible: visible("#certificates-grid"), buttons: pager("#certificates-pagination") },
    tech: document.querySelectorAll("#techstack-grid > div").length,
    dataLoaded: typeof window.portfolioData !== "undefined"
  };
})()`;

const result = await send("Runtime.evaluate", { expression, returnByValue: true });
console.log("=== Pemeriksaan DOM ===");
console.log(JSON.stringify(result.result?.result?.value ?? result.result, null, 2));

// Klik halaman 2 sertifikat
await send("Runtime.evaluate", {
  expression: `document.querySelector('#certificates-pagination button[data-page="2"]').click()`
});
await new Promise((r) => setTimeout(r, 600));
const afterClick = await send("Runtime.evaluate", {
  expression: `(() => ({
    visible: [...document.querySelectorAll("#certificates-grid > article")].filter(c=>!c.classList.contains("showcase-card-hidden")).length,
    hash: location.hash,
    status: document.querySelector("[data-pagination-status]")?.textContent.trim()
  }))()`,
  returnByValue: true
});
console.log("=== Setelah klik halaman 2 (sertifikat) ===");
console.log(JSON.stringify(afterClick.result?.result?.value, null, 2));

// Klik tombol Details proyek -> modal harus terbuka
await send("Runtime.evaluate", {
  expression: `document.querySelector(".project-detail-btn").click()`
});
await new Promise((r) => setTimeout(r, 800));
const modal = await send("Runtime.evaluate", {
  expression: `(() => ({
    open: !document.getElementById("project-detail-modal").classList.contains("hidden"),
    title: document.getElementById("proj-modal-title").textContent.trim(),
    storyLength: document.getElementById("proj-modal-story").textContent.trim().length
  }))()`,
  returnByValue: true
});
console.log("=== Modal detail proyek ===");
console.log(JSON.stringify(modal.result?.result?.value, null, 2));

console.log("=== Console / error jaringan ===");
console.log(logs.length ? logs.join("\n") : "(bersih)");

ws.close();
process.exit(0);