import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const base = process.env.PORTFOLIO_QA_URL || "http://127.0.0.1:4173";
const files = (await readdir("wybrane")).filter((name) => name.endsWith(".html"));
const paths = new Set([
  "/",
  "/projekty",
  "/work/embed.css",
  "/favicon.svg",
  "/og-john-pavulon.png",
]);
const external = new Set();
const sha = (body) => createHash("sha256").update(body).digest("hex");
for (const name of files) {
  const source = await readFile(`wybrane/${name}`);
  const copy = await readFile(`public/work/${name}`);
  if (sha(source) !== sha(copy)) throw new Error(`Zmieniono oryginał: ${name}`);
  paths.add(`/work/${name}`);
  paths.add(`/work/covers/${name.replace(/\.html$/, ".png")}`);
  for (const match of source.toString().matchAll(/(?:href|src)\s*=\s*["']([^"']+)["']/gi)) {
    const value = match[1];
    if (/^(#|data:|mailto:|tel:|javascript:)/i.test(value)) continue;
    const url = new URL(value, `${base}/work/${name}`);
    if (url.origin === base) paths.add(url.pathname);
    else external.add(url.origin);
  }
}
const data = await readFile("src/data/portfolio.ts", "utf8");
for (const match of data.matchAll(/project\(\s*"([^"]+)"/g)) paths.add(`/projekty/${match[1]}`);
const results = [];
for (const path of paths) {
  const response = await fetch(base + path, { method: "HEAD" });
  results.push({ path, status: response.status });
}
const unknown = await fetch(`${base}/projekty/nieznany-projekt`, { method: "HEAD" });
const report = {
  originalFiles: files.length,
  originalsUnchanged: true,
  unknownSlug: unknown.status,
  results,
  externalOrigins: [...external],
};
await mkdir("qa", { recursive: true });
await writeFile("qa/work-links.json", JSON.stringify(report, null, 2) + "\n");
console.log(
  JSON.stringify({
    files: files.length,
    checkedURLs: results.length,
    failed: results.filter((item) => item.status !== 200),
    unknownSlug: unknown.status,
  }),
);
if (files.length !== 17 || unknown.status !== 404 || results.some((item) => item.status !== 200))
  process.exitCode = 1;
