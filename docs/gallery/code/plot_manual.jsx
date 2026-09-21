// A sine plot assembled directly from Graph, a mesh, and two axes.
const xlim = [0, tau]; const ylim = [-1, 1]
const xticks = 5; const yticks = 5
return <Box font-size={px(18)} padding={em(3)}>
  <Graph xlim={xlim} ylim={ylim}>
    <Mesh2D xlim={xlim} ylim={ylim} xticks={xticks} yticks={yticks} />
    <HAxis lim={xlim} ticks={xticks} side="bottom" />
    <VAxis lim={ylim} ticks={yticks} side="left" />
    <SymLine fy={sin} xlim={xlim} stroke={blue} stroke-width={px(3)} />
  </Graph>
</Box>
