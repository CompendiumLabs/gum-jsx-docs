# Punk Rock

This one is very simple, but it is a nice reminder that layout elements can be graphic design tools too. The three **TextFrame** boxes are arranged with an `HStack`, given different corner roundings, and then wrapped in a larger rotated frame to get the sticker-like composition.

Most of the energy comes from the framing rather than the text itself. The bright blocks, asymmetric rounding, and overall rotation are enough to push the piece toward a poster or logo treatment with very little code.

**Code**

```jsx
<Frame rounded={0.15} padding margin fill={gray} rotate={-25}>
  <HStack spacing align="left">
    <TextFrame fill={red} padding={[0.5, 0.3]} rounded={[0.15, 0, 0, 0.15]}>Punk</TextFrame>
    <TextFrame fill={blue} padding={[0.5, 0.3]} rounded={0}>Rock</TextFrame>
    <TextFrame fill={green} padding={[0.5, 0.3]} rounded={[0, 0.15, 0.15, 0]} aspect>→</TextFrame>
    <Spacer aspect={2} />
  </HStack>
</Frame>
```