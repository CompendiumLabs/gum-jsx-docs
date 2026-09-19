// A slide composes a measured title, figure, and caption at a stable type scale.
return (
  <Slide width="fill" min-height={em(22)} title="From samples to a figure">
    <TextFigure
      caption="A common sampler supports scalar functions and parametric curves."
      caption-color={blue}
      caption-font-size={em(7 / 9)}
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
          stroke-width={px(2.5)}
        />
        <SymSpline
          fy={cos}
          xlim={[0, tau]}
          samples={17}
          stroke={red}
          stroke-width={px(2.5)}
        />
      </Plot>
    </TextFigure>
  </Slide>
)
