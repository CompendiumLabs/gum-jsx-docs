---
category: maps
description: "Nest a sampled Arrow, Points, and city labels directly inside GeoMap."
---

# Map routes

The Arrow receives 81 longitude/latitude samples for an illustrative route from
Lisbon to Athens. [GeoMap](../../elements/text/GeoMap.md) projects those pairs
with the same fitted view as the geography. Points and direct-child Text anchors
use the same coordinate context, so no separate pixel projection is necessary.

The route is a deliberately chosen curve in longitude/latitude, not a calculated
great-circle or travel itinerary. Elements own their geometry: a two-point Arrow
would draw a straight segment between its projected endpoints. Supply enough
samples for the desired curve, and split routes at projection seams as needed.
See [Projections](../../guides/text/projections.md) for the core contract and a
polar Graph example.
