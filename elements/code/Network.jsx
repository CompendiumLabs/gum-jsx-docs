// A small workflow with content-sized nodes and a wrapped label.
<Svg width={px(640)} height={px(360)} font-size={px(18)}>
  <Box padding={em(1)}>
    <Network xlim={[-0.6, 3.4]} ylim={[-0.45, 1.55]} stroke={blue} stroke-width={px(2)}>
      <Edge start="source" end="parse" />
      <Edge start="parse" end="output" />
      <Edge start="parse" end="errors" />
      <Edge start="errors" end="source" start-side="left" end-side="bottom" />
      <Node id="source" x={0} y={1} border-color={blue} background={white}>
        Source
      </Node>
      <Node id="parse" x={1.4} y={1} width={em(7)} border-color={blue} background={white}>
        Build syntax tree
      </Node>
      <Node id="output" x={2.8} y={1} border-color={blue} background={white}>
        Output
      </Node>
      <Node id="errors" x={1.4} y={0} border-color={red} color={red} background={white}>
        Report errors
      </Node>
    </Network>
  </Box>
</Svg>
