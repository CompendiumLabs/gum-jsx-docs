// This child deliberately overflows. Clip keeps its ink inside the rounded
// border; the tree still records the child's full size and overflow.
<Svg>
  <Box padding={px(12)}>
    <Box width={px(220)} height={px(100)} padding={px(12)}
      border-width={px(6)} border-color={blue} background={lightgray}
      radius={px(28)} align="center" clip>
      <Square width={px(280)} fill={red} stroke={green} stroke-width={px(2)} />
    </Box>
  </Box>
</Svg>
