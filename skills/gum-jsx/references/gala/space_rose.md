# Space Rose

This is a backlit sign box floating in a starfield, with a rose printed on its front face. It is the most illustrative example in the gallery, and most of what it shows is how to layer many cheap elements into something that reads as light and material rather than as vector shapes.

The box is defined by a handful of named vertices, traced from a photo and remapped into the figure's own `aspect` by the `trace` helper. The three faces are **Polygon**s, and the halo behind the sign is the outer `hull` stroked many times over a `linspace` loop, with widths that grow quadratically and opacities that fade linearly. That gives dense bright rings near the edge and a long soft tail from nothing more than stacked translucent strokes.

The rose is a flat print built as a `Rose` component in its own unit **Group**. The `lobes` helper returns a ring of alternating outer and inner radii, so each petal layer is one closed **Spline** through a scalloped point list, with three layers in successively darker reds and a small spiral for the bud. Leaf tips sit exactly on stem control points so they stay attached, and `scaleAbout` resizes the bud and leaves around an anchor without moving it.

The texture is scattered with `random` and `uniform`, and since every evaluation starts from a fixed seed (set here with `setSeed`; see **Random**) the stars, blotches, dust, and scuffs land in the same places on every render. The `onQuad` helper maps a unit `(u, v)` bilinearly onto a face, so speckles scattered in face coordinates end up correctly foreshortened on the tilted panel. Blotches are stacks of concentric low-opacity **Circle**s, and the `Sparkle` glints are two four-point stars from the same `lobes` function over a pair of soft gold discs. Draw order matters too: stars go under the glow so the ones near the sign wash out, and every imperfection goes on top of the print so it reads as being on the surface.

**Code**

```jsx
// vertices traced from the photo in its 1.18-aspect frame (sign bbox center ~[0.4415, 0.40]),
// remapped into a frame of aspect `aspect`: shape preserved, centered, scaled by `scale`
const aspect = 1.4
const scale = 1.2
const trace = ([x, y]) => [0.5 + scale * (1.18 / aspect) * (x - 0.4415), 0.5 + scale * (y - 0.40)]
const A = trace([0.168, 0.176]) // left face, top-left
const B = trace([0.276, 0.120]) // front face, top-left
const C = trace([0.715, 0.280]) // front face, top-right
const D = trace([0.715, 0.680]) // front face, bottom-right
const E = trace([0.276, 0.540]) // front face, bottom-left
const F = trace([0.168, 0.575]) // left face, bottom-left
const H = trace([0.623, 0.710]) // bottom face, back-right (D receded along E→F)
const hull = [A, B, C, D, H, F]

// bottom light band
const D1 = trace([0.715, 0.655])
const E1 = trace([0.276, 0.515])

// warm palette
const night = '#0a0a12'
const cream = '#fff0cf'   // front face
const cream2 = '#f2d6a4' // end face
const cream3 = '#e0bb82' // bottom face
const glow = '#ffe3b8'  // pale warm white for the halo around the sign
const gold = '#ffbe66'  // warmer accent for sparkle halos
const band = '#fffaf0'
const edge = '#d9a86c'
// matte print inks: desaturated, pulled toward the cream of the face
const reds = ['#9e3b44', '#b9535b', '#d07a7e'] // petal layers, outer → inner
const outline = '#5a2b31'
const stem = '#5b8c62'
const leaf = '#7aa77e'
const leafDark = '#3d6646'
const inkOpacity = 0.92 // let a touch of the face show through the print

const Face = (attr) => <Polygon stroke-linejoin="round" stroke-width={6} {...attr} />

// seed the random stream so the texture is stable across renders
setSeed(2024)
const mix = (P, Q, t) => [P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]
const iso = (r) => [r / aspect, r] // radius vector that renders round inside the aspect-`aspect` group

// bilinear point on a quad with top edge P→Q and bottom edge S→R; (u, v) in [0, 1]²
const onQuad = (P, Q, R, S) => (u, v) => mix(mix(P, Q, u), mix(S, R, u), v)
const front = onQuad(B, C, D, E)
const side = onQuad(A, B, E, F)

// starfield: mostly faint pinpricks, a handful of brighter ones that get a cross flare
const stars = range(0, 170).map(() => {
  return { pos: [random(), random()], r: 0.0012 + 0.0032 * pow(random(), 3), o: uniform(0.3, 1), warm: random() < 0.3 }
})
const bright = stars.filter(s => s.r > 0.004)

// sign imperfections: uneven backlight blotches, dust specks, faint scuffs
const blotches = range(0, 10).map(() => {
  return { pos: front(uniform(0.18, 0.82), uniform(0.22, 0.78)), r: uniform(0.04, 0.10), dark: random() < 0.6, o: uniform(0.12, 0.22) }
})
// soft-edged blotch: concentric low-opacity discs that add up toward the center
const Blotch = ({ pos, r, dark, o }) => <Group>
  {[1, 0.75, 0.5, 0.25].map(k =>
    <Circle pos={pos} rad={k * r} fill={dark ? '#ecd09b' : '#fffbee'} opacity={o / 4} stroke={none} />
  )}
</Group>
const specks = range(0, 34).map(() => {
  return { pos: front(uniform(0.03, 0.97), uniform(0.03, 0.97)), r: uniform(0.0012, 0.003), o: uniform(0.25, 0.55) }
})
const sideSpecks = range(0, 8).map(() => {
  return { pos: side(uniform(0.1, 0.9), uniform(0.05, 0.95)), r: uniform(0.0012, 0.0025), o: uniform(0.3, 0.5) }
})
const scuffs = range(0, 7).map(() => {
  const p = front(uniform(0.1, 0.9), uniform(0.1, 0.9)), a = uniform(0, pi), L = uniform(0.015, 0.045)
  return [p, [p[0] + L * cos(a) / aspect, p[1] + L * sin(a)]]
})

// sparkles: glints along the lit edges and a few on the face
const sparkles = [
  { pos: mix(B, C, 0.42), r: 0.020 },
  { pos: C, r: 0.013 },
  { pos: mix(A, B, 0.55), r: 0.009 },
  { pos: mix(E1, D1, 0.72), r: 0.012 },
  { pos: front(0.80, 0.24), r: 0.009 },
  { pos: front(0.17, 0.74), r: 0.007 },
]
const Sparkle = ({ pos, r }) => <Group>
  <Circle pos={pos} rad={1.6 * r} fill={gold} opacity={0.18} stroke={none} />
  <Circle pos={pos} rad={0.9 * r} fill={gold} opacity={0.25} stroke={none} />
  <Polygon points={lobes(pos, iso(r), iso(0.14 * r), 4, -90)} fill={white} stroke="#e2ad5c" stroke-width={0.6} stroke-linejoin="round" />
  <Polygon points={lobes(pos, iso(0.5 * r), iso(0.14 * r), 4, -45)} fill={white} stroke="#e2ad5c" stroke-width={0.5} stroke-linejoin="round" opacity={0.85} />
</Group>

// flat illustrated rose: a small bud of nested lobed petal layers on a long stem
// lobed petal ring: alternate outer/inner radii around a center
const lobes = (c, ro, ri, n, phase) => range(0, 2*n).map(i =>
  polar(d2r * (phase + 180 * i / n), i % 2 == 0 ? ro : ri, c)
)
// scale a point about a center c by factor k
const scaleAbout = (c, k) => ([x, y]) => [c[0] + k * (x - c[0]), c[1] + k * (y - c[1])]

// content spans y in [0.13, 0.87] so the rose is centered in its own group
const bud = [0.50, 0.27]
const bloom = scaleAbout(bud, 1.1) // bud 10% bigger, about its center
const petals = [
  lobes(bud, 0.140, 0.115, 5, -90),
  lobes([0.505, 0.265], 0.100, 0.082, 4, -60),
  lobes([0.510, 0.260], 0.062, 0.052, 3, -30),
].map(p => p.map(bloom))
const swirl = linspace(0, 1, 30).map(t => polar(2*pi*1.5*t, 0.004 + 0.036*t, [0.512, 0.258])).map(bloom)
// leaf tips sit exactly on stem control points so they're guaranteed to touch the stem
const stemPts = [[0.50, 0.40], [0.52, 0.53], [0.50, 0.62], [0.48, 0.73], [0.50, 0.87]]
// leaves 10% smaller, scaled about their tip so they stay attached to the stem
const shrink = (l) => { const s = scaleAbout(l.pts[0], 0.9); return { pts: l.pts.map(s), vein: l.vein.map(s) } }
const leaves = [
  { pts: [[0.50, 0.62], [0.41, 0.55], [0.28, 0.59], [0.37, 0.69]], vein: [[0.50, 0.62], [0.28, 0.59]] },
  { pts: [[0.48, 0.73], [0.57, 0.66], [0.70, 0.70], [0.61, 0.80]], vein: [[0.48, 0.73], [0.70, 0.70]] },
].map(shrink)
const thorns = [
  [[0.512, 0.47], [0.552, 0.44], [0.517, 0.50]],
  [[0.490, 0.80], [0.450, 0.78], [0.488, 0.83]],
]
const Rose = (attr) => <Group aspect={1} {...attr}>
  <Spline points={stemPts} fill={none} stroke={stem} stroke-width={5} stroke-linecap="round" />
  {thorns.map(t => <Polygon points={t} fill={stem} stroke={none} />)}
  {leaves.map(l => <Group>
    <Spline points={l.pts} closed fill={leaf} stroke={leafDark} stroke-width={1.5} />
    <Line points={l.vein} stroke={leafDark} stroke-width={1} />
  </Group>)}
  {petals.map((p, i) =>
    <Spline points={p} closed fill={reds[i]} stroke={outline} stroke-width={1.5} stroke-linejoin="round" />
  )}
  <Spline points={swirl} fill={none} stroke={outline} stroke-width={1.5} stroke-linecap="round" />
</Group>

return <Frame margin={0.03} rounded={0.02} clip border-stroke="#222">
  <Group aspect={aspect}>
    {/* night */}
    <Rect fill={night} />

    {/* starfield (drawn under the glow so stars near the sign get washed out) */}
    {stars.map(s =>
      <Circle pos={s.pos} rad={s.r} fill={s.warm ? '#ffe9c4' : '#e6f0ff'} opacity={s.o} stroke={none} />
    )}
    {bright.map(s => <Group>
      <Line points={[[s.pos[0] - 3.5 * s.r / aspect, s.pos[1]], [s.pos[0] + 3.5 * s.r / aspect, s.pos[1]]]} stroke={white} stroke-width={0.7} opacity={0.5 * s.o} />
      <Line points={[[s.pos[0], s.pos[1] - 3.5 * s.r], [s.pos[0], s.pos[1] + 3.5 * s.r]]} stroke={white} stroke-width={0.7} opacity={0.5 * s.o} />
    </Group>)}

    {/* glow: many soft strokes around the box silhouette; widths grow quadratically so rings
        are dense near the edge and sparse far out, and outer rings are fainter → long gentle tail */}
    {linspace(0, 1, 36, true).map(t =>
      <Polygon points={hull} fill={none} stroke={glow} stroke-width={10 + 420 * t * t}
        stroke-linejoin="round" opacity={0.016 * (1 - 0.6 * t)} />
    )}

    {/* light box: bottom, left end, then front */}
    <Face points={[E, D, H, F]} fill={cream3} stroke={cream3} />
    <Face points={[A, B, E, F]} fill={cream2} stroke={cream2} />
    <Face points={[B, C, D, E]} fill={cream} stroke={cream} />
    <Polygon points={[E, D, D1, E1]} fill={band} opacity={0.55} stroke={none} />
    <Line points={[A, B, C]} stroke={band} stroke-width={3} opacity={0.85} stroke-linejoin="round" />
    <Line points={[B, E]} stroke={edge} stroke-width={2} opacity={0.6} />
    <Line points={[F, E, D]} stroke={edge} stroke-width={2} opacity={0.6} stroke-linejoin="round" />

    {/* rose: printed on the face, so every imperfection below sits on top of it */}
    <Rose pos={trace([0.50, 0.41])} ysize={scale * 0.44} spin={-15} opacity={inkOpacity} />

    {/* texture over the print: uneven backlight, dust, scuffs, glints */}
    {blotches.map(b => <Blotch pos={b.pos} r={b.r} dark={b.dark} o={b.o} />)}
    {specks.map(s => <Circle pos={s.pos} rad={s.r} fill="#a8804a" opacity={s.o} stroke={none} />)}
    {sideSpecks.map(s => <Circle pos={s.pos} rad={s.r} fill="#a8804a" opacity={s.o} stroke={none} />)}
    {scuffs.map(p => <Line points={p} stroke="#d8b57c" stroke-width={1} opacity={0.6} stroke-linecap="round" />)}
    {sparkles.map(s => <Sparkle pos={s.pos} r={s.r} />)}
  </Group>
</Frame>
```