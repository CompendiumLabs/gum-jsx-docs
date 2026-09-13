// One VBar with an explicit baseline.
<Svg width={px(480)} height={px(300)}>
  <Box padding={px(30)} background={white}>
    <Plot>
      <VBar
        value={3}
        position={1}
        base={-1}
        bar_width={0.6}
        fill={blue}
        radius={px(6)}
      />
    </Plot>
  </Box>
</Svg>;
