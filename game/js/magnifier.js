// magnifier.js — kaca pembesar yang mengikuti kursor di atas panel.
// Menyalin SVG panel ke dalam lensa bundar dengan perbesaran 2x, tanpa file tambahan.

export function attachMagnifier() {
  let lens = document.getElementById("magnifier");
  if (!lens) {
    lens = document.createElement("div");
    lens.id = "magnifier";
    lens.innerHTML = `<div class="lens-inner"></div>`;
    document.body.appendChild(lens);
  }
  const inner = lens.querySelector(".lens-inner");
  for (const side of ["A", "B"]) {
    const panel = document.getElementById(`panel${side}`);
    if (!panel) continue;
    panel.addEventListener("mousemove", (ev) => {
      const svg = panel.querySelector("svg");
      if (!svg) return;
      const rect = panel.getBoundingClientRect();
      const relX = (ev.clientX - rect.left) / rect.width;
      const relY = (ev.clientY - rect.top) / rect.height;
      const zoom = 2;
      const w = rect.width * zoom, h = rect.height * zoom;
      inner.innerHTML = svg.outerHTML;
      const innerSvg = inner.querySelector("svg");
      innerSvg.setAttribute("width", w);
      innerSvg.setAttribute("height", h);
      innerSvg.style.position = "absolute";
      innerSvg.style.left = `${90 - relX * w}px`;
      innerSvg.style.top = `${90 - relY * h}px`;
      lens.style.display = "block";
      lens.style.left = `${ev.clientX - 90}px`;
      lens.style.top = `${ev.clientY - 90}px`;
    });
    panel.addEventListener("mouseleave", () => { lens.style.display = "none"; });
  }
}
