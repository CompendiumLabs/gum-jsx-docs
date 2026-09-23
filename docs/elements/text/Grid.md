# Grid

*Category*: layout

Arrange children row by row with column widths shared across every row.
Rows hug their tallest cell after text has wrapped at the chosen column widths.

| Property | Default | Meaning |
|---|---|---|
| `columns` | `1` | Positive column count for equal widths, or an array of lengths and `"auto"` tracks |
| `gap` | `0` | Space between both columns and rows |
| `column-gap` | `gap` | Override horizontal spacing |
| `row-gap` | `gap` | Override vertical spacing |
| `align` | `{ x: "fill", y: "start" }` | Cell alignment on both axes: start, center, end, fill, stretch, or a fraction from zero to one |

| Direct child prop | Default | Meaning |
|---|---|---|
| `align-self` | Grid's `align` | Override cell alignment; an object can override just one axis |

Use `columns={3}` for three equal columns. A finite width offer is divided equally
after gaps. Without one, all columns use the widest cell's natural width, enlarged
if needed by the Grid's `min-width`. The last row keeps the same columns even when
it is incomplete. An empty Grid hugs zero unless its own sizing reserves space.

An array sets the number and widths of the columns:

```jsx
<Grid columns={[em(6), "auto", em(12)]} gap={em(0.75)}>
  <Text>Label</Text>
  <Text>Value</Text>
  <Text>A description that wraps inside the last column.</Text>
</Grid>
```

Each `"auto"` column uses the widest natural cell in that column. Explicit lengths
and auto tracks do not grow or shrink to fill the Grid. Unsized grids with these
tracks hug their combined width, even under a larger offer. Use a length column
when text should wrap at a particular width. Numeric tracks are ordinary fractional
lengths, not weights: `columns={[0.25, 0.75]}` divides the width remaining after
column gaps. Nonzero fractions need a finite Grid width or width offer.

## Cell sizing and alignment

The default fills automatic child widths, respecting explicit widths and min/max
limits. Children sit at the top of their row. Use `align="center"` for compact,
centered children, `align="fill"` to fill automatic sizes on both axes, or
`align="stretch"` to impose the cell allocation even on explicitly sized children.
These use the same alignment rules as [Box](./Box.md). A child's own
`height="fill"` fills the selected row height while respecting its limits.

Rows always hug their content. Giving the Grid extra height leaves space below
the rows; it does not stretch or redistribute the rows themselves. Vertical
fill/stretch preserves each child's measured width. Oversized children keep their
overflow; use a clipping Box around the Grid when needed.

Child percentage widths refer to their column width. Percentage heights and
vertical percentage padding cannot determine a content-sized row; use `em` or `px`
there, and use fill/stretch for equal cell heights. A cell that determines a natural
column cannot also use that unknown column width as a percentage reference.
These dependencies report the offending property rather than iterating.

Fractional column gaps refer to the Grid's selected width before subtracting gaps.
Fractional row gaps require an established Grid height. Prefer `em` or `px` gaps
for content-sized layouts. Selected tracks are not recomputed if Grid's own
`aspect` or sizing limits subsequently change its frame.

Children are flattened in ordinary JSX order; null, booleans, and blank JSX
whitespace are skipped. Use `<Box />` for an intentional empty cell. Nested arrays
do not mark row boundaries. Column counts are limited to 100000.

Grid has no spans, automatic column counts, flex track weights, baseline groups,
or inferred overall aspect. Child `grow`, `shrink`, and `basis` are stack metadata
and do not size Grid tracks. [TextGrid](./TextGrid.md) adds string/number conversion
and text spacing. Use [HStack wrap](./HStack.md) when the number of items per row
should change with the available width.
