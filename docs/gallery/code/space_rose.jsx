// Local point helpers retain tuple geometry for the traced sign.
const polarPair = (...args) => {
  const p = polar(...args)
  return [p.x, p.y]
}
const Disc = ({ pos, rad, ...props }) => (
  <Circle x={pos[0]} y={pos[1]} anchor="center" width={px(2 * rad * 600)} {...props} />
)
// vertices traced from the photo in its 1.18-aspect frame (sign bbox center ~[0.4415, 0.40]),
// remapped into a frame of aspect `aspect`: shape preserved, centered, scaled by `scale`
const aspect = 1.4
const scale = 1.2
const trace = ([x, y]) => [0.5 + scale * (1.18 / aspect) * (x - 0.4415), 0.5 + scale * (y - 0.4)]
const A = trace([0.168, 0.176]) // left face, top-left
const B = trace([0.276, 0.12]) // front face, top-left
const C = trace([0.715, 0.28]) // front face, top-right
const D = trace([0.715, 0.68]) // front face, bottom-right
const E = trace([0.276, 0.54]) // front face, bottom-left
const F = trace([0.168, 0.575]) // left face, bottom-left
const H = trace([0.623, 0.71]) // bottom face, back-right (D receded along E→F)
const hull = [A, B, C, D, H, F]

// bottom light band
const D1 = trace([0.715, 0.655])
const E1 = trace([0.276, 0.515])

// warm palette
const night = interp(black, slate, 0.342)
const cream = interp(white, yellow, 0.189) // front face
const cream2 = interp(white, yellow, 0.372) // end face
const cream3 = interp(white, yellow, 0.523) // bottom face
const glow = interp(white, yellow, 0.286) // pale warm white for the halo around the sign
const gold = interp(yellow, white, 0.379) // warmer accent for sparkle halos
const band = interp(white, yellow, 0.059)
const edge = interp(yellow, darkgray, 0.57)
// matte print inks: desaturated, pulled toward the cream of the face
const reds = [interp(green, red, 0.572), interp(red, green, 0.409), interp(purple, yellow, 0.423)] // petal layers, outer → inner
const outline = interp(red, slate, 0.745)
const stem = interp(green, purple, 0.225)
const leaf = interp(blue, yellow, 0.435)
const leafDark = interp(green, slate, 0.498)
const inkOpacity = 0.92 // let a touch of the face show through the print

const Face = (attr) => <Polygon stroke-linejoin="round" stroke-width={px(6)} {...attr} />

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
  return {
    pos: [random(), random()],
    r: 0.0012 + 0.0032 * pow(random(), 3),
    o: uniform(0.3, 1),
    warm: random() < 0.3,
  }
})
const bright = stars.filter((s) => s.r > 0.004)

// sign imperfections: uneven backlight blotches, dust specks, faint scuffs
const blotches = range(0, 10).map(() => {
  return {
    pos: front(uniform(0.18, 0.82), uniform(0.22, 0.78)),
    r: uniform(0.04, 0.1),
    dark: random() < 0.6,
    o: uniform(0.12, 0.22),
  }
})
// soft-edged blotch: concentric low-opacity discs that add up toward the center
const Blotch = ({ pos, r, dark, o }) => (
  <Group>
    {[1, 0.75, 0.5, 0.25].map((k) => (
      <Disc
        pos={pos}
        rad={k * r}
        fill={dark ? interp(yellow, white, 0.589) : interp(white, yellow, 0.066)}
        opacity={o / 4}
        stroke={none}
      />
    ))}
  </Group>
)
const specks = range(0, 34).map(() => {
  return {
    pos: front(uniform(0.03, 0.97), uniform(0.03, 0.97)),
    r: uniform(0.0012, 0.003),
    o: uniform(0.25, 0.55),
  }
})
const sideSpecks = range(0, 8).map(() => {
  return {
    pos: side(uniform(0.1, 0.9), uniform(0.05, 0.95)),
    r: uniform(0.0012, 0.0025),
    o: uniform(0.3, 0.5),
  }
})
const scuffs = range(0, 7).map(() => {
  const p = front(uniform(0.1, 0.9), uniform(0.1, 0.9)),
    a = uniform(0, pi),
    L = uniform(0.015, 0.045)
  return [p, [p[0] + (L * cos(a)) / aspect, p[1] + L * sin(a)]]
})

// sparkles: glints along the lit edges and a few on the face
const sparkles = [
  { pos: mix(B, C, 0.42), r: 0.02 },
  { pos: C, r: 0.013 },
  { pos: mix(A, B, 0.55), r: 0.009 },
  { pos: mix(E1, D1, 0.72), r: 0.012 },
  { pos: front(0.8, 0.24), r: 0.009 },
  { pos: front(0.17, 0.74), r: 0.007 },
]
const Sparkle = ({ pos, r }) => (
  <Group>
    <Disc pos={pos} rad={1.6 * r} fill={gold} opacity={0.18} stroke={none} />
    <Disc pos={pos} rad={0.9 * r} fill={gold} opacity={0.25} stroke={none} />
    <Polygon
      points={lobes(pos, iso(r), iso(0.14 * r), 4, -90)}
      fill={white}
      stroke={interp(yellow, darkgray, 0.47)}
      stroke-width={px(0.6)}
      stroke-linejoin="round"
    />
    <Polygon
      points={lobes(pos, iso(0.5 * r), iso(0.14 * r), 4, -45)}
      fill={white}
      stroke={interp(yellow, darkgray, 0.47)}
      stroke-width={px(0.5)}
      stroke-linejoin="round"
      opacity={0.85}
    />
  </Group>
)

// flat illustrated rose: a small bud of nested lobed petal layers on a long stem
// lobed petal ring: alternate outer/inner radii around a center
const lobes = (c, ro, ri, n, phase) =>
  range(0, 2 * n).map((i) => polarPair(d2r * (phase + (180 * i) / n), i % 2 == 0 ? ro : ri, c))
// scale a point about a center c by factor k
const scaleAbout =
  (c, k) =>
  ([x, y]) => [c[0] + k * (x - c[0]), c[1] + k * (y - c[1])]

// content spans y in [0.13, 0.87] so the rose is centered in its own group
const bud = [0.5, 0.27]
const bloom = scaleAbout(bud, 1.1) // bud 10% bigger, about its center
const petals = [
  lobes(bud, 0.14, 0.115, 5, -90),
  lobes([0.505, 0.265], 0.1, 0.082, 4, -60),
  lobes([0.51, 0.26], 0.062, 0.052, 3, -30),
].map((p) => p.map(bloom))
const swirl = linspace(0, 1, 30)
  .map((t) => polarPair(2 * pi * 1.5 * t, 0.004 + 0.036 * t, [0.512, 0.258]))
  .map(bloom)
// leaf tips sit exactly on stem control points so they're guaranteed to touch the stem
const stemPts = [
  [0.5, 0.4],
  [0.52, 0.53],
  [0.5, 0.62],
  [0.48, 0.73],
  [0.5, 0.87],
]
// leaves 10% smaller, scaled about their tip so they stay attached to the stem
const shrink = (l) => {
  const s = scaleAbout(l.pts[0], 0.9)
  return { pts: l.pts.map(s), vein: l.vein.map(s) }
}
const leaves = [
  {
    pts: [
      [0.5, 0.62],
      [0.41, 0.55],
      [0.28, 0.59],
      [0.37, 0.69],
    ],
    vein: [
      [0.5, 0.62],
      [0.28, 0.59],
    ],
  },
  {
    pts: [
      [0.48, 0.73],
      [0.57, 0.66],
      [0.7, 0.7],
      [0.61, 0.8],
    ],
    vein: [
      [0.48, 0.73],
      [0.7, 0.7],
    ],
  },
].map(shrink)
const thorns = [
  [
    [0.512, 0.47],
    [0.552, 0.44],
    [0.517, 0.5],
  ],
  [
    [0.49, 0.8],
    [0.45, 0.78],
    [0.488, 0.83],
  ],
]
const Rose = (attr) => (
  <Group aspect={1} {...attr}>
    <Spline
      points={stemPts}
      fill={none}
      stroke={stem}
      stroke-width={px(5)}
      stroke-linecap="round"
    />
    {thorns.map((t) => (
      <Polygon points={t} fill={stem} stroke={none} />
    ))}
    {leaves.map((l) => (
      <Group>
        <Spline points={l.pts} closed fill={leaf} stroke={leafDark} stroke-width={px(1.5)} />
        <Polyline points={l.vein} stroke={leafDark} stroke-width={px(1)} />
      </Group>
    ))}
    {petals.map((p, i) => (
      <Spline
        points={p}
        closed
        fill={reds[i]}
        stroke={outline}
        stroke-width={px(1.5)}
        stroke-linejoin="round"
      />
    ))}
    <Spline
      points={swirl}
      fill={none}
      stroke={outline}
      stroke-width={px(1.5)}
      stroke-linecap="round"
    />
  </Group>
)

return (
  <Svg width={px(880)} height={px(640)}>
    <Box padding={px(20)}>
      <Frame radius={px(12)} clip border-color={interp(black, white, 0.133)}>
        <Group width={px(840)} height={px(600)}>
          {/* night */}
          <Rect fill={night} />

          {/* starfield (drawn under the glow so stars near the sign get washed out) */}
          {stars.map((s) => (
            <Disc
              pos={s.pos}
              rad={s.r}
              fill={s.warm ? interp(white, yellow, 0.236) : interp(white, blue, 0.113)}
              opacity={s.o}
              stroke={none}
            />
          ))}
          {bright.map((s) => (
            <Group>
              <Polyline
                points={[
                  [s.pos[0] - (3.5 * s.r) / aspect, s.pos[1]],
                  [s.pos[0] + (3.5 * s.r) / aspect, s.pos[1]],
                ]}
                stroke={white}
                stroke-width={px(0.7)}
                opacity={0.5 * s.o}
              />
              <Polyline
                points={[
                  [s.pos[0], s.pos[1] - 3.5 * s.r],
                  [s.pos[0], s.pos[1] + 3.5 * s.r],
                ]}
                stroke={white}
                stroke-width={px(0.7)}
                opacity={0.5 * s.o}
              />
            </Group>
          ))}

          {/* glow: many soft strokes around the box silhouette; widths grow quadratically so rings
        are dense near the edge and sparse far out, and outer rings are fainter → long gentle tail */}
          {linspace(0, 1, 36, true).map((t) => (
            <Polygon
              points={hull}
              fill={none}
              stroke={glow}
              stroke-width={px(10 + 420 * t * t)}
              stroke-linejoin="round"
              opacity={0.016 * (1 - 0.6 * t)}
            />
          ))}

          {/* light box: bottom, left end, then front */}
          <Face points={[E, D, H, F]} fill={cream3} stroke={cream3} />
          <Face points={[A, B, E, F]} fill={cream2} stroke={cream2} />
          <Face points={[B, C, D, E]} fill={cream} stroke={cream} />
          <Polygon points={[E, D, D1, E1]} fill={band} opacity={0.55} stroke={none} />
          <Polyline
            points={[A, B, C]}
            stroke={band}
            stroke-width={px(3)}
            opacity={0.85}
            stroke-linejoin="round"
          />
          <Polyline points={[B, E]} stroke={edge} stroke-width={px(2)} opacity={0.6} />
          <Polyline
            points={[F, E, D]}
            stroke={edge}
            stroke-width={px(2)}
            opacity={0.6}
            stroke-linejoin="round"
          />

          {/* rose: printed on the face, so every imperfection below sits on top of it */}
          <Rotate x={trace([0.5, 0.41])[0]} y={trace([0.5, 0.41])[1]} anchor="center" angle={-15}>
            <Rose
              width={px(scale * 0.44 * 600)}
              height={px(scale * 0.44 * 600)}
              opacity={inkOpacity}
            />
          </Rotate>

          {/* texture over the print: uneven backlight, dust, scuffs, glints */}
          {blotches.map((b) => (
            <Blotch pos={b.pos} r={b.r} dark={b.dark} o={b.o} />
          ))}
          {specks.map((s) => (
            <Disc
              pos={s.pos}
              rad={s.r}
              fill={interp(green, red, 0.412)}
              opacity={s.o}
              stroke={none}
            />
          ))}
          {sideSpecks.map((s) => (
            <Disc
              pos={s.pos}
              rad={s.r}
              fill={interp(green, red, 0.412)}
              opacity={s.o}
              stroke={none}
            />
          ))}
          {scuffs.map((p) => (
            <Polyline
              points={p}
              stroke={interp(white, yellow, 0.551)}
              stroke-width={px(1)}
              opacity={0.6}
              stroke-linecap="round"
            />
          ))}
          {sparkles.map((s) => (
            <Sparkle pos={s.pos} r={s.r} />
          ))}
        </Group>
      </Frame>
    </Box>
  </Svg>
)
