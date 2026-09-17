// Nested elliptical regions with independently positioned labels.
<Svg font-size={px(25)}>
  <TitleFrame title="Set Theory" padding={em(2.5)} radius={px(14)}>
    <Group width={px(500)} height={px(500)}>
      <Circle
        width={1}
        height={1}
        fill={interp(white, purple, 0.17)}
        stroke={purple}
        stroke-width={px(2)}
      />
      <Circle
        x={0.6}
        y={0.22}
        anchor="center"
        width={0.22}
        height={0.22}
        fill={interp(white, blue, 0.35)}
        stroke={blue}
        stroke-width={px(2)}
      />
      <Circle
        x={0.55}
        y={0.73}
        anchor="center"
        width={0.34}
        height={0.34}
        fill={interp(white, purple, 0.35)}
        stroke={purple}
        stroke-width={px(2)}
      />
      <Text x={0.2} y={0.7} anchor="center">
        A
      </Text>
      <Text x={0.6} y={0.22} anchor="center">
        B
      </Text>
      <Text x={0.55} y={0.73} anchor="center">
        C
      </Text>
    </Group>
  </TitleFrame>
</Svg>
