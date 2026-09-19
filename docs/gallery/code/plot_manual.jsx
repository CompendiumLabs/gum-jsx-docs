// A sine plot assembled directly from Graph, a mesh, and two axes.
<Box font-size={px(17)} padding={{ left: em(4.5), right: em(2), top: em(2), bottom: em(3) }}>
  <Graph xlim={[0, tau]} ylim={[-1, 1]}>
    <Mesh2D xlim={[0, tau]} ylim={[-1, 1]} xticks={5} yticks={5} opacity={0.15} />
    <HAxis lim={[0, tau]} ticks={5} side="bottom" />
    <VAxis lim={[-1, 1]} ticks={5} side="left" />
    <SymLine fy={sin} xlim={[0, tau]} samples={241} stroke={blue} stroke-width={px(3)} />
  </Graph>
</Box>
