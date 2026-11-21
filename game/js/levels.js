// levels.js — data tiap level: nama, waktu, dan daftar perbedaan tetap (deterministik).
// Koordinat dalam viewBox SVG 600x420; sama untuk panel kiri dan kanan.

export const LEVELS = [
  {
    id: 1,
    name: "Kios Lentera",
    subtitle: "Close-up satu lapak pasar — lentera, apel, kucing, spanduk harga. 5 perbedaan.",
    timeLimit: 180,
    diffs: [
      { id: "l1-lantern-color", x: 118, y: 92, r: 30, label: "Warna lentera atas" },
      { id: "l1-apple", x: 360, y: 246, r: 30, label: "Jumlah apel di keranjang" },
      { id: "l1-cat", x: 472, y: 318, r: 30, label: "Kucing pasar hilang" },
      { id: "l1-flag", x: 522, y: 88, r: 28, label: "Arah bendera kios" },
      { id: "l1-pattern", x: 212, y: 182, r: 30, label: "Corak lentera tengah" },
    ],
  },
  {
    id: 2,
    name: "Toko Kue & Mainan",
    subtitle: "Interior hangat toko kue dan mainan — etalase, boneka, balon, jam. 7 perbedaan.",
    timeLimit: 150,
    diffs: [
      { id: "l2-cherry", x: 112, y: 238, r: 28, label: "Ceri di atas kue tart" },
      { id: "l2-clock", x: 212, y: 92, r: 28, label: "Jarum jam dinding" },
      { id: "l2-balloon", x: 312, y: 148, r: 30, label: "Warna balon melayang" },
      { id: "l2-doll", x: 432, y: 110, r: 28, label: "Boneka di rak hilang" },
      { id: "l2-teddy", x: 440, y: 292, r: 28, label: "Warna pita boneka beruang" },
      { id: "l2-cat", x: 152, y: 332, r: 28, label: "Kucing toko di atas karpet" },
      { id: "l2-lamp", x: 542, y: 88, r: 26, label: "Warna lampu gantung" },
    ],
  },
  {
    id: 3,
    name: "Gang Pasar Malam",
    subtitle: "Gang sempit penuh kios dan aroma masakan — 9 perbedaan, tersulit.",
    timeLimit: 150,
    diffs: [
      { id: "l3-sign", x: 82, y: 142, r: 26, label: "Tulisan papan kios" },
      { id: "l3-dumpling", x: 182, y: 262, r: 26, label: "Jumlah pangsit di kukusan" },
      { id: "l3-tassel", x: 262, y: 112, r: 26, label: "Rumbai lentera lebih panjang" },
      { id: "l3-tail", x: 342, y: 302, r: 26, label: "Ekor kucing terangkat" },
      { id: "l3-shutter", x: 478, y: 114, r: 26, label: "Jendela tertutup" },
      { id: "l3-chili", x: 482, y: 252, r: 26, label: "Untaian cabai berkurang" },
      { id: "l3-star", x: 542, y: 122, r: 24, label: "Bintang di papan nama" },
      { id: "l3-puddle", x: 132, y: 332, r: 26, label: "Genangan air berubah bentuk" },
      { id: "l3-apron", x: 302, y: 202, r: 26, label: "Warna celemek pedagang" },
    ],
  },
];

export function levelById(id) {
  return LEVELS.find((l) => l.id === id) || LEVELS[0];
}

export function totalDiffs() {
  return LEVELS.reduce((n, l) => n + l.diffs.length, 0);
}
