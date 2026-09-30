import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
export function loadPage() {
  const dom = new JSDOM(html, { runScripts: "dangerously", pretendToBeVisual: true });
  const { window } = dom;
  const $ = (id) => window.document.getElementById(id);
  const file = (name, type = "image/png", size = 10) =>
    Object.assign(new window.File(["x".repeat(size)], name, { type }));
  const pick = (files) => {
    Object.defineProperty($("files"), "files", { value: files, configurable: true });
    $("files").dispatchEvent(new window.Event("change"));
  };
  return { dom, window, $, file, pick };
}
export async function download(p) {
  let blob;
  p.window.URL.createObjectURL = (b) => ((blob = b), "blob:t");
  p.window.URL.revokeObjectURL = () => {};
  let name;
  p.window.HTMLAnchorElement.prototype.click = function () { name = this.download; };
  await p.$("run").onclick();
  const text = await new Promise((r) => { const fr = new p.window.FileReader(); fr.onload = () => r(fr.result); fr.readAsText(blob); });
  return { name, text };
}
