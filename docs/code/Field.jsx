// Explicit vector samples.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background="white">
    <Plot>
      <Field
        vectors={[
          { point: [0, 0], vector: [1, 2] },
          { point: { x: 1, y: 0 }, vector: [2, 1] },
        ]}
        stroke="#2563eb"
        stroke_width={px(2)}
      />
    </Plot>
  </Box>
</Svg>;
