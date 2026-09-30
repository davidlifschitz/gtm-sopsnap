import { it, expect } from "vitest";
import { loadPage } from "./page.js";
it("file input is keyboard reachable and labelled", () => {
  const { $, window } = loadPage();
  expect(window.getComputedStyle($("files")).display).not.toBe("none");
  expect($("files").tabIndex).toBeGreaterThanOrEqual(0);
  expect($("files").labels.length).toBeGreaterThan(0);
});
it("title field has a label", () => {
  const { $ } = loadPage();
  expect([...$("title").labels].map((l) => l.textContent).join(" ")).toMatch(/title/i);
});
it("warnings are announced", () => {
  const { $ } = loadPage();
  expect($("warn").getAttribute("role")).toBe("status");
});
