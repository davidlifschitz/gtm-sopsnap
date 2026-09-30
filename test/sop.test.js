import { it, expect } from "vitest";
import { loadPage, download } from "./page.js";
it("lists steps with titles from filenames", () => {
  const p = loadPage();
  p.pick([p.file("01_open-settings.png"), p.file("notes.txt", "text/plain")]);
  expect(p.$("list").querySelectorAll(".step").length).toBe(1);
  expect(p.$("list").textContent).toContain("01 open settings");
  expect(p.$("run").disabled).toBe(false);
});
it("downloads one html file with embedded images", async () => {
  const p = loadPage();
  p.pick([p.file("a.png"), p.file("b.png")]);
  p.$("title").value = "Reset password";
  const { name, text } = await download(p);
  expect(name).toBe("Reset-password.html");
  expect(text).toContain("<h1>Reset password</h1>");
  expect((text.match(/src="data:image\/png/g) || []).length).toBe(2);
});
it("does not render filenames as HTML", () => {
  const p = loadPage();
  p.pick([p.file("<img src=x onerror=alert(1)>.png")]);
  expect(p.$("list").querySelector("img")).toBeNull();
});
