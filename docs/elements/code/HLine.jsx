// A horizontal line uses the enclosing graph's data coordinates automatically.
<Box width="fill" aspect={1.6} padding={em(2)}>
  <Graph xlim={[-2, 6]} ylim={[-1, 7]}>
    <HLine y={3} lim={[-1, 5]} stroke={blue} stroke-width={px(3)} />
    <Points points={[[-1, 3], [5, 3]]} point-size={px(8)} fill={blue} />
  </Graph>
</Box>
