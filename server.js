const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";
const root = __dirname;
const leaderboardPath = path.join(root, "leaderboard.json");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const starterScores = [
  { name: "NOVA", score: 420, mode: "Story", createdAt: "2026-01-01T00:00:00.000Z" },
  { name: "AXIOM", score: 350, mode: "Arcade", createdAt: "2026-01-01T00:00:00.000Z" },
  { name: "LUX", score: 260, mode: "Arcade", createdAt: "2026-01-01T00:00:00.000Z" },
];

function readScores() {
  try {
    return JSON.parse(fs.readFileSync(leaderboardPath, "utf8"));
  } catch (error) {
    fs.writeFileSync(leaderboardPath, JSON.stringify(starterScores, null, 2));
    return starterScores;
  }
}

function writeScores(scores) {
  fs.writeFileSync(leaderboardPath, JSON.stringify(scores, null, 2));
}

function sendJson(response, status, value) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(value));
}

function collectBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 4096) {
        reject(new Error("Body too large"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function cleanEntry(entry) {
  const name = String(entry.name || "Player").replace(/[^\w -]/g, "").trim().slice(0, 14) || "Player";
  const score = Math.max(0, Math.min(999999, Number.parseInt(entry.score, 10) || 0));
  const mode = entry.mode === "Story" ? "Story" : "Arcade";
  return { name, score, mode, createdAt: new Date().toISOString() };
}

function serveStatic(request, response) {
  const requestPath = request.url === "/" ? "/index.html" : request.url.split("?")[0];
  const safePath = path.normalize(decodeURIComponent(requestPath)).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(root, safePath);
  const publicFiles = new Set(["index.html", "styles.css", "game.js"]);
  const publicName = path.basename(filePath);

  if (!filePath.startsWith(root) || !publicFiles.has(publicName)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
    });
    response.end(content);
  });
}

const server = http.createServer(async (request, response) => {
  if (request.url.startsWith("/api/leaderboard") && request.method === "GET") {
    const scores = readScores().sort((a, b) => b.score - a.score).slice(0, 10);
    sendJson(response, 200, scores);
    return;
  }

  if (request.url.startsWith("/api/leaderboard") && request.method === "POST") {
    try {
      const body = await collectBody(request);
      const entry = cleanEntry(JSON.parse(body || "{}"));
      const scores = readScores().concat(entry).sort((a, b) => b.score - a.score).slice(0, 10);
      writeScores(scores);
      sendJson(response, 201, scores);
    } catch (error) {
      sendJson(response, 400, { error: "Invalid score" });
    }
    return;
  }

  serveStatic(request, response);
});

function getLocalAddresses() {
  const networks = os.networkInterfaces();
  return Object.values(networks)
    .flat()
    .filter((network) => network && network.family === "IPv4" && !network.internal)
    .map((network) => network.address);
}

server.listen(port, host, () => {
  console.log(`Neon Snake is running at http://localhost:${port}`);
  getLocalAddresses().forEach((address) => {
    console.log(`Phone/WLAN link: http://${address}:${port}`);
  });
});
