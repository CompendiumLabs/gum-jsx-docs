// A small workflow with content-sized nodes and a wrapped label.
<Box min-width={em(17)} font-size={px(18)} padding={em(1)}>
  <Network aspect={1.8} xlim={[-0.6, 3.4]} ylim={[-0.45, 1.55]} stroke={blue} stroke-width={px(2)}>
    <Edge start="source" end="parse" />
    <Edge start="parse" end="output" />
    <Edge start="parse" end="errors" />
    <Edge start="errors" end="source" start-side="left" end-side="bottom" />
    <Node id="source" pos={[0, 1]} border-color={blue} background={white}>
      Source
    </Node>
    <Node id="parse" pos={[1.4, 1]} width={em(7)} border-color={blue} background={white}>
      Build syntax tree
    </Node>
    <Node id="output" pos={[2.8, 1]} border-color={blue} background={white}>
      Output
    </Node>
    <Node id="errors" pos={[1.4, 0]} border-color={red} color={red} background={white}>
      Report errors
    </Node>
  </Network>
</Box>
