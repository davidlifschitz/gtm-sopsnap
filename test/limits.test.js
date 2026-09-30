import { it, expect } from "vitest";
import { loadPage } from "./page.js";
it("warns when more than 12 files are dropped", () => {
  const p = loadPage();
  p.pick(Array.from({ length: 15 }, (_, i) => p.file(`s${i}.png`)));
  expect(p.$("list").querySelectorAll(".step").length).toBe(12);
  expect(p.$("warn").textContent).toMatch(/12/);
  expect(p.$("warn").textContent).toMatch(/3/);
});
it("names every skipped file", () => {
  const p = loadPage();
  const big = p.file("big.png"); Object.defineProperty(big, "size", { value: 9e6 });
  const big2 = p.file("big2.png"); Object.defineProperty(big2, "size", { value: 9e6 });
  p.pick([big, p.file("ok.png"), big2, p.file("doc.pdf", "application/pdf")]);
  const w = p.$("warn").textContent;
  expect(w).toContain("big.png"); expect(w).toContain("big2.png"); expect(w).toContain("doc.pdf");
});
it("stays quiet when all files fit", () => {
  const p = loadPage();
  p.pick([p.file("a.png")]);
  expect(p.$("warn").textContent).toBe("");
});
