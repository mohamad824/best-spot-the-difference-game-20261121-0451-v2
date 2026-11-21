// hud.js — HUD atas: counter sisa, bar waktu, skor, streak, nyawa, hint, progres level.
// Semua teks dibuat besar dan kontras supaya terbaca saat screenshot diperkecil.

import { formatTime } from "./timer-score.js";

export function renderHud(state) {
  const level = state.level;
  const found = state.found.size;
  const total = level.diffs.length;
  const remain = total - found;
  const pct = Math.max(0, Math.min(100, (state.timeLeft / level.timeLimit) * 100));
  const low = pct <= 25 ? " low" : "";
  const dots = [1, 2, 3].map((n) => {
    const cls = n < state.levelIndex + 1 ? "done" : n === state.levelIndex + 1 ? "current" : "";
    return `<span class="dot ${cls}">${n}</span>`;
  }).join("");
  const hearts = [1, 2, 3].map((n) =>
    `<span class="heart ${n <= state.lives ? "alive" : "lost"}">♥</span>`).join("");
  const findDots = level.diffs.map((d) =>
    `<span class="find-dot ${state.found.has(d.id) ? "got" : ""}"></span>`).join("");
  return `<div class="hud">
    <div class="hud-left"><div class="game-name">🏮 Pasar Lentera Senja</div>
    <div class="level-dots">${dots}<span class="level-name">Level ${level.id} · ${level.name}</span></div>
    <div class="hearts" title="Nyawa — klik salah mengurangi 1">${hearts}<span class="lives-label">Nyawa</span></div></div>
    <div class="hud-center">
      <div class="counter" id="counter">Sisa ${remain} dari ${total}</div>
      <div class="found-sub">DITEMUKAN ${found} DARI ${total} &nbsp;·&nbsp; ${findDots}</div>
      <div class="timebar"><div class="timefill${low}" style="width:${pct}%"></div></div>
      <div class="timer-text">⏱ ${formatTime(state.timeLeft)}</div>
    </div>
    <div class="hud-right">
      <div class="score">Skor <b>${state.score}</b></div>
      <div class="streak">🔥 Streak ${state.streak}x &nbsp;·&nbsp; Kombo x${Math.min(state.streak, 8) + 1}</div>
      <div class="hints"><button id="hintBtn" class="hint-btn">💡 Hint: ${state.hintsLeft}</button> <span class="key">H</span></div>
      <button id="muteBtn" class="mute-btn" title="Mute (M)">${state.muted ? "🔇" : "🔊"}</button>
    </div>
  </div>
  <div class="found-line">Akurasi ${state.accuracy()}% &nbsp;·&nbsp; Klik salah −5 detik &amp; −1 nyawa &nbsp;·&nbsp; Arahkan kursor ke gambar untuk kaca pembesar</div>`;
}

export function flashMessage(text) {
  const el = document.getElementById("flash");
  if (!el) return;
  el.textContent = text;
  el.classList.remove("show");
  void el.offsetWidth;
  el.classList.add("show");
}
