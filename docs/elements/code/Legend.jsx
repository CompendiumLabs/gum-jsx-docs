// Legend badges and labels.
<Svg width={px(480)} height={px(300)} font-size={px(16)}>
  <Box padding={em(1.875)}>
    <Legend
      entries={[
        { label: "Prediction", color: blue },
        { label: "Sample", color: red, kind: "point" },
        { label: "Total", color: green, kind: "bar" },
      ]}
    />
  </Box>
</Svg>
