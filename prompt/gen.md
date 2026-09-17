## Render and refine

Save a draft `.jsx` file and render it with `gum`. See the
[CLI guide](references/guides/CLI.md) for the complete options.

```sh
# With your source saved in figure.jsx:
gum figure.jsx -o figure.svg
gum figure.jsx -o figure.png --ratio 2
gum figure.jsx -f tree --stats
gum figure.jsx -f json -o figure.json
```

Choose `-f svg` explicitly for SVG on stdout; the CLI defaults to kitty graphics
even when redirected. Output extensions select SVG, PNG, or PDF when `-f` is
omitted. `-W` and `-H` impose exact viewport dimensions, not uniform zoom. `--ratio`
changes raster resolution without changing layout. For a detailed PNG crop,
`--select x,y,width,height` uses source-image pixels, not normalized corners.

Inspect a rendered PNG when image viewing is available. Check text legibility,
alignment, clipping, and label/connector overlap. Use `-f tree`, `-f json`, and
temporary `debug` props on relevant containers to inspect allocations and
overflow. Fix the allocation or content causing the issue, then render again.
Remove diagnostic overlays from the finished figure. If visual inspection is
unavailable, say so and report the checks actually performed.

For a sine plot, use explicit layout units and `samples`:

```jsx
<Svg width={px(640)} font-size={px(18)}>
  <Plot
    aspect={2}
    font-size={em(1)}
    title="Sine wave"
    xlim={[0, 2 * pi]}
    ylim={[-1.5, 1.5]}
    grid
    grid-stroke-dasharray={[em(0.2), em(0.2)]}
  >
    <SymLine
      fy={sin}
      xlim={[0, 2 * pi]}
      samples={161}
      stroke={blue}
      stroke-width={em(0.12)}
    />
  </Plot>
</Svg>
```

## Host code

The rendering stages are `evaluate(source)` → `LayoutPass.layout(element)` →
`render_svg(fragment)`. The evaluator returns the source result unchanged and
does not add an SVG wrapper. In host TypeScript, import from `@gum-jsx/core`;
provide `@gum-jsx/math` bindings through `evaluate`'s `scope` and math fonts through
the layout pass when needed. Read the rendering and math guides for complete
setup.

Evaluation executes JavaScript in the host environment; it is not a security
sandbox. Only evaluate trusted source or use a separate isolation boundary.
