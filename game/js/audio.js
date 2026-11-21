// audio.js — semua suara disintesis WebAudio di dalam kode, tanpa file suara.
// Nada benar, nada salah, hint, menang, dan musik latar pentatonik lembut (bisa di-mute).

let ctx = null;
let muted = false;
let musicTimer = null;
let musicStep = 0;

const SCALE = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];

export function isMuted() { return muted; }

export function setMuted(m) {
  muted = m;
  if (muted) stopMusic();
  else startMusic();
  return muted;
}

function ensureCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function unlockAudio() { try { ensureCtx(); } catch (e) { /* audio tidak tersedia */ } }

function tone(freq, start, dur, type, vol) {
  if (muted) return;
  try {
    const ac = ensureCtx();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type || "sine";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, ac.currentTime + start);
    g.gain.exponentialRampToValueAtTime(vol || 0.18, ac.currentTime + start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + start + dur);
    o.connect(g).connect(ac.destination);
    o.start(ac.currentTime + start);
    o.stop(ac.currentTime + start + dur + 0.05);
  } catch (e) { /* abaikan */ }
}

export function playCorrect() { tone(880, 0, 0.16, "sine", 0.22); tone(1318.5, 0.09, 0.24, "sine", 0.2); }

export function playWrong() { tone(160, 0, 0.22, "sawtooth", 0.12); tone(110, 0.08, 0.26, "sawtooth", 0.1); }

export function playHint() { tone(1046.5, 0, 0.14, "triangle", 0.16); tone(1568, 0.1, 0.2, "triangle", 0.14); }

export function playClick() { tone(660, 0, 0.07, "triangle", 0.1); }

export function playWin() {
  [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => tone(f, i * 0.12, 0.3, "sine", 0.2));
}

export function playLose() { [392, 330, 262].forEach((f, i) => tone(f, i * 0.16, 0.3, "triangle", 0.14)); }

export function startMusic() {
  if (muted || musicTimer) return;
  musicTimer = setInterval(() => {
    if (muted) return;
    const f = SCALE[musicStep % SCALE.length];
    tone(f, 0, 0.9, "sine", 0.045);
    if (musicStep % 4 === 2) tone(f / 2, 0, 1.1, "sine", 0.035);
    musicStep++;
  }, 620);
}

export function stopMusic() {
  if (musicTimer) { clearInterval(musicTimer); musicTimer = null; }
}
