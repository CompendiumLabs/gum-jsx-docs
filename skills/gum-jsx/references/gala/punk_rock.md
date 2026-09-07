# Punk Rock

This one is very simple, but it is a nice reminder that layout elements can be graphic design tools too. The three **Frame** boxes are arranged with an `HStack`, given different corner roundings, and then wrapped in a larger rotated frame to get the sticker-like composition.

Most of the energy comes from the framing rather than the text itself. The bright blocks, asymmetric rounding, and overall rotation are enough to push the piece toward a poster or logo treatment with very little code.

**Code**

```jsx
<Frame rounded={40} padding margin fill={gray} rotate={-25}>
  <HStack spacing align="left">
    <Frame fill={red} padding={[0.5, 0.3]} rounded={[10, 0, 0, 10]}><Text>Punk</Text></Frame>
    <Frame fill={blue} padding={[0.5, 0.3]} rounded={0}><Text>Rock</Text></Frame>
    <Frame fill={green} padding={[0.5, 0.3]} rounded={[0, 10, 10, 0]} aspect><Text>→</Text></Frame>
    <Spacer aspect={2} />
  </HStack>
</Frame>
```