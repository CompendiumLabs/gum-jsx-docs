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
    pos={[0.2, 0.45]}
    width={px(64)}
    fill={blue}
    stroke={none}
  />
  <Square
    pos={[0.8, 0.45]}
    width={px(64)}
    fill={red}
    stroke={none}
  />
  <Text pos={[0.2, 0.72]} anchor={[0.5, 0.5]}>Source</Text>
  <Text pos={[0.8, 0.72]} anchor={['center', 'center']}>Result</Text>
</Group>
