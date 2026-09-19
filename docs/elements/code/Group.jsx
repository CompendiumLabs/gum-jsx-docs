// Place two nodes and labels in a canvas sized by its host; the connector paints behind them.
<Group aspect={1.75}>
  <Rect fill={lightgray} stroke={none} />
  <Line
    from={[0.3, 0.45]}
    to={[0.7, 0.45]}
    stroke={darkgray}
    stroke-width={px(3)}
  />
  <Circle
    x={0.2}
    y={0.45}
    anchor="center"
    width={px(64)}
    fill={blue}
    stroke={none}
  />
  <Square
    x={0.8}
    y={0.45}
    anchor="center"
    width={px(64)}
    fill={red}
    stroke={none}
  />
  <Text x={0.2} y={0.72} anchor={[0.5, 0.5]}>Source</Text>
  <Text x={0.8} y={0.72} anchor={['center', 'center']}>Result</Text>
</Group>
