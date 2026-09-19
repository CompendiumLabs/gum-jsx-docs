// Compact, wrapping, and elliptical nodes retain the same text size.
<HStack wrap gap={em(1)} align="center" font-size={px(18)}>
  <Node border-color={blue}>
    Ready
  </Node>
  <Node width={em(9)} border-color={blue}>
    A longer label wraps inside its frame
  </Node>
  <Node width={em(6)} height={em(4)} radius={[0.5, 0.5]} border-color={red}>
    Done
  </Node>
</HStack>
