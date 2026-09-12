// Explicit vector samples.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background="white">
    <Plot>
      <Field
        vectors={[
          { point: { x: 0, y: 0 }, vector: { x: 1, y: 2 } },
          { point: { x: 1, y: 0 }, vector: { x: 2, y: 1 } },
        ]}
        stroke="#2563eb"
        stroke_width={px(2)}
      />
    </Plot>
  </Box>
</Svg>;
