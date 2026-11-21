// scene-kios.js — menggambar Level 1 "Kios Lentera" (panel kiri asli / kanan berbeda).
// side "A" = asli, "B" = berisi 5 perbedaan. Koordinat sesuai levels.js.

import { sunsetSky, sun, paperLantern, marketCat, awning, stringLights } from "./scene-helpers.js";

export function drawKios(side) {
  const b = side === "B";
  const lanternTop = b ? "#2ec4b6" : "#e4572e";
  const pattern = b ? "dots" : "stripes";
  const appleCount = b ? 2 : 3;
  const flagDir = b ? -1 : 1;
  let apples = "";
  for (let i = 0; i < appleCount; i++) {
    apples += `<circle cx="${336 + i * 24}" cy="246" r="10" fill="#e63946"/><line x1="${336 + i * 24}" y1="238" x2="${340 + i * 24}" y2="232" stroke="#2a9d8f" stroke-width="2"/>`;
  }
  return `<svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kios Lentera">
  ${sunsetSky("sky1", "#ff9e5e", "#ff6b6b", "#7b2d8b")}
  ${sun(500, 78, 30, "#ffe8a3")}
  <g fill="#5b3a6e" opacity=".55"><rect x="0" y="150" width="90" height="120"/><rect x="95" y="130" width="70" height="140"/><rect x="520" y="140" width="80" height="130"/></g>
  ${stringLights(30)}
  ${paperLantern(118, 92, lanternTop, "stripes")}
  ${paperLantern(212, 182, "#f7b32b", pattern)}
  ${paperLantern(330, 92, "#e4572e", "stripes")}
  ${paperLantern(452, 150, "#2a9d8f", "dots")}
  <g><rect x="40" y="210" width="220" height="14" fill="#8a5a33"/><rect x="52" y="224" width="10" height="86" fill="#6b4423"/><rect x="238" y="224" width="10" height="86" fill="#6b4423"/>
  ${awning(36, 186, 228, "#e4572e", "#fff3d6")}
  <rect x="70" y="228" width="60" height="40" fill="#f4a261"/><rect x="150" y="228" width="60" height="40" fill="#e9c46a"/>
  <text x="150" y="252" font-size="15" text-anchor="middle" fill="#5a2d0c" font-family="Georgia,serif">LENTERA</text>
  <rect x="60" y="272" width="140" height="22" rx="4" fill="#fff3d6"/><text x="130" y="287" font-size="13" text-anchor="middle" fill="#5a2d0c" font-family="Georgia,serif">APEL 5rb • LENTERA 10rb</text></g>
  <g><rect x="300" y="230" width="180" height="12" fill="#8a5a33"/><rect x="312" y="242" width="10" height="70" fill="#6b4423"/><rect x="458" y="242" width="10" height="70" fill="#6b4423"/>
  ${awning(296, 206, 188, "#2a9d8f", "#fff3d6")}
  <ellipse cx="372" cy="252" rx="52" ry="14" fill="#c98f4e"/><ellipse cx="372" cy="248" rx="46" ry="10" fill="#e0aa6e"/>
  ${apples}</g>
  <g><line x1="522" y1="60" x2="522" y2="150" stroke="#5a3a22" stroke-width="4"/>
  <path d="M 522 62 L ${522 + 34 * flagDir} 72 L 522 84 Z" fill="#e63946"/></g>
  <rect x="0" y="310" width="600" height="110" fill="#4a3226"/>
  <rect x="0" y="310" width="600" height="10" fill="#6b4a33"/>
  <ellipse cx="120" cy="360" rx="90" ry="12" fill="#5d4030"/><ellipse cx="420" cy="375" rx="110" ry="12" fill="#5d4030"/>
  ${b ? "" : marketCat(472, 318, false)}
  <g><circle cx="90" cy="330" r="14" fill="#f7b32b"/><circle cx="250" cy="345" r="10" fill="#e4572e"/><circle cx="540" cy="340" r="12" fill="#2a9d8f"/></g>
  <text x="300" y="408" font-size="13" text-anchor="middle" fill="#ffd9a0" font-family="Georgia,serif">Pasar Lentera Senja — Kios Lentera</text>
  </svg>`;
}
