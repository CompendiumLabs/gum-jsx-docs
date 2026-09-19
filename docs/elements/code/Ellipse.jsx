// Ellipses use independent radii along the allocated width and height.
<Box padding={em(1.25)} background={lightgray}>
  <HStack gap={em(1.25)} align="center">
    <Ellipse grow={2} aspect={2} fill={blue} stroke={none} />
    <Ellipse grow={1} aspect={2 / 3} fill={red} stroke={none} />
    <Ellipse
      grow={2}
      aspect={5 / 3}
      radius={[0.4, 0.25]}
      fill={green}
      stroke={none}
    />
  </HStack>
</Box>
