// Sample a damped oscillation and explicitly map its domain into a small chart.
const plot = { left: 64, top: 24, width: 560, height: 224 };
const mapX = (value) => px(plot.left + plot.width * rescale(value, [0, 8]));
const mapY = (value) => px(plot.top + plot.height * rescale(value, [1, -1]));
const points = linspace(0, 8, 101).map((t) => ({
  x: mapX(t), y: mapY(exp(-0.24 * t) * sin(2.5 * t)),
}));
return (
  <Svg width={px(720)}>
    <Box width={1} padding={px(28)} background={lightgray} color={slate}>
      <VStack width={1} gap={px(16)}>
        <Text font_family={mono} font_size={px(14)} color={blue}>DATA / 04</Text>
        <Text font_size={px(30)} font_weight={bold}>A damped oscillation</Text>
        <Group height={px(300)}>
          {range(-1, 2).map((value) => (
            <>
              <Line
                from={{ x: mapX(0), y: mapY(value) }}
                to={{ x: mapX(8), y: mapY(value) }}
                stroke={value === 0 ? darkgray : gray}
                stroke_width={px(1)}
              />
              <Text x={px(44)} y={mapY(value)} anchor={{ x: 1, y: 0.5 }}
                font_family={mono} font_size={px(12)} color={slate}>{value}</Text>
            </>
          ))}
          <Line
            from={{ x: mapX(0), y: mapY(1) }}
            to={{ x: mapX(0), y: mapY(-1) }}
            stroke={darkgray}
            stroke_width={px(1)}
          />
          <Polyline
            points={points}
            fill={none}
            stroke={blue}
            stroke_width={px(3)}
            stroke_linejoin="round"
            stroke_linecap="round"
          />
          {slice(points, 0, undefined, 25).map((point) => (
              <Circle
                x={point.x}
                y={point.y}
                anchor="center"
                width={px(7)}
                fill={red}
                stroke={lightgray}
                stroke_width={px(1)}
              />
            ))}
          {range(0, 9, 2).map((value) => (
            <Text x={mapX(value)} y={px(260)} anchor={{ x: 0.5, y: 0 }}
              font_family={mono} font_size={px(12)} color={slate}>{value}</Text>
          ))}
          <Text x={px(648)} y={px(260)} font_size={px(12)} font_style="italic">t</Text>
        </Group>
        <Text font_family={mono} font_size={px(16)}>exp(-0.24t) sin(2.5t)</Text>
        <Text font_size={px(14)} color={slate}>101 samples. Explicit domains, axes, and labels. Just geometry and JavaScript.</Text>
      </VStack>
    </Box>
  </Svg>
);
