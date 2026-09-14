# Sizing

*Category*: core

Gum separates a parent's request, an element's preferred dimensions, and the
size of the rendered content. This is a local allocation protocol, not a
general constraint solver.

## Element dimensions

Common sizing props are width, height, `min-width`, `max-width`, `min-height`, and
`max-height`. All accept [lengths](./Units.md); width also accepts `"fill"` and
`"fit"`. Minima default to zero and maxima
are unbounded. A preferred width or height is clamped to the element's own limits.
An exact allocation from the parent takes precedence.

| Width policy | Meaning |
|---|---|
| `width="fill"` | Occupy the offered width, clamped to own limits; measure content when no width is offered |
| `width="fit"` | Use ordinary content measurement, including text wrapping at the offered width; opt out of the parent's fill alignment |
| `width={1}` | Use the whole established parent width; requires a definite fraction reference |

Fill resolves from the actual offer. Fractions continue to use the established
parent content box, which can differ from the current offer. An own maximum
limits natural measurement without forcing a short paragraph to occupy that maximum.
Fit does not scale a drawing or supply intrinsic dimensions to a canvas; the
element still uses its usual measurement rules.

Shapes and [Group](../../elements/text/Group.md) use a positive, finite `aspect`, meaning width
divided by height. **Square** and **Circle** default to 1. Two exact dimensions or
conflicting size limits can override a preferred aspect. **Square** and **Circle** still
draw square/circular geometry within their allocated rectangle.

**Box**, **Svg**, and stacks do not derive or enforce a composite aspect relationship.
For a fixed-size composition, supply dimensions or use [Fit](../../elements/text/Fit.md) when uniform
scaling is actually intended.

## Document layouts

[TextBox](../../elements/text/TextBox.md), [TextFrame](../../elements/text/TextFrame.md),
and [TextCol](../../elements/text/TextCol.md) default to `width="fill"`.
Their horizontal fill alignment allocates content width to children with an
unspecified or fill width, respecting explicit widths and min/max limits.
Use `width="fit"` for a compact panel or label. Heights remain content-sized.

```jsx
<Svg width={px(400)}>
  <TextBox padding={em(1)}>
    <TextCol gap={0}>
      <HStack>
        <Text>Left</Text><Spacer /><Text>Right</Text>
      </HStack>
      <Frame><Text>Content</Text></Frame>
    </TextCol>
  </TextBox>
</Svg>
```

**Box**, **Frame**, **VStack**, and **HStack** retain their content-sized defaults.
Fill width adds no main-axis grow/shrink weights; flexible rows still need explicit
flex props. See [Stack](./Stack.md) for fill versus hard stretch alignment.

An unsized child with positive grow starts from a zero basis when its stack has
a finite main-axis budget. Explicit dimensions still supply a basis, and
`basis="auto"` requests a content-based fallback. A row child's `width="fit"`
also preserves a measured basis. See [Growth bases](./stack_basis.md).

## Layout requests

| Request | Meaning |
|---|---|
| natural | Measure without a finite offer on that axis |
| `available(value)` | Advisory pixel budget; content may exceed it |
| `exact(value)` | Report this allocated dimension; retain overflow separately |

Length dimensions normally turn natural/available requests into exact local
dimensions. An exact parent request wins even over source dimensions.
The [rendering API](./Rendering.md) exposes these requests; the CLI's -W/-H flags
send exact viewport overrides.

Unsized aspectless shapes fill offered axes independently. With no offer, a shape
uses a 16px natural height, and either a 16px width or its aspect-derived width.
**Text** measures its glyphs and line breaks. Containers normally hug the resulting
content unless their own dimensions or allocations establish a frame.

## The stack boundary

A **VStack** passes available width inward and measures natural child heights
when a basis requires content measurement. An **HStack** does the same with
available height and child widths.
Growth and shrinkage along the stacking direction require explicit flex props.

A height-only **Svg** containing an unsized **VStack** does **not** make its shapes share
that height or infer a common width. Supply the column width, or allocate child
heights explicitly. For **Rect** aspects 1 and 2, a common width W gives a total height
of W + W/2. To obtain 500px with no gaps, the author can choose W = 1000/3.

Likewise, independently growing aspect figures need not have the same cross-axis
size. Fill alignment supplies a shared cross-axis allocation; it does not infer
a composite aspect or add main-axis growth. See [Stack](./Stack.md) for the allocation controls.
