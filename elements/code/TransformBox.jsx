// An explicit affine transform.
<Svg width={px(460)} height={px(280)}>
  <Box padding={px(30)}>
    <TransformBox matrix={[1, 0.2, 0.3, 1, 0, 0]}>
      <Rect width={px(240)} height={px(110)} fill={white} stroke={blue} />
    </TransformBox>
  </Box>
</Svg>
