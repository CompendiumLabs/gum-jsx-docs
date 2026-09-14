// Sample a damped oscillation and explicitly map its domain into a small chart.
const plot = { left: 64, top: 24, width: 560, height: 224 }
const mapX = (value) => px(plot.left + plot.width * rescale(value, [0, 8]))
const mapY = (value) => px(plot.top + plot.height * rescale(value, [1, -1]))
const points = linspace(0, 8, 101).map((t) => [
  mapX(t),
  mapY(exp(-0.24 * t) * sin(2.5 * t)),
])
return (
  <Svg width={px(720)} font-size={px(16)}>
    <Box width={1} padding={em(1.75)} background={lightgray} color={slate}>
      <VStack width={1} gap={em(1)}>
        <Text font-family={mono} font-size={em(0.875)} color={blue}>DATA / 04</Text>
        <Text font-size={em(1.875)} font-weight={bold}>A damped oscillation</Text>
        <Group height={px(300)}>
          {range(-1, 2).map((value) => (
            <>
              <Line
                from={[mapX(0), mapY(value)]}
                to={[mapX(8), mapY(value)]}
                stroke={value === 0 ? darkgray : gray}
                stroke-width={px(1)}
              />
              <Text x={px(44)} y={mapY(value)} anchor={[1, 0.5]}
                font-family={mono} font-size={em(0.75)} color={slate}>{value}</Text>
            </>
          ))}
          <Line
            from={[mapX(0), mapY(1)]}
            to={[mapX(0), mapY(-1)]}
            stroke={darkgray}
            stroke-width={px(1)}
          />
          <Polyline
            points={points}
            fill={none}
            stroke={blue}
            stroke-width={px(3)}
            stroke-linejoin="round"
            stroke-linecap="round"
          />
          {slice(points, 0, undefined, 25).map(([x, y]) => (
              <Circle
                x={x}
                y={y}
                anchor="center"
                width={px(7)}
                fill={red}
                stroke={lightgray}
                stroke-width={px(1)}
              />
            ))}
          {range(0, 9, 2).map((value) => (
            <Text x={mapX(value)} y={px(260)} anchor={[0.5, 0]}
              font-family={mono} font-size={em(0.75)} color={slate}>{value}</Text>
          ))}
          <Text x={px(648)} y={px(260)} font-size={em(0.75)} font-style="italic">t</Text>
        </Group>
        <Text font-family={mono} font-size={em(1)}>exp(-0.24t) sin(2.5t)</Text>
        <Text font-size={em(0.875)} color={slate}>101 samples. Explicit domains, axes, and labels. Just geometry and JavaScript.</Text>
      </VStack>
    </Box>
  </Svg>
)
