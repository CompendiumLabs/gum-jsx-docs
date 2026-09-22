## Render and refine

Start from a relevant example and render a draft using the host's available
rendering workflow. Check text legibility, alignment, clipping, and overlap of
labels and connectors. Temporary `debug` props show container allocations and
content bounds. Fix the allocation or content causing the issue, then render
again; remove diagnostic overlays from the finished figure.

For a sine plot, use explicit layout units and `samples`:

```jsx
<Plot
  width={px(640)}
  aspect={2}
  font-size={px(18)}
  title="Sine wave"
  xlim={[0, 2 * pi]}
  ylim={[-1.5, 1.5]}
  grid
  grid-stroke-dasharray={em(0.2)}
>
  <SymLine
    fy={sin}
    xlim={[0, 2 * pi]}
    samples={161}
    stroke={blue}
    stroke-width={em(0.12)}
  />
</Plot>
```

`stroke-dasharray` accepts one length for equal dashes and gaps, or an array for
a custom pattern. Use `px(...)` or `em(...)` for explicit units; bare numbers are fractions.

## Host code

In host TypeScript, use `evaluate(source)` then `render_element(result)` from
`@gum-jsx/core`. The latter wraps bare elements in `Svg` and returns a tagged
`svg` or plain `value` result. For layout inspection or another output backend,
use `layout_element`; the lower-level stages are `make_viewport(element)` →
`LayoutPass.layout(viewport)` → `render_svg(fragment)`.

Provide `@gum-jsx/math` bindings through `evaluate`'s `scope` and
`math.createMathFonts()` through the rendering helper's `fonts` option when needed.
Use a distinct `id_prefix` for each SVG embedded in the same HTML document.
Read the rendering and math guides for font loading and viewport options.

Evaluation executes JavaScript in the host environment; it is not a security
sandbox. Only evaluate trusted source or use a separate isolation boundary.
