// Core arrows, single-barbed heads, lines, and arcs share math sizing and label placement.
<Svg font-size={px(34)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.9)} justify="start">
      <MathText>
        A
        <XArrow below={String.raw`n\to\infty`}>{String.raw`f_n`}</XArrow>
        B
      </MathText>
      <MathText>
        X
        <XArrow label="xleftrightarrow" below="h">g</XArrow>
        Y
        <XArrow label="xrightleftharpoons" below="q">p</XArrow>
        Z
      </MathText>
      <MathText color={blue}>
        P
        <XArrow label="xhookrightarrow">
          <TextMode>embedding</TextMode>
        </XArrow>
        Q
        <XArrow label="xhookleftarrow">i</XArrow>
        R
      </MathText>
      <MathText>
        A
        <XArrow label="xRightarrow" below="g">f</XArrow>
        B
        <XArrow label="xLeftrightarrow" below="q">p</XArrow>
        C
        <XArrow label="xlongequal">h</XArrow>
        D
      </MathText>
      <MathText>
        A
        <XArrow label="xrightharpoonup">f</XArrow>
        B
        <XArrow label="xleftharpoondown">g</XArrow>
        C
        <XArrow label="xleftrightharpoons" below="q">p</XArrow>
        D
      </MathText>
      <MathText>
        A
        <XArrow label="xtwoheadrightarrow">f</XArrow>
        B
        <XArrow label="xtwoheadleftarrow">g</XArrow>
        C
        <XArrow label="xmapsto">h</XArrow>
        D
      </MathText>
      <MathText>
        A
        <XArrow label="xrightleftarrows" below="g">f</XArrow>
        B
        <XArrow label="xrightequilibrium" below="q">p</XArrow>
        C
        <XArrow label="xleftequilibrium" below="s">r</XArrow>
        D
      </MathText>
    </MathCol>
  </Box>
</Svg>
