// scene-helpers.js — potongan gambar bersama untuk ketiga scene pasar senja.
// Semua bentuk digambar tangan lewat SVG: langit senja, lentera kertas, kucing pasar.

export function sunsetSky(id, top, mid, bottom) {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${top}"/><stop offset=".55" stop-color="${mid}"/>
    <stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
    <rect x="0" y="0" width="600" height="420" fill="url(#${id})"/>`;
}

export function sun(x, y, r, color) {
  return `<circle cx="${x}" cy="${y}" r="${r + 14}" fill="${color}" opacity=".25"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
}

export function paperLantern(x, y, color, pattern) {
  const deco = pattern === "dots"
    ? `<circle cx="${x - 8}" cy="${y}" r="3" fill="#fff3d6"/><circle cx="${x + 8}" cy="${y}" r="3" fill="#fff3d6"/><circle cx="${x}" cy="${y - 8}" r="3" fill="#fff3d6"/>`
    : `<line x1="${x - 16}" y1="${y - 6}" x2="${x + 16}" y2="${y - 6}" stroke="#fff3d6" stroke-width="3"/>
       <line x1="${x - 16}" y1="${y + 6}" x2="${x + 16}" y2="${y + 6}" stroke="#fff3d6" stroke-width="3"/>`;
  return `<g class="sway"><line x1="${x}" y1="${y - 34}" x2="${x}" y2="${y - 16}" stroke="#5a3a22" stroke-width="2"/>
    <ellipse cx="${x}" cy="${y}" rx="20" ry="17" fill="${color}" stroke="#7a2e1d" stroke-width="2"/>
    <rect x="${x - 7}" y="${y - 20}" width="14" height="5" fill="#f7c948"/>
    <rect x="${x - 7}" y="${y + 15}" width="14" height="5" fill="#f7c948"/>${deco}
    <line x1="${x}" y1="${y + 20}" x2="${x}" y2="${y + 34}" stroke="#e8a13a" stroke-width="2"/></g>`;
}

export function marketCat(x, y, tailUp) {
  const tail = tailUp
    ? `<path d="M ${x + 16} ${y + 8} Q ${x + 30} ${y - 14} ${x + 24} ${y - 26}" stroke="#2b2b33" stroke-width="5" fill="none" stroke-linecap="round"/>`
    : `<path d="M ${x + 16} ${y + 8} Q ${x + 32} ${y + 12} ${x + 30} ${y + 2}" stroke="#2b2b33" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  return `<g><ellipse cx="${x}" cy="${y + 12}" rx="20" ry="11" fill="#2b2b33"/>${tail}
    <circle cx="${x - 12}" cy="${y - 2}" r="11" fill="#2b2b33"/>
    <path d="M ${x - 20} ${y - 10} L ${x - 17} ${y - 20} L ${x - 12} ${y - 11} Z" fill="#2b2b33"/>
    <path d="M ${x - 6} ${y - 11} L ${x - 3} ${y - 21} L ${x + 1} ${y - 10} Z" fill="#2b2b33"/>
    <circle cx="${x - 15}" cy="${y - 3}" r="1.6" fill="#ffd166"/><circle cx="${x - 8}" cy="${y - 3}" r="1.6" fill="#ffd166"/></g>`;
}

export function awning(x, y, w, c1, c2) {
  let stripes = "";
  for (let i = 0; i < 6; i++) {
    stripes += `<rect x="${x + i * (w / 6)}" y="${y}" width="${w / 6}" height="26" fill="${i % 2 ? c1 : c2}"/>`;
  }
  return `<g>${stripes}<rect x="${x}" y="${y + 24}" width="${w}" height="5" rx="2" fill="#5a3a22"/></g>`;
}

export function stringLights(y) {
  let bulbs = "";
  for (let x = 20; x <= 580; x += 40) {
    const c = ["#ffd166", "#ff8fa3", "#7fe0c3", "#ffb703"][Math.floor(x / 40) % 4];
    bulbs += `<circle cx="${x}" cy="${y + 6}" r="5" fill="${c}"/><line x1="${x}" y1="${y}" x2="${x}" y2="${y + 2}" stroke="#3a2a1a" stroke-width="1.5"/>`;
  }
  return `<path d="M 0 ${y} Q 300 ${y + 26} 600 ${y}" stroke="#3a2a1a" stroke-width="2" fill="none"/>${bulbs}`;
}
