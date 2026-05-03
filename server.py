from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
import json
import os
import re
import socket
from datetime import datetime, timezone

ROOT = Path(__file__).parent
LEADERBOARD = ROOT / "leaderboard.json"
PORT = int(os.environ.get("PORT", "3000"))
HOST = os.environ.get("HOST", "0.0.0.0")

STARTER_SCORES = [
    {"name": "NOVA", "score": 420, "mode": "Story", "createdAt": "2026-01-01T00:00:00.000Z"},
    {"name": "AXIOM", "score": 350, "mode": "Arcade", "createdAt": "2026-01-01T00:00:00.000Z"},
    {"name": "LUX", "score": 260, "mode": "Arcade", "createdAt": "2026-01-01T00:00:00.000Z"},
]

MIME_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
}

PUBLIC_FILES = {"index.html", "styles.css", "game.js"}


def read_scores():
    if not LEADERBOARD.exists():
        write_scores(STARTER_SCORES)
        return STARTER_SCORES
    try:
        return json.loads(LEADERBOARD.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        write_scores(STARTER_SCORES)
        return STARTER_SCORES


def write_scores(scores):
    LEADERBOARD.write_text(json.dumps(scores, indent=2), encoding="utf-8")


def clean_entry(entry):
    name = str(entry.get("name", "Player"))
    name = re.sub(r"[^\w -]", "", name).strip()[:14] or "Player"
    try:
        score = int(entry.get("score", 0))
    except (TypeError, ValueError):
        score = 0
    score = max(0, min(999999, score))
    mode = "Story" if entry.get("mode") == "Story" else "Arcade"
    return {
        "name": name,
        "score": score,
        "mode": mode,
        "createdAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    }


class GameServer(BaseHTTPRequestHandler):
    def send_json(self, status, value):
        body = json.dumps(value).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.startswith("/api/leaderboard"):
            scores = sorted(read_scores(), key=lambda item: item.get("score", 0), reverse=True)[:10]
            self.send_json(200, scores)
            return

        file_name = "index.html" if self.path in ("/", "/index.html") else self.path.lstrip("/").split("?")[0]
        if file_name not in PUBLIC_FILES:
            self.send_error(403, "Forbidden")
            return

        file_path = ROOT / file_name
        if not file_path.exists():
            self.send_error(404, "Not found")
            return

        body = file_path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", MIME_TYPES.get(file_path.suffix, "application/octet-stream"))
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if not self.path.startswith("/api/leaderboard"):
            self.send_error(404, "Not found")
            return

        try:
            length = min(int(self.headers.get("Content-Length", "0")), 4096)
            raw_body = self.rfile.read(length).decode("utf-8")
            entry = clean_entry(json.loads(raw_body or "{}"))
            scores = sorted(read_scores() + [entry], key=lambda item: item.get("score", 0), reverse=True)[:10]
            write_scores(scores)
            self.send_json(201, scores)
        except Exception:
            self.send_json(400, {"error": "Invalid score"})

    def log_message(self, format, *args):
        return


if __name__ == "__main__":
    print(f"Neon Snake is running at http://localhost:{PORT}")
    try:
        local_ip = socket.gethostbyname(socket.gethostname())
        if local_ip and not local_ip.startswith("127."):
            print(f"Phone/WLAN link: http://{local_ip}:{PORT}")
    except OSError:
        pass
    HTTPServer((HOST, PORT), GameServer).serve_forever()
