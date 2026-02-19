const fs = require("fs");
const path = require("path");

try {
  require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
} catch (_) {}

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const ENTRIES = ["index.html", "assets"];
const REQUIRED_CASE_IMAGES = [
  "case-01.png",
  "case-02.png",
  "case-03.png",
  "case-04.png",
  "case-05.png",
  "case-06.png"
];

function removeDirectoryRecursive(targetPath) {
  if (!fs.existsSync(targetPath)) return;
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyRecursive(fromPath, toPath) {
  const stat = fs.statSync(fromPath);

  if (stat.isDirectory()) {
    ensureDirectory(toPath);
    const entries = fs.readdirSync(fromPath);
    for (const entry of entries) {
      copyRecursive(path.join(fromPath, entry), path.join(toPath, entry));
    }
    return;
  }

  ensureDirectory(path.dirname(toPath));
  fs.copyFileSync(fromPath, toPath);
}

function validateSource() {
  const missingEntries = ENTRIES.filter((entry) => !fs.existsSync(path.join(ROOT, entry)));
  if (missingEntries.length > 0) {
    throw new Error(`Build aborted. Missing required entries: ${missingEntries.join(", ")}`);
  }

  const casesDir = path.join(ROOT, "assets", "images", "cases");
  const missingImages = REQUIRED_CASE_IMAGES.filter((name) => !fs.existsSync(path.join(casesDir, name)));
  if (missingImages.length > 0) {
    console.warn(`[build] Warning: missing case screenshots: ${missingImages.join(", ")}`);
    console.warn("[build] Placeholders will be shown for missing images.");
  }
}

function build() {
  validateSource();
  removeDirectoryRecursive(DIST);
  ensureDirectory(DIST);

  for (const entry of ENTRIES) {
    const sourcePath = path.join(ROOT, entry);
    const destinationPath = path.join(DIST, entry);
    copyRecursive(sourcePath, destinationPath);
  }

  const distIndexPath = path.join(DIST, "index.html");
  const dist404Path = path.join(DIST, "404.html");
  fs.copyFileSync(distIndexPath, dist404Path);

  const casesJsPath = path.join(DIST, "assets", "js", "cases.js");
  if (fs.existsSync(casesJsPath)) {
    let content = fs.readFileSync(casesJsPath, "utf8");
    const endpoint = process.env.LEADS_ENDPOINT || "";
    const replacement = "const LEADS_ENDPOINT = " + JSON.stringify(endpoint) + ";";
    content = content.replace(/const\s+LEADS_ENDPOINT\s*=\s*["'][^"']*["']\s*;/, replacement);
    fs.writeFileSync(casesJsPath, content, "utf8");
  }

  console.log("[build] Build completed successfully.");
  console.log(`[build] Output directory: ${DIST}`);
}

try {
  build();
} catch (error) {
  console.error("[build] Failed:", error.message);
  process.exit(1);
}
