// scene-toko.js — menggambar Level 2 "Toko Kue & Mainan" (interior hangat, 7 perbedaan).
// side "A" = asli, "B" = berisi perbedaan. Koordinat sesuai levels.js. Karya orisinal.

import { marketCat } from "./scene-helpers.js";

export function drawToko(side) {
  const b = side === "B";
  const cherryCount = b ? 2 : 3;
  const balloonColor = b ? "#2ec4b6" : "#e63946";
  const lampColor = b ? "#2a9d8f" : "#f7b32b";
  const bowColor = b ? "#2a9d8f" : "#e63946";
  let cherries = "";
  for (let i = 0; i < cherryCount; i++) {
    cherries += `<circle cx="${96 + i * 26}" cy="232" r="6" fill="#e63946"/><line x1="${96 + i * 26}" y1="226" x2="${100 + i * 26}" y2="220" stroke="#2a9d8f" stroke-width="2"/>`;
  }
  const clockHands = b
    ? `<line x1="212" y1="92" x2="212" y2="74" stroke="#2b2b33" stroke-width="3"/><line x1="212" y1="92" x2="228" y2="98" stroke="#2b2b33" stroke-width="3"/>`
    : `<line x1="212" y1="92" x2="212" y2="74" stroke="#2b2b33" stroke-width="3"/><line x1="212" y1="92" x2="198" y2="98" stroke="#2b2b33" stroke-width="3"/>`;
  return `<svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Toko Kue dan Mainan">
  <defs><linearGradient id="wall2" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffe8c2"/><stop offset="1" stop-color="#f7c9a0"/></linearGradient></defs>
  <rect x="0" y="0" width="600" height="420" fill="url(#wall2)"/>
  <rect x="0" y="330" width="600" height="90" fill="#8a5a33"/>
  <rect x="0" y="330" width="600" height="8" fill="#6b4423"/>
  <rect x="0" y="352" width="600" height="6" fill="#a9713a" opacity=".6"/>
  <ellipse cx="152" cy="348" rx="86" ry="14" fill="#e63946" opacity=".85"/>
  <ellipse cx="152" cy="348" rx="66" ry="9" fill="#ff8fa3" opacity=".8"/>
  <g><circle cx="212" cy="92" r="30" fill="#fffdf5" stroke="#5a3a22" stroke-width="4"/>
  <circle cx="212" cy="92" r="3" fill="#2b2b33"/>${clockHands}
  <circle cx="212" cy="66" r="2" fill="#2b2b33"/><circle cx="238" cy="92" r="2" fill="#2b2b33"/><circle cx="212" cy="118" r="2" fill="#2b2b33"/></g>
  <g><line x1="542" y1="0" x2="542" y2="58" stroke="#5a3a22" stroke-width="3"/>
  <path d="M 516 58 L 568 58 L 558 88 L 526 88 Z" fill="${lampColor}" stroke="#5a3a22" stroke-width="2"/>
  <circle cx="542" cy="92" r="10" fill="#ffe8a3" opacity=".9"/></g>
  <g><ellipse cx="312" cy="148" rx="22" ry="28" fill="${balloonColor}"/>
  <path d="M 312 176 L 306 186 L 318 186 Z" fill="${balloonColor}"/>
  <path d="M 312 186 Q 306 200 312 212" stroke="#5a3a22" stroke-width="1.5" fill="none"/>
  <ellipse cx="304" cy="138" rx="6" ry="9" fill="#ffffff" opacity=".5"/></g>
  <g><rect x="36" y="200" width="200" height="130" fill="#fffdf5" stroke="#8a5a33" stroke-width="3"/>
  <rect x="36" y="200" width="200" height="130" fill="#bfe3ff" opacity=".18"/>
  <line x1="36" y1="262" x2="236" y2="262" stroke="#8a5a33" stroke-width="3"/>
  <rect x="52" y="276" width="52" height="34" fill="#f7b32b"/><rect x="120" y="276" width="52" height="34" fill="#ff8fa3"/>
  <rect x="52" y="228" width="120" height="26" fill="#fff3d6" stroke="#d9a066" stroke-width="2"/>
  <rect x="60" y="216" width="104" height="12" fill="#f4a261"/>${cherries}
  <text x="136" y="200" font-size="12" text-anchor="middle" fill="#5a2d0c" font-family="Georgia,serif">KUE • Rp10rb</text></g>
  <g><rect x="400" y="120" width="180" height="10" fill="#8a5a33"/><rect x="400" y="200" width="180" height="10" fill="#8a5a33"/>
  ${b ? "" : `<g><circle cx="432" cy="100" r="16" fill="#ff8fa3"/><path d="M 416 92 Q 432 76 448 92 L 446 106 L 418 106 Z" fill="#e63946"/>
  <circle cx="426" cy="100" r="2" fill="#2b2b33"/><circle cx="438" cy="100" r="2" fill="#2b2b33"/>
  <rect x="420" y="114" width="24" height="26" fill="#7fb3d5"/></g>`}
  <g><rect x="470" y="126" width="34" height="44" fill="#2a9d8f"/><rect x="478" y="118" width="18" height="10" fill="#2a9d8f"/>
  <circle cx="480" cy="140" r="2" fill="#fff"/><circle cx="494" cy="140" r="2" fill="#fff"/></g>
  <g><circle cx="540" cy="142" r="14" fill="#f7b32b"/><path d="M 526 142 L 540 128 L 554 142 L 540 156 Z" fill="#e4572e"/></g></g>
  <g><rect x="400" y="230" width="180" height="100" fill="#c98f4e" stroke="#6b4423" stroke-width="2"/>
  <rect x="400" y="230" width="180" height="12" fill="#a9713a"/>
  <circle cx="440" cy="290" r="18" fill="#8a5a33"/><circle cx="428" cy="274" r="8" fill="#8a5a33"/><circle cx="452" cy="274" r="8" fill="#8a5a33"/>
  <circle cx="434" cy="288" r="2" fill="#2b2b33"/><circle cx="446" cy="288" r="2" fill="#2b2b33"/>
  <path d="M 424 306 L 456 306 L 450 318 L 430 318 Z" fill="${bowColor}"/>
  <circle cx="540" cy="290" r="16" fill="#e9c46a"/><rect x="524" y="306" width="32" height="14" fill="#e4572e"/></g>
  ${b ? "" : marketCat(152, 332, false)}
  <text x="300" y="408" font-size="13" text-anchor="middle" fill="#7a4a22" font-family="Georgia,serif">Pasar Lentera Senja — Toko Kue &amp; Mainan</text>
  </svg>`;
}
