import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const source = join(root, "out");
const target = join(root, "file-preview-current");

const pages = new Set([
  "about",
  "admin",
  "contact",
  "groups",
  "music",
  "rates",
  "requests",
]);

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function prefixFor(filePath) {
  const rel = relative(target, dirname(filePath));
  if (!rel) {
    return "./";
  }

  return rel
    .split(sep)
    .filter(Boolean)
    .map(() => "../")
    .join("");
}

function rewriteUrl(value, prefix) {
  if (!value.startsWith("/")) {
    return value;
  }

  if (value === "/") {
    return `${prefix}index.html`;
  }

  if (value.startsWith("/#")) {
    return `${prefix}index.html${value.slice(1)}`;
  }

  const withoutSlash = value.slice(1);
  const [pathPart, hashPart = ""] = withoutSlash.split("#");
  const normalized = pathPart.replace(/\/$/, "");

  if (normalized.startsWith("_next/") || normalized.startsWith("media/")) {
    return `${prefix}${withoutSlash}`;
  }

  if (pages.has(normalized)) {
    return `${prefix}${normalized}/index.html${hashPart ? `#${hashPart}` : ""}`;
  }

  return `${prefix}${withoutSlash}`;
}

if (!existsSync(source)) {
  throw new Error("Build output folder does not exist. Run the website build first.");
}

if (existsSync(target)) {
  rmSync(target, { recursive: true, force: true });
}

mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });

for (const file of walk(target)) {
  if (!file.endsWith(".html")) {
    continue;
  }

  const prefix = prefixFor(file);
  let html = readFileSync(file, "utf8");

  html = html.replace(/\b(href|src|poster)="(\/[^"]*)"/g, (_, attr, value) => {
    return `${attr}="${rewriteUrl(value, prefix)}"`;
  });

  writeFileSync(file, html);
}

writeFileSync(
  join(root, "OPEN-WEBSITE-PREVIEW.html"),
  `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=./file-preview-current/index.html" />
    <title>Open Website Preview</title>
  </head>
  <body>
    <p><a href="./file-preview-current/index.html">Open the website preview</a></p>
  </body>
</html>
`,
);
