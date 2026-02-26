import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const inputArg = process.argv[2] || "design-tokens/source/design-tokens-main/tokens";
const outputArg = process.argv[3] || "public/escapp-design-tokens.css";

const inputPath = path.resolve(projectRoot, inputArg);
const outputPath = path.resolve(projectRoot, outputArg);

function isPrimitive(value) {
  return value === null || ["string", "number", "boolean"].includes(typeof value);
}

async function listJsonFilesRecursively(dirPath, out = []) {
  const items = await readdir(dirPath, { withFileTypes: true });
  for (const item of items) {
    const absolute = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      await listJsonFilesRecursively(absolute, out);
      continue;
    }
    if (item.isFile() && absolute.toLowerCase().endsWith(".json")) {
      out.push(absolute);
    }
  }
  return out;
}

function flattenGenericObject(node, keyPath = [], out = []) {
  if (isPrimitive(node)) {
    if (keyPath.length > 0) {
      out.push({ name: keyPath.join("."), value: String(node) });
    }
    return out;
  }

  if (Array.isArray(node)) {
    for (const item of node) {
      flattenGenericObject(item, keyPath, out);
    }
    return out;
  }

  for (const [key, value] of Object.entries(node || {})) {
    flattenGenericObject(value, [...keyPath, key], out);
  }
  return out;
}

function extractTokenStudioValues(node, keyPath = [], out = []) {
  if (isPrimitive(node)) {
    return out;
  }

  if (Array.isArray(node)) {
    for (const item of node) {
      extractTokenStudioValues(item, keyPath, out);
    }
    return out;
  }

  if (node && typeof node === "object" && "$value" in node && keyPath.length > 0) {
    const rawValue = node.$value;
    out.push({
      name: keyPath.join("."),
      value: isPrimitive(rawValue) ? String(rawValue) : JSON.stringify(rawValue),
    });
    return out;
  }

  for (const [key, value] of Object.entries(node || {})) {
    if (key.startsWith("$") && key !== "$value") {
      continue;
    }
    extractTokenStudioValues(value, [...keyPath, key], out);
  }
  return out;
}

function normalizeTokenName(name) {
  const normalized = `${name}`
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/[._]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "");

  return `--${normalized}`;
}

function normalizeTokenValue(value) {
  const stringValue = String(value)
    .trim()
    .replace(/\{([a-zA-Z0-9._-]+)\}/g, (_, tokenName) => `var(${normalizeTokenName(tokenName)})`);

  if (stringValue.length === 0) return stringValue;
  if (/^\d+(\.\d+)?$/.test(stringValue)) return stringValue;
  return stringValue;
}

function toCss(tokens) {
  const unique = new Map();
  for (const token of tokens) {
    const cssName = normalizeTokenName(token.name);
    const cssValue = normalizeTokenValue(token.value);
    unique.set(cssName, cssValue);
  }

  const lines = [
    "/* Auto-generated from escapp design token export. */",
    ":root {",
    ...[...unique.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([name, value]) => `  ${name}: ${value};`),
    "}",
    "",
  ];
  return lines.join("\n");
}

function seemsCss(content) {
  const sample = content.slice(0, 1200);
  return sample.includes(":root") || sample.includes("--");
}

async function loadTokensFromJsonFile(jsonFilePath) {
  const raw = await readFile(jsonFilePath, "utf8");
  const parsed = JSON.parse(raw);
  const studioTokens = extractTokenStudioValues(parsed);
  if (studioTokens.length > 0) {
    return studioTokens;
  }
  return flattenGenericObject(parsed);
}

async function run() {
  const fileInfo = await stat(inputPath);
  let css;

  if (fileInfo.isDirectory()) {
    const jsonFiles = await listJsonFilesRecursively(inputPath);
    const tokenBuffer = [];

    for (const jsonFile of jsonFiles) {
      const fileTokens = await loadTokensFromJsonFile(jsonFile);
      tokenBuffer.push(...fileTokens);
    }

    if (tokenBuffer.length === 0) {
      throw new Error("Keine Tokens im Verzeichnis gefunden.");
    }

    css = toCss(tokenBuffer);
  } else {
    const raw = await readFile(inputPath, "utf8");

    if (seemsCss(raw) && !raw.trim().startsWith("{") && !raw.trim().startsWith("[")) {
      css = raw;
    } else {
      const tokens = await loadTokensFromJsonFile(inputPath);
      if (tokens.length === 0) {
        throw new Error("Keine Tokens im Export gefunden. Bitte JSON/CSS-Export aus der escapp Token Doku verwenden.");
      }
      css = toCss(tokens);
    }
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, css, "utf8");
  console.log(`Design Tokens importiert: ${outputArg}`);
}

run().catch((error) => {
  console.error("Token-Import fehlgeschlagen:", error.message);
  process.exit(1);
});