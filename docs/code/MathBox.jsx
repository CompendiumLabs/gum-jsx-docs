// a blue circle as a custom operator between a and b: dropped in plainly it touches its neighbors, wrapped in a MathBox classed as a binary operator it spaces like a plus, and an arrow boxed as a relation two ems wide spaces like an equals sign
const op = <Box padding>
  <Circle fill={blue} />
</Box>
return <VStack spacing={0.15}>
  <MathText>
    {"a"}
    {op}
    {"b = c"}
  </MathText>
  <MathText>
    {"a"}
    <MathBox klass="mbin">{op}</MathBox>
    {"b = c"}
  </MathText>
  <MathText>
    {"a"}
    <MathBox klass="mrel" advance={2}>
      <Arrow points={[[0, 0.5], [1, 0.5]]} stroke-width={10} arrow-size={0.5} arrow-curve={0.75} />
    </MathBox>
    {"b"}
  </MathText>
</VStack>