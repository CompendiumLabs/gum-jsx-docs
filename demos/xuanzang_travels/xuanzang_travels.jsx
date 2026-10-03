// Xuanzang's travels, 629–645 CE. Render with Gum CLI.
// This installed Gum CLI uses pos={[x,y]} for positioned elements.
// Routes connect selected historical stops; intermediate coordinates are schematic.
// Historical sources and geographic conventions: xuanzang-map-notes.md.
const C = {
  paper: '#F8F4E9', land: '#E9E3D2', water: '#DFEBE8', ink: '#263C3C',
  muted: '#697B73', rule: '#CDCBB9', red: '#AA492E', green: '#417557',
  blue: '#356D94', terrain: '#B9B59D', white: '#FFFCF4', border: '#FFFFFF',
};
const world = world_countries();
const countryBorders = { border_mode: 'interior', border_color: C.border, border_width: px(1) };
const view = { projection: 'equirectangular', bounds: [59, 7.5, 114, 46] };
const mw = 1496;
const mh = mw * 38.5 / 55;
const pos = ([lon, lat]) => project_geo_point(world, view, mw, mh, [lon, lat]);
const places = {
  changan: [108.94,34.26], lanzhou: [103.83,36.06], wuwei: [102.64,37.93],
  guazhou: [95.78,40.52], dunhuang: [94.66,40.14], hami: [93.52,42.83],
  turfan: [89.53,42.85], agni: [86.57,42.06], kucha: [82.96,41.72],
  aksu: [80.26,41.17], suyab: [75.2,42.8], tashkent: [69.24,41.3],
  samarkand: [66.97,39.65], balkh: [66.90,36.76], bamiyan: [67.83,34.83],
  kapisa: [69.18,34.99], peshawar: [71.58,34.02], taxila: [72.84,33.75],
  kashmir: [74.80,34.08], jalandhar: [75.58,31.33], mathura: [77.67,27.49],
  kannauj: [79.92,27.05], shravasti: [82.04,27.51], lumbini: [83.28,27.47],
  kushinagar: [83.89,26.74], sarnath: [83.02,25.38], prayag: [81.85,25.44],
  vaishali: [85.13,25.99], nalanda: [85.44,25.14], bodhgaya: [84.99,24.70],
  tamralipti: [87.92,22.3], amaravati: [80.36,16.57], kanchi: [79.7,12.84],
  bharuch: [72.99,21.71], valabhi: [71.88,21.88], ujjain: [75.79,23.18],
  multan: [71.48,30.2], kamarupa: [91.73,26.18], kunduz: [68.87,36.73],
  tashkurgan: [75.23,37.77], kashgar: [75.99,39.47], yarkand: [77.25,38.42],
  khotan: [79.93,37.11], niya: [82.7,37.07], charchan: [85.53,38.14],
};
const p = key => places[key];
const outbound = ['changan','lanzhou','wuwei'].map(p).concat(
  [[98.5,39.75]], ['guazhou','hami','turfan','agni','kucha','aksu'].map(p),
  [[78.6,42.3],[77.15,42.4]], ['suyab'].map(p), [[72.25,42.9],[70.7,42.2]],
  ['tashkent','samarkand'].map(p), [[67.1,38.3],[67.3,37.25]],
  ['balkh','bamiyan','kapisa'].map(p), [[70.45,34.45]], ['peshawar','taxila'].map(p)
);
const indianArrival = ['taxila','kashmir','jalandhar'].map(p).concat(
  [[76.8,30.1]], ['mathura','kannauj','shravasti','lumbini','kushinagar',
  'sarnath','vaishali','bodhgaya','nalanda'].map(p)
);
const indianCircuit = ['nalanda'].map(p).concat(
  [[86.8,25.2],[89.3,24.9]], ['tamralipti'].map(p), [[85.8,20.4],[83.3,18.3]],
  ['amaravati','kanchi'].map(p), [[76.9,14.7],[75.7,17.9],[73.8,20]],
  ['bharuch','valabhi','ujjain'].map(p), [[73.3,26.1]], ['multan'].map(p),
  [[74.0,30.4],[77.0,29.3]], ['kannauj','prayag','nalanda'].map(p)
);
const lateIndia = ['nalanda'].map(p).concat([[88.7,25.3]], ['kamarupa'].map(p),
  [[89.0,26.0],[87.0,26.2],[84.8,26.65]], ['kannauj','prayag'].map(p)
);
const home = ['prayag'].map(p).concat([[79.9,28.5]],['jalandhar','taxila','peshawar'].map(p),
  [[70.5,34.5]], ['kapisa'].map(p), [[69.5,35.6]], ['kunduz'].map(p),
  [[70.8,37.1],[72.6,37.0],[73.9,37.3]], ['tashkurgan','kashgar','yarkand','khotan','niya','charchan'].map(p),
  [[88.4,39.1],[90.2,39.05]], ['dunhuang','guazhou'].map(p), [[98.5,39.75]],
  ['wuwei','lanzhou','changan'].map(p)
);
const routeRadius = weight => weight * 2.5;
const Route = ({points, color, dashed=false, weight=4.2}) => (
  <Arrow points={points} radius={px(routeRadius(weight))} end-head={false} fill={none} stroke={color}
    stroke-width={px(weight)} stroke-dasharray={dashed ? [px(10),px(7)] : []}
    stroke-linecap="round" stroke-linejoin="round" />
);
// Derive each head from an actual route segment. Keep it within the straight
// portion between rounded corners, using the same projection and radius.
const Direction = ({points,after,color,weight=4.2}) => {
  const i = points.findIndex(point => point[0] === after[0] && point[1] === after[1]);
  if (i < 0 || i === points.length - 1) throw new Error('Arrow needs a route segment');
  const projected = points.map(pos);
  const distance = (a,b) => Math.hypot(b[0]-a[0], b[1]-a[1]);
  const trim = index => index === 0 || index === points.length-1 ? 0 : Math.min(
    routeRadius(weight), distance(projected[index-1],projected[index])/2,
    distance(projected[index],projected[index+1])/2
  );
  const a = projected[i], b = projected[i+1];
  const length = distance(a,b), start = trim(i), end = length-trim(i+1);
  if (end-start < 12) return null;
  const headSize = Math.min(12,(end-start)*0.4);
  const t = (start+(end-start)*0.55+headSize/2)/length;
  return <ArrowHead space="local"
    tip={[px(a[0]+(b[0]-a[0])*t),px(a[1]+(b[1]-a[1])*t)]}
    angle={Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI}
    head-size={px(headSize)} head-width={1.1} fill={color} stroke={none}/>;
};
const dots = [
  ['changan',C.red],['lanzhou',C.red],['wuwei',C.red],['dunhuang',C.blue],
  ['hami',C.red],['turfan',C.red],['kucha',C.red],['aksu',C.red],['suyab',C.red],
  ['tashkent',C.red],['samarkand',C.red],['balkh',C.red],['bamiyan',C.red],
  ['kapisa',C.red],['taxila',C.red],['kashmir',C.green],['kannauj',C.green],
  ['prayag',C.green],['nalanda',C.green],['tamralipti',C.green],['amaravati',C.green],
  ['kanchi',C.green],['valabhi',C.green],['multan',C.green],['kamarupa',C.green],
  ['tashkurgan',C.blue],['kashgar',C.blue],['yarkand',C.blue],['khotan',C.blue]
];
// Pixel offsets only resolve cartographic label placement; anchors remain geographic.
const labels = [
  ['changan',0,-50,"CHANG’AN",'center',C.ink,true],
  ['lanzhou',-14,17,'Lanzhou','end'],['wuwei',15,-16,'Wuwei','start'],
  ['dunhuang',12,21,'Dunhuang','start'],['hami',10,-21,'Hami','start'],
  ['turfan',0,-25,'Turfan (Gaochang)','center'],['kucha',-5,-27,'Kucha','center'],
  ['aksu',-2,23,'Aksu','center'],['suyab',0,-27,'Suyab','center'],
  ['tashkent',-15,-13,'Tashkent','end'],['samarkand',-14,17,'Samarkand','end'],
  ['balkh',-14,-2,'Balkh','end'],['bamiyan',-14,22,'Bamiyan','end'],
  ['kapisa',22,-20,'Kapisa','start'],['taxila',-8,27,'Taxila','end'],
  ['kashmir',14,0,'Kashmir','start'],['kannauj',-16,8,'Kannauj','end'],
  ['prayag',-10,25,'Prayag','end'],['nalanda',0,45,'NALANDA','center',C.green,true],
  ['tamralipti',15,6,'Tamralipti','start'],['amaravati',16,17,'Amaravati','start'],
  ['kanchi',15,3,'Kanchipuram','start'],['valabhi',-15,3,'Valabhi','end'],
  ['multan',-15,-2,'Multan','end'],['kamarupa',14,2,'Kamarupa','start'],
  ['tashkurgan',0,28,'Tashkurgan','center'],['kashgar',-14,-6,'Kashgar','end'],
  ['yarkand',15,-9,'Yarkand','start'],['khotan',9,26,'Khotan (Hotan)','start'],
];
const Label = ({entry}) => {
  const [key,dx,dy,name,anchor='start',color=C.ink,strong=false] = entry;
  const [x,y] = pos(p(key));
  return <Text pos={[px(x+dx),px(y+dy)]} anchor={[anchor,'center']}
    font-size={px(strong ? 22 : 18)} font-weight={strong ? 700 : 400}
    wrap={false} color={color}>{name}</Text>;
};
const terrainLines = [
  [[73,35],[75,34],[78,32],[81,30.6],[84,29.2],[88,28.3],[92,28.0],[95,28.7]],
  [[74,43.7],[77,43.4],[80,43.1],[83,43.0],[86,43.5]],
  [[76,36.1],[80,35.6],[84,35.6],[88,35.9],[92,36.1]],
];
const terrainNames = [
  [83.7,39.6,'TAKLAMAKAN DESERT',18], [86.7,32.9,'TIBETAN PLATEAU',23],
  [81.5,44.65,'TIAN SHAN',17], [73.3,38.3,'PAMIRS',15],
  [89,29.3,'H I M A L A Y A S',19],
  [105,31.8,'TANG CHINA',23], [78.8,20.6,'INDIA',23],
  [64.7,44.1,'CENTRAL ASIA',22], [100.2,43.4,'GOBI',20],
];
const LegendItem = ({color,label,dashed=false}) => (
  <HStack gap={em(0.5)} align="center">
    <Group width={em(2.5)} height={em(1)}>
      <Arrow from={[0,0.5]} to={[1,0.5]} end-head={false} stroke={color}
        stroke-width={px(4)} stroke-dasharray={dashed ? [px(8),px(5)] : []} />
    </Group>
    <Text font-size={em(0.88)} color={C.ink}>{label}</Text>
  </HStack>
);
const Detail = () => (
  <Box width={px(456)} padding={em(0.8)} background={C.paper}
    border-width={px(1)} border-color={C.rule}>
    <VStack gap={em(0.45)} align="fill">
      <Text font-size={em(0.82)} font-weight="bold">DETAIL · THE BUDDHIST HEARTLAND</Text>
      <GeoMap width={px(422)} height={px(236)} source={world}
        projection="equirectangular" bounds={[78.4,23.3,87.5,28.4]}
        background={C.land} fill={C.land} {...countryBorders}>
        <Route points={['kannauj','shravasti','lumbini','kushinagar','sarnath','vaishali','bodhgaya','nalanda'].map(p)} color={C.green} weight={2.5}/>
        {['kannauj','shravasti','lumbini','kushinagar','sarnath','vaishali','bodhgaya','nalanda'].map(key => (
          <Circle pos={[p(key)[0],p(key)[1]]} anchor="center" width={px(key==='nalanda'?11:7)}
            fill={C.green} stroke={C.white} stroke-width={px(1.4)} />
        ))}
        {[
          [79.9,26.7,'Kannauj','end'],[81.85,27.86,'Shravasti','end'],
          [83.3,27.89,'Lumbini','start'],[84.16,26.75,'Kushinagar','start'],
          [82.8,25.13,'Sarnath','end'],[85.35,26.13,'Vaishali','start'],
          [84.8,24.2,'Bodh Gaya','end'],[85.7,24.85,'Nalanda','start']
        ].map(([x,y,label,anchor])=>(
          <Text pos={[x,y]} anchor={[anchor,'center']} font-size={px(14)} color={C.ink} wrap={false}>{label}</Text>
        ))}
      </GeoMap>
      <Text font-size={em(0.72)} color={C.muted}>Selected sites; the route includes repeat visits.</Text>
    </VStack>
  </Box>
);
const Phase = ({num,title,body,color,...props}) => (
  <VStack gap={em(0.4)} {...props}>
    <Text font-size={em(0.95)} font-weight="bold" color={color}>{num + '  ' + title}</Text>
    <Text font-size={em(0.82)} color={C.ink} line-height={em(1.4)}>{body}</Text>
  </VStack>
);
return (
  <Box width={px(1600)} padding={em(2.6)} background={C.paper} font-size={px(20)} color={C.ink}>
    <VStack gap={em(1.1)} align="fill">
      <VStack gap={em(0.35)} align="fill">
        <HStack align="center">
          <Text grow={1} font-size={em(0.78)} font-weight="bold" color={C.red}>PILGRIMAGE · LEARNING · EXCHANGE</Text>
          <Text font-size={em(0.78)} color={C.muted}>629–645 CE</Text>
        </HStack>
        <Text font-size={em(2.9)} font-weight="bold">The travels of Xuanzang</Text>
        <Text font-size={em(1.0)} color={C.muted}>A Buddhist monk’s journey from Tang China to India and home again</Text>
      </VStack>
      <HStack gap={em(2.2)} align="center">
        <LegendItem color={C.red} label="Westward journey · 629–c. 630" />
        <LegendItem color={C.green} label="Travels and study in India · c. 630–643" />
        <LegendItem color={C.blue} label="Return to China · 643–645" dashed />
      </HStack>
      <Group width={px(mw)} height={px(mh)}>
        <GeoMap width={px(mw)} height={px(mh)} source={world} {...view}
          background={C.water} fill={C.land} {...countryBorders}>
          {[60,70,80,90,100,110].map(lon=>(
            <Polyline points={[[lon,7.5],[lon,46]]} stroke={C.muted} opacity={0.09} stroke-width={px(1)} fill={none}/>
          ))}
          {[10,20,30,40].map(lat=>(
            <Polyline points={[[59,lat],[114,lat]]} stroke={C.muted} opacity={0.09} stroke-width={px(1)} fill={none}/>
          ))}
          {terrainLines.map(line=>(<Arrow points={line} curve end-head={false} stroke={C.terrain} opacity={0.28} stroke-width={px(21)} fill={none}/>))}
          {terrainNames.map(([x,y,label,size])=>(<Text pos={[x,y]} anchor="center" color={C.muted} opacity={0.78} font-size={px(size)} wrap={false}>{label}</Text>))}
          <Text pos={[65.5,18.6]} anchor="center" font-size={px(24)} font-style="italic" color={C.muted}>Arabian Sea</Text>
          <Text pos={[87.7,16.3]} anchor="center" font-size={px(24)} font-style="italic" color={C.muted}>Bay of Bengal</Text>
          <Route points={outbound} color={C.red}/>
          <Route points={indianArrival} color={C.green}/>
          <Route points={indianCircuit} color={C.green}/>
          <Route points={lateIndia} color={C.green} weight={3}/>
          <Route points={home} color={C.blue} dashed/>
          {[
            [outbound,p('wuwei'),C.red], [outbound,p('hami'),C.red],
            [outbound,p('agni'),C.red], [outbound,p('tashkent'),C.red],
            [indianCircuit,p('amaravati'),C.green], [indianCircuit,[76.9,14.7],C.green],
            [indianCircuit,p('prayag'),C.green], [home,p('khotan'),C.blue],
            [home,p('charchan'),C.blue], [home,p('lanzhou'),C.blue]
          ].map(([points,after,color])=><Direction points={points} after={after} color={color}/>)}
          {dots.map(([key,color])=>(
            <Circle pos={[p(key)[0],p(key)[1]]} anchor="center"
              width={px(key==='changan'||key==='nalanda'?14:9)} fill={color} stroke={C.white} stroke-width={px(2)}/>
          ))}
        </GeoMap>
        <Polyline points={[
          [px(pos(p('nalanda'))[0]),px(pos(p('nalanda'))[1]+11)],
          [px(pos(p('nalanda'))[0]),px(pos(p('nalanda'))[1]+29)]
        ]} stroke={C.green} stroke-width={px(1)} fill={none}/>
        {labels.map(entry=><Label entry={entry}/>)}
        <Text pos={[px(pos(p('changan'))[0]),px(pos(p('changan'))[1]+36)]} anchor="center" font-size={px(15)} justify="center" color={C.muted}>{'Xi’an today\n629 departure · 645 return'}</Text>
        <Group pos={[px(mw-50),px(54)]} anchor="center" width={px(32)} height={px(66)}>
          <Text pos={[0.5,0]} anchor={['center','start']} font-size={px(15)} color={C.muted}>N</Text>
          <Arrow from={[0.5,0.95]} to={[0.5,0.35]} stroke={C.muted} stroke-width={px(1.5)} head-size={px(8)}/>
        </Group>
        <Box pos={[px(1005),px(646)]} anchor="start"><Detail/></Box>
        <Box pos={[px(1050),px(450)]} anchor="start" width={px(365)} padding={em(0.7)} background={C.paper}>
          <VStack gap={em(0.45)}>
            <Text font-size={em(0.95)} font-weight="bold" color={C.green}>Learning at Nalanda</Text>
            <Text font-size={em(0.83)} line-height={em(1.4)}>Xuanzang studied Buddhist philosophy and Sanskrit, visited sacred sites, and gathered texts to bring back to China.</Text>
          </VStack>
        </Box>
        <VStack pos={[px(40),px(mh-80)]} anchor="start" gap={em(0.25)}>
          <Text font-size={em(0.7)} color={C.muted}>Approximate scale at 30° N</Text>
          <Group width={px(282)} height={px(32)}>
            <Polyline points={[[px(1),px(0)],[px(1),px(8)],[px(282),px(8)],[px(282),px(0)]]} stroke={C.muted} stroke-width={px(2)} fill={none}/>
            <Text pos={[0,px(12)]} anchor="start" font-size={px(13)} color={C.muted}>0</Text>
            <Text pos={[px(282),px(12)]} anchor={['end','start']} font-size={px(13)} color={C.muted}>1,000 km</Text>
          </Group>
        </VStack>
      </Group>
      <HStack gap={em(2.0)} align="start">
        <Phase grow={1} num="01" title="Across the Silk Roads" color={C.red}
          body="From Chang’an, he crossed the Gobi, followed the northern Tarim oases, and continued through Central Asia and the Hindu Kush."/>
        <Phase grow={1} num="02" title="A long pilgrimage in India" color={C.green}
          body="Nalanda became a centre of his studies. His travels also reached Bengal, Kamarupa and Kanchipuram in southern India."/>
        <Phase grow={1} num="03" title="Home with Buddhist texts" color={C.blue}
          body="He returned across the Pamirs and the southern Tarim oases, reaching Chang’an in 645 to begin his translation work."/>
      </HStack>
      <VStack gap={em(0.25)}>
        <Text font-size={em(0.7)} color={C.muted}>Selected stops and approximate routes; some visits and dates are debated. Connections are schematic. Faint lines show modern country boundaries.</Text>
        <Text font-size={em(0.7)} color={C.muted}>Sources: Xuanzang Memorial / Nava Nalanda Mahavihara; World History Commons; OLLI–American University. Geography: Natural Earth via Gum.</Text>
      </VStack>
    </VStack>
  </Box>
);
