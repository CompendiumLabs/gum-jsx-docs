// Bars with positive and negative values.
<Box padding={em(2)}>
  <Plot aspect={1.5} xlim={[-0.75, 3.75]} ygrid>
    <Bars
      values={[2, 4, -1, 3]}
      border-radius={em(0.35)}
      styles={(v) => ({
        border_radius: v < 0 ? {b: em(0.25)} : {t: em(0.25)}
      })}
    />
    <HLine y={0} lim={[-0.75, 3.75]} />
  </Plot>
</Box>
