# Rect

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| `radius` | `0` | Scalar corner radius or independent `{ x, y }` / `[x, y]` radii |

**Rect** paints its allocated rectangle. It is a leaf: it has no content children.
Use a [Box](./Box.md) when the rectangle should surround text or another element.

## Size and paint

**Rect** accepts the shared [sizing](../../topics/text/Sizing.md) and [style](../../topics/text/Style.md) props. With no
aspect, each axis is resolved independently. A finite offer can size the shape;
an otherwise unconstrained axis falls back to 16px. A stack's main-axis
allocation still follows [explicit flex](../../topics/text/Stack.md), not automatic filling.

`aspect` is width divided by height. For example, `width={px(160)}` `aspect={2}`
gives a preferred height of 80px. Exact allocations take precedence over this
preference. Set both dimensions when you need a specific rectangle.

The default paint is no fill and a black 1px stroke. Strokes are centered on the
rectangle's boundary, so visible ink can extend beyond its layout rectangle.
Use `stroke={none}` for a fill-only swatch.

## Rounded corners

`radius` defaults to zero. A scalar rounds both axes equally; a pair sets
elliptical corners. Pairs accept `{x, y}` or `[x, y]`:

```jsx
<Rect width={px(160)} height={px(80)} radius={[px(24), px(12)]} />
```

Fractional scalar radii use the shorter side. A pair's x/y fractions use width
and height respectively. Radii must be nonnegative and are capped at half the
corresponding side. [RoundedRect](./RoundedRect.md) is the same geometry with a
nonzero default radius.
