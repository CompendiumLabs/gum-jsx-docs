// Symbolic curves supply angle and radius; Graph projects them into Cartesian output.
const spiral = t => ({theta: (0.15 + 2.2 * t) * pi, r: 0.2 + 0.65 * t})
return (
  <TextBox width={em(32)} font-size={px(20)}
    padding={em(1.3)} background={white} fit>
    <TextCol gap={em(0.8)}>
      <Text font-size={em(1.5)} font-weight={bold}>
        A polar coordinate frame
      </Text>
      <Text font-size={em(0.8)} color={slate}>
        Sample in polar coordinates, then share one projection.
      </Text>
      <Graph aspect={1} projection={polar_projection()}
        xlim={[-1.25, 1.25]} ylim={[-1.25, 1.25]}>
        {[0.25, 0.5, 0.75, 1].map(r => (
          <SymLine f={theta => ({ theta, r })} tlim={[0, tau]}
            stroke={gray} />
        ))}
        {linspace(0, tau, 9).slice(0, -1).map(theta => (
          <Line from={{ theta, r: 0 }} to={{ theta, r: 1 }}
            stroke={gray} />
        ))}
        <SymArrow f={spiral} tlim={[0, 1]} stroke={blue}
          stroke-width={em(0.15)} head-size={em(0.6)} />
        <Points points={[spiral(0)]} point-size={em(0.5)} fill={blue} />
        {[0, 90, 180, 270].map(degrees => (
          <Text pos={{ theta: degrees * d2r, r: 1.13 }}
            font-size={em(0.75)} color={slate}>
            {degrees + '°'}
          </Text>
        ))}
      </Graph>
      <Text font-size={em(0.75)} color={slate}>
        SymArrow samples f(t) into angle and radius. Its arrowhead keeps its pixel size.
      </Text>
    </TextCol>
  </TextBox>
)
