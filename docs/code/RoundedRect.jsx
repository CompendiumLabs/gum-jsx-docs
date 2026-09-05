// Show consistent corner radii across rectangle sizes, including per-corner and elliptical rounding.
<Svg size={1000} unit-size={1000}>
  <TextCol width={27} gap={0.8}>
    <Text scale={1.3}>Rounding in stroke units</Text>
    <TextRow gap={1}>
      <TextCol gap={0.4}>
        <Text>RoundedRect: 12</Text>
        <TextFigure height={2}><RoundedRect rounded={12} fill={blue} /></TextFigure>
        <TextFigure height={4}><RoundedRect rounded={12} fill={blue} /></TextFigure>
      </TextCol>
      <TextCol gap={0.4}>
        <Text>[24, 0, 24, 0]</Text>
        <TextFigure height={2}><RoundedRect rounded={[24, 0, 24, 0]} fill={green} /></TextFigure>
        <TextFigure height={4}><RoundedRect rounded={[24, 0, 24, 0]} fill={green} /></TextFigure>
      </TextCol>
      <TextCol gap={0.4}>
        <Text>Rect: [24, 8]</Text>
        <TextFigure height={2}><Rect rounded={[24, 8]} fill={purple} /></TextFigure>
        <TextFigure height={4}><Rect rounded={[24, 8]} fill={purple} /></TextFigure>
      </TextCol>
    </TextRow>
    <Text scale={0.7}>Each column keeps its corner radii as its boxes change size.</Text>
  </TextCol>
</Svg>
