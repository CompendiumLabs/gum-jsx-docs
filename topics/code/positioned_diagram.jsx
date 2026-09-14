// Group positions nodes and explicit arrow geometry in a shared pixel canvas.
const Node = ({ x, title, detail, color }) => (
  <Frame
    x={px(x)}
    y={px(208)}
    anchor="center"
    width={px(168)}
    height={px(112)}
    padding={px(16)}
    align="center"
    border_width={px(2)}
    border_color={color}
    radius={px(14)}
    background={black}
  >
    <VStack width={1} gap={px(8)} align="center">
      <Text font_size={px(22)} font_weight={bold} color={white}>{title}</Text>
      <Text font_size={px(14)} color={white}>{detail}</Text>
    </VStack>
  </Frame>
);
const Arrow = ({ from, to }) => (
  <>
    <Line
      from={[px(from), px(208)]}
      to={[px(to - 12), px(208)]}
      stroke={gray}
      stroke_width={px(2)}
    />
    <Polygon
      x={px(to)}
      y={px(208)}
      anchor={[1, 0.5]}
      width={px(12)}
      height={px(14)}
      points={[
        [0, 0],
        [1, 0.5],
        [0, 1],
      ]}
      fill={gray}
      stroke={none}
    />
  </>
);
return (
  <Svg width={px(760)} height={px(400)}>
    <Group>
      <Rect fill={slate} stroke={none} />
      <Text x={px(36)} y={px(28)} font_family={mono} font_size={px(14)} color={blue}>POSITIONING / 03</Text>
      <Text x={px(36)} y={px(62)} font_size={px(30)} font_weight={bold} color={white}>A tiny processing pipeline</Text>
      <Arrow from={212} to={296} />
      <Arrow from={464} to={548} />
      <Node x={128} title="Source" detail="JSX + data" color={blue} />
      <Node x={380} title="Layout" detail="pixel fragments" color={red} />
      <Node x={632} title="Render" detail="SVG paths" color={green} />
      <Text x={px(254)} y={px(284)} anchor="center" font_size={px(14)} color={white}>measure</Text>
      <Text x={px(506)} y={px(284)} anchor="center" font_size={px(14)} color={white}>serialize</Text>
      <Text x={px(36)} y={px(340)} width={px(688)} font_size={px(15)} color={white}>Positions are explicit. Text remains text-sized. The renderer receives finished geometry.</Text>
    </Group>
  </Svg>
);
