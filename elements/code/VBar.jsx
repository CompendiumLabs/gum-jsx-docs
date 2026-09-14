// One VBar with an explicit baseline.
<Svg width={px(480)} height={px(300)} font-size={px(16)}>
  <Box padding={em(1.875)}>
    <Plot font-size={em(0.75)} padding={[0.1, 0.25]}>
      <VBar
        value={3}
        position={1}
        base={-1}
        bar-width={0.6}
        fill={blue}
        radius={px(6)}
      />
    </Plot>
  </Box>
</Svg>
