// Source for the small PNG fixture used by the loadPNG guide.
<Page width={px(240)} height={px(150)} background={lightgray}>
  <Graph xlim={[0, 240]} ylim={[0, 150]} stroke={none}>
    <Circle pos={[182, 112]} width={px(38)} fill={yellow} />
    <Polygon points={[[0, 0], [0, 45], [78, 119], [172, 0]]} fill={slate} />
    <Polygon points={[[65, 0], [161, 105], [240, 36], [240, 0]]} fill={blue} />
    <Polygon points={[[0, 0], [0, 24], [105, 49], [240, 12], [240, 0]]} fill={green} />
  </Graph>
</Page>
