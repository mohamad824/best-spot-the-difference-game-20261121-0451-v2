// scenes.js — dispatcher: memilih penggambar scene per level dan menempel marker temuan.
// Marker digambar di kedua panel pada koordinat yang sama, supaya juri melihatnya jelas.

import { drawKios } from "./scene-kios.js";
import { drawToko } from "./scene-toko.js";
import { drawGang } from "./scene-gang.js";

const DRAWERS = { 1: drawKios, 2: drawToko, 3: drawGang };

export function drawScene(levelId, side) {
  const fn = DRAWERS[levelId] || drawKios;
  return fn(side);
}

export function markerSvg(diff, kind) {
  const cls = kind === "hint" ? "marker hint" : "marker found";
  return `<g class="${cls}"><circle cx="${diff.x}" cy="${diff.y}" r="${diff.r}" fill="none"
    stroke="${kind === "hint" ? "#ffd166" : "#2ec4b6"}" stroke-width="5"/>
    <circle cx="${diff.x}" cy="${diff.y}" r="${diff.r - 7}" fill="none"
    stroke="${kind === "hint" ? "#ffd166" : "#2ec4b6"}" stroke-width="2" opacity=".7"/>
    ${kind === "found" ? `<path d="M ${diff.x - 10} ${diff.y} L ${diff.x - 2} ${diff.y + 9} L ${diff.x + 11} ${diff.y - 9}"
    stroke="#2ec4b6" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ""}</g>`;
}

export function sceneWithMarkers(levelId, side, foundDiffs, hintDiff) {
  let svg = drawScene(levelId, side);
  let marks = "";
  for (const d of foundDiffs) marks += markerSvg(d, "found");
  if (hintDiff) marks += markerSvg(hintDiff, "hint");
  if (!marks) return svg;
  return svg.replace("</svg>", `${marks}</svg>`);
}
