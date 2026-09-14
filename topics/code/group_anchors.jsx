// Each nested Group has its own local 0–1 reference rectangle. The same position
// meets a different point of the Box: its top-left, center, or bottom-right.
<Svg font-size={px(18)}>
  <TextBox padding={em(1)}>
    <TextCol gap={em(2)}>
      <Text font-size={em(1.5)} font-weight={bold}>Choose the point that meets the position</Text>
      <HStack gap={em(1.5)}>
        {['start', 'center', 'end'].map((anchor, index) =>
          <VStack align="center" gap={em(1.5)}>
            <Text font-weight={bold}>{anchor}</Text>
            <Group width={px(200)} height={px(200)}>
              <Line from={{x: 0.5, y: 0}} to={{x: 0.5, y: 1}} stroke={interp(white, black, 0.2)} />
              <Line from={{x: 0, y: 0.5}} to={{x: 1, y: 0.5}} stroke={interp(white, black, 0.2)} />
              <Rect x={0.5} y={0.5} anchor={anchor} width={em(5)} height={em(3)}
                fill={blue} stroke={none} radius={px(5)} />
              <Circle x={0.5} y={0.5} anchor="center" width={px(7)} fill={slate} stroke={white} />
            </Group>
            <Text font-size={em(0.9)}>x = 0.5, y = 0.5</Text>
          </VStack>
        )}
      </HStack>
    </TextCol>
  </TextBox>
</Svg>
