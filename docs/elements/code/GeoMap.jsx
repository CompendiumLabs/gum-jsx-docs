// Natural Earth I with water, per-country styles, and a highlighted outline.
<GeoMap
  source={world_countries()}
  padding={em(1)}
  background={interp(white, blue, 0.15)}
  fill={interp(white, green, 0.25)}
  styles={{
    '840': { fill: blue, stroke: slate }, // United States
    '076': { fill: green }, // Brazil
    '356': { fill: red }, // India
  }}
/>
