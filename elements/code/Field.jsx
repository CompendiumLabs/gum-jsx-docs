// Explicit vector samples.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)}>
    <Plot>
      <Field
        vectors={[
          { point: [0, 0], vector: [1, 2] },
          { point: [1, 0], vector: [2, 1] },
        ]}
        stroke={blue}
        stroke_width={px(2)}
      />
    </Plot>
  </Box>
</Svg>
