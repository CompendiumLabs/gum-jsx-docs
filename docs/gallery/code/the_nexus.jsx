// Ten phase-shifted wave packets on a dense Cartesian mesh.
<Box padding={em(1.5)}>
  <Frame padding={em(0.75)} radius={em(0.875)} border-color={slate} border-width={px(2)}>
    <Plot axis={false} grid={false} margin={em(0.5)} xlim={[-4 * pi, 4 * pi]} ylim={[-1.5, 1.5]}>
      <Mesh2D
        xlim={[-4 * pi, 4 * pi]}
        ylim={[-1.5, 1.5]}
        xticks={31}
        yticks={21}
        opacity={0.12}
      />
      {linspace(0, pi, 10).map((phase) => (
        <SymLine
          fy={(x) => cos(x - phase) * exp(-0.05 * x * x)}
          xlim={[-4 * pi, 4 * pi]}
          samples={501}
          stroke={interp(red, blue, phase / pi)}
          stroke-width={px(2)}
        />
      ))}
    </Plot>
  </Frame>
</Box>
