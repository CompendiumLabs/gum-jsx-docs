---
category: maps
description: "Fit five country IDs and reuse the projection for a Berlin–Prague–Vienna route."
---

# Selected-region fit

Set `fit_to: { ids: [...] }` to fit a stable set of features. This example fits
Germany, Poland, Czechia, Austria, and Switzerland by their atlas IDs. Fitting
sets the view; the map still draws the surrounding geography within its viewport.

`prepare_geo_source()` prepares the atlas for the projection helper.
`create_geo_projection(prepared, view, width, height)` returns the D3 projection
used to transform the route's longitude/latitude positions into local pixels.
The **GeoMap** receives matching projection, fit, padding, and viewport settings.

A polyline and circles connect Berlin, Prague, and Vienna. For a point helper
that also checks visibility on a globe, see [projected city markers](globe_markers.md).
