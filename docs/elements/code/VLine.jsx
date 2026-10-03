// A vertical line uses the enclosing graph's data coordinates automatically.
<Box width="fill" aspect={1.6} padding={em(2)}>
  <Graph xlim={[-2, 6]} ylim={[-1, 7]}>
    <VLine x={2} lim={[0, 6]} stroke={blue} stroke-width={px(3)} />
    <Points points={[[2, 0], [2, 6]]} point-size={px(8)} fill={blue} />
  </Graph>
</Box>
