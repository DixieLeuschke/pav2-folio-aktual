import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";

const serverEntry = join(process.cwd(), ".output/server/index.mjs");
const publicDir = join(process.cwd(), ".output/public");
const sourceDataFile = join(process.cwd(), "src/data/portfolio.ts");
const port = Number(process.env.PAGES_EXPORT_PORT ?? 4310);

const normalizeBasePath = (value = "/") => {
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
};

const basePath = normalizeBasePath(process.env.VITE_BASE_PATH);
const requestBase = `http://127.0.0.1:${port}${basePath === "/" ? "" : basePath}`;

const getProjectSlugs = async () => {
  const source = await readFile(sourceDataFile, "utf8");
  return [...source.matchAll(/project\(\s*"([^"]+)"/g)].map((match) => match[1]);
};

const toOutputFile = (route) =>
  route === "/" ? join(publicDir, "index.html") : join(publicDir, route.slice(1), "index.html");

const fetchWithRetry = async (url) => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request failed (${response.status}) for ${url}`);
      }
      return response.text();
    } catch (error) {
      if (attempt === 39) throw error;
      await delay(250);
    }
  }
  throw new Error(`Failed to fetch ${url}`);
};

if (!existsSync(serverEntry)) {
  throw new Error("Missing .output/server/index.mjs. Run npm run build before export.");
}

const server = spawn("node", [serverEntry], {
  env: { ...process.env, HOST: "127.0.0.1", PORT: String(port) },
  stdio: "inherit",
});

try {
  const slugs = await getProjectSlugs();
  const routes = ["/", "/projekty", ...slugs.map((slug) => `/projekty/${slug}`)];

  const rendered = new Map();
  for (const route of routes) {
    const url = `${requestBase}${route === "/" ? "" : route}`;
    rendered.set(route, await fetchWithRetry(url));
  }

  for (const [route, html] of rendered.entries()) {
    const target = toOutputFile(route);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html, "utf8");
  }

  await writeFile(join(publicDir, "404.html"), rendered.get("/") ?? "", "utf8");
} finally {
  server.kill("SIGTERM");
}
