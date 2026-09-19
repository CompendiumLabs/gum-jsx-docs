// Directed plot axes with curved arrowheads and a logarithmic curve.
<Plot
  font-size={px(14)}
  title="Axes with arrows"
  xlim={[1, 5]}
  ylim={[0, 2]}
  xticks={[1, 2, 3, 4]}
  yticks={[0, 0.5, 1, 1.5]}
  grid
  axis-arrow
  axis-arrow-open
  axis-arrow-curve={0.4}
  margin={em(2)}
>
  <SymLine fy={log} xlim={[1, 5]} stroke={blue} stroke-width={px(2)} />
</Plot>
