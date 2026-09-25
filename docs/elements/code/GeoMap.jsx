// Natural Earth I with water, per-country styles, and a highlighted outline.
<GeoMap
  source={world_countries()}
  width={px(640)}
  aspect={1.8}
  fit-to="sphere"
  map-padding={px(12)}
  background={interp(white, blue, 0.15)}
  fill={interp(white, green, 0.25)}
  styles={{
    '840': { fill: blue, stroke: slate }, // United States
    '076': { fill: green }, // Brazil
    '356': { fill: red }, // India
  }}
  border-mode="all"
  border-color={white}
  border-width={px(0.7)}
  aria-label="World map highlighting the United States, Brazil, and India"
/>
