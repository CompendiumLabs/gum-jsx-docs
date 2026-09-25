---
category: maps
description: "Let framed maps derive their widths from a shared height."
---

# Natural map sizes

These [GeoMap](../../elements/text/GeoMap.md) elements all specify
`height={px(240)}` and omit width and aspect. Each derives its width from the
projected fit target, including map padding. The surrounding
[Frame](../../elements/text/Frame.md) hugs that measured size.

The globe is square. The regional view uses its projected longitude/latitude
box, and the narrow longitude band produces a slender frame. Bounds also clip
land, water, and overlays to their projected outline.

Natural sizing works with sphere, data, selected-ID, and bounds fits. Rotation
and spherical clipping affect the ratio; the raw ratio of longitude span to
latitude span generally differs from the projected ratio. An explicit `aspect`
overrides the preferred outer ratio. If both dimensions are fixed, the map
preserves that allocation and fits the geography inside it.
