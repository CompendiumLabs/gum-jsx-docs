// Route 66: a simplified historic corridor, rendered entirely with Gum.
// Geography: Gum's bundled US-atlas states. City coordinates are approximate.
// Historical context: https://www.nps.gov/articles/000/route-66-national.htm
// State sequence: https://npgallery.nps.gov/ROSI/About
// Render from this directory: gum route_66.jsx -o route_66.svg

const C = {
  paper: '#F5F0E4', ink: '#193F41', muted: '#6B7771', route: '#BE4C30',
  land: '#E8E7DE', border: '#F8F5EC', water: '#E3EBE6', sand: '#E7D5AE',
  sandAlt: '#EBDDCA', line: '#CDCAB9', state: '#8B7A58', white: '#FFFBF2',
};
const states = [
  { id: '17', name: 'Illinois', abbr: 'IL', stop: 'Chicago', label: [-89.35, 41.55] },
  { id: '29', name: 'Missouri', abbr: 'MO', stop: 'St. Louis', label: [-92.70, 39.45] },
  { id: '20', name: 'Kansas', abbr: 'KS', stop: 'Galena', label: [-98.7, 38.55] },
  { id: '40', name: 'Oklahoma', abbr: 'OK', stop: 'Tulsa', label: [-99.05, 36.55] },
  { id: '48', name: 'Texas', abbr: 'TX', stop: 'Amarillo', label: [-100.5, 32.4] },
  { id: '35', name: 'New Mexico', abbr: 'NM', stop: 'Albuquerque', label: [-106.4, 32.5] },
  { id: '04', name: 'Arizona', abbr: 'AZ', stop: 'Flagstaff', label: [-111.8, 32.5] },
  { id: '06', name: 'California', abbr: 'CA', stop: 'Santa Monica', label: [-119.25, 37.1] },
];

// Representative waypoints retain the bends of the corridor without implying
// survey precision. Alternate alignments, including the Santa Fe loop, are omitted.
const route = [
  [-87.63,41.88],[-88.08,41.53],[-88.64,41.09],[-88.63,40.88],
  [-89.00,40.48],[-89.36,40.15],[-89.65,39.80],[-89.65,39.16],
  [-89.95,38.81],[-90.20,38.63],[-90.40,38.60],[-90.74,38.50],
  [-91.01,38.35],[-91.40,38.06],[-91.77,37.95],[-92.20,37.83],
  [-92.66,37.68],[-93.29,37.21],[-94.31,37.18],[-94.51,37.08],
  [-94.64,37.08],[-94.70,37.08],[-94.74,37.02],[-94.79,36.95],
  [-94.88,36.87],[-95.15,36.64],[-95.62,36.31],[-95.75,36.19],
  [-95.99,36.15],[-96.11,36.00],[-96.39,35.84],[-96.77,35.70],
  [-97.04,35.68],[-97.33,35.67],[-97.48,35.65],[-97.52,35.47],
  [-97.95,35.53],[-98.71,35.51],[-98.97,35.52],[-99.41,35.41],
  [-99.64,35.29],[-99.87,35.22],[-100.00,35.22],[-100.25,35.21],
  [-100.60,35.23],[-101.11,35.20],[-101.83,35.22],[-102.43,35.24],
  [-102.67,35.27],[-103.04,35.18],[-103.73,35.17],[-104.68,34.94],
  [-106.05,34.99],[-106.31,35.10],[-106.65,35.08],[-107.38,35.04],
  [-107.85,35.15],[-108.74,35.53],[-109.05,35.36],[-109.90,34.90],
  [-110.70,35.02],[-111.65,35.20],[-112.19,35.25],[-112.48,35.23],
  [-112.88,35.33],[-113.42,35.53],[-113.84,35.38],[-114.05,35.19],
  [-114.38,35.03],[-114.62,34.85],[-115.05,34.92],[-115.24,34.73],
  [-115.74,34.56],[-116.16,34.72],[-116.69,34.83],[-117.02,34.90],
  [-117.29,34.54],[-117.46,34.32],[-117.29,34.11],[-117.69,34.10],
  [-118.14,34.15],[-118.24,34.05],[-118.49,34.01],
];
const stops = [
  { name:'Chicago', p:[-87.63,41.88], dx:18, dy:-11, side:'start', tag:'EASTERN END', end:true },
  { name:'Springfield, IL', p:[-89.65,39.80], dx:-18, dy:-28, side:'end' },
  { name:'St. Louis', p:[-90.20,38.63], dx:22, dy:9, side:'start' },
  { name:'Springfield, MO', p:[-93.29,37.21], dx:19, dy:-28, side:'start' },
  { name:'Galena', p:[-94.64,37.08], dx:-15, dy:-35, side:'end' },
  { name:'Tulsa', p:[-95.99,36.15], dx:20, dy:5, side:'start' },
  { name:'Oklahoma City', p:[-97.52,35.47], dx:18, dy:38, side:'start' },
  { name:'Amarillo', p:[-101.83,35.22], dx:0, dy:36, side:'center' },
  { name:'Tucumcari', p:[-103.73,35.17], dx:0, dy:-30, side:'center' },
  { name:'Albuquerque', p:[-106.65,35.08], dx:0, dy:37, side:'center' },
  { name:'Gallup', p:[-108.74,35.53], dx:0, dy:-27, side:'center' },
  { name:'Flagstaff', p:[-111.65,35.20], dx:0, dy:36, side:'center' },
  { name:'Kingman', p:[-114.05,35.19], dx:0, dy:-36, side:'center' },
  { name:'Barstow', p:[-117.02,34.90], dx:-12, dy:-32, side:'end' },
  { name:'Santa Monica', p:[-118.49,34.01], dx:-12, dy:31, side:'end', tag:'PACIFIC COAST', end:true },
];

const Shield = (props) => (
  <Group width={em(5.5)} height={em(6.1)} {...props}>
    <Path
      commands={[
        move_to(.06,.05),quad_to(.27,.13,.50,.025),quad_to(.73,.13,.94,.05),
        line_to(.94,.54),curve_to(.94,.80,.65,.88,.50,.97),
        curve_to(.35,.88,.06,.80,.06,.54),close_path(),
      ]}
      fill={C.ink} stroke={none}
    />
    <Text pos={[.5,.19]} font-size={em(.70)} color={C.paper} font-weight="bold">US ROUTE</Text>
    <Line from={[.18,.30]} to={[.82,.30]} stroke={C.paper} stroke-width={em(.055)} />
    <Text pos={[.5,.56]} font-size={em(3.15)} color={C.paper} font-weight="bold">66</Text>
  </Group>
);

const mapW = 1352;
const mapH = 553;
const source = us_states();
const view = { projection:'mercator', bounds:[-124.5,30.75,-82.0,44.5], padding:0 };
const project = p => project_geo_point(source, view, mapW, mapH, p);
const local = p => p.map(px);

const Stop = ({ name, p, dx, dy, side, tag, end }) => {
  const [x,y] = project(p);
  const label = [x+dx,y+dy];
  const lineEnd = [x+dx, y+dy+(dy<0 ? 10 : -10)];
  return (
    <Group width={px(mapW)} height={px(mapH)}>
      <Line from={local([x,y])} to={local(lineEnd)} stroke={C.muted} stroke-width={em(.055)} />
      {end && <Circle pos={local([x,y])} width={em(1.0)} fill={C.white} stroke={C.route} stroke-width={em(.12)} />}
      <Circle pos={local([x,y])} width={em(end ? .50 : .43)} fill={C.ink} stroke={C.white} stroke-width={em(.10)} />
      <TextBox
        pos={local(label)} anchor={[side,'center']}
        padding={[em(.25),em(.10)]} background={C.paper}
      >
        <VStack gap={em(.12)} align={side}>
          {tag && <Text font-size={em(.51)} font-weight="bold" color={C.route}>{tag}</Text>}
          <Text font-size={em(end ? .95 : .76)} font-weight="bold" color={C.ink} wrap={false}>{name}</Text>
        </VStack>
      </TextBox>
    </Group>
  );
};

const StateCell = ({ name, abbr, stop, index, ...props }) => (
  <VStack gap={em(.28)} {...props}>
    <HStack gap={em(.5)} align="center">
      <Text font-family="IBM Plex Mono" font-size={em(.66)} color={C.route}>{String(index+1).padStart(2,'0')}</Text>
      <Text font-size={em(.9)} font-weight="bold" color={C.ink}>{abbr}</Text>
    </HStack>
    <Text font-size={em(.78)} font-weight="bold">{name}</Text>
    <Text font-size={em(.65)} color={C.muted}>{stop}</Text>
  </VStack>
);

return (
  <TextBox width={px(1440)} padding={em(2.2)} font-size={px(20)} color={C.ink} background={C.paper}>
    <VStack gap={em(1.05)} align="fill">
      <HStack gap={em(1.35)} align="center">
        <Shield />
        <VStack grow={1} gap={em(.30)}>
          <Text font-size={em(.72)} font-weight="bold" color={C.route}>HISTORIC U.S. HIGHWAY 66</Text>
          <Text font-size={em(3.05)} font-weight="bold" line-height={em(1.05)}>The Mother Road</Text>
          <Text font-size={em(1.00)} color={C.muted}>Chicago to Santa Monica · Across the American West</Text>
        </VStack>
        <VStack gap={em(.20)} align="end">
          <Text font-size={em(2.0)} font-weight="bold">≈2,400</Text>
          <Text font-size={em(.66)} font-weight="bold" color={C.muted}>MILES · EIGHT STATES</Text>
          <Text font-size={em(.66)} color={C.route}>ESTABLISHED 1926</Text>
        </VStack>
      </HStack>

      <HLine height={em(.05)} stroke={C.line} stroke-width={em(.05)} />

      <Group width={px(mapW)} height={px(mapH)}>
        <GeoMap
          source={source} width={px(mapW)} height={px(mapH)}
          projection={view.projection} bounds={view.bounds} padding={0}
          fill={C.land} background={C.water}
          border-color={C.border} border-width={em(.075)}
          styles={Object.fromEntries(states.map((s,i) => [s.id,{fill:i%2 ? C.sandAlt : C.sand}]))}
        >
          {states.map(s => (
            <Text pos={s.label} font-size={em(.62)} font-weight="bold" color={C.state}>{s.name.toUpperCase()}</Text>
          ))}
          <Polyline space="data" points={route} fill={none} stroke={C.white} stroke-width={em(.45)} stroke-linecap="round" stroke-linejoin="round" />
          <Polyline space="data" points={route} fill={none} stroke={C.route} stroke-width={em(.23)} stroke-linecap="round" stroke-linejoin="round" />
        </GeoMap>
        {stops.map(s => <Stop {...s} />)}

        <VStack pos={[em(.9),em(1.0)]} anchor="start" gap={em(.5)}>
          <Text font-size={em(.60)} font-weight="bold" color={C.muted}>FOLLOW THE HISTORIC CORRIDOR</Text>
          <HStack gap={em(.5)} align="center">
            <Line width={em(1.6)} height={em(.3)} from={[0,.5]} to={[1,.5]} stroke={C.route} stroke-width={em(.23)} />
            <Text font-size={em(.66)} color={C.muted}>Route 66</Text>
            <Circle width={em(.4)} fill={C.ink} stroke={C.white} stroke-width={em(.07)} />
            <Text font-size={em(.66)} color={C.muted}>Selected stops</Text>
          </HStack>
        </VStack>

        <Text pos={[.042,.94]} anchor="start" font-size={em(.63)} color={C.muted} font-style="italic">Pacific Ocean</Text>
        <VStack pos={[.94,.78]} anchor="start" align="center" gap={em(.25)}>
          <Text font-size={em(.63)} font-weight="bold" color={C.muted}>N</Text>
          <Arrow width={em(.8)} height={em(1.7)} from={[.5,1]} to={[.5,0]} stroke={C.muted} stroke-width={em(.065)} head-size={em(.35)} />
        </VStack>
      </Group>

      <HStack align="center">
        <Text grow={1} font-size={em(.68)} font-weight="bold" color={C.route}>EAST TO WEST →</Text>
        <Text font-size={em(.65)} color={C.muted}>Eight states. One legendary road.</Text>
      </HStack>
      <Box padding={[em(.9),em(.85)]} background={C.white} border-color={C.line} border-width={em(.05)}>
        <Grid columns={8} gap={em(.6)}>
          {states.map((s,i) => <StateCell {...s} index={i} />)}
        </Grid>
      </Box>
      <HStack gap={em(2)} align="start">
        <Text grow={1} font-size={em(.61)} color={C.muted}>Simplified historic corridor. Local turns and alternate alignments are omitted; the road changed over time.</Text>
        <Text font-size={em(.61)} color={C.muted}>Historical context: National Park Service · Geography: US-atlas</Text>
      </HStack>
    </VStack>
  </TextBox>
);
