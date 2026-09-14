# Units

*Category*: core

Lengths have three forms. They remain tagged source values until layout has the
reference needed to turn them into pixels.

| Source | Meaning |
|---|---|
| `px(24)` | 24 pixels, independent of font and parent size |
| `em(2)` | Twice the local font size |
| `0.5` | Half the relevant reference dimension |

Zero is valid in every form and needs no reference. Unit strings such as
`"20px"`, `"2em"`, and `"50%"` are not supported.

## Which reference?

| Property | Fraction reference |
|---|---|
| `width`, `min-width`, `max-width` | Established parent content width |
| `height`, `min-height`, `max-height` | Established parent content height |
| Horizontal / vertical `padding` | Corresponding established parent axis |
| Stack `basis` and `gap` | Established main-axis length of the stack |
| **Group** child's `x` / `y` | Whole **Group** width / height |
| Shape point `x` / `y` | Shape's own resolved width / height |
| Scalar shape `radius` and `stroke-width` | Shorter side of the shape |
| **Box** `border-width` | Shorter established parent side; both axes must be known |
| `font-size` | Inherited font size |
| `line-height` | Resolved local font size |

The default font size is 16px. For `font-size`, both `em(1.5)` and `1.5`
multiply the inherited size. Other em lengths use the element's newly resolved
font size. Thus `font-size={px(20)} padding={em(1)}` gives 20px padding.

## A budget is not a percentage reference

A hugging container can receive a width offer without committing to that width.
Its descendants cannot use that offer as a percentage reference. Set the
container's width explicitly when you need fractional descendants:
`HStack width={1}` under a fixed-width **Svg** establishes a full-width row.

Fractions refer to the full established content area, not the space left after
siblings or gaps. Two half-width children plus a gap exceed one full width.
Use [explicit flex](./Stack.md) to divide remaining space.

An unresolved nonzero fraction throws an error with the source property path.
The engine does not guess a reference or solve percentage cycles.

Aspect ratios, grow/shrink weights, alignment fractions, and anchor fractions
are dimensionless numbers, not lengths.
