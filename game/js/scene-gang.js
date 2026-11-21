// scene-gang.js — menggambar Level 3 "Gang Pasar Malam" (9 perbedaan kecil).
// side "A" = asli, "B" = berisi perbedaan. Koordinat sesuai levels.js.

import { sunsetSky, paperLantern, marketCat, stringLights } from "./scene-helpers.js";

export function drawGang(side) {
  const b = side === "B";
  const dumplings = b ? 3 : 5;
  const chilis = b ? 4 : 6;
  const apron = b ? "#2a9d8f" : "#e63946";
  let dumplingSvg = "";
  for (let i = 0; i < dumplings; i++) {
    dumplingSvg += `<ellipse cx="${160 + i * 18}" cy="262" rx="9" ry="7" fill="#fff3d6" stroke="#d9a066" stroke-width="1"/>`;
  }
  let chiliSvg = "";
  for (let i = 0; i < chilis; i++) {
    chiliSvg += `<ellipse cx="${482}" cy="${228 + i * 9}" rx="5" ry="8" fill="#e63946"/>`;
  }
  return `<svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gang Pasar Malam">
  ${sunsetSky("sky3", "#5b2a6e", "#c94f6d", "#2b1a3a")}
  <rect x="0" y="0" width="600" height="420" fill="#1d1030" opacity=".25"/>
  <g><rect x="0" y="60" width="150" height="260" fill="#7a4a3a"/><rect x="14" y="80" width="52" height="70" fill="#ffd166" opacity=".85"/>
  <rect x="14" y="80" width="52" height="70" fill="none" stroke="#5a3a22" stroke-width="3"/>
  <text x="82" y="142" font-size="20" text-anchor="middle" fill="#5a2d0c" font-family="Georgia,serif">${b ? "BAKSO" : "MIE"}</text>
  ${b ? `<path d="M 542 108 L 546 116 L 554 116 L 548 121 L 550 129 L 542 124 L 534 129 L 536 121 L 530 116 L 538 116 Z" fill="#ffd166"/>` : ""}
  <text x="542" y="140" font-size="11" text-anchor="middle" fill="#ffd9a0" font-family="Georgia,serif">TOKO</text></g>
  <g><rect x="430" y="60" width="170" height="260" fill="#6e3b2a"/><rect x="448" y="86" width="60" height="56" fill="#ffd166" opacity=".8"/>
  ${b ? `<rect x="448" y="86" width="60" height="56" fill="#5a3a22"/><line x1="448" y1="104" x2="508" y2="104" stroke="#3a2a1a" stroke-width="2"/><line x1="448" y1="122" x2="508" y2="122" stroke="#3a2a1a" stroke-width="2"/>` : `<line x1="448" y1="114" x2="508" y2="114" stroke="#5a3a22" stroke-width="2"/><line x1="478" y1="86" x2="478" y2="142" stroke="#5a3a22" stroke-width="2"/>`}</g>
  ${paperLantern(262, 112, "#e4572e", "stripes")}
  ${b ? `<line x1="262" y1="132" x2="262" y2="158" stroke="#e8a13a" stroke-width="3"/>` : `<line x1="262" y1="132" x2="262" y2="146" stroke="#e8a13a" stroke-width="3"/>`}
  ${paperLantern(400, 100, "#f7b32b", "dots")}
  ${stringLights(24)}
  <g><rect x="120" y="240" width="180" height="12" fill="#8a5a33"/><rect x="130" y="252" width="10" height="66" fill="#6b4423"/><rect x="280" y="252" width="10" height="66" fill="#6b4423"/>
  <ellipse cx="210" cy="252" rx="70" ry="12" fill="#9c9c9c"/><ellipse cx="210" cy="248" rx="62" ry="9" fill="#c0c0c0"/>
  ${dumplingSvg}</g>
  <g><circle cx="302" cy="188" r="14" fill="#f4a261"/><path d="M 288 182 Q 302 168 316 182 L 314 186 L 290 186 Z" fill="#3a2a1a"/>
  <rect x="288" y="202" width="28" height="34" fill="${apron}"/><rect x="288" y="202" width="28" height="8" fill="#fff3d6"/></g>
  <g><line x1="482" y1="210" x2="482" y2="300" stroke="#5a3a22" stroke-width="2"/>${chiliSvg}</g>
  ${marketCat(342, 302, b)}
  <rect x="0" y="318" width="600" height="102" fill="#3a2a3a"/>
  <ellipse cx="132" cy="332" rx="${b ? 26 : 40}" ry="9" fill="#7fb3d5" opacity=".55"/>
  <ellipse cx="460" cy="368" rx="70" ry="9" fill="#7fb3d5" opacity=".4"/>
  <circle cx="90" cy="360" r="8" fill="#ffd166"/><circle cx="520" cy="350" r="7" fill="#e4572e"/>
  <text x="300" y="408" font-size="13" text-anchor="middle" fill="#ffd9a0" font-family="Georgia,serif">Pasar Lentera Senja — Gang Pasar Malam</text>
  </svg>`;
}
