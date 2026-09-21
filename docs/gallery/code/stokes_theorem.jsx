// A projected surface with its oriented boundary, tangent arrows, and normal vectors.
const addPair = (a, b) => [a[0] + b[0], a[1] + b[1]]
const mulPair = (a, k) => [a[0] * k, a[1] * k]

//
// constants
//

const center = [0.48, 0.52]
const basisX = [0.39, 0]
const basisY = [0.06, 0.29]
const basisZ = [0.03, -0.22]
const boundaryCount = 18
const meshH = [-0.35, 0.28]
const meshV = [-0.52, 0, 0.48]
const tangentCount = 6
const tangentPhase = 0.58
const tangentLength = 0.2
const normalLength = 0.15
const normalPoints = [
  [-0.45, -0.02],
  [-0.1, -0.22],
  [0.26, 0.08],
  [0.32, 0.52],
  [-0.22, 0.64],
]

//
// vector ops
//

const add3 = ([ax, ay, az], [bx, by, bz]) => [ax + bx, ay + by, az + bz]
const scale3 = ([x, y, z], s) => [s * x, s * y, s * z]
const cross3 = ([ax, ay, az], [bx, by, bz]) => [
  ay * bz - az * by,
  az * bx - ax * bz,
  ax * by - ay * bx,
]

const project_vec = ([x, y, z]) =>
  addPair(mulPair(basisX, x), addPair(mulPair(basisY, y), mulPair(basisZ, z)))

const project = (point) => addPair(center, project_vec(point))

//
// surface definitions
//

const surface_point = (u, v) => {
  const x = u + 0.09 * u * v - 0.05 * v * v
  const y = v + 0.05 * u - 0.06 * u * u + 0.03 * v * v
  const z = 0.5 - 0.24 * u * u - 0.46 * v * v + 0.08 * u - 0.05 * v + 0.08 * u * v
  return [x, y, z]
}

const surface_du = (u, v) => [1 + 0.09 * v, 0.05 - 0.12 * u, -0.48 * u + 0.08 + 0.08 * v]

const surface_dv = (u, v) => [0.09 * u - 0.1 * v, 1 + 0.06 * v, -0.92 * v - 0.05 + 0.08 * u]

const boundary_tangent = (t) => {
  const [u, v] = [cos(t), sin(t)]
  return project_vec(add3(scale3(surface_du(u, v), -sin(t)), scale3(surface_dv(u, v), cos(t))))
}

//
// point generators
//

const boundary_sample = (t) => project(surface_point(cos(t), sin(t)))

const iso_u = (u0) => {
  const span = sqrt(1 - u0 * u0)
  return linspace(-span, span, 5).map((v) => project(surface_point(u0, v)))
}

const iso_v = (v0) => {
  const span = sqrt(1 - v0 * v0)
  return linspace(-span, span, 5).map((u) => project(surface_point(u, v0)))
}

const tangent_arrow = (turn) => {
  const t = 2 * pi * turn
  const start = boundary_sample(t)
  const delta = normalize(boundary_tangent(t), 2)
  const end = addPair(start, mulPair(delta, tangentLength))
  return [start, end]
}

const normal_arrow = ([u, v]) => {
  const base = project(surface_point(u, v))
  const normal = project_vec(cross3(surface_du(u, v), surface_dv(u, v)))
  const delta = normalize(normal[1] > 0 ? mulPair(normal, -1) : normal, 2)
  const tip = addPair(base, mulPair(delta, normalLength))
  return [base, tip]
}

//
// diagram elements
//

const boundary = linspace(0, 2 * pi, boundaryCount, false).map(boundary_sample)
const [meshH1, meshH2] = meshH.map(iso_v)
const [meshV1, meshV2, meshV3] = meshV.map(iso_u)
const normals = normalPoints.map(normal_arrow)
const tangents = linspace(0, 1, tangentCount, false).map(tangent_arrow)

const SurfaceDiagram = (props) => (
  <Group aspect={1} {...props}>
    <Spline
      closed
      points={boundary}
      stroke={blue}
      stroke-width={px(2.5)}
      fill={interp(white, purple, 0.15)}
      tension={0.5}
    />
    {[meshH1, meshH2, meshV1, meshV2, meshV3].map((points) => (
      <Spline
        points={points}
        stroke={interp(white, purple, 0.45)}
        stroke-dasharray={[px(4), px(3)]}
      />
    ))}
    {tangents.map(([start, end]) => (
      <Arrow from={start} to={end} stroke={blue} stroke-width={px(2)} head-size={px(13)} />
    ))}
    {normals.map(([base, tip]) => (
      <Arrow from={base} to={tip} stroke={purple} stroke-width={px(2)} head-size={px(12)} />
    ))}
    <Latex x={0.48} y={0.5} anchor="center" font-size={em(1.6)} color={purple}>
      S
    </Latex>
    <Latex
      x={0.05}
      y={0.55}
      anchor="center"
      font-size={em(1.25)}
      color={blue}
    >{String.raw`\partial S`}</Latex>
    <Latex
      x={0.56}
      y={0.17}
      anchor="center"
      font-size={em(1.25)}
      color={purple}
    >{String.raw`\hat n`}</Latex>
  </Group>
)
return <Box fit font-size={px(20)} padding={em(1.5)}>
  <VStack gap={em(1.4)}>
    <Text font-size={em(2)} font-weight={bold}>
      Stokes' Theorem
    </Text>
    <HStack gap={em(1.7)} align="center">
      <SurfaceDiagram width={em(20)} />
      <TextCol width={em(15)} gap={em(1.35)} font-size={em(1.4)}>
        <TextFrame
          padding={em(0.85)}
          border-radius={em(0.55)}
          background={interp(white, purple, 0.05)}
          border-color={interp(white, purple, 0.3)}
        >
          <Latex font-size={em(1.2)}>
            {String.raw`\oint_{\partial S}F\cdot dr=\iint_S(\nabla\times F)\cdot dS`}
          </Latex>
        </TextFrame>
        <Text>
          The line integral of a vector field <Tex>F</Tex> around the closed boundary <Tex>{String.raw`\partial S`}</Tex> equals the surface integral of its curl over an oriented surface <Tex>S</Tex> bounded by that curve.
        </Text>
      </TextCol>
    </HStack>
  </VStack>
</Box>
