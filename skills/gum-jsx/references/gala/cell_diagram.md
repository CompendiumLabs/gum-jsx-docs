# Cell Diagram

This is a textbook-style labeled diagram of an animal cell, and it is a good example of getting organic shapes out of a handful of splines. The central helper is `Blob`, which takes a list of radii, spaces them evenly around a circle with `polar`, and hands the result to a closed **Spline** in an origin-centered `coord`. Feeding it a slightly uneven radius list is enough to produce a lumpy membrane, nucleus, nucleolus, or vacuole, and the `phase` argument rotates the bumps so that nested blobs built from the same radii don't line up.

The organelles are small local components (`Mito`, `Lyso`, `Golgi`, `Centrioles`), each a **Group** with its own `aspect` and unit-box coordinates. That means the geometry inside is drawn once at a comfortable scale, and placement is entirely a matter of `pos`, `size`, and `rotate` on the outside. The three mitochondria, for instance, are just a list of placements mapped over one component. The rough ER is the odd one out: `wavyArc` samples an arc around the nucleus center and alternately pushes points in and out, so an open **Spline** through them reads as a ruffled membrane.

The labels are worth a look too. Each entry in the `labels` list is a text string, a side, a vertical position, and a target point in the diagram. A **Line** runs from the label column to the target, and a **Text** is placed with `xrect` and `yrect` and `expand` so that it sits flush against the column at a fixed height, right-aligned on the left and left-aligned on the right. The one non-trivial target is `mitoTip`, which computes where the rotated tip of a mitochondrion actually ends up so that the leader line lands on it. The outer `coord` is wider than the unit box precisely to leave room for these two label columns, while the **TitleFrame** supplies the title and paper-colored border.

**Code**

```jsx
// color scheme: muted, tonal palette — each organelle is a dusty mid-tone fill
// with a deeper stroke of the same hue, on warm paper with a cool mist cytoplasm
const col = {
  frame:      { fill: '#faf7f0', border: '#c4bdb0' },
  label:      { line: '#9a9488', text: '#3b3833' },
  membrane:   { outer: '#d9a441', inner: '#efd9a3' },
  cytoplasm:  { fill: '#eef4f6' },
  mito:       { fill: '#cf5f55', stroke: '#8b3a32', cristae: '#f8ddd3' },
  lyso:       { fill: '#79bdb8', stroke: '#3d7f7a', dots: '#2b5c58' },
  golgi:      { stroke: '#7ea86f' },
  centrioles: { fill: '#8e6fb0', stroke: '#584080' },
  er:         { stroke: '#5f8fc0' },
  nucleus:    { fill: '#a394cc', stroke: '#5f4d8b', inner: '#d6cdea' },
  nucleolus:  { fill: '#c4587c', stroke: '#7d2f4e' },
  vacuole:    { fill: '#b5dde3', stroke: '#5c9fab' },
  ribosomes:  { fill: '#4d5b8a' },
}

// canvas coordinates (wider than the cell to leave room for labels and title)
const C = [-0.2, 0, 1.7, 1]
const asp = 1.6

// helpers: lumpy blob from a list of radii
const blob = (radii, phase = 0) =>
  radii.map((r, i) => polar(phase + 2 * pi * i / radii.length, r))
const Blob = ({ radii, phase = 0, ...attr }) =>
  <Spline closed coord={[-1, -1, 1, 1]} points={blob(radii, phase)} {...attr} />

// wavy arc around a center (for the endoplasmic reticulum)
const wavyArc = (c, r, a0, a1, amp, n) =>
  linspace(a0 * d2r, a1 * d2r, n, true).map((t, i) =>
    polar(t, r + (i % 2 == 0 ? amp : -amp)).map((v, k) => v + c[k])
  )

// organelle components
const mitoOuter = [
  [0.04, 0.5], [0.2, 0.15], [0.55, 0.08], [0.9, 0.28],
  [0.96, 0.6], [0.78, 0.92], [0.42, 0.92], [0.12, 0.78],
]
const cristae = [
  [0.18, 0.5], [0.28, 0.28], [0.38, 0.72], [0.5, 0.28],
  [0.62, 0.72], [0.74, 0.3], [0.84, 0.5],
]
const Mito = (attr) => <Group aspect={2.2} {...attr}>
  <Spline closed points={mitoOuter} fill={col.mito.fill} stroke={col.mito.stroke} stroke-width={1.5} />
  <Spline points={cristae} stroke={col.mito.cristae} stroke-width={2.5} stroke-linecap="round" />
</Group>

const Lyso = (attr) => <Group aspect={1} {...attr}>
  <Circle fill={col.lyso.fill} stroke={col.lyso.stroke} stroke-width={1.5} />
  <Points points={[[0.35, 0.4], [0.62, 0.35], [0.5, 0.68], [0.3, 0.66], [0.72, 0.62]]}
    point-size={0.14} fill={col.lyso.dots} />
</Group>

const Golgi = (attr) => <Group aspect={1.4} {...attr}>
  {range(4).map(i => {
    const y = 0.15 + 0.22 * i
    const x0 = 0.05 + 0.07 * i, x1 = 0.95 - 0.07 * i
    return <Spline points={[[x0, y], [0.5, y - 0.14], [x1, y]]}
      stroke={col.golgi.stroke} stroke-width={5} stroke-linecap="round" />
  })}
  <Points points={[[0.12, 0.95], [0.5, 1.0], [0.02, 0.45]]} point-size={0.09} fill={col.golgi.stroke} />
</Group>

const Centrioles = (attr) => <Group aspect={1} {...attr}>
  <Rect pos={[0.35, 0.5]} size={[0.22, 0.8]} rounded={20} fill={col.centrioles.fill} stroke={col.centrioles.stroke} />
  <Rect pos={[0.7, 0.72]} size={[0.6, 0.22]} rounded={20} fill={col.centrioles.fill} stroke={col.centrioles.stroke} />
</Group>

// shapes
const membrane = [1.0, 0.86, 0.96, 0.8, 0.9, 1.0, 0.82, 0.92, 0.72, 0.96, 0.86, 1.0]
const nucleusR = [1.0, 0.92, 1.0, 0.88, 0.96, 0.9, 1.0, 0.94]
const nucleolusR = [1.0, 0.85, 1.0, 0.9, 1.0]
const vacuoleR = [1.0, 0.8, 0.95, 0.75, 1.0, 0.85, 0.9]

const nc = [0.85, 0.5]
const ribosomes = [
  [0.34, 0.46], [0.38, 0.66], [0.6, 0.3], [0.66, 0.7],
  [0.72, 0.2], [0.92, 0.24], [1.06, 0.5], [1.14, 0.5], [0.78, 0.82],
  [0.9, 0.73], [1.06, 0.6], [0.33, 0.62], [0.75, 0.76], [0.4, 0.68],
  [0.62, 0.62], [0.58, 0.44], [1.02, 0.34],
]

// mitochondria placements: [pos, size, rotate]
const mitos = [
  [[0.45, 0.39], 0.17, 15],
  [[1.06, 0.28], 0.16, 15],
  [[0.52, 0.72], 0.2, -10],
]
// left tip of a mitochondrion (spline tip sits at 4% in from the box edge)
const mitoTip = ([[cx, cy], w, th]) => {
  const t = th * d2r, r = 0.46 * w
  return [cx - r * cos(t), cy - r * sin(t)]
}

// labels: [text, side, y, target]
const xL = 0.17, xR = 1.33, th = 0.04
const labels = [
  ['Cell membrane', 'l', 0.1, [0.32, 0.3]],
  ['Mitochondrion', 'l', 0.3, mitoTip(mitos[0])],
  ['Vacuole', 'l', 0.52, [0.365, 0.55]],
  ['Rough ER', 'l', 0.7, [0.58, 0.6]],
  ['Ribosomes', 'l', 0.88, [0.4, 0.68]],
  ['Nucleus', 'r', 0.28, [0.97, 0.42]],
  ['Nucleolus', 'r', 0.4, [0.88, 0.47]],
  ['Lysosome', 'r', 0.52, [1.25, 0.5]],
  ['Centrioles', 'r', 0.64, [1.14, 0.6]],
  ['Golgi apparatus', 'r', 0.78, [1.07, 0.72]],
  ['Cytoplasm', 'r', 0.92, [0.85, 0.77]],
]

return <TitleFrame title="Anatomy of a Cell" title-size={0.09} margin={0.06} padding={0.03} rounded={12} fill={col.frame.fill} border-stroke={col.frame.border}>
  <Group coord={C} aspect={asp}>
    {/* cell body */}
    <Blob radii={membrane} pos={[0.75, 0.5]} size={[1.08, 0.86]}
      fill={col.cytoplasm.fill} stroke={col.membrane.outer} stroke-width={5} />
    <Blob radii={membrane} pos={[0.75, 0.5]} size={[1.02, 0.8]}
      stroke={col.membrane.inner} stroke-width={1.5} />

    {/* rough ER around nucleus */}
    {[0.2, 0.245, 0.29].map(r =>
      <Spline coord={C} points={wavyArc(nc, r, 105, 255, 0.012, 15)}
        stroke={col.er.stroke} stroke-width={2.5} stroke-linecap="round" />
    )}

    {/* nucleus */}
    <Blob radii={nucleusR} phase={0.4} pos={nc} size={0.32} aspect={1}
      fill={col.nucleus.fill} stroke={col.nucleus.stroke} stroke-width={3} />
    <Blob radii={nucleusR} phase={0.4} pos={nc} size={0.28} aspect={1}
      stroke={col.nucleus.inner} stroke-width={1} stroke-dasharray={3} />
    <Blob radii={nucleolusR} phase={1} pos={[0.88, 0.47]} size={0.11} aspect={1}
      fill={col.nucleolus.fill} stroke={col.nucleolus.stroke} stroke-width={1.5} />

    {/* organelles */}
    {mitos.map(([p, s, r]) => <Mito pos={p} size={s} rotate={r} />)}
    <Golgi pos={[1.01, 0.72]} size={0.18} />
    <Centrioles pos={[1.11, 0.57]} size={0.08} />
    <Lyso pos={[1.22, 0.5]} size={0.065} />
    <Lyso pos={[0.68, 0.79]} size={0.055} />
    <Blob radii={vacuoleR} phase={0.7} pos={[0.42, 0.55]} size={0.14} aspect={1}
      fill={col.vacuole.fill} stroke={col.vacuole.stroke} stroke-width={2} />
    <Points coord={C} points={ribosomes} point-size={0.012} fill={col.ribosomes.fill} />

    {/* labels */}
    {labels.map(([t, s, y, to]) =>
      <Line coord={C} points={[[s == 'l' ? xL + 0.01 : xR - 0.01, y], to]} stroke={col.label.line} stroke-width={1.5} />
    )}
    {labels.map(([t, s, y, to]) =>
      <Text xrect={s == 'l' ? xL : xR} yrect={[y - th / 2, y + th / 2]} expand
        align={s == 'l' ? 'right' : 'left'} font-weight={regular} color={col.label.text}>{t}</Text>
    )}
  </Group>
</TitleFrame>
```