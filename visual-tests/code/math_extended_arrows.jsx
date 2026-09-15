// Core arrows, single-barbed heads, lines, and arcs share math sizing and label placement.
<Svg font-size={px(34)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.9)} justify="start">
      <MathText>
        A
        <XArrow above={String.raw`f_n`} below={String.raw`n\to\infty`} />
        B
      </MathText>
      <MathText>
        X
        <XArrow label="xleftrightarrow" above="g" below="h" />
        Y
        <XArrow label="xrightleftharpoons" above="p" below="q" />
        Z
      </MathText>
      <MathText color={blue}>
        P
        <XArrow label="xhookrightarrow" above={<TextMode>embedding</TextMode>} />
        Q
        <XArrow label="xhookleftarrow" above="i" />
        R
      </MathText>
      <MathText>
        A
        <XArrow label="xRightarrow" above="f" below="g" />
        B
        <XArrow label="xLeftrightarrow" above="p" below="q" />
        C
        <XArrow label="xlongequal" above="h" />
        D
      </MathText>
      <MathText>
        A
        <XArrow label="xrightharpoonup" above="f" />
        B
        <XArrow label="xleftharpoondown" above="g" />
        C
        <XArrow label="xleftrightharpoons" above="p" below="q" />
        D
      </MathText>
      <MathText>
        A
        <XArrow label="xtwoheadrightarrow" above="f" />
        B
        <XArrow label="xtwoheadleftarrow" above="g" />
        C
        <XArrow label="xmapsto" above="h" />
        D
      </MathText>
      <MathText>
        A
        <XArrow label="xrightleftarrows" above="f" below="g" />
        B
        <XArrow label="xrightequilibrium" above="p" below="q" />
        C
        <XArrow label="xleftequilibrium" above="r" below="s" />
        D
      </MathText>
    </MathCol>
  </Box>
</Svg>
