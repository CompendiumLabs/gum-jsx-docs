// Any element with an id is a node: shapes, a stack and its members, a nested network.
<Network
  xlim={[0, 1]}
  ylim={[0, 1]}
  stroke={blue}
  stroke-width={px(2)}
>
  <Edge start="circle" end="pill" />
  <Edge start="pill" end="stack" start-side="bottom" end-side="top" />
  <Edge start="circle" end="second" start-side="bottom" end-side="left" />
  <Edge start="stack" end="inner" start-side="right" end-side="bottom" />
  <Circle id="circle" x={0.15} y={0.75} anchor="center" width={em(4)} fill={white} />
  <Rect id="pill" x={0.5} y={0.75} anchor="center" width={em(8)} height={em(3)} radius={0.5} fill={white} />
  <VStack id="stack" x={0.5} y={0.28} anchor="center" width={em(8)} gap={em(0.4)}>
    <TextFrame id="first" padding={em(0.4)} background={white}>
      First
    </TextFrame>
    <TextFrame id="second" padding={em(0.4)} background={white}>
      Second
    </TextFrame>
  </VStack>
  <Frame id="inner" x={0.85} y={0.6} anchor="center" width={em(9)} height={em(7)} radius={em(0.5)}>
    <Network xlim={[0, 1]} ylim={[0, 1]} stroke={red}>
      <Edge start="a" end="b" />
      <Node id="a" x={0.25} y={0.75} font-size={em(0.75)} border-color={red}>
        a
      </Node>
      <Node id="b" x={0.75} y={0.25} font-size={em(0.75)} border-color={red}>
        b
      </Node>
    </Network>
  </Frame>
</Network>
