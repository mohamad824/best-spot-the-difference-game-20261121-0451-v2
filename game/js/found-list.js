// found-list.js — daftar temuan BERNAMA di bawah panel.
// Nama perbedaan muncul saat ditemukan; yang belum ditemukan tampil sebagai "???".

export function renderFoundList(level, foundIds) {
  const items = level.diffs.map((d) => {
    const found = foundIds.has(d.id);
    return `<span class="found-item ${found ? "got" : "missing"}">${found ? `✓ ${d.label}` : "• ???"}</span>`;
  }).join("");
  return `<div class="found-list"><span class="found-list-title">Sudah ketemu:</span>${items}</div>`;
}
