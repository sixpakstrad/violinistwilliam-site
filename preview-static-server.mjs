import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const outRoot = join(projectRoot, "out");
const port = Number(process.env.PORT || 3000);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

function resolveFilePath(requestPath) {
  const cleanPath = decodeURIComponent(requestPath.split("?")[0]);
  const safePath = normalize(cleanPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(outRoot, safePath);

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  if (!existsSync(filePath) && !extname(filePath)) {
    filePath = join(outRoot, safePath, "index.html");
  }

  if (!existsSync(filePath)) {
    filePath = join(outRoot, "404.html");
  }

  return filePath;
}

const server = createServer((request, response) => {
  const filePath = resolveFilePath(request.url || "/");
  const ext = extname(filePath);

  if (!existsSync(filePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("File not found.");
    return;
  }

  response.writeHead(filePath.endsWith("404.html") ? 404 : 200, {
    "Content-Type": contentTypes[ext] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  createReadStream(filePath).pipe(response);
});

server.on("error", (error) => {
  console.error("");
  console.error("The preview server could not start.");
  console.error(error.message);
  console.error("");
  console.error("If another preview window is open, close it and try again.");
  process.exit(1);
});

server.listen(port, "127.0.0.1", () => {
  const url = `http://localhost:${port}`;
  console.log(`Preview is ready: ${url}`);
  spawn("open", [url], { stdio: "ignore", detached: true }).unref();
});
