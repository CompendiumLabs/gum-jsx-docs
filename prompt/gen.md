## Generation Workflow

Work in a short loop: write a draft, render it with the CLI, and revise the
source. Start with the main structure and content, then refine spacing,
typography, colors, and fine details once the composition works.

1. **Draft.** Save an editable `.jsx` file. Use a relevant example as a starting
   point and choose dimensions suited to the intended output.
2. **Render.** Run `gum figure.jsx -o figure.png` using the established CLI
   invocation. Open the rendered image and assess the whole composition:
   hierarchy, legibility, spacing, alignment, clipping, and overlapping labels
   or connectors. A successful command alone does not establish visual quality.
3. **Revise.** Fix the layout or content causing the problem, render again, and
   inspect the new result. Check the full composition after local adjustments.
   Repeat until both the overall figure and its details work.

### Inspection tools

Sometimes looking at the rendered PNG is not enough. You can use the following
tools to inspect the layout and content.

- **Debug overlays:** add temporary `debug` props to the relevant layout
  elements to reveal allocated rectangles and content bounds. These help locate
  unexpected spacing, overflow, and alignment problems.
- **Magnified regions:** use `--select x,y,width,height` with `--ratio` to render
  a specific region at higher resolution. Selection coordinates are in source
  pixels, measured from the top-left. This is especially useful for fine details,
  small text, line joins, and precise alignment; inspect the crop alongside the
  full figure.
- **Raw SVG:** render with `-f svg` or save a `.svg` file to inspect paths,
  transforms, clipping, and paints when the image alone does not explain a
  problem.
- **Layout fragments:** use `-f tree` for a readable fragment tree or `-f json`
  for raw fragment data, including measured sizes and child placements. Add
  `--stats` when layout counters would help diagnose the behavior.
- **Source elements:** when necessary, inspect the evaluated element tree before
  layout and compare it with the resulting fragments. The
  [rendering guide](references/guides/rendering.md) describes the host APIs for
  accessing elements and fragments directly.
