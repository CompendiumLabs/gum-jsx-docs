---
category: plotting
description: "Place a label outside a chosen frame edge with optional offset and rotation."
---

# OuterLabel

| Property | Default | Meaning |
|---|---|---|
| `children` | Empty | String or **Element** placed outside the frame |
| `side` | `"bottom"` | Frame edge used for the label |
| `offset` | `em(1)` | Distance outside that edge |
| `rotate` | `0` | Label rotation in degrees |

Attach child content outside a frame edge. side defaults to bottom;
offset to 1em. rotate applies a degree rotation. The label centers along the
selected side and reports overflow without reserving space. **Plot** measures and
reserves its own titles; use **OuterLabel** for manually composed figures.
