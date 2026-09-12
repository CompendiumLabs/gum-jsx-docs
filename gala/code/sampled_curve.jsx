// Sample a damped oscillation and explicitly map its domain into a small chart.
const plot = { left: 64, top: 24, width: 560, height: 224 };
const mapX = value => px(plot.left + plot.width * value / 8);
const mapY = value => px(plot.top + plot.height * (1 - value) / 2);
const points = Array.from({ length: 101 }, (_, index) => {
  const t = 8 * index / 100;
  return { x: mapX(t), y: mapY(Math.exp(-0.24 * t) * Math.sin(2.5 * t)) };
});
return (
  <Svg width={px(720)}>
    <Box width={1} padding={px(28)} background="#f7f8fa" color="#24364b">
      <VStack width={1} gap={px(16)}>
        <Text font_family="IBM Plex Mono" font_size={px(14)} color="#2c7567">DATA / 04</Text>
        <Text font_size={px(30)} font_weight={700}>A damped oscillation</Text>
        <Group width={1} height={px(300)}>
          {[-1, 0, 1].map(value => (
            <>
              <Line width={1} height={1} from={{ x: mapX(0), y: mapY(value) }} to={{ x: mapX(8), y: mapY(value) }}
                stroke={value === 0 ? '#9aacbb' : '#dbe3e8'} stroke_width={px(1)} />
              <Text x={px(44)} y={mapY(value)} anchor={{ x: 1, y: 0.5 }}
                font_family="IBM Plex Mono" font_size={px(12)} color="#607184">{value}</Text>
            </>
          ))}
          <Line width={1} height={1} from={{ x: mapX(0), y: mapY(1) }} to={{ x: mapX(0), y: mapY(-1) }}
            stroke="#9aacbb" stroke_width={px(1)} />
          <Polyline width={1} height={1} points={points} fill="none" stroke="#2c7567"
            stroke_width={px(3)} stroke_linejoin="round" stroke_linecap="round" />
          {points.filter((_, index) => index % 25 === 0).map(point => (
            <Circle x={point.x} y={point.y} anchor="center" width={px(7)}
              fill="#bb6748" stroke="#f7f8fa" stroke_width={px(1)} />
          ))}
          {[0, 2, 4, 6, 8].map(value => (
            <Text x={mapX(value)} y={px(260)} anchor={{ x: 0.5, y: 0 }}
              font_family="IBM Plex Mono" font_size={px(12)} color="#607184">{value}</Text>
          ))}
          <Text x={px(648)} y={px(260)} font_size={px(12)} font_style="italic">t</Text>
        </Group>
        <Text font_family="IBM Plex Mono" font_size={px(16)}>exp(-0.24t) sin(2.5t)</Text>
        <Text font_size={px(14)} color="#607184">101 samples. Explicit domains, axes, and labels. Just geometry and JavaScript.</Text>
      </VStack>
    </Box>
  </Svg>
);
