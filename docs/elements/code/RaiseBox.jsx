// Positive shifts raise a body and negative shifts lower it.
<Box font-size={px(36)} padding={em(0.7)}>
  <MathText>
    x+
    <RaiseBox shift={em(0.4)}>
      <TextMode>up</TextMode>
    </RaiseBox>
    +
    <RaiseBox shift={em(-0.3)}>
      <TextMode>down</TextMode>
    </RaiseBox>
    =y
  </MathText>
</Box>
