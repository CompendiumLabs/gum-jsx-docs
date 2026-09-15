// Arrows follow node frames through fitting, outside padding, and rotation.
<Svg width={px(680)} height={px(400)} font-size={px(16)}>
  <Network xlim={[0, 1]} ylim={[0, 1]} stroke={blue} stroke-width={px(2)}>
    <Edge start="fitted" end="padded" start-side="right" end-side="left" />
    <Edge start="padded" end="turned" start-side="bottom" end-side="right" />
    <Edge start="turned" end="fitted" start-side="top" end-side="bottom" start-loc={0.3} />
    <Fit x={0.25} y={0.7} anchor="center" width={em(12)} height={em(7)} debug>
      <Node id="fitted" width={em(5)} height={em(2)} border-color={blue} background={white}>
        Fitted
      </Node>
    </Fit>
    <Box x={0.76} y={0.7} anchor="center" padding={em(1.5)} debug>
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
</Svg>
