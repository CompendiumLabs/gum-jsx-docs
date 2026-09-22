// Bars with positive and negative values.
<Box padding={em(2)}>
  <Plot aspect={1.5}>
    <Bars
      values={[2, 4, -1, 3]}
      border-radius={em(0.35)}
      styles={(v) => ({ fill: v < 0 ? red : blue })}
    />
  </Plot>
</Box>
