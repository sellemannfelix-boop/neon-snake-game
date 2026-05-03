const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const creditsEl = document.getElementById("credits");
const waveEl = document.getElementById("wave");
const bestScoreEl = document.getElementById("bestScore");
const powerStatusEl = document.getElementById("powerStatus");
const finalScoreEl = document.getElementById("finalScore");
const modeLabelEl = document.getElementById("modeLabel");
const playerNameEl = document.getElementById("playerName");
const battleLogEl = document.getElementById("battleLog");
const heroHpBarEl = document.getElementById("heroHpBar");
const enemyHpBarEl = document.getElementById("enemyHpBar");
const heroHpTextEl = document.getElementById("heroHpText");
const enemyHpTextEl = document.getElementById("enemyHpText");
const enemyNameEl = document.getElementById("enemyName");
const enemyLevelEl = document.getElementById("enemyLevel");
const difficultySelectEl = document.getElementById("difficultySelect");
const soundToggleEl = document.getElementById("soundToggle");
const debugLoginEl = document.getElementById("debugLogin");
const debugToolsEl = document.getElementById("debugTools");
const debugPasswordInputEl = document.getElementById("debugPasswordInput");
const debugGodModeEl = document.getElementById("debugGodMode");

const menus = {
  main: document.getElementById("mainMenu"),
  start: document.getElementById("startMenu"),
  pause: document.getElementById("pauseMenu"),
  over: document.getElementById("gameOverMenu"),
  shop: document.getElementById("shopMenu"),
  leaderboard: document.getElementById("leaderboardMenu"),
  missions: document.getElementById("missionsMenu"),
  achievements: document.getElementById("achievementsMenu"),
  settings: document.getElementById("settingsMenu"),
  debug: document.getElementById("debugMenu"),
  how: document.getElementById("howMenu"),
  cutscene: document.getElementById("cutscene"),
  battle: document.getElementById("battleMenu"),
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
    missions: "Missionen",
    achievements: "Erfolge",
    settings: "Optionen",
    debug: "Debug",
    score: "Score",
    credits: "Credits",
    wave: "Welle",
    best: "Best",
    power: "Power",
    mainCopy: "Rase durch das Neon-Grid, sammle Kerne, schalte Skins frei und kaempfe im Story-Modus in rundenbasierten Snake-Duellen.",
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
    cutsceneTitle: "Die Liga des Neon-Grids",
    cutsceneText: "Drei wilde Battle-Snakes blockieren den Weg zur Champion-Kammer. Waehle Attacken, heile klug und gewinne jedes Duell.",
    buy: "Kaufen",
    equip: "Auswaehlen",
    equipped: "Aktiv",
    owned: "Besitzt",
    locked: "Credits",
    storyWin: "Champion des Grids",
    gameOver: "Game Over",
    victoryCopy: "Du hast alle Battle-Snakes besiegt und bist Champion des Neon-Grids.",
    scoreLine: "Score",
    swipeHint: "Wische auf dem Spielfeld, um zu steuern.",
    noPower: "-",
    shield: "Schild",
    chrono: "Zeitkern",
    jackpot: "Credit-Kern",
    dailyMissions: "Tagesmissionen",
    trophyRoom: "Trophaeenraum",
    difficulty: "Schwierigkeit",
    easy: "Einfach",
    normal: "Normal",
    hard: "Schwer",
    sound: "Sound",
    reward: "Belohnung",
    claimed: "Abgeholt",
    claim: "Abholen",
    lockedProgress: "Fortschritt",
    unlockedToast: "Freigeschaltet",
    debugMenu: "Debug-Menue",
    debugPassword: "Passwort",
    unlock: "Entsperren",
    addCredits: "+500 Credits",
    unlockSkins: "Skins freischalten",
    completeMissions: "Missionen abschliessen",
    winStory: "Story gewinnen",
    godMode: "Unsterblich",
    resetProgress: "Fortschritt loeschen",
    wrongPassword: "Falsches Passwort",
    debugUnlocked: "Debug entsperrt",
    bite: "Byte-Biss",
    pulse: "Neon-Puls",
    charge: "Ueberladung",
    heal: "Heilen",
    battleStart: "Ein wildes {name} erscheint.",
    playerAttack: "Neon Snake nutzt {move}.",
    enemyAttack: "{name} kontert.",
    defeated: "{name} wurde besiegt.",
    healed: "Neon Snake regeneriert Energie.",
  },
  en: {
    shop: "Shop",
    leaderboard: "Leaderboard",
    missions: "Missions",
    achievements: "Achievements",
    settings: "Settings",
    debug: "Debug",
    score: "Score",
    credits: "Credits",
    wave: "Wave",
    best: "Best",
    power: "Power",
    mainCopy: "Race through the neon grid, collect cores, unlock skins, and fight turn-based Snake duels in story mode.",
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
    cutsceneTitle: "The Neon Grid League",
    cutsceneText: "Three wild battle snakes block the Champion Chamber. Choose attacks, heal wisely, and win every duel.",
    buy: "Buy",
    equip: "Equip",
    equipped: "Active",
    owned: "Owned",
    locked: "Credits",
    storyWin: "Grid Champion",
    gameOver: "Game Over",
    victoryCopy: "You defeated every battle snake and became Champion of the Neon Grid.",
    scoreLine: "Score",
    swipeHint: "Swipe on the game board to steer.",
    noPower: "-",
    shield: "Shield",
    chrono: "Time Core",
    jackpot: "Credit Core",
    dailyMissions: "Daily Missions",
    trophyRoom: "Trophy Room",
    difficulty: "Difficulty",
    easy: "Easy",
    normal: "Normal",
    hard: "Hard",
    sound: "Sound",
    reward: "Reward",
    claimed: "Claimed",
    claim: "Claim",
    lockedProgress: "Progress",
    unlockedToast: "Unlocked",
    debugMenu: "Debug Menu",
    debugPassword: "Password",
    unlock: "Unlock",
    addCredits: "+500 Credits",
    unlockSkins: "Unlock Skins",
    completeMissions: "Complete Missions",
    winStory: "Win Story",
    godMode: "God Mode",
    resetProgress: "Reset Progress",
    wrongPassword: "Wrong password",
    debugUnlocked: "Debug unlocked",
    bite: "Byte Bite",
    pulse: "Neon Pulse",
    charge: "Overcharge",
    heal: "Heal",
    battleStart: "A wild {name} appears.",
    playerAttack: "Neon Snake used {move}.",
    enemyAttack: "{name} strikes back.",
    defeated: "{name} was defeated.",
    healed: "Neon Snake restored energy.",
  },
};

const powerTypes = [
  { id: "shield", color: "#60a5fa", duration: 9000, score: 20 },
  { id: "chrono", color: "#a78bfa", duration: 7000, score: 25 },
  { id: "jackpot", color: "#ffd166", duration: 0, score: 40 },
];

const storyOpponents = [
  { name: "Sparkadder", level: 3, maxHp: 58, attack: 10, color: "#ff3df2" },
  { name: "Mosscoil", level: 5, maxHp: 78, attack: 13, color: "#b5ff38" },
  { name: "Volt Python", level: 8, maxHp: 102, attack: 17, color: "#27f5ff" },
];

const difficultySettings = {
  easy: { speed: -18, score: 0.8 },
  normal: { speed: 0, score: 1 },
  hard: { speed: 18, score: 1.35 },
};

const debugPassword = "Sonnentag79";

const missions = [
  { id: "cores", target: 12, reward: 60, de: "Sammle 12 Kerne", en: "Collect 12 cores" },
  { id: "powerups", target: 4, reward: 80, de: "Sammle 4 Power-ups", en: "Collect 4 power-ups" },
  { id: "storyHits", target: 6, reward: 100, de: "Triff 6 Story-Attacken", en: "Land 6 story attacks" },
];

const achievements = [
  { id: "score100", target: 100, reward: 100, de: "100 Score erreichen", en: "Reach 100 score" },
  { id: "skins3", target: 3, reward: 120, de: "3 Skins besitzen", en: "Own 3 skins" },
  { id: "champion", target: 1, reward: 180, de: "Story-Modus gewinnen", en: "Win story mode" },
  { id: "collector", target: 20, reward: 140, de: "20 Kerne insgesamt sammeln", en: "Collect 20 total cores" },
];

let snake;
let previousSnake;
let food;
let direction;
let nextDirection;
let particles;
let powerUp;
let activePower = null;
let powerUntil = 0;
let score;
let wave;
let hero;
let opponent;
let storyBattleIndex = 0;
let battleBusy = false;
let battleTimers = [];
let mode = "arcade";
let state = "menu";
let accumulator = 0;
let lastTime = 0;
let animationId = 0;
let cutsceneTimer = 0;
let modalReturn = "main";
let touchStart = null;
let lastTouchStepAt = 0;
let shakeUntil = 0;
let sessionCores = 0;
let sessionPowerups = 0;
let storyHits = 0;
let audioContext = null;
let debugUnlocked = false;
let debugGodMode = false;

let language = localStorage.getItem("neonSnakeLang") || "de";
let credits = Number(localStorage.getItem("neonSnakeCredits")) || 0;
let bestScore = Number(localStorage.getItem("neonSnakeBest")) || 0;
let ownedSkins = JSON.parse(localStorage.getItem("neonSnakeOwned") || '["volt"]');
let activeSkin = localStorage.getItem("neonSnakeSkin") || "volt";
let difficulty = localStorage.getItem("neonSnakeDifficulty") || "normal";
let soundEnabled = localStorage.getItem("neonSnakeSound") === "true";
let stats = JSON.parse(localStorage.getItem("neonSnakeStats") || '{"cores":0,"powerups":0,"storyHits":0,"storyWins":0}');
let claimedMissions = JSON.parse(localStorage.getItem("neonSnakeMissions") || "[]");
let claimedAchievements = JSON.parse(localStorage.getItem("neonSnakeAchievements") || "[]");
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
  localStorage.setItem("neonSnakeDifficulty", difficulty);
  localStorage.setItem("neonSnakeSound", String(soundEnabled));
  localStorage.setItem("neonSnakeStats", JSON.stringify(stats));
  localStorage.setItem("neonSnakeMissions", JSON.stringify(claimedMissions));
  localStorage.setItem("neonSnakeAchievements", JSON.stringify(claimedAchievements));
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
  renderMissions();
  renderAchievements();
  difficultySelectEl.value = difficulty;
  soundToggleEl.checked = soundEnabled;
  debugGodModeEl.checked = debugGodMode;
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
  particles = [];
  powerUp = null;
  activePower = null;
  powerUntil = 0;
  score = 0;
  wave = 1;
  sessionCores = 0;
  sessionPowerups = 0;
  storyHits = 0;
  placeFood();
  updateHud();
  draw(0);
}

function openStart(newMode) {
  stopAnimation();
  if (newMode === "story") {
    startStoryBattle();
    return;
  }
  state = "ready";
  resetGame(newMode);
  modeLabelEl.textContent = "Arcade Protocol";
  showMenu("start");
}

function playStoryIntro() {
  stopAnimation();
  state = "cutscene";
  mode = "story";
  showMenu("cutscene");
  cutsceneTimer = window.setTimeout(() => openStart("story"), 5200);
}

function startGame() {
  if (state === "playing") return;
  sessionCores = 0;
  sessionPowerups = 0;
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
  clearBattleTimers();
  setBattleButtons(false);
  state = "menu";
  resetGame("arcade");
  showMenu("main");
}

function stopAnimation() {
  cancelAnimationFrame(animationId);
  window.clearTimeout(cutsceneTimer);
}

function scheduleBattle(callback, delay) {
  const timer = window.setTimeout(() => {
    battleTimers = battleTimers.filter((item) => item !== timer);
    if (state === "battle") callback();
  }, delay);
  battleTimers.push(timer);
}

function clearBattleTimers() {
  battleTimers.forEach((timer) => window.clearTimeout(timer));
  battleTimers = [];
}

function loop(time) {
  animationId = requestAnimationFrame(loop);
  const delta = Math.min(80, time - lastTime);
  lastTime = time;

  if (state === "playing") {
    accumulator += delta;
    const currentStep = getCurrentStep();
    while (accumulator >= currentStep) {
      tick();
      if (state !== "playing") break;
      accumulator -= currentStep;
    }
    updateParticles(delta);
    draw(accumulator / currentStep);
  } else {
    draw(0);
  }
}

function getCurrentStep() {
  const speedBonus = Math.min(32, Math.floor(score / 60) * 5);
  const powerSlow = activePower === "chrono" ? 24 : 0;
  return Math.max(48, stepMs - speedBonus + powerSlow - difficultySettings[difficulty].speed);
}

function tick() {
  previousSnake = snake.map((part) => ({ ...part }));
  direction = nextDirection;
  expirePower();

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  if (hasCrashed(head)) {
    if (debugGodMode) {
      bounceFromCrash();
      return;
    }
    if (useShield()) return;
    endGame(false);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += Math.round(10 * difficultySettings[difficulty].score);
    credits += 2;
    sessionCores += 1;
    stats.cores = (stats.cores || 0) + 1;
    playTone(660, 0.06);
    burst(food.x, food.y, "#b5ff38");
    maybeSpawnPowerUp();
    placeFood();
  } else {
    snake.pop();
  }

  collectPowerUp(head);

  bestScore = Math.max(bestScore, score);
  saveProgress();
  updateHud();
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
    (powerUp && powerUp.x === food.x && powerUp.y === food.y)
  );
}

function setDirection(newDirection) {
  const reverse = newDirection.x + direction.x === 0 && newDirection.y + direction.y === 0;
  if (reverse) return false;
  nextDirection = newDirection;
  return true;
}

function updateHud() {
  scoreEl.textContent = score || 0;
  creditsEl.textContent = credits;
  const storyWave = Math.min(storyBattleIndex + 1, storyOpponents.length);
  waveEl.textContent = mode === "story" ? `${storyWave}/${storyOpponents.length}` : "-";
  bestScoreEl.textContent = bestScore;
  powerStatusEl.textContent = activePower ? t(activePower) : t("noPower");
}

function formatText(key, values = {}) {
  return t(key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

function startStoryBattle() {
  stopAnimation();
  clearBattleTimers();
  mode = "story";
  state = "battle";
  score = 0;
  wave = 1;
  storyBattleIndex = 0;
  storyHits = 0;
  powerUp = null;
  activePower = null;
  powerUntil = 0;
  hero = { maxHp: 92, hp: 92 };
  setupOpponent();
  updateHud();
  showMenu("battle");
}

function setupOpponent() {
  const template = storyOpponents[storyBattleIndex];
  opponent = { ...template, hp: template.maxHp };
  battleBusy = false;
  setBattleButtons(false);
  battleLogEl.textContent = formatText("battleStart", { name: opponent.name });
  updateBattleUi();
  updateHud();
}

function updateBattleUi() {
  if (!hero || !opponent) return;
  enemyNameEl.textContent = opponent.name;
  enemyLevelEl.textContent = `Lv. ${opponent.level}`;
  heroHpTextEl.textContent = `${hero.hp} / ${hero.maxHp}`;
  enemyHpTextEl.textContent = `${opponent.hp} / ${opponent.maxHp}`;
  heroHpBarEl.style.width = `${Math.max(0, (hero.hp / hero.maxHp) * 100)}%`;
  enemyHpBarEl.style.width = `${Math.max(0, (opponent.hp / opponent.maxHp) * 100)}%`;
  document.querySelector(".enemy-sprite").style.color = opponent.color;
  document.querySelector(".enemy-sprite").style.background = `linear-gradient(135deg, rgba(255,255,255,0.9) 0 13%, transparent 13%), linear-gradient(135deg, ${opponent.color}, #ffd166)`;
}

function setBattleButtons(disabled) {
  document.querySelectorAll(".battle-actions button").forEach((button) => {
    button.disabled = disabled;
  });
}

function playerBattleMove(move) {
  if (state !== "battle" || battleBusy) return;
  battleBusy = true;
  setBattleButtons(true);

  const moves = {
    bite: { label: t("bite"), damage: 16 + Math.floor(Math.random() * 8), credits: 3 },
    pulse: { label: t("pulse"), damage: 22 + Math.floor(Math.random() * 9), credits: 4 },
    charge: { label: t("charge"), damage: 34 + Math.floor(Math.random() * 14), recoil: 8, credits: 7 },
  };

  if (move === "heal") {
    hero.hp = Math.min(hero.maxHp, hero.hp + 24);
    score += 8;
    battleLogEl.textContent = t("healed");
    updateHud();
    updateBattleUi();
    scheduleBattle(enemyBattleMove, 620);
    return;
  }

  const attack = moves[move];
  opponent.hp = Math.max(0, opponent.hp - attack.damage);
  if (attack.recoil) hero.hp = Math.max(1, hero.hp - attack.recoil);
  score += attack.damage + attack.credits;
  credits += attack.credits;
  storyHits += 1;
  stats.storyHits = (stats.storyHits || 0) + 1;
  playTone(move === "charge" ? 190 : 520, 0.09);
  battleLogEl.textContent = `${formatText("playerAttack", { move: attack.label })} -${attack.damage}`;
  updateHud();
  updateBattleUi();

  if (opponent.hp <= 0) {
    scheduleBattle(finishOpponent, 700);
  } else {
    scheduleBattle(enemyBattleMove, 760);
  }
}

function enemyBattleMove() {
  if (!opponent || !hero || state !== "battle") return;
  const damage = debugGodMode ? 0 : opponent.attack + Math.floor(Math.random() * 8);
  hero.hp = Math.max(0, hero.hp - damage);
  battleLogEl.textContent = `${formatText("enemyAttack", { name: opponent.name })} -${damage}`;
  updateBattleUi();

  if (hero.hp <= 0) {
    scheduleBattle(() => endGame(false), 750);
  } else {
    battleBusy = false;
    setBattleButtons(false);
  }
}

function finishOpponent() {
  if (!opponent || state !== "battle") return;
  setBattleButtons(true);
  battleLogEl.textContent = formatText("defeated", { name: opponent.name });
  score += 60 + storyBattleIndex * 35;
  credits += 30 + storyBattleIndex * 15;
  playTone(740, 0.14);
  bestScore = Math.max(bestScore, score);
  saveProgress();
  updateHud();
  updateBattleUi();

  storyBattleIndex += 1;
  wave = storyBattleIndex + 1;
  updateHud();
  if (storyBattleIndex >= storyOpponents.length) {
    scheduleBattle(() => endGame(true), 900);
    return;
  }

  scheduleBattle(setupOpponent, 1000);
}

function maybeSpawnPowerUp() {
  if (powerUp || Math.random() > 0.38) return;
  const type = powerTypes[Math.floor(Math.random() * powerTypes.length)];
  let candidate;
  do {
    candidate = {
      ...type,
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (
    snake.some((part) => part.x === candidate.x && part.y === candidate.y) ||
    (food && food.x === candidate.x && food.y === candidate.y)
  );
  powerUp = candidate;
}

function collectPowerUp(head) {
  if (!powerUp || head.x !== powerUp.x || head.y !== powerUp.y) return;
  score += powerUp.score;
  credits += powerUp.id === "jackpot" ? 25 : 6;
  sessionPowerups += 1;
  stats.powerups = (stats.powerups || 0) + 1;
  playTone(880, 0.08);
  burst(powerUp.x, powerUp.y, powerUp.color);
  shake(160);
  if (powerUp.duration > 0) {
    activePower = powerUp.id;
    powerUntil = Date.now() + powerUp.duration;
  }
  powerUp = null;
  updateHud();
}

function expirePower() {
  if (activePower && Date.now() > powerUntil) {
    activePower = null;
    powerUntil = 0;
    updateHud();
  }
}

function useShield() {
  if (activePower !== "shield") return false;
  activePower = null;
  powerUntil = 0;
  nextDirection = { x: -direction.x, y: -direction.y };
  direction = nextDirection;
  burst(snake[0].x, snake[0].y, "#60a5fa");
  playTone(240, 0.12);
  shake(260);
  updateHud();
  return true;
}

function bounceFromCrash() {
  nextDirection = { x: -direction.x, y: -direction.y };
  direction = nextDirection;
  burst(snake[0].x, snake[0].y, "#ffd166");
  shake(180);
  showToast("Debug: God Mode");
}

function shake(duration) {
  shakeUntil = Date.now() + duration;
}

function endGame(victory) {
  clearBattleTimers();
  battleBusy = false;
  setBattleButtons(false);
  state = "over";
  if (victory) score += 120;
  if (victory && mode === "story") {
    stats.storyWins = (stats.storyWins || 0) + 1;
  }
  bestScore = Math.max(bestScore, score);
  credits += Math.floor(score / 20);
  saveProgress();
  document.getElementById("resultTag").textContent = victory ? "League Complete" : "Signal Lost";
  document.getElementById("resultTitle").textContent = victory ? t("storyWin") : t("gameOver");
  finalScoreEl.textContent = victory ? `${t("victoryCopy")} ${t("scoreLine")}: ${score}` : `${t("scoreLine")}: ${score}`;
  updateHud();
  renderLeaderboard();
  renderMissions();
  renderAchievements();
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

function getMissionProgress(mission) {
  if (mission.id === "cores") return sessionCores;
  if (mission.id === "powerups") return sessionPowerups;
  if (mission.id === "storyHits") return storyHits;
  return 0;
}

function getAchievementProgress(achievement) {
  if (achievement.id === "score100") return bestScore;
  if (achievement.id === "skins3") return ownedSkins.length;
  if (achievement.id === "champion") return stats.storyWins || 0;
  if (achievement.id === "collector") return stats.cores || 0;
  return 0;
}

function renderProgressList(containerId, items, claimed, progressGetter, claimHandler) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  items.forEach((item) => {
    const progress = Math.min(item.target, progressGetter(item));
    const done = progress >= item.target;
    const isClaimed = claimed.includes(item.id);
    const row = document.createElement("article");
    row.className = "progress-item";
    const title = document.createElement("strong");
    const detail = document.createElement("span");
    const bar = document.createElement("div");
    const fill = document.createElement("i");
    const button = document.createElement("button");

    title.textContent = language === "de" ? item.de : item.en;
    detail.textContent = `${t("lockedProgress")}: ${progress}/${item.target} / ${t("reward")}: ${item.reward}`;
    bar.className = "progress-bar";
    fill.style.width = `${(progress / item.target) * 100}%`;
    button.className = done && !isClaimed ? "primary" : "ghost";
    button.textContent = isClaimed ? t("claimed") : t("claim");
    button.disabled = !done || isClaimed;
    button.addEventListener("click", () => claimHandler(item));

    bar.appendChild(fill);
    row.append(title, detail, bar, button);
    container.appendChild(row);
  });
}

function renderMissions() {
  renderProgressList("missionsList", missions, claimedMissions, getMissionProgress, claimMission);
}

function renderAchievements() {
  renderProgressList("achievementList", achievements, claimedAchievements, getAchievementProgress, claimAchievement);
}

function claimMission(mission) {
  if (claimedMissions.includes(mission.id) || getMissionProgress(mission) < mission.target) return;
  claimedMissions.push(mission.id);
  credits += mission.reward;
  saveProgress();
  updateHud();
  renderMissions();
  showToast(`${t("unlockedToast")}: +${mission.reward}`);
}

function claimAchievement(achievement) {
  if (claimedAchievements.includes(achievement.id) || getAchievementProgress(achievement) < achievement.target) return;
  claimedAchievements.push(achievement.id);
  credits += achievement.reward;
  saveProgress();
  updateHud();
  renderAchievements();
  showToast(`${t("unlockedToast")}: +${achievement.reward}`);
}

function showToast(message) {
  const oldToast = document.querySelector(".toast");
  if (oldToast) oldToast.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2200);
}

function playTone(frequency, duration) {
  if (!soundEnabled) return;
  audioContext ||= new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  gain.gain.value = 0.045;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function unlockDebug() {
  if (debugPasswordInputEl.value !== debugPassword) {
    showToast(t("wrongPassword"));
    return;
  }
  debugUnlocked = true;
  debugLoginEl.classList.add("hidden");
  debugToolsEl.classList.remove("hidden");
  showToast(t("debugUnlocked"));
}

function addDebugCredits() {
  credits += 500;
  saveProgress();
  updateHud();
  renderShop();
  showToast("+500 Credits");
}

function unlockAllSkins() {
  ownedSkins = skins.map((skin) => skin.id);
  saveProgress();
  renderShop();
  renderAchievements();
  showToast(t("unlockSkins"));
}

function completeDebugMissions() {
  sessionCores = Math.max(sessionCores, 12);
  sessionPowerups = Math.max(sessionPowerups, 4);
  storyHits = Math.max(storyHits, 6);
  stats.cores = Math.max(stats.cores || 0, 20);
  stats.powerups = Math.max(stats.powerups || 0, 4);
  stats.storyHits = Math.max(stats.storyHits || 0, 6);
  saveProgress();
  renderMissions();
  renderAchievements();
  showToast(t("completeMissions"));
}

function debugWinStory() {
  mode = "story";
  score = Math.max(score, 500);
  endGame(true);
}

function resetProgress() {
  if (!window.confirm("Reset all local progress?")) return;
  localStorage.removeItem("neonSnakeCredits");
  localStorage.removeItem("neonSnakeBest");
  localStorage.removeItem("neonSnakeOwned");
  localStorage.removeItem("neonSnakeSkin");
  localStorage.removeItem("neonSnakeStats");
  localStorage.removeItem("neonSnakeMissions");
  localStorage.removeItem("neonSnakeAchievements");
  credits = 0;
  bestScore = 0;
  ownedSkins = ["volt"];
  activeSkin = "volt";
  stats = { cores: 0, powerups: 0, storyHits: 0, storyWins: 0 };
  claimedMissions = [];
  claimedAchievements = [];
  resetGame("arcade");
  saveProgress();
  renderShop();
  renderMissions();
  renderAchievements();
  showToast("Reset complete");
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
  ctx.save();
  if (Date.now() < shakeUntil) {
    ctx.translate((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);
  }
  drawBackground();
  drawFood();
  drawPowerUp();
  drawSnake(progress);
  drawParticles();
  ctx.restore();
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

function drawPowerUp() {
  if (!powerUp) return;
  const centerX = powerUp.x * tile + tile / 2;
  const centerY = powerUp.y * tile + tile / 2;
  const pulse = 1 + Math.sin(Date.now() / 130) * 0.16;
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(Date.now() / 420);
  ctx.scale(pulse, pulse);
  ctx.shadowColor = powerUp.color;
  ctx.shadowBlur = 24;
  ctx.fillStyle = powerUp.color;
  ctx.fillRect(-tile * 0.22, -tile * 0.22, tile * 0.44, tile * 0.44);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.strokeRect(-tile * 0.3, -tile * 0.3, tile * 0.6, tile * 0.6);
  ctx.restore();
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
    else if (state === "battle") goMain();
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
  event.preventDefault();
  const touch = event.changedTouches[0];
  touchStart = {
    x: touch.clientX,
    y: touch.clientY,
  };
}

function handleTouchMove(event) {
  event.preventDefault();
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

  const changed = Math.abs(dx) > Math.abs(dy)
    ? setDirection(dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 })
    : setDirection(dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });

  if (changed) stepImmediatelyFromSwipe();
}

function stepImmediatelyFromSwipe() {
  if (state !== "playing") return;
  const now = performance.now();
  if (now - lastTouchStepAt < 54) return;
  lastTouchStepAt = now;
  accumulator = 0;
  tick();
  draw(0);
}

document.getElementById("arcadeMode").addEventListener("click", () => openStart("arcade"));
document.getElementById("storyMode").addEventListener("click", playStoryIntro);
document.getElementById("skipCutscene").addEventListener("click", () => openStart("story"));
document.getElementById("attackBite").addEventListener("click", () => playerBattleMove("bite"));
document.getElementById("attackPulse").addEventListener("click", () => playerBattleMove("pulse"));
document.getElementById("attackCharge").addEventListener("click", () => playerBattleMove("charge"));
document.getElementById("battleHeal").addEventListener("click", () => playerBattleMove("heal"));
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
document.getElementById("openMissions").addEventListener("click", () => {
  renderMissions();
  openModal("missions");
});
document.getElementById("closeMissions").addEventListener("click", closeModal);
document.getElementById("openAchievements").addEventListener("click", () => {
  renderAchievements();
  openModal("achievements");
});
document.getElementById("closeAchievements").addEventListener("click", closeModal);
document.getElementById("openSettings").addEventListener("click", () => openModal("settings"));
document.getElementById("closeSettings").addEventListener("click", closeModal);
document.getElementById("openDebug").addEventListener("click", () => {
  debugLoginEl.classList.toggle("hidden", debugUnlocked);
  debugToolsEl.classList.toggle("hidden", !debugUnlocked);
  openModal("debug");
});
document.getElementById("closeDebug").addEventListener("click", closeModal);
document.getElementById("unlockDebug").addEventListener("click", unlockDebug);
document.getElementById("debugCredits").addEventListener("click", addDebugCredits);
document.getElementById("debugUnlockSkins").addEventListener("click", unlockAllSkins);
document.getElementById("debugCompleteMissions").addEventListener("click", completeDebugMissions);
document.getElementById("debugWinStory").addEventListener("click", debugWinStory);
document.getElementById("debugReset").addEventListener("click", resetProgress);
debugGodModeEl.addEventListener("change", () => {
  debugGodMode = debugGodModeEl.checked;
  showToast(`God Mode: ${debugGodMode ? "ON" : "OFF"}`);
});
difficultySelectEl.addEventListener("change", () => {
  difficulty = difficultySelectEl.value;
  saveProgress();
  showToast(t("difficulty"));
});
soundToggleEl.addEventListener("change", () => {
  soundEnabled = soundToggleEl.checked;
  saveProgress();
  playTone(520, 0.08);
});
document.getElementById("langToggle").addEventListener("click", () => {
  language = language === "de" ? "en" : "de";
  localStorage.setItem("neonSnakeLang", language);
  applyLanguage();
});

window.addEventListener("keydown", handleKey);
canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

resetGame("arcade");
applyLanguage();
loadLeaderboard();
draw(0);
