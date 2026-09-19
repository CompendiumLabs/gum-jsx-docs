// Choose the shared width explicitly for aspect-1 and aspect-2 figures totaling 500px high.
<VStack height={px(500)} width={px(500 / (1 + 1 / 2))}>
  <Rect aspect={1} fill={blue} stroke={none} />
  <Rect aspect={2} fill={red} stroke={none} />
</VStack>
