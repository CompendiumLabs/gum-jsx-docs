// Nested elliptical regions with independently positioned labels.
<Svg width={px(650)} height={px(600)} font-size={px(26)}>
  <Box padding={px(28)}>
    <TitleFrame title="Set Theory" padding={px(24)} radius={px(14)}>
      <Group width={px(540)} height={px(450)}>
        <Ellipse
          width={1}
          height={1}
          fill={interp(white, purple, 0.17)}
          stroke={purple}
          stroke-width={px(2)}
        />
        <Ellipse
          x={0.6}
          y={0.22}
          anchor="center"
          width={0.22}
          height={0.22}
          fill={interp(white, blue, 0.35)}
          stroke={blue}
          stroke-width={px(2)}
        />
        <Ellipse
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
  </Box>
</Svg>
