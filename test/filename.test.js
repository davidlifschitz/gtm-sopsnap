import { it, expect } from "vitest";
import { loadPage, download } from "./page.js";
const nameFor = async (title) => {
  const p = loadPage(); p.pick([p.file("a.png")]); p.$("title").value = title;
  return (await download(p)).name;
};
it("keeps non-latin letters", async () => {
  expect(await nameFor("Настройка VPN")).toBe("Настройка-VPN.html");
  expect(await nameFor("日本語ガイド")).toBe("日本語ガイド.html");
});
it("never produces a nameless file", async () => {
  expect(await nameFor("!!!")).toBe("sop.html");
  expect(await nameFor("")).toBe("SOP.html");
});
