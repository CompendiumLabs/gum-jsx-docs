// The same choice selects a different branch in display and script styles.
<Box font-size={px(36)} padding={em(0.7)}>
  <MathCol gap={em(0.5)}>
    <MathText style="display">
      <MathChoice>
        <MathText>D</MathText>
        <MathText>T</MathText>
        <MathText>S</MathText>
        <MathText>Q</MathText>
      </MathChoice>
    </MathText>
    <MathText style="script">
      <MathChoice>
        <MathText>D</MathText>
        <MathText>T</MathText>
        <MathText>S</MathText>
        <MathText>Q</MathText>
      </MathChoice>
    </MathText>
  </MathCol>
</Box>
