// game.js — orkestrator utama Pasar Lentera Senja: state, render, klik, hint, timer.
// Satu-satunya file yang merangkai semua modul; logika menang/kalah tinggal di sini.

import { LEVELS, levelById } from "./levels.js";
import { sceneWithMarkers } from "./scenes.js";
import { renderHud } from "./hud.js";
import { titleScreenHtml, levelWinHtml, levelFailHtml, gameWinHtml } from "./screens.js";
import { attachPanelClicks, attachKeyboard, findDiffAt } from "./input.js";
import { renderFoundList } from "./found-list.js";
import { attachMagnifier } from "./magnifier.js";
import { createLevelTimer, pointsForFind, timeBonusPerFind, wrongPenaltySeconds, starsFor, gradeFor, formatTime } from "./timer-score.js";
import * as audio from "./audio.js";

const state = {
  screen: "title",
  levelIndex: 0,
  found: new Set(),
  score: 0,
  levelScore: 0,
  streak: 0,
  bestStreak: 0,
  hintsLeft: 3,
  lives: 3,
  failReason: null,
  clicks: 0,
  correctClicks: 0,
  totalClicks: 0,
  totalCorrect: 0,
  timeLeft: 0,
  totalStars: 0,
  muted: false,
  hintDiff: null,
  hintTimer: null,
  timer: null,
};

export function getState() { return state; }
let level = LEVELS[0];
state.accuracy = function () {
  return state.totalClicks ? Math.round((state.totalCorrect / state.totalClicks) * 100) : 100;
};

const params = new URLSearchParams(location.search);
const startPaused = params.get("pause") === "1";

function render() {
  const app = document.getElementById("app");
  if (state.screen === "title") {
    app.innerHTML = `<div class="title-bg">${titleScreenHtml()}</div>`;
    bindTitle();
    return;
  }
  const lv = level;
  const foundDiffs = lv.diffs.filter((d) => state.found.has(d.id));
  const left = sceneWithMarkers(lv.id, "A", foundDiffs, state.hintDiff);
  const right = sceneWithMarkers(lv.id, "B", foundDiffs, state.hintDiff);
  let overlay = "";
  if (state.screen === "levelWin") overlay = levelWinHtml(lastWinStats);
  else if (state.screen === "levelFail") overlay = levelFailHtml(lv.name, state.failReason);
  else if (state.screen === "gameWin") overlay = gameWinHtml(lastGameStats);
  app.innerHTML = `${renderHud(state)}
    <div class="boards" id="boards">
      <div class="panel" id="panelA"><div class="panel-tag">ASLI · Original</div>${left}</div>
      <div class="panel" id="panelB"><div class="panel-tag">BERBEDA · Changed</div>${right}</div>
    </div>
    ${renderFoundList(lv, state.found)}
    <div id="flash" class="flash"></div>${overlay}`;
  attachPanelClicks(onPanelClick);
  attachMagnifier();
  const lens = document.getElementById("magnifier");
  if (lens && state.screen !== "playing") lens.style.display = "none";
  bindOverlay();
  const muteBtn = document.getElementById("muteBtn");
  if (muteBtn) muteBtn.addEventListener("click", toggleMute);
  const hintBtn = document.getElementById("hintBtn");
  if (hintBtn) hintBtn.addEventListener("click", useHint);
  if (state.flash) {
    const fl = document.getElementById("flash");
    if (fl) { fl.textContent = state.flash; fl.classList.add("show"); }
  }
}

let lastWinStats = null;
let lastGameStats = null;

function startLevel(idx, presetFound) {
  state.levelIndex = idx;
  level = LEVELS[idx];
  state.level = level;
  state.found = new Set(presetFound || []);
  state.levelScore = 0;
  state.streak = 0;
  state.hintsLeft = 3;
  state.lives = 3;
  state.failReason = null;
  state.clicks = 0;
  state.correctClicks = 0;
  state.hintDiff = null;
  state.screen = "playing";
  state.timeLeft = level.timeLimit;
  if (state.timer) state.timer.stop();
  state.timer = createLevelTimer(level.timeLimit,
    (r) => { state.timeLeft = r; updateTimerDom(); },
    () => onLevelFail("time"));
  if (!startPaused) state.timer.start();
  else state.timer.pause();
  render();
}

function updateTimerDom() {
  const t = document.querySelector(".timer-text");
  if (t) t.textContent = `⏱ ${formatTime(state.timeLeft)}`;
  const f = document.querySelector(".timefill");
  if (f) {
    const pct = Math.max(0, (state.timeLeft / level.timeLimit) * 100);
    f.style.width = `${pct}%`;
    f.classList.toggle("low", pct <= 25);
  }
}

function onPanelClick(x, y) {
  if (state.screen !== "playing") return;
  audio.unlockAudio();
  state.clicks++; state.totalClicks++;
  const diff = findDiffAt(level.diffs, state.found, x, y);
  if (diff) {
    state.found.add(diff.id);
    state.correctClicks++; state.totalCorrect++;
    state.streak++; state.bestStreak = Math.max(state.bestStreak, state.streak);
    const pts = pointsForFind(state.streak);
    state.score += pts; state.levelScore += pts;
    state.timer.addSeconds(timeBonusPerFind());
    audio.playCorrect();
    state.flash = `✅ ${diff.label}! +${pts} poin, +5 detik`;
    clearHint();
    render();
    if (state.found.size === level.diffs.length) onLevelWin();
  } else {
    state.streak = 0;
    state.lives--;
    state.timer.subtractSeconds(wrongPenaltySeconds());
    audio.playWrong();
    state.flash = state.lives > 0
      ? `❌ Bukan di situ — −5 detik, −1 nyawa (sisa ${state.lives})!`
      : "💔 Nyawa habis!";
    const b = document.getElementById("boards");
    if (b) { b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); }
    if (state.lives <= 0) { onLevelFail("lives"); return; }
    render();
  }
}

function clearHint() {
  state.hintDiff = null;
  if (state.hintTimer) { clearTimeout(state.hintTimer); state.hintTimer = null; }
}

function useHint() {
  if (state.screen !== "playing") return;
  if (state.hintsLeft <= 0) { state.flash = "💡 Hint habis untuk level ini!"; render(); return; }
  const remaining = level.diffs.filter((d) => !state.found.has(d.id));
  if (!remaining.length) return;
  state.hintsLeft--;
  state.hintDiff = remaining[0];
  audio.playHint();
  state.flash = "💡 Hint: lihat lingkaran kuning berkedip!";
  render();
  state.hintTimer = setTimeout(() => { state.hintDiff = null; if (state.screen === "playing") render(); }, 4000);
}

function onLevelWin() {
  if (state.timer) state.timer.stop();
  audio.playWin();
  const acc = state.clicks ? state.correctClicks / state.clicks : 1;
  const stars = starsFor(acc, state.timeLeft, level.timeLimit);
  state.totalStars += stars;
  lastWinStats = {
    levelName: level.name, total: level.diffs.length, stars,
    timeLeft: formatTime(state.timeLeft), levelScore: state.levelScore,
    accuracy: Math.round(acc * 100), bestStreak: state.bestStreak,
    totalScore: state.score, isLast: state.levelIndex === LEVELS.length - 1,
  };
  state.screen = "levelWin";
  render();
}

function onLevelFail(reason) {
  if (state.timer) state.timer.stop();
  audio.playLose();
  state.failReason = reason;
  state.screen = "levelFail";
  render();
}

function nextLevel() {
  if (state.screen === "levelWin") {
    if (state.levelIndex === LEVELS.length - 1) showGameWin();
    else startLevel(state.levelIndex + 1);
  } else if (state.screen === "gameWin") startLevel(0);
}

function showGameWin() {
  const totalFound = LEVELS.reduce((n, l) => n + l.diffs.length, 0);
  lastGameStats = {
    totalFound, totalScore: state.score, stars: state.totalStars,
    accuracy: state.accuracy(), bestStreak: state.bestStreak,
    grade: gradeFor(state.score, state.totalStars),
  };
  state.screen = "gameWin";
  render();
}

function toggleMute() {
  state.muted = audio.setMuted(!state.muted);
  render();
}

function bindTitle() {
  const s = document.getElementById("startBtn");
  if (s) s.addEventListener("click", () => { audio.unlockAudio(); audio.playClick(); audio.startMusic(); startLevel(0); });
  document.querySelectorAll(".lvl-btn").forEach((b) =>
    b.addEventListener("click", () => { audio.unlockAudio(); audio.startMusic(); startLevel(Number(b.dataset.level) - 1); }));
}

function bindOverlay() {
  const next = document.getElementById("nextBtn");
  if (next) next.addEventListener("click", nextLevel);
  const replay = document.getElementById("replayBtn");
  if (replay) replay.addEventListener("click", () => startLevel(state.levelIndex));
  const retry = document.getElementById("retryBtn");
  if (retry) retry.addEventListener("click", () => startLevel(state.levelIndex));
  const title = document.getElementById("titleBtn");
  if (title) title.addEventListener("click", () => { state.screen = "title"; render(); });
  const again = document.getElementById("againBtn");
  if (again) again.addEventListener("click", () => { state.score = 0; state.totalStars = 0; state.totalClicks = 0; state.totalCorrect = 0; state.bestStreak = 0; startLevel(0); });
}

attachKeyboard({
  hint: useHint,
  restart: () => { if (state.screen === "playing" || state.screen === "levelFail" || state.screen === "levelWin") startLevel(state.levelIndex); },
  next: () => { if (state.screen === "levelWin" || state.screen === "gameWin") nextLevel(); },
  mute: toggleMute,
  pickLevel: (n) => { if (state.screen === "title") startLevel(n - 1); else if (state.screen === "playing") startLevel(n - 1); },
  start: () => { if (state.screen === "title") startLevel(0); },
});

window.__game = { state, LEVELS, startLevel, useHint, levelById };

// Boot: dukung ?level=N&found=i,j&pause=1 untuk masuk langsung ke tengah permainan.
const bootLevel = params.get("level");
if (bootLevel) {
  const idx = Math.max(0, Math.min(2, Number(bootLevel) - 1));
  const foundParam = params.get("found");
  const preset = foundParam ? foundParam.split(",").map((i) => LEVELS[idx].diffs[Number(i)].id) : [];
  startLevel(idx, preset);
} else {
  render();
}
