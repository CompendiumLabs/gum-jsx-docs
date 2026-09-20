// Equal flexible columns give a figure and a wrapping explanation the same allocation.
<Slide fit font-size={px(13)} aspect={1.3} padding={em(1.75)} background={lightgray} color={slate}>
  <TextCol gap={em(1.25)}>
    <Text font-family={mono} font-size={em(0.875)} color={blue}>LAYOUT / 01</Text>
    <Text font-size={em(1.875)} font-weight={bold}>A figure beside its explanation</Text>
    <HStack grow={1} gap={em(1.5)} align="center">
      <TextFrame
        grow={1}
        padding={em(1.25)}
        radius={em(0.75)}
        border-color={gray}
        background={white}
      >
        <TextCol gap={em(1)}>
          <Text font-size={em(0.875)} font-weight={bold}>ONE SHARED WIDTH</Text>
          <HStack height={em(10)} gap={em(0.75)} align="end">
            <Rect
              grow={1}
              height={0.4}
              fill={blue}
              stroke={none}
            />
            <Rect
              grow={1}
              height={0.7}
              fill={red}
              stroke={none}
            />
            <Rect
              grow={1}
              height={1}
              fill={green}
              stroke={none}
            />
          </HStack>
          <Text font-size={em(0.875)} color={slate}>Relative heights, flexible widths.</Text>
        </TextCol>
      </TextFrame>
      <TextCol grow={1} gap={em(0.875)}>
        <Text font-size={em(1.5)} font-weight={bold}>Two columns, one allocation</Text>
        <Text font-size={em(1.125)} line-height={em(1.4)}>Both columns grow equally into the available width. The figure and its explanation stay side by side.</Text>
        <Text font-size={em(1.125)} line-height={em(1.4)}>The paragraph reflows. The bars share one height reference. Nothing needs to infer a combined aspect ratio.</Text>
        <Text font-size={em(0.875)} color={blue}>Change the canvas width and render again.</Text>
      </TextCol>
    </HStack>
  </TextCol>
</Slide>
