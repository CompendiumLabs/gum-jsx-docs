// Rows align their children's first baselines; children without guides use their
// bottom edge. The last row instead stretches every allocation to the text height.
<TextBox color={slate} padding={em(1.25)}>
  <TextCol gap={em(1.5)}>
    <TextCol gap={em(0.5)}>
      <Text font-size={em(0.8)} color={slate}>BASELINES / independent font sizes</Text>
      <HStack wrap gap={em(0.9)} align="baseline">
        <Text font-size={em(1)}>Small</Text>
        <Text font-size={em(2)} font-weight={bold}>Large</Text>
        <Text font-size={em(1.4)} font-style="italic" color={blue}>Aligned</Text>
        <Square width={em(2)} fill={red} stroke={none} />
      </HStack>
    </TextCol>
    <TextCol gap={em(0.5)}>
      <Text font-size={em(0.8)} color={slate}>PACKING / equal space between fixed items</Text>
      <HStack justify="space-between" align="center">
        <Circle width={em(2)} fill={blue} stroke={none} />
        <Text>Space between</Text>
        <Square width={em(2)} fill={red} stroke={none} />
      </HStack>
    </TextCol>
    <TextCol gap={em(0.5)}>
      <Text font-size={em(0.8)} color={slate}>STRETCH / the reflowed text sets the height</Text>
      <HStack gap={em(0.9)} align="stretch">
        <Box width={em(0.5)} background={blue} border-radius={px(4)} />
        <Text grow={1} line-height={em(1.4)}>
          The blue bar stretches to the height of this paragraph after its width is allocated. Resize the SVG and both follow the words onto new lines.
        </Text>
      </HStack>
    </TextCol>
  </TextCol>
</TextBox>
