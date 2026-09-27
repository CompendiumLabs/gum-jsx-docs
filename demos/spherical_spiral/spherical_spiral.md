# Spherical spiral in Gum JSX

The figure uses Gum’s `Graph` projection callback to turn sampled longitude/height pairs into an orthographic view of a sphere.

## Curve

Use unwrapped longitude `θ(t) = t` and height `z(t) = tanh(at)`, with `a > 0`.
Graph expands each `[theta, z]` source pair to `{x: theta, y: z}` before calling
the projection. Lift that record onto the unit sphere:

```js
function xyz({x: theta, y: z}) {
  const r = Math.sqrt(Math.max(0, 1 - z * z));
  return [r * Math.cos(theta), r * Math.sin(theta), z];
}
```

Equivalently,

$$
\gamma(t)=\left(\frac{\cos t}{\cosh(at)},\frac{\sin t}{\cosh(at)},\tanh(at)\right).
$$

The identity `1/cosh²(at) + tanh²(at) = 1` keeps the curve on the sphere. As `t → ±∞`, the horizontal radius tends to zero and height tends to `±1`. Longitude continues turning, so the curve winds infinitely often toward both poles. Smaller `a` gives more turns between latitudes.

## Projection and visibility

`camera()` rotates each 3D point into an orthonormal camera basis and returns `[u, v, depth]`. The projection returns `{x: u, y: v}`; depth determines which hemisphere faces the viewer. The background disk and pole labels use local `pos` pairs in the surrounding Group.

The disk and pole labels use the default centered anchor. The full-canvas Graph
layers omit `pos`, so they retain their start anchor at the Group's local origin.

Two projection callbacks render the same route:

- **Front:** keep points with `depth >= 0`; draw a solid teal line.
- **Back:** keep points with `depth <= 0`; draw a pale dashed line.

Each callback returns `null` for the other hemisphere. Gum’s `CoordLine` breaks the path at those samples, avoiding connections across hidden sections. This is sampled visibility; the code does not calculate exact intersections with the sphere’s visible boundary.

All layers share explicit output limits of `[-1.22, 1.22]` on both axes. A square `Group` preserves the sphere’s circular outline. Latitude and longitude grid lines use the same projections. Paint order is background disk, back grid, front grid, back spiral, front spiral, then pole markers.

## Sampling and controls

The route contains 11,001 samples over `−55 ≤ t ≤ 55`. Gum projects the supplied samples; it does not automatically sample the underlying function. Open circles mark the limiting poles, which the finite route does not reach.

| Setting | Current value | Effect |
|---|---:|---|
| `a` | `0.11` | Rate of approach to the poles |
| `extent` | `55` | Rendered parameter range: `±extent` |
| `elevation` | `18°` | Camera tilt |
| `azimuth` | `−0.65` radians | Camera rotation around the polar axis |

If these settings change, update the corresponding captions too; their text is currently literal.

## Layout and typography

`HStack` divides the figure into a globe and an explanation pane with a 3:2 allocation. `VStack` handles vertical spacing. The shared `Equation` component centers each formula in a full-width `Box` and uses `22 px` math (`1.1em` at the `20 px` base size). `fit={false}` prevents individual equations from shrinking; the long identity has an explicit line break. Right-pane body text is `18.4 px`.

## Render

With the Gum CLI available, run from the directory containing the source:

```sh
gum spherical_spiral.jsx -o spherical_spiral.svg
gum spherical_spiral.jsx -o spherical_spiral.png --ratio 1.5
```

The exported figure was visually checked. Across the sampled curve, the maximum numerical error in `x² + y² + z² = 1` was approximately `4.4 × 10⁻¹⁶`.
