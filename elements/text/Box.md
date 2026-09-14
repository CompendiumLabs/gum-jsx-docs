# Box

*Category*: layout

Add padding, a background, an inside border, optional rounded clipping, and
alignment around one content element. To contain siblings, wrap them in a
stack or **Group** first. Plain strings must be inside **Text**.

**Box** hugs its content plus padding and border unless an explicit size or parent
allocation fixes the frame. Width and height describe the **outer** frame.
The inner content area subtracts padding and the border on each side.

| Property | Default | Meaning |
|---|---|---|
| `padding` | `0` | Length, side/axis object, or `[h, v]` / `[t, b, l, r]` |
| `border-width` | `px(0)` | Border thickness inside the frame |
| `border-color` | Resolved color | Border paint |
| `background` | `none` | This **Box**'s background |
| `radius` | `0` | Scalar radius, { x, y }, or [x, y] radii |
| `align` | `"start"` | Content alignment on both axes, or { x, y } / [x, y] |
| `clip` | `false` | Clip content inside the rounded border |

Padding accepts full side names (`top`, `bottom`, `left`, `right`), short names
(`t`, `b`, `l`, `r`), or horizontal/vertical defaults (`h`, `v`). These forms are
equivalent:

```jsx
<Box padding={{ h: em(1), v: em(0.5) }} />
<Box padding={[em(1), em(0.5)]} />
<Box padding={{ t: em(0.5), b: em(0.5), l: em(1), r: em(1) }} />
<Box padding={[em(0.5), em(0.5), em(1), em(1)]} />
```

Array order is `[h, v]` or `[t, b, l, r]`, not CSS order; other array lengths are rejected.
Object forms may be mixed: full side names override short names, which override
`h`/`v`. For example, `padding={{ h: em(1), l: 0 }}` leaves only right padding.
Unspecified sides are zero. Each value accepts px/em lengths or raw fractions.
Boolean padding and a margin prop are not supported. Use another outer **Box** when
you need outside spacing.

Alignment accepts "start", "center", "end", "fill", "stretch", or a fraction from 0 to 1.
In an object or two-entry tuple, x and y can be set independently:
`align={['stretch', 'end']}` stretches horizontally and aligns at the bottom.
Stretch sends exact child
requests only on axes established before child measurement. It does not
uniformly scale content.

Fill uses the established content area too, but allocates only unspecified or
`width="fill"` dimensions, respecting the child's explicit sizes, `width="fit"`,
and min/max limits. `align={{ x: "fill" }}` fills automatic child widths while
retaining natural heights. Remaining space stays at the end of a fill-aligned axis.
The box's own width can independently use `"fill"` or `"fit"`; see [Sizing](../../topics/text/Sizing.md).

Background and border paint are local decoration. `fill` and `stroke` still inherit
to child shapes; they do not paint the **Box** itself. The border is drawn last.
Clipping hides paint but does not erase reported overflow.

Percentage padding uses the established parent's axes, not a guessed final box.
Prefer px/em padding for naturally sized boxes. See [Units](../../topics/text/Units.md).

**Box** does not relay child grow/shrink props through to a stack parent. Put flex
props on the **Box** itself when it is the item being allocated.
**Box** also does not infer an aspect from its content.
