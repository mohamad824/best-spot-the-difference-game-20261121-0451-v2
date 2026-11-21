// timer-score.js — timer per level dan perhitungan skor, streak, bintang.
// Satu tugas: waktu dan angka. Tidak menyentuh DOM selain lewat callback.

export function createLevelTimer(seconds, onTick, onExpire) {
  let remaining = seconds;
  let id = null;
  let paused = false;
  return {
    get remaining() { return remaining; },
    get paused() { return paused; },
    start() {
      this.stop();
      id = setInterval(() => {
        if (paused) return;
        remaining -= 1;
        onTick(remaining);
        if (remaining <= 0) { this.stop(); onExpire(); }
      }, 1000);
    },
    stop() { if (id) { clearInterval(id); id = null; } },
    addSeconds(n) { remaining = Math.min(seconds, Math.max(0, remaining + n)); onTick(remaining); },
    subtractSeconds(n) { remaining = Math.max(0, remaining - n); onTick(remaining); },
    pause() { paused = true; },
    resume() { paused = false; },
  };
}

export function pointsForFind(streak) {
  return 100 + Math.min(streak, 8) * 20;
}

export function timeBonusPerFind() { return 5; }

export function wrongPenaltySeconds() { return 5; }

export function starsFor(accuracy, timeLeft, timeLimit) {
  const timeRatio = timeLeft / timeLimit;
  if (accuracy >= 0.9 && timeRatio >= 0.35) return 3;
  if (accuracy >= 0.75 && timeRatio >= 0.15) return 2;
  return 1;
}

export function gradeFor(totalScore, maxStars) {
  if (maxStars >= 9 && totalScore >= 2400) return "S — Master Pasar!";
  if (maxStars >= 7 && totalScore >= 1800) return "A — Pemburu Lentera";
  if (maxStars >= 5) return "B — Mata Elang";
  return "C — Terus Berlatih";
}

export function formatTime(seconds) {
  const s = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
