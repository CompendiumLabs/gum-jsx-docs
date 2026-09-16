// Compact, wrapping, and elliptical nodes retain the same text size.
<Svg width={px(620)} height={px(200)} font-size={px(18)}>
  <Group>
    <Node x={0.15} y={0.5} border-color={blue}>
      Ready
    </Node>
    <Node x={0.49} y={0.5} width={em(9)} border-color={blue}>
      A longer label wraps inside its frame
    </Node>
    <Node x={0.83} y={0.5} width={em(6)} height={em(4)} radius={[0.5, 0.5]} border-color={red}>
      Done
    </Node>
  </Group>
</Svg>
