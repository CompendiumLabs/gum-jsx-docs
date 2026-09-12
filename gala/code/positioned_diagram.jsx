// Group positions nodes and explicit arrow geometry in a shared pixel canvas.
const Node = ({ x, title, detail, color }) => (
  <Frame x={px(x)} y={px(208)} anchor="center" width={px(168)} height={px(112)}
    padding={px(16)} align="center" border_width={px(2)} border_color={color}
    radius={px(14)} background="#233a4f">
    <VStack width={1} gap={px(8)} align="center">
      <Text font_size={px(22)} font_weight={700} color="white">{title}</Text>
      <Text font_size={px(14)} color="#c0d1de">{detail}</Text>
    </VStack>
  </Frame>
);
const Arrow = ({ from, to }) => (
  <>
    <Line width={1} height={1} from={{ x: px(from), y: px(208) }} to={{ x: px(to - 12), y: px(208) }}
      stroke="#9eb8cb" stroke_width={px(2)} />
    <Polygon x={px(to)} y={px(208)} anchor={{ x: 1, y: 0.5 }} width={px(12)} height={px(14)}
      points={[{ x: 0, y: 0 }, { x: 1, y: 0.5 }, { x: 0, y: 1 }]}
      fill="#9eb8cb" stroke="none" />
  </>
);
return (
  <Svg width={px(760)} height={px(400)}>
    <Group>
      <Rect fill="#182737" stroke="none" />
      <Text x={px(36)} y={px(28)} font_family="IBM Plex Mono" font_size={px(14)} color="#8ec8b4">POSITIONING / 03</Text>
      <Text x={px(36)} y={px(62)} font_size={px(30)} font_weight={700} color="white">A tiny processing pipeline</Text>
      <Arrow from={212} to={296} />
      <Arrow from={464} to={548} />
      <Node x={128} title="Source" detail="JSX + data" color="#8ec8b4" />
      <Node x={380} title="Layout" detail="pixel fragments" color="#8eadd2" />
      <Node x={632} title="Render" detail="SVG paths" color="#d99a7c" />
      <Text x={px(254)} y={px(284)} anchor="center" font_size={px(14)} color="#b4c6d5">measure</Text>
      <Text x={px(506)} y={px(284)} anchor="center" font_size={px(14)} color="#b4c6d5">serialize</Text>
      <Text x={px(36)} y={px(340)} width={px(688)} font_size={px(15)} color="#b4c6d5">Positions are explicit. Text remains text-sized. The renderer receives finished geometry.</Text>
    </Group>
  </Svg>
);
