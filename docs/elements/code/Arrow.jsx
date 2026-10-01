// A curved Arrow with open curved barbs.
<Graph aspect={1} xlim={[-0.5, 3.5]} ylim={[-0.5, 3.5]}>
  <Arrow
    points={[[0, 0], [1, 2.5], [3, 2]]}
    stroke-width={px(1.5)}
    curve
    start_head
    head-open
    head-size={px(10)}
    head-curve={0.4}
  />
</Graph>
