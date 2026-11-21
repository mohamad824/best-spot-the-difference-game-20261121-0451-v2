// input.js — input klik mouse di kedua panel dan keyboard.
// Mengubah klik layar menjadi koordinat viewBox SVG 600x420, lalu menyerahkan ke game.

export function svgCoords(event, svgEl) {
  const rect = svgEl.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 600;
  const y = ((event.clientY - rect.top) / rect.height) * 420;
  return { x, y };
}

export function findDiffAt(diffs, foundIds, x, y) {
  for (const d of diffs) {
    if (foundIds.has(d.id)) continue;
    const dx = x - d.x, dy = y - d.y;
    if (dx * dx + dy * dy <= (d.r + 8) * (d.r + 8)) return d;
  }
  return null;
}

export function attachPanelClicks(onPanelClick) {
  for (const side of ["A", "B"]) {
    const el = document.getElementById(`panel${side}`);
    if (!el) continue;
    el.addEventListener("click", (ev) => {
      const svg = el.querySelector("svg");
      if (!svg) return;
      const { x, y } = svgCoords(ev, svg);
      onPanelClick(x, y, ev.clientX, ev.clientY);
    });
  }
}

export function attachKeyboard(handlers) {
  document.addEventListener("keydown", (ev) => {
    if (ev.repeat) return;
    const k = ev.key.toLowerCase();
    if (k === "h" && handlers.hint) handlers.hint();
    else if (k === "r" && handlers.restart) handlers.restart();
    else if (k === "n" && handlers.next) handlers.next();
    else if (k === "m" && handlers.mute) handlers.mute();
    else if (k === "1" && handlers.pickLevel) handlers.pickLevel(1);
    else if (k === "2" && handlers.pickLevel) handlers.pickLevel(2);
    else if (k === "3" && handlers.pickLevel) handlers.pickLevel(3);
    else if (k === "enter" && handlers.start) handlers.start();
  });
}
