// Explicit vector samples.
<Box padding={em(2)}>
  <Plot font-size={em(0.75)}>
    <Field
      vectors={[
        { point: [0, 0], vector: [1, 2] },
        { point: [1, 0], vector: [2, 1] },
      ]}
      stroke={blue}
      stroke-width={px(2)}
    />
  </Plot>
</Box>
