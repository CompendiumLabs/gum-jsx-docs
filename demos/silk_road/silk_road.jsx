// Historical overview, authored with Gum and its bundled map data.
// References:
// https://www.unesco.org/en/silk-roads/about-silk-roads
// https://whc.unesco.org/en/list/1442/
// https://whc.unesco.org/en/list/1675/
// https://en.unesco.org/silkroad/silk-road-themes/cities-silk-roads
// Render: gum silk_road.jsx -o silk_road.svg
//         gum silk_road.jsx -o silk_road.png --ratio 2
// Geographic positions are longitude / latitude. Routes are schematic links.
const C = {
  paper: '#F7F2E7', land: '#E9DFC7', sea: '#D7E7E6', ink: '#293D3C',
  muted: '#6D746A', route: '#A44832', branch: '#327B78', grid: '#93A29A',
  terrain: '#C9BB97', edge: '#C8CCBB', gold: '#A58A52', white: '#FFF9ED'
};
const mapWidth = 1718;
const mapHeight = 690;
const bounds = [20, 20, 118, 51];
const places = [
  {id:'constantinople', name:'Constantinople', alt:'Istanbul', p:[28.98,41.01], l:[26.5,42.9], a:['center','end'], major:true},
  {id:'antioch', name:'Antioch', alt:'Antakya', p:[36.16,36.20], l:[34.8,37.1], a:['end','end'], major:true},
  {id:'palmyra', name:'Palmyra', p:[38.27,34.55], l:[36.7,33.0], a:['end','start']},
  {id:'baghdad', name:'Baghdad', p:[44.37,33.32], l:[44.5,31.8], a:['center','start'], major:true},
  {id:'tabriz', name:'Tabriz', p:[46.29,38.08], l:[46.0,39.6], a:['center','end']},
  {id:'rayy', name:'Rayy', alt:'near Tehran', p:[51.44,35.59], l:[51.1,34.4], a:['center','start']},
  {id:'nishapur', name:'Nishapur', p:[58.79,36.21], l:[58.3,34.8], a:['center','start']},
  {id:'merv', name:'Merv', p:[62.18,37.66], l:[60.5,38.4], a:['end','end'], major:true},
  {id:'bukhara', name:'Bukhara', p:[64.42,39.77], l:[63.4,41.0], a:['end','end'], major:true},
  {id:'samarkand', name:'Samarkand', p:[66.96,39.65], l:[69.5,38.2], a:['start','start'], major:true},
  {id:'tashkent', name:'Tashkent', p:[69.24,41.30], l:[68.4,43.0], a:['center','end']},
  {id:'kashgar', name:'Kashgar', p:[75.99,39.47], l:[75.5,40.7], a:['center','end'], major:true},
  {id:'kucha', name:'Kucha', p:[82.96,41.72], l:[83.0,40.8], a:['center','start']},
  {id:'turfan', name:'Turfan', alt:'Turpan', p:[89.19,42.95], l:[90.0,44.0], a:['center','end']},
  {id:'khotan', name:'Khotan', alt:'Hotan', p:[79.93,37.11], l:[79.6,35.8], a:['center','start']},
  {id:'miran', name:'Miran', p:[88.99,39.23], l:[89.8,37.9], a:['center','start']},
  {id:'dunhuang', name:'Dunhuang', p:[94.66,40.14], l:[96.4,41.4], a:['start','end'], major:true},
  {id:'zhangye', name:'Zhangye', p:[100.45,38.93], l:[100.8,37.7], a:['center','start']},
  {id:'lanzhou', name:'Lanzhou', p:[103.83,36.06], l:[104.7,36.6], a:['start','end']},
  {id:'changan', name:'Chang’an', alt:'Xi’an', p:[108.94,34.26], l:[110.0,33.8], a:['start','start'], major:true},
  {id:'balkh', name:'Balkh', p:[66.90,36.76], l:[65.8,36.0], a:['end','start']},
  {id:'bamiyan', name:'Bamiyan', p:[67.83,34.82], l:[66.9,33.1], a:['end','start']},
  {id:'taxila', name:'Taxila', p:[72.82,33.74], l:[73.9,32.4], a:['start','start']}
];
const at = id => places.find(p => p.id === id).p;
const routes = [
  // Gansu / Hexi corridor, with intermediate bends through the oasis chain.
  {kind:'main', points:[at('changan'),[106.6,34.5],[105.7,35.0],at('lanzhou'),[102.6,37.9],at('zhangye'),[98.5,39.75],at('dunhuang')]},
  {kind:'main', points:[at('dunhuang'),[93.3,40.5],[93.5,42.8],[91.1,43.1],at('turfan'),[86.6,42.0],[86.1,41.76],at('kucha'),[80.26,41.17],[78.6,40.2],at('kashgar')]},
  {kind:'main', points:[at('dunhuang'),[92.2,39.1],at('miran'),[85.5,38.14],[82.7,37.05],at('khotan'),[77.26,38.41],at('kashgar')]},
  {kind:'main', points:[at('kashgar'),[74.4,39.7],[73.0,39.8],[72.8,40.53],[70.94,40.39],[69.62,40.28],at('samarkand'),at('bukhara'),[63.0,39.1],at('merv'),[60.4,36.8],at('nishapur'),[55.1,36.4],at('rayy')]},
  {kind:'main', points:[at('rayy'),[48.52,34.80],[47.06,34.31],at('baghdad'),[42.5,34.55],at('palmyra'),[37.1,35.35],at('antioch')]},
  {kind:'main', points:[at('rayy'),[49.1,36.7],at('tabriz'),[43.2,39.5],[41.27,39.9],[37.0,39.75],[32.86,39.93],[30.6,40.5],at('constantinople')]},
  {kind:'branch', points:[[70.94,40.39],at('tashkent'),[71.39,42.90],[75.25,42.82],[76.8,42.8],[79.4,43.1],[81.3,43.4],[84.0,43.7],[87.6,43.8],at('turfan')]},
  {kind:'branch', points:[at('samarkand'),[67.3,37.2],at('balkh'),[67.1,35.8],at('bamiyan'),[69.2,34.55],[70.7,34.0],[71.6,34.0],at('taxila')]},
  {kind:'branch', points:[at('merv'),[64.0,36.8],at('balkh')]}
];
const regions = [
  {text:'A N A T O L I A', p:[34.1,40.7], size:0.74},
  {text:'I R A N I A N   P L A T E A U', p:[54.0,31.0], size:0.83},
  {text:'C E N T R A L   A S I A', p:[66.0,46.0], size:1.03},
  {text:'A R A B I A', p:[45.0,26.2], size:1.03},
  {text:'I N D I A', p:[78.9,25.1], size:1.03},
  {text:'C H I N A', p:[110.0,29.1], size:1.25},
  {text:'T I B E T A N   P L A T E A U', p:[90.7,32.4], size:0.83},
  {text:'G O B I', p:[103.0,45.5], size:0.95}
];
const waters = [
  {text:'Black Sea',p:[35.8,43.0]},
  {text:'Caspian\nSea',p:[50.4,41.6]},
  {text:'Mediterranean Sea',p:[27.4,32.0]},
  {text:'Arabian Sea',p:[63.0,22.6]}
];
const ranges = [
  [[72.0,36.4],[73.2,36.2],[74.5,35.4],[76.2,34.8],[77.7,33.7],[79.1,32.7],[80.8,31.5],[82.6,30.6],[84.2,29.8],[86.1,29.2],[88.4,28.3],[90.4,28.2],[92.2,28.0]],
  [[76.5,42.1],[78,42.5],[80,42.7],[82,43.0],[84,43.3],[86,43.5]],
  [[73.0,38.0],[74.0,37.1],[74.5,36.1]]
];
const mountainPoints = ranges.flatMap(chain => chain.flatMap((p,i) => [p,[p[0]+0.34,p[1]-0.38]]));
const Label = ({place}) => (
  <TextBox pos={place.l} anchor={place.a} padding={[em(0.15),em(0.07)]}>
    <VStack gap={em(0.02)} align={place.a[0]}>
      <Text wrap={false} font-size={em(place.major ? 1.05 : 0.95)} font-weight={place.major ? 'bold' : 'regular'} color={C.ink}>{place.name}</Text>
      {place.alt && <Text wrap={false} font-size={em(0.69)} color={C.muted}>{place.alt}</Text>}
    </VStack>
  </TextBox>
);
const LegendLine = ({color, dashed, children}) => (
  <HStack gap={em(0.5)} align="center">
    <Group width={em(2.2)} height={em(0.7)}>
      <Line from={[0,0.5]} to={[1,0.5]} stroke={color} stroke-width={em(0.17)} stroke-dasharray={dashed ? [em(0.3),em(0.22)] : undefined}/>
    </Group>
    <Text font-size={em(0.8)} color={C.muted}>{children}</Text>
  </HStack>
);
const Note = ({heading,children,...props}) => (
  <VStack {...props} gap={em(0.35)} align="fill">
    <Text font-size={em(0.8)} font-weight="bold" color={C.route}>{heading}</Text>
    <Text font-size={em(0.84)} line-height={em(1.4)} color={C.ink}>{children}</Text>
  </VStack>
);
return (
  <Box width={px(1824)} font-size={px(20)} background={C.paper} padding={em(2.6)}>
    <VStack gap={em(1.25)} align="fill">
      <HStack gap={em(3)} align="end">
        <VStack grow={1} gap={em(0.27)} align="start">
          <Text font-size={em(0.75)} font-weight="bold" color={C.route}>H I S T O R I C A L   A T L A S   /   E U R A S I A</Text>
          <Text font-size={em(3.15)} font-weight="light" color={C.ink}>The Silk Road</Text>
          <Text font-size={em(1.02)} color={C.muted}>Major waypoints across the overland trade network</Text>
        </VStack>
        <VStack gap={em(0.4)} align="end">
          <Text font-size={em(0.87)} color={C.ink}>CHANG’AN TO THE MEDITERRANEAN</Text>
          <Text font-size={em(0.78)} color={C.muted}>Antiquity &amp; the Middle Ages</Text>
        </VStack>
      </HStack>
      <HStack gap={em(2.1)} align="center">
        <LegendLine color={C.route}>Selected overland routes</LegendLine>
        <LegendLine color={C.branch} dashed>Additional northern &amp; southern links</LegendLine>
        <HStack gap={em(0.45)} align="center">
          <Circle width={em(0.45)} fill={C.white} stroke={C.route} stroke-width={em(0.12)}/>
          <Text font-size={em(0.8)} color={C.muted}>Historic waypoint</Text>
        </HStack>
        <Text grow={1} justify="end" font-size={em(0.72)} color={C.muted}>{places.length} LABELED STOPS</Text>
      </HStack>
      <Box border-width={px(1)} border-color={C.edge}>
        <GeoMap source={world_countries()} projection="mercator" bounds={bounds}
          width={px(mapWidth)} height={px(mapHeight)} background={C.sea}
          fill={C.land} border-mode="none">
          {[30,40,50].map(lat=><Line from={[20,lat]} to={[118,lat]} stroke={C.grid} stroke-width={px(0.6)} opacity={0.27} />)}
          {[30,50,70,90,110].map(lon=><Line from={[lon,20]} to={[lon,51]} stroke={C.grid} stroke-width={px(0.6)} opacity={0.27} />)}
          {mountainPoints.map(([lon,lat],i)=><Polyline points={[[lon-0.42,lat-0.26],[lon,lat+0.48],[lon+0.42,lat-0.26]]} stroke={C.terrain} stroke-width={px(1.3)} fill="none"/>)}
          {regions.map(r=><Text pos={r.p} font-size={em(r.size)} color={C.muted} opacity={0.65} wrap={false}>{r.text}</Text>)}
          {waters.map(w=><Text pos={w.p} font-size={em(0.85)} color="#628787" font-style="italic" justify="center" wrap={false}>{w.text}</Text>)}
          <Text pos={[82.5, 39.05]} font-size={em(0.72)} color={C.gold} wrap={false}>T A K L A M A K A N</Text>
          <Text pos={[82.5, 38.25]} font-size={em(0.62)} color={C.gold} wrap={false}>D E S E R T</Text>
          <Text pos={[80.0, 44.6]} font-size={em(0.72)} color={C.gold} wrap={false}>T I A N   S H A N</Text>
          <Text pos={[82.2, 29.3]} font-size={em(0.75)} color={C.gold} wrap={false}>H I M A L A Y A S</Text>
          {routes.map(r=><Arrow points={r.points} curve tension={0.3} end-head={false} stroke={C.white} stroke-width={em(r.kind==='main'?0.34:0.25)} fill="none" opacity={0.9}/>)}
          {routes.map(r=><Arrow points={r.points} curve tension={0.3} end-head={false} stroke={r.kind==='main'?C.route:C.branch} stroke-width={em(r.kind==='main'?0.17:0.12)} stroke-dasharray={r.kind==='branch'?[em(0.31),em(0.23)]:undefined} stroke-linecap="round" fill="none"/>)}
          {places.map(p=><Line from={p.p} to={p.l} stroke={C.muted} opacity={0.6} stroke-width={px(0.9)} />)}
          {places.map(p=><Circle pos={p.p} width={em(p.major?0.55:0.42)} fill={C.white} stroke={C.route} stroke-width={em(0.12)}/>)}
          {places.map(p=><Label place={p}/>)}
          <Text pos={[23.0, 48.8]} anchor="start" font-size={em(0.75)} font-weight="bold" color={C.ink}>N</Text>
          <Arrow from={[23.36,46.6]} to={[23.36,48.2]} stroke={C.ink} stroke-width={em(0.07)} head-size={em(0.36)} />
          <Text pos={[115.8, 49.9]} anchor={['end','center']} font-size={em(0.65)} color={C.muted}>50° N</Text>
          <Text pos={[115.8, 40.2]} anchor={['end','end']} font-size={em(0.65)} color={C.muted}>40° N</Text>
          <Text pos={[115.8, 30.2]} anchor={['end','end']} font-size={em(0.65)} color={C.muted}>30° N</Text>
        </GeoMap>
      </Box>
      <HStack gap={em(2.4)} align="start">
        <Note grow={1} heading="01  /  OASIS TO OASIS">Dunhuang opened onto routes around the Taklamakan. Oasis towns such as Turfan, Kucha and Khotan sustained caravan travel.</Note>
        <Note grow={1} heading="02  /  THE CENTRAL CROSSROADS">Kashgar, Samarkand, Bukhara and Merv linked East Asia with the Iranian world. Goods, faiths and ideas moved through these cities.</Note>
        <Note grow={1} heading="03  /  A NETWORK ACROSS CENTURIES">This is a composite overview. Routes and the importance of cities shifted over time; the lines show approximate connections.</Note>
      </HStack>
      <HStack gap={em(2)} align="end">
        <Text grow={1} font-size={em(0.63)} line-height={em(1.35)} color={C.muted}>Historical references: UNESCO Silk Roads Programme &amp; World Heritage Centre. Geography: Natural Earth / world-atlas.
        Modern names appear beneath selected historic names. Coastlines provide orientation; political borders and maritime routes are omitted.</Text>
        <Text font-size={em(0.65)} color={C.muted}>DRAWN WITH GUM</Text>
      </HStack>
    </VStack>
  </Box>
);
