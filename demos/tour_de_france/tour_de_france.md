# Tour de France-style stage profile

A cycling stage profile built from a smoothed elevation curve, climb flags,
route markers, and summary statistics. The stage, route, climb names, and grades
are illustrative; they do not describe an actual Tour de France stage.

## Render

Run these commands from this directory with the Gum CLI installed:

```sh
gum tour_de_france.jsx -o tour_de_france.svg
gum tour_de_france.jsx -o tour_de_france.png --ratio 2
gum tour_de_france.jsx -o tour_de_france.pdf
```

## Customize

Edit `route` for distance/elevation samples, `climbs` for climb annotations,
and `markers` for the sprint and feed zone. Distances are in kilometers and
elevations are in meters. The distance, highest elevation, and total climbing
are calculated from the route samples; climbing sums their positive elevation
changes. `splineTension` controls the smooth profile drawn between the samples.

The annotation components combine ordinary Gum layout elements with positions
in the plot's data coordinates. Adjust each climb's `dx` and each marker's
`dy` to give its label room.
