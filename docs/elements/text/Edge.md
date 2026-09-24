---
category: networks
description: "A connection rendered with Arrow's shaft, heads, and paint options."
---

# Edge

| Property | Default | Meaning |
|---|---|---|
| `start` / `end` | Required | Element IDs, or elements with IDs |
| `start-side` / `end-side` | Automatic | `"top"`, `"right"`, `"bottom"`, or `"left"` in each node's local frame |
| `start-loc` / `end-loc` | `0.5` | Position along the chosen side, from zero to one |
| `points` | `[]` | Intermediate route points in graph coordinates |
| `space` | `"data"` | `"local"` makes numeric waypoints fractional layout lengths |
| `curve` | `true` unless radius is set | Smooth route with endpoint tangents normal to the node boundaries |
| `radius` | `0` | Rounded polyline corners in px/em/fractional lengths |
| `gap` | `0` | Distance from each boundary to the arrow endpoint |
| `start-head` / `end-head` | `false` / `true` | Arrowheads at the respective endpoints |
| `head-size` | `px(9)` | Arrowhead length |

A connection rendered with [Arrow](./Arrow.md)'s shaft, heads, and paint options.
It must be a direct child of [Network](./Network.md), where `start` and `end` resolve
against the completed placements of identified elements, whether [Node](./Node.md)
or anything else. Passing an element uses its ID; it does not add that element to
the diagram.

Automatic sides face the other node, or the nearest intermediate waypoint when
one is provided. Side names are local to each node, so a rotated node's `"top"`
rotates with its frame. Locations run left-to-right for top/bottom and top-to-bottom
for left/right. Near a rounded corner, the attachment follows the visible ellipse.
`gap` moves the endpoint outward along the boundary's normal.

The default curve leaves and enters the boundaries perpendicularly. `curve={false}`
connects the endpoints and waypoints with straight segments. Setting `radius`
selects a rounded polyline and adds short outward segments at its endpoints;
an explicit `curve` takes precedence. **Edge** inherits Arrow's `tension`,
`head-width`, `head-open`, `head-curve`, `head-barb`, and scoped head paint options.

An edge with equal start/end IDs draws a self loop, by default from the right
side to the top. Use side/location overrides and waypoints to choose another
route. Ordinary routes do not perform obstacle avoidance.

Numeric waypoints use Network's data mapping, including axis reversal. px/em
waypoints stay in network-local pixels. The endpoints always come from the
placed node boundaries, regardless of the waypoint coordinate space.
