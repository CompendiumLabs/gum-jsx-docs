// A slide composes a measured title, figure, and caption at a stable type scale.
return (
  <Slide fit font-size={px(15)} aspect={1.5} title="From samples to a figure">
    <TextFigure
      caption="A common sampler supports scalar functions and parametric curves."
      caption-style={{ color: blue, font_size: em(0.8) }}
    >
      <Plot
        font-size={em(2 / 3)}
        grow={1}
        title="Sine and cosine"
        xlabel="Phase (rad)"
        ylabel="Value"
        xlim={[0, tau]}
        ylim={[-1.2, 1.2]}
      >
        <SymLine
          fy={sin}
          xlim={[0, tau]}
          stroke={blue}
          stroke-width={em(0.2)}
        />
        <SymSpline
          fy={cos}
          xlim={[0, tau]}
          samples={17}
          stroke={red}
          stroke-width={em(0.2)}
        />
      </Plot>
    </TextFigure>
  </Slide>
)
