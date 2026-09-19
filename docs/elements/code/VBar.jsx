// One VBar with an explicit baseline.
<Box padding={em(1.875)}>
  <Plot font-size={em(0.75)} padding={[0.1, 0.25]}>
    <VBar
      value={3}
      position={1}
      base={-1}
      bar-width={0.6}
      fill={blue}
      radius={em(0.5)}
    />
  </Plot>
</Box>
