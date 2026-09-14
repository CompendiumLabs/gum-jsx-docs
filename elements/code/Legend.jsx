// Legend badges and labels.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background={white}>
    <Legend
      entries={[
        { label: "Prediction", color: blue },
        { label: "Sample", color: red, kind: "point" },
        { label: "Total", color: green, kind: "bar" },
      ]}
    />
  </Box>
</Svg>
