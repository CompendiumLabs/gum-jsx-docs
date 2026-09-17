// Vector direction is mapped through the graph before fixed-size arrowheads are drawn.
return <Svg width={px(500)} font-size={px(16)}>
  <Plot
    title="Rotation field"
    xlim={[-2.4, 2.4]}
    ylim={[-2.4, 2.4]}
    aspect={1.}
    margin={em(2)}
  >
    <SymField
      f={(x, y) => [-y, x]}
      xlim={[-2, 2]}
      ylim={[-2, 2]}
      samples={11}
      scale={0.14}
      stroke-width={px(1.5)}
      head-size={px(5)}
      head-open
    />
    <SymLine
      f={(t) => polar(t, 1.25)}
      tlim={[0, tau]}
      stroke={blue}
      stroke-width={px(2.5)}
    />
  </Plot>
</Svg>
