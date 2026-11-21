// screens.js — layar judul, menang level, gagal, dan menang akhir.
// Overlay HTML murni; logika permainan tetap di game.js.

export function titleScreenHtml() {
  return `<div class="overlay"><div class="panel title-panel">
    <div class="lantern-row">🏮 🏮 🏮</div>
    <h1>Pasar Lentera Senja</h1>
    <p class="tagline">Spot the Difference di pasar malam yang hangat</p>
    <div class="howto">
      <p><b>Cara main:</b> dua gambar nyaris identik — kiri asli (Original), kanan berbeda (Changed).</p>
      <p>🖱️ Klik perbedaan di panel mana pun &nbsp;·&nbsp; 🔍 Arahkan kursor: kaca pembesar &nbsp;·&nbsp; 💡 <b>H</b> hint (3/level) &nbsp;·&nbsp; <b>R</b> ulang level &nbsp;·&nbsp; <b>N</b> lanjut &nbsp;·&nbsp; <b>M</b> mute</p>
      <p>✅ Benar: +skor, +streak, +5 detik, nama temuan muncul di daftar bawah &nbsp;·&nbsp; ❌ Salah: −5 detik dan −1 nyawa (3 nyawa/level)</p>
      <p>3 level: Kios Lentera (5) → Toko Kue &amp; Mainan (7) → Gang Pasar Malam (9)</p>
    </div>
    <button id="startBtn" class="big-btn">▶ Mulai Bermain</button>
    <div class="level-pick">
      <button data-level="1" class="lvl-btn">Level 1</button>
      <button data-level="2" class="lvl-btn">Level 2</button>
      <button data-level="3" class="lvl-btn">Level 3</button>
    </div>
  </div></div>`;
}

export function levelWinHtml(stats) {
  const stars = "★".repeat(stats.stars) + "☆".repeat(3 - stats.stars);
  return `<div class="overlay"><div class="panel">
    <h1>🎉 Level Selesai!</h1>
    <div class="stars">${stars}</div>
    <p class="tagline">${stats.levelName} — semua ${stats.total} perbedaan ditemukan!</p>
    <table class="stats">
      <tr><td>Waktu tersisa</td><td><b>${stats.timeLeft}</b></td></tr>
      <tr><td>Skor level</td><td><b>${stats.levelScore}</b></td></tr>
      <tr><td>Akurasi klik</td><td><b>${stats.accuracy}%</b></td></tr>
      <tr><td>Streak terbaik</td><td><b>${stats.bestStreak}x</b></td></tr>
      <tr><td>Total skor</td><td><b>${stats.totalScore}</b></td></tr>
    </table>
    <button id="nextBtn" class="big-btn">▶ ${stats.isLast ? "Lihat Hasil Akhir (N)" : "Level Berikutnya (N)"}</button>
    <button id="replayBtn" class="ghost-btn">↻ Ulang Level (R)</button>
  </div></div>`;
}

export function levelFailHtml(levelName, reason) {
  const msg = reason === "lives"
    ? "Nyawamu habis — tiga klik salah mengakhiri level ini."
    : `Waktu ${levelName} habis sebelum semua perbedaan ditemukan.`;
  return `<div class="overlay"><div class="panel">
    <h1>${reason === "lives" ? "💔 Nyawa Habis!" : "⏰ Waktu Habis!"}</h1>
    <p class="tagline">${msg}</p>
    <p>Jangan menyerah — lentera masih menyala.</p>
    <button id="retryBtn" class="big-btn">↻ Coba Lagi (R)</button>
    <button id="titleBtn" class="ghost-btn">← Kembali ke Judul</button>
  </div></div>`;
}

export function gameWinHtml(stats) {
  const stars = "★".repeat(stats.stars) + "☆".repeat(3 - stats.stars);
  return `<div class="overlay"><div class="panel">
    <h1>🏆 Pasar Ditaklukkan!</h1>
    <div class="stars">${stars}</div>
    <p class="tagline">Kamu menemukan semua ${stats.totalFound} perbedaan di 3 level!</p>
    <div class="grade">${stats.grade}</div>
    <table class="stats">
      <tr><td>Total skor</td><td><b>${stats.totalScore}</b></td></tr>
      <tr><td>Akurasi keseluruhan</td><td><b>${stats.accuracy}%</b></td></tr>
      <tr><td>Streak terbaik</td><td><b>${stats.bestStreak}x</b></td></tr>
      <tr><td>Bintang</td><td><b>${stats.stars}/9</b></td></tr>
    </table>
    <button id="againBtn" class="big-btn">↻ Main Lagi</button>
  </div></div>`;
}
