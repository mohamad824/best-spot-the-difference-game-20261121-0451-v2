// main.ts — program penyerahan entry "Pasar Lentera Senja" (Node 22, standard library saja).
// Menyalin game/ dan screenshots/ dari repo ke direktori output, lalu menulis dossier.json
// dengan buildDossier dari vendor/makefun-game.ts. Tidak pernah menghapus direktori output.

import { cpSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-game.ts";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

mkdirSync(outDir, { recursive: true });
mkdirSync(join(outDir, "game"), { recursive: true });
mkdirSync(join(outDir, "screenshots"), { recursive: true });

cpSync(join(repoRoot, "game"), join(outDir, "game"), { recursive: true });
cpSync(join(repoRoot, "screenshots"), join(outDir, "screenshots"), { recursive: true });

const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
});
writeFileSync(join(outDir, "dossier.json"), dossier);

// Verifikasi fungsional: dossier yang ditulis harus bisa dibaca kembali dan
// menyebutkan game/index.html; hitung juga file game yang disalin untuk log.
const written = readFileSync(join(outDir, "dossier.json"), "utf8");
if (!written.includes("game/index.html")) {
  throw new Error("dossier.json tidak menyebutkan game/index.html");
}
const shotFiles = readdirSync(join(outDir, "screenshots")).filter((f) => !f.startsWith("."));
const shotBytes = shotFiles.reduce((n, f) => n + statSync(join(outDir, "screenshots", f)).size, 0);
console.log(`Wrote ${outDir}/dossier.json (${dossier.length} bytes)`);
console.log(`Screenshots: ${shotFiles.length} file, ${shotBytes} bytes`);
