// a scatter of 200 normally distributed points with a fixed seed, sized at random and colored by distance from the origin
setSeed(7)
const pal = palette(blue, red, [0, 2])
const points = range(200).map(() => [normal(), normal()])
return <Plot xlim={[-3, 3]} ylim={[-3, 3]} aspect={1} grid margin={0.15}>
  {points.map(([x, y]) =>
    <Circle pos={[x, y]} rad={uniform(0.03, 0.1)} fill={pal(sqrt(x*x + y*y))} opacity={0.7} stroke={none} />
  )}
</Plot>
