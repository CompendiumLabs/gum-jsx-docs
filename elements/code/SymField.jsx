// Vector direction is mapped through the graph before fixed-size arrowheads are drawn.
return (
  <Svg width={px(600)} height={px(480)} font-size={px(12)}>
    <Plot
      font-size={em(1)}
      title="Rotation field"
      xlabel="x"
      ylabel="y"
      xlim={[-2.4, 2.4]}
      ylim={[-2.4, 2.4]}
      aspect={1.25}
    >
      <SymField
        f={(x, y) => [-y, x]}
        xlim={[-2, 2]}
        ylim={[-2, 2]}
        samples={11}
        scale={0.14}
        stroke={green}
        stroke_width={px(1.5)}
        head_size={px(5)}
      />
      <SymLine
        f={(t) => polar(t, 1.25)}
        tlim={[0, tau]}
        stroke={red}
        stroke_width={px(2.5)}
      />
    </Plot>
  </Svg>
)
