const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const creditsEl = document.getElementById("credits");
const waveEl = document.getElementById("wave");
const bestScoreEl = document.getElementById("bestScore");
const finalScoreEl = document.getElementById("finalScore");
const modeLabelEl = document.getElementById("modeLabel");
const playerNameEl = document.getElementById("playerName");

const menus = {
  main: document.getElementById("mainMenu"),
  start: document.getElementById("startMenu"),
  pause: document.getElementById("pauseMenu"),
  over: document.getElementById("gameOverMenu"),
  shop: document.getElementById("shopMenu"),
  leaderboard: document.getElementById("leaderboardMenu"),
  how: document.getElementById("howMenu"),
  cutscene: document.getElementById("cutscene"),
};

const gridSize = 24;
const tile = canvas.width / gridSize;
const stepMs = 92;
const startSnake = [
  { x: 11, y: 12 },
  { x: 10, y: 12 },
  { x: 9, y: 12 },
];

const skins = [
  { id: "volt", name: "Volt", price: 0, head: "#27f5ff", body: "#78ffb5", core: "#b5ff38" },
  { id: "royal", name: "Royal", price: 80, head: "#ffd166", body: "#ff3df2", core: "#ffffff" },
  { id: "shadow", name: "Shadow", price: 130, head: "#9f7aea", body: "#4fd1c5", core: "#ff5868" },
  { id: "ember", name: "Ember", price: 180, head: "#ff5868", body: "#ffd166", core: "#27f5ff" },
  { id: "glacier", name: "Glacier", price: 220, head: "#a7f3ff", body: "#60a5fa", core: "#eef7ff" },
  { id: "venom", name: "Venom", price: 260, head: "#b5ff38", body: "#22c55e", core: "#111827" },
  { id: "nova", name: "Nova", price: 320, head: "#f472b6", body: "#facc15", core: "#27f5ff" },
  { id: "phantom", name: "Phantom", price: 380, head: "#e5e7eb", body: "#64748b", core: "#ff3df2" },
  { id: "crusader", name: "Crusader", price: 460, head: "#ffd166", body: "#dfe8ff", core: "#ff5868" },
  { id: "singularity", name: "Singularity", price: 620, head: "#ffffff", body: "#9f7aea", core: "#050811" },
];

const text = {
  de: {
    shop: "Shop",
    leaderboard: "Leaderboard",
    score: "Score",
    credits: "Credits",
    wave: "Welle",
    best: "Best",
    mainCopy: "Rase durch das Neon-Grid, sammle Kerne, schalte Skins frei und kaempfe im Story-Modus gegen Ritter-Snakes.",
    arcade: "Arcade",
    story: "Story-Modus",
    controls: "Steuerung",
    ready: "Bereit?",
    startCopy: "Bewege dich mit WASD oder Pfeiltasten. Druecke Leertaste oder Start, wenn du bereit bist.",
    start: "Start",
    back: "Zurueck",
    paused: "Pausiert",
    pauseCopy: "Druecke Esc oder Weiter, um ins Grid zurueckzukehren.",
    resume: "Weiter",
    mainMenu: "Hauptmenue",
    pilotName: "Pilotname",
    submitScore: "Score senden",
    retry: "Nochmal",
    skinShop: "Skin-Shop",
    chooseSkin: "Skin waehlen",
    close: "Schliessen",
    onlineBoard: "Online Leaderboard",
    topPilots: "Top-Piloten",
    localBoardNote: "Online-Leaderboard ueber den Spielserver. Falls du die HTML-Datei direkt oeffnest, nutzt das Spiel eine lokale Reserve-Liste.",
    offlineBackup: "Lokale Reserve aktiv.",
    howCopy: "WASD oder Pfeiltasten bewegen die Snake. Esc pausiert. Leertaste startet oder setzt fort.",
    gotIt: "Verstanden",
    skip: "Ueberspringen",
    cutsceneTitle: "Die Grid-Burg faellt",
    cutsceneText: "Hinter der Firewall bewachen Ritter-Snakes die letzte Energiekronen-Kammer. Brich ihre Formation, bevor das Grid dunkel wird.",
    buy: "Kaufen",
    equip: "Auswaehlen",
    equipped: "Aktiv",
    owned: "Besitzt",
    locked: "Credits",
    storyWin: "Krone gesichert",
    gameOver: "Game Over",
    victoryCopy: "Du hast die Ritter-Snakes besiegt und das Grid wieder erleuchtet.",
    scoreLine: "Score",
    swipeHint: "Wische auf dem Spielfeld, um zu steuern.",
  },
  en: {
    shop: "Shop",
    leaderboard: "Leaderboard",
    score: "Score",
    credits: "Credits",
    wave: "Wave",
    best: "Best",
    mainCopy: "Race through the neon grid, collect cores, unlock skins, and face armored knight snakes in story mode.",
    arcade: "Arcade",
    story: "Story Mode",
    controls: "Controls",
    ready: "Ready?",
    startCopy: "Move with WASD or arrow keys. Press Space or Start when you are ready.",
    start: "Start",
    back: "Back",
    paused: "Paused",
    pauseCopy: "Press Esc or Resume to return to the grid.",
    resume: "Resume",
    mainMenu: "Main Menu",
    pilotName: "Pilot name",
    submitScore: "Submit Score",
    retry: "Retry",
    skinShop: "Skin Shop",
    chooseSkin: "Choose Skin",
    close: "Close",
    onlineBoard: "Online Leaderboard",
    topPilots: "Top Pilots",
    localBoardNote: "Online leaderboard through the game server. If you open the HTML file directly, the game uses a local backup list.",
    offlineBackup: "Local backup active.",
    howCopy: "WASD or arrow keys move the snake. Esc pauses. Space starts or resumes.",
    gotIt: "Got it",
    skip: "Skip",
    cutsceneTitle: "The Grid Castle Falls",
    cutsceneText: "Beyond the firewall, knight snakes guard the last energy crown. Break their formation before the grid goes dark.",
    buy: "Buy",
    equip: "Equip",
    equipped: "Active",
    owned: "Owned",
    locked: "Credits",
    storyWin: "Crown Secured",
    gameOver: "Game Over",
    victoryCopy: "You defeated the knight snakes and lit the grid again.",
    scoreLine: "Score",
    swipeHint: "Swipe on the game board to steer.",
  },
};

let snake;
let previousSnake;
let food;
let direction;
let nextDirection;
let enemies;
let particles;
let score;
let wave;
let mode = "arcade";
let state = "menu";
let accumulator = 0;
let lastTime = 0;
let animationId = 0;
let cutsceneTimer = 0;
let modalReturn = "main";
let touchStart = null;

let language = localStorage.getItem("neonSnakeLang") || "de";
let credits = Number(localStorage.getItem("neonSnakeCredits")) || 0;
let bestScore = Number(localStorage.getItem("neonSnakeBest")) || 0;
let ownedSkins = JSON.parse(localStorage.getItem("neonSnakeOwned") || '["volt"]');
let activeSkin = localStorage.getItem("neonSnakeSkin") || "volt";
let leaderboardOnline = false;
let leaderboard = JSON.parse(localStorage.getItem("neonSnakeLeaderboard") || "null") || [
  { name: "NOVA", score: 420, mode: "Story" },
  { name: "AXIOM", score: 350, mode: "Arcade" },
  { name: "LUX", score: 260, mode: "Arcade" },
];

function t(key) {
  return text[language][key] || text.en[key] || key;
}

function saveProgress() {
  localStorage.setItem("neonSnakeCredits", credits);
  localStorage.setItem("neonSnakeBest", bestScore);
  localStorage.setItem("neonSnakeOwned", JSON.stringify(ownedSkins));
  localStorage.setItem("neonSnakeSkin", activeSkin);
  localStorage.setItem("neonSnakeLeaderboard", JSON.stringify(leaderboard));
}

async function loadLeaderboard() {
  try {
    const response = await fetch("/api/leaderboard", { cache: "no-store" });
    if (!response.ok) throw new Error("Leaderboard unavailable");
    leaderboard = await response.json();
    leaderboardOnline = true;
    localStorage.setItem("neonSnakeLeaderboard", JSON.stringify(leaderboard));
  } catch (error) {
    leaderboardOnline = false;
  }
  renderLeaderboard();
}

async function postLeaderboardScore(entry) {
  try {
    const response = await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    if (!response.ok) throw new Error("Score rejected");
    leaderboard = await response.json();
    leaderboardOnline = true;
    localStorage.setItem("neonSnakeLeaderboard", JSON.stringify(leaderboard));
  } catch (error) {
    leaderboardOnline = false;
    leaderboard.push(entry);
    leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem("neonSnakeLeaderboard", JSON.stringify(leaderboard));
  }
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.getElementById("langToggle").textContent = language === "de" ? "Deutsch" : "English";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  renderShop();
  renderLeaderboard();
  updateHud();
}

function showMenu(name) {
  Object.values(menus).forEach((menu) => menu.classList.add("hidden"));
  if (name) menus[name].classList.remove("hidden");
}

function openModal(name) {
  modalReturn = state === "menu" ? "main" : null;
  showMenu(name);
}

function closeModal() {
  showMenu(modalReturn);
}

function resetGame(newMode = mode) {
  mode = newMode;
  snake = startSnake.map((part) => ({ ...part }));
  previousSnake = snake.map((part) => ({ ...part }));
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  enemies = mode === "story" ? createEnemies(1) : [];
  particles = [];
  score = 0;
  wave = 1;
  placeFood();
  updateHud();
  draw(0);
}

function createEnemies(level) {
  return [
    { x: 6, y: 5, dx: 1, dy: 0, color: "#ffd166", alive: true, phase: level },
    { x: 17, y: 18, dx: -1, dy: 0, color: "#ff5868", alive: true, phase: level + 1 },
  ];
}

function openStart(newMode) {
  stopAnimation();
  state = "ready";
  resetGame(newMode);
  modeLabelEl.textContent = mode === "story" ? "Knightfall Story" : "Arcade Protocol";
  showMenu("start");
}

function playStoryIntro() {
  stopAnimation();
  state = "cutscene";
  resetGame("story");
  showMenu("cutscene");
  cutsceneTimer = window.setTimeout(() => openStart("story"), 5200);
}

function startGame() {
  if (state === "playing") return;
  state = "playing";
  accumulator = 0;
  lastTime = performance.now();
  showMenu(null);
  animationId = requestAnimationFrame(loop);
}

function pauseGame() {
  if (state !== "playing") return;
  state = "paused";
  showMenu("pause");
}

function resumeGame() {
  if (state !== "paused") return;
  state = "playing";
  lastTime = performance.now();
  showMenu(null);
}

function goMain() {
  stopAnimation();
  state = "menu";
  resetGame("arcade");
  showMenu("main");
}

function stopAnimation() {
  cancelAnimationFrame(animationId);
  window.clearTimeout(cutsceneTimer);
}

function loop(time) {
  animationId = requestAnimationFrame(loop);
  const delta = Math.min(80, time - lastTime);
  lastTime = time;

  if (state === "playing") {
    accumulator += delta;
    const speedBonus = Math.min(32, Math.floor(score / 60) * 5);
    const currentStep = Math.max(58, stepMs - speedBonus);
    while (accumulator >= currentStep) {
      tick();
      accumulator -= currentStep;
    }
    updateParticles(delta);
    draw(accumulator / currentStep);
  } else {
    draw(0);
  }
}

function tick() {
  previousSnake = snake.map((part) => ({ ...part }));
  direction = nextDirection;

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  if (hasCrashed(head)) {
    endGame(false);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += mode === "story" ? 15 : 10;
    credits += mode === "story" ? 3 : 2;
    burst(food.x, food.y, "#b5ff38");
    placeFood();
  } else {
    snake.pop();
  }

  if (mode === "story") {
    moveEnemies();
    resolveEnemyCollisions();
    if (wave > 3 && enemies.every((enemy) => !enemy.alive)) {
      endGame(true);
      return;
    }
  }

  bestScore = Math.max(bestScore, score);
  saveProgress();
  updateHud();
}

function moveEnemies() {
  enemies.forEach((enemy) => {
    if (!enemy.alive) return;
    if (Math.random() < 0.28) {
      const moves = [
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ];
      const choice = moves[Math.floor(Math.random() * moves.length)];
      enemy.dx = choice.dx;
      enemy.dy = choice.dy;
    }
    enemy.x += enemy.dx;
    enemy.y += enemy.dy;
    if (enemy.x <= 1 || enemy.x >= gridSize - 2) enemy.dx *= -1;
    if (enemy.y <= 1 || enemy.y >= gridSize - 2) enemy.dy *= -1;
    enemy.x = Math.max(1, Math.min(gridSize - 2, enemy.x));
    enemy.y = Math.max(1, Math.min(gridSize - 2, enemy.y));
  });
}

function resolveEnemyCollisions() {
  enemies.forEach((enemy) => {
    if (!enemy.alive) return;
    const headHit = snake[0].x === enemy.x && snake[0].y === enemy.y;
    const bodyHit = snake.slice(1).some((part) => part.x === enemy.x && part.y === enemy.y);
    if (headHit) {
      endGame(false);
    } else if (bodyHit) {
      enemy.alive = false;
      score += 35;
      credits += 10;
      burst(enemy.x, enemy.y, enemy.color);
      if (enemies.every((knight) => !knight.alive)) {
        wave += 1;
        if (wave <= 3) enemies = createEnemies(wave);
      }
    }
  });
}

function hasCrashed(head) {
  const outside = head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize;
  const selfHit = snake.some((part) => part.x === head.x && part.y === head.y);
  return outside || selfHit;
}

function placeFood() {
  do {
    food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (
    snake.some((part) => part.x === food.x && part.y === food.y) ||
    enemies.some((enemy) => enemy.alive && enemy.x === food.x && enemy.y === food.y)
  );
}

function setDirection(newDirection) {
  const reverse = newDirection.x + direction.x === 0 && newDirection.y + direction.y === 0;
  if (!reverse) nextDirection = newDirection;
}

function updateHud() {
  scoreEl.textContent = score || 0;
  creditsEl.textContent = credits;
  waveEl.textContent = mode === "story" ? wave : "-";
  bestScoreEl.textContent = bestScore;
}

function endGame(victory) {
  state = "over";
  if (victory) score += 120;
  bestScore = Math.max(bestScore, score);
  credits += Math.floor(score / 20);
  saveProgress();
  document.getElementById("resultTag").textContent = victory ? "Knightfall Complete" : "Signal Lost";
  document.getElementById("resultTitle").textContent = victory ? t("storyWin") : t("gameOver");
  finalScoreEl.textContent = victory ? `${t("victoryCopy")} ${t("scoreLine")}: ${score}` : `${t("scoreLine")}: ${score}`;
  updateHud();
  renderLeaderboard();
  showMenu("over");
}

async function submitScore() {
  const name = (playerNameEl.value || "Player").trim().slice(0, 14) || "Player";
  await postLeaderboardScore({ name, score, mode: mode === "story" ? "Story" : "Arcade" });
  renderLeaderboard();
  showMenu("leaderboard");
}

function renderLeaderboard() {
  const list = document.getElementById("leaderboardList");
  const note = document.querySelector("[data-i18n='localBoardNote']");
  list.innerHTML = "";
  if (note) {
    note.textContent = leaderboardOnline ? t("localBoardNote") : `${t("localBoardNote")} ${t("offlineBackup")}`;
  }
  leaderboard.forEach((entry, index) => {
    const item = document.createElement("li");
    const rank = document.createElement("strong");
    const player = document.createElement("span");
    const points = document.createElement("strong");
    rank.textContent = `#${index + 1}`;
    player.textContent = `${entry.name} / ${entry.mode}`;
    points.textContent = entry.score;
    item.append(rank, player, points);
    list.appendChild(item);
  });
}

function renderShop() {
  const grid = document.getElementById("skinGrid");
  grid.innerHTML = "";
  skins.forEach((skin) => {
    const owned = ownedSkins.includes(skin.id);
    const active = activeSkin === skin.id;
    const card = document.createElement("article");
    card.className = "skin-card";
    card.innerHTML = `
      <div class="swatch" style="color:${skin.head};background:linear-gradient(90deg,${skin.head},${skin.body})"></div>
      <strong>${skin.name}</strong>
      <span>${owned ? t("owned") : `${skin.price} ${t("locked")}`}</span>
    `;
    const button = document.createElement("button");
    button.className = active ? "primary" : "ghost";
    button.textContent = active ? t("equipped") : owned ? t("equip") : t("buy");
    button.disabled = !owned && credits < skin.price;
    button.addEventListener("click", () => {
      if (!owned) {
        credits -= skin.price;
        ownedSkins.push(skin.id);
      }
      activeSkin = skin.id;
      saveProgress();
      updateHud();
      renderShop();
      draw(0);
    });
    card.appendChild(button);
    grid.appendChild(card);
  });
}

function burst(x, y, color) {
  for (let i = 0; i < 22; i += 1) {
    particles.push({
      x: x * tile + tile / 2,
      y: y * tile + tile / 2,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      life: 560,
      color,
    });
  }
}

function updateParticles(delta) {
  particles = particles
    .map((p) => ({ ...p, x: p.x + p.vx * delta, y: p.y + p.vy * delta, life: p.life - delta }))
    .filter((p) => p.life > 0);
}

function draw(progress) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawFood();
  drawEnemies();
  drawSnake(progress);
  drawParticles();
}

function drawBackground() {
  ctx.fillStyle = "#050811";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(39, 245, 255, 0.1)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= gridSize; i += 1) {
    const pos = i * tile;
    ctx.beginPath();
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, pos);
    ctx.lineTo(canvas.width, pos);
    ctx.stroke();
  }
  ctx.strokeStyle = mode === "story" ? "rgba(255, 209, 102, 0.42)" : "rgba(255, 61, 242, 0.32)";
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
}

function drawSnake(progress) {
  const skin = skins.find((item) => item.id === activeSkin) || skins[0];
  snake.forEach((part, index) => {
    const previous = previousSnake[index] || part;
    const renderX = (previous.x + (part.x - previous.x) * progress) * tile + 3;
    const renderY = (previous.y + (part.y - previous.y) * progress) * tile + 3;
    const size = tile - 6;
    const color = index === 0 ? skin.head : skin.body;
    ctx.shadowColor = color;
    ctx.shadowBlur = index === 0 ? 22 : 13;
    ctx.fillStyle = color;
    ctx.fillRect(renderX, renderY, size, size);
    ctx.shadowBlur = 0;
    ctx.fillStyle = index === 0 ? skin.core : "rgba(5, 8, 17, 0.36)";
    ctx.fillRect(renderX + size * 0.28, renderY + size * 0.28, size * 0.44, size * 0.44);
  });
}

function drawFood() {
  const centerX = food.x * tile + tile / 2;
  const centerY = food.y * tile + tile / 2;
  const pulse = 4 + Math.sin(Date.now() / 110) * 2;
  ctx.shadowColor = "#ff3df2";
  ctx.shadowBlur = 24;
  ctx.fillStyle = "#ff3df2";
  ctx.beginPath();
  ctx.arc(centerX, centerY, tile * 0.28 + pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(centerX, centerY, tile * 0.12, 0, Math.PI * 2);
  ctx.fill();
}

function drawEnemies() {
  enemies.forEach((enemy) => {
    if (!enemy.alive) return;
    const x = enemy.x * tile + 5;
    const y = enemy.y * tile + 5;
    const size = tile - 10;
    ctx.shadowColor = enemy.color;
    ctx.shadowBlur = 18;
    ctx.fillStyle = enemy.color;
    ctx.fillRect(x, y + size * 0.25, size, size * 0.75);
    ctx.fillStyle = "#dfe8ff";
    ctx.fillRect(x + size * 0.18, y, size * 0.64, size * 0.38);
    ctx.fillStyle = "#050811";
    ctx.fillRect(x + size * 0.3, y + size * 0.13, size * 0.4, 3);
    ctx.shadowBlur = 0;
  });
}

function drawParticles() {
  particles.forEach((p) => {
    ctx.globalAlpha = Math.max(0, p.life / 560);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 4, 4);
    ctx.globalAlpha = 1;
  });
}

function handleKey(event) {
  const key = event.key.toLowerCase();
  if (key === "escape") {
    if (state === "playing") pauseGame();
    else if (state === "paused") resumeGame();
    return;
  }
  if (key === " " && (state === "ready" || state === "paused")) {
    event.preventDefault();
    state === "paused" ? resumeGame() : startGame();
    return;
  }
  const directions = {
    arrowup: { x: 0, y: -1 },
    w: { x: 0, y: -1 },
    arrowdown: { x: 0, y: 1 },
    s: { x: 0, y: 1 },
    arrowleft: { x: -1, y: 0 },
    a: { x: -1, y: 0 },
    arrowright: { x: 1, y: 0 },
    d: { x: 1, y: 0 },
  };
  if (directions[key]) {
    event.preventDefault();
    setDirection(directions[key]);
  }
}

function handleTouchStart(event) {
  const touch = event.changedTouches[0];
  touchStart = {
    x: touch.clientX,
    y: touch.clientY,
  };
}

function handleTouchEnd(event) {
  if (!touchStart) return;
  const touch = event.changedTouches[0];
  const dx = touch.clientX - touchStart.x;
  const dy = touch.clientY - touchStart.y;
  const distance = Math.hypot(dx, dy);
  touchStart = null;

  if (distance < 24) return;
  event.preventDefault();

  if (Math.abs(dx) > Math.abs(dy)) {
    setDirection(dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
  } else {
    setDirection(dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
  }
}

document.getElementById("arcadeMode").addEventListener("click", () => openStart("arcade"));
document.getElementById("storyMode").addEventListener("click", playStoryIntro);
document.getElementById("skipCutscene").addEventListener("click", () => openStart("story"));
document.getElementById("startGame").addEventListener("click", startGame);
document.getElementById("backToMain").addEventListener("click", goMain);
document.getElementById("resumeGame").addEventListener("click", resumeGame);
document.getElementById("pauseToMain").addEventListener("click", goMain);
document.getElementById("retryGame").addEventListener("click", () => openStart(mode));
document.getElementById("overToMain").addEventListener("click", goMain);
document.getElementById("submitScore").addEventListener("click", submitScore);
document.getElementById("showHow").addEventListener("click", () => showMenu("how"));
document.getElementById("closeHow").addEventListener("click", () => showMenu("main"));
document.getElementById("openShop").addEventListener("click", () => {
  renderShop();
  openModal("shop");
});
document.getElementById("closeShop").addEventListener("click", closeModal);
document.getElementById("openLeaderboard").addEventListener("click", () => {
  loadLeaderboard();
  openModal("leaderboard");
});
document.getElementById("closeLeaderboard").addEventListener("click", closeModal);
document.getElementById("langToggle").addEventListener("click", () => {
  language = language === "de" ? "en" : "de";
  localStorage.setItem("neonSnakeLang", language);
  applyLanguage();
});

window.addEventListener("keydown", handleKey);
canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

resetGame("arcade");
applyLanguage();
loadLeaderboard();
draw(0);
