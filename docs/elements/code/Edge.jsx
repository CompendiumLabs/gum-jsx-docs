// Curved, rounded, and self-loop routes share Arrow's head styling.
<Box font-size={px(18)} padding={em(1)}>
  <Network aspect={1.5} xlim={[-0.6, 3.4]} ylim={[-0.6, 2.2]} stroke-width={px(2)}>
    <Edge start="a" end="b" stroke={blue} start-head head-open head-size={px(12)} />
    <Edge
      start="a" end="b" start-side="top" end-side="top"
      points={[[0, 1.8], [2.8, 1.8]]}
      radius={em(0.5)} gap={px(3)} stroke={red} head-size={px(12)}
    />
    <Edge
      start="loop" end="loop" stroke={blue} head-curve={0.7}
      points={[[1.9, 0.1], [1.8, 0.5], [1.5, 0.5]]}
    />
    <Node id="a" x={0} y={1} background={white}>
      Start
    </Node>
    <Node id="b" x={2.8} y={1} background={white}>
      Finish
    </Node>
    <Node id="loop" x={1.4} y={0} background={white}>
      Retry
    </Node>
  </Network>
</Box>
