// Snell's law and one internal reflection; dispersion is exaggerated for clarity.
const incidence = 59 * Math.PI / 180
const entry = [-Math.cos(incidence), -Math.sin(incidence)]
const center = [0.65, 0.38], radius = 0.21, aspect = 21 / 12
const local = ([x,y]) => [center[0] + radius*x, center[1] + radius*aspect*y]
const paths = spectrum.map((paint,i) => {
  const refraction = Math.asin(Math.sin(incidence) / (1.33 + i*0.004))
  const a = incidence - refraction
  const direction = [Math.cos(a), Math.sin(a)]
  const t = 2*Math.cos(refraction)
  const back = entry.map((v,j) => v + t*direction[j])
  const dot = direction[0]*back[0] + direction[1]*back[1]
  const reflected = direction.map((v,j) => v - 2*dot*back[j])
  const out = back.map((v,j) => v + t*reflected[j])
  const deviation = Math.PI + 2*incidence - 4*refraction
  const end = [out[0] + 0.86*Math.cos(deviation), out[1] + 0.86*Math.sin(deviation)]
  return {paint, points:[entry,back,out,end].map(local)}
})
return (
  <Page title="Raindrops can show the colors" prompt="Light bends, bounces inside, and bends out again." background="#EAF5FC">
    <HStack width="fill" height="fill" align="center" gap={em(1.5)}>
      <Group width={em(21)} height={em(12)}>
        <Circle x={center[0]-radius} y={center[1]-radius*aspect} width={2*radius}
          fill="#BCE3F4" stroke="#6DA6C7" stroke-width={em(0.1)} />
        <Ray from={[0.04,local(entry)[1]]} to={local(entry)} paint="#BDAC71" />
        {paths.map(({paint,points}) => <Arrow width={1} height={1} points={points}
          stroke={paint} stroke-width={em(0.07)} head-size={em(0.18)} />)}
        <Text x={0.04} y={0.14} font-size={em(0.9)}>sunlight</Text>
        <Text x={center[0]} y={center[1]} anchor="center" font-weight="bold">raindrop</Text>
        <Text x={0.1} y={0.81} font-size={em(0.9)}>colors spread out</Text>
      </Group>
      <VStack grow={1} gap={em(0.65)}>
        <Text font-size={em(1.35)} font-weight="bold">Water bends light.</Text>
        <Text font-size={em(1.3)}>Different colors bend a little differently.</Text>
        <Text font-size={em(1.3)}>The colors spread out!</Text>
      </VStack>
    </HStack>
  </Page>
)
