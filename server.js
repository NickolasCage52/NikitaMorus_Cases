const http = require("http");
const fs = require("fs");
const path = require("path");

function getArgValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return "";
  return process.argv[index + 1] || "";
}

const rootArg = getArgValue("--root");
const ROOT = path.resolve(__dirname, rootArg || ".");
const START_PORT = Number(process.env.PORT || 4173);
const MAX_PORT_ATTEMPTS = 20;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

function resolvePath(urlPath) {
  const cleaned = decodeURIComponent(urlPath.split("?")[0]);
  const relative = cleaned === "/" ? "/index.html" : cleaned;
  const filePath = path.normalize(path.join(ROOT, relative));

  if (!filePath.startsWith(ROOT)) {
    return null;
  }

  return filePath;
}

function createServer() {
  return http.createServer((req, res) => {
    const filePath = resolvePath(req.url || "/");

    if (!filePath) {
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Forbidden");
      return;
    }

    fs.stat(filePath, (statErr, stats) => {
      if (!statErr && stats.isDirectory()) {
        const directoryIndex = path.join(filePath, "index.html");
        fs.readFile(directoryIndex, (dirErr, data) => {
          if (dirErr) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Not found");
            return;
          }
          res.writeHead(200, { "Content-Type": MIME_TYPES[".html"] });
          res.end(data);
        });
        return;
      }

      fs.readFile(filePath, (readErr, data) => {
        if (!readErr) {
          const ext = path.extname(filePath).toLowerCase();
          const contentType = MIME_TYPES[ext] || "application/octet-stream";
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
          return;
        }

        const fallbackPath = path.join(ROOT, "index.html");
        fs.readFile(fallbackPath, (fallbackErr, fallbackData) => {
          if (fallbackErr) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Not found");
            return;
          }

          res.writeHead(200, { "Content-Type": MIME_TYPES[".html"] });
          res.end(fallbackData);
        });
      });
    });
  });
}

function startServer(port, attempt = 0) {
  const server = createServer();

  server.on("error", (error) => {
    if (error && error.code === "EADDRINUSE" && attempt < MAX_PORT_ATTEMPTS) {
      const nextPort = port + 1;
      console.warn(`Port ${port} is busy. Trying ${nextPort}...`);
      startServer(nextPort, attempt + 1);
      return;
    }

    console.error("Failed to start server:", error);
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(`Serving directory: ${ROOT}`);
    console.log(`Server running: http://localhost:${port}`);
  });
}

startServer(START_PORT);
