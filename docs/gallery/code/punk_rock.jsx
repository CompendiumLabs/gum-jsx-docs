// A rotated strip of three colored text frames with rounded outer corners.
<Svg width={px(720)} height={px(410)} font-size={px(38)}>
  <Group>
    <Rotate x={0.5} y={0.5} anchor="center" angle={-25}>
      <Frame padding={px(12)} radius={px(22)} background={gray} border-color={darkgray}>
        <HStack gap={px(12)} align="center">
          <TextFrame
            width="fit"
            padding={px(12)}
            radius={{ l: px(14) }}
            background={red}
            color={white}
          >
            Punk
          </TextFrame>
          <TextFrame width="fit" padding={px(12)} background={blue} color={white}>
            Rock
          </TextFrame>
          <TextFrame
            width="fit"
            padding={px(12)}
            radius={{ r: px(14) }}
            background={green}
            color={white}
          >
            →
          </TextFrame>
        </HStack>
      </Frame>
    </Rotate>
  </Group>
</Svg>
