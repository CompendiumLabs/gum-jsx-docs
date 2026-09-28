// SymArrow samples a polar spiral and projects its path before drawing the heads.
<Box padding={em(1.5)}>
  <Graph
    aspect={1}
    xlim={[-1.2, 1.2]}
    ylim={[-1.2, 1.2]}
    projection={polar_projection()}
  >
    <SymArrow
      f={t => ({theta: 3 * pi * t, r: 0.2 + 0.8 * t})}
      tlim={[0, 1]}
      samples={151}
      start-head
      head-size={px(12)}
      stroke={blue}
      stroke-width={px(3)}
    />
  </Graph>
</Box>
