// Arrows follow node frames through fitting, outside padding, and rotation.
<Network
  min-width={em(20)}
  aspect={1.5}
  xlim={[0, 1]}
  ylim={[0, 1]}
  stroke={blue}
  stroke-width={px(2)}
>
  <Edge start="fitted" end="padded" start-side="right" end-side="left" />
  <Edge start="padded" end="turned" start-side="bottom" end-side="right" />
  <Edge start="turned" end="fitted" start-side="top" end-side="bottom" start-loc={0.3} />
  <Node
    fit="contain" id="fitted" x={0.25} y={0.7} anchor="center"
    width={em(5)} height={em(2)} max-width={0.4} max-height={0.35}
    border-color={blue} background={white} debug
  >
    Fitted
  </Node>
  <Box x={0.72} y={0.7} anchor="center" padding={em(1)} debug>
    <Node id="padded" border-color={blue} background={white}>
      Padded
    </Node>
  </Box>
  <Rotate x={0.55} y={0.25} anchor="center" angle={-22} debug>
    <Node id="turned" border-color={blue} background={white}>
      Rotated node
    </Node>
  </Rotate>
</Network>
