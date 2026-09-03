# Using CLI commands

To test the output of a particular Gum JSX snippet or file, you can pipe it to the `gum` command. If this command is not available globally, try to install the `gum-jsx` package with Bun (preferred) or NPM.

If you have vision capabilities, seeing an actual image can be useful for see the actual output of the code, either in SVG or PNG format. Even without vision, one can infer properties of the output by reading the SVG output directly.

For one off tests, pipe the code using `echo`. It is recommended that you use single quotes as the outer delimiter, to accommodate code that includes double quotes for component properties (e.g. `justify="left"`).

For more difficult tasks, use a file provide the filename as an argument or `cat` it in. Using a file allows you to view and refine your code repeatedly. If you wish to avoid output redirection to a file, use the `-o` option to write to a file.

In general, it makes a lot of sense to write a draft to a file, view its output, then refine the code until you're satisfied. This way you can start simple and add complexity as needed. When in doubt, write the output file to the same directory as the input file with the same base name but with the appropriate extension.

**Examples:**
```bash
# generate an .svg file from a .jsx file
gum test.jsx -o test.svg

# generate a .png file from a .jsx file
gum test.jsx -o test.png

# generate SVG from a Gum JSX snippet and print to stdout
echo '<Rectangle rounded fill={blue} />' | gum

# generate PNG from a Gum JSX snippet and save to file
echo '<Rectangle rounded fill={blue} />' | gum -o test.png
```

**CLI options:**
- `file`: Gum JSX file to render (reads from stdin if not provided)
- `-f, --format <format>`: output format: svg, png, kitty, layout, json (default: kitty, or inferred from the output file extension)
- `-o, --output <output>`: output file (default: stdout)
- `-z, --zoom <region>`: region to zoom into, as `x0,y0,x1,y1` fractions of the figure between 0 and 1 with the origin at the top left; the region is magnified to fill the normal output size (default: the whole figure)
- `--depth <levels>`: for the layout format, how many levels below the root to list (default: 4)
- `--select <text>`: for the layout format, only list elements whose path, type, id, or class contains this text (case insensitive)
- `-s, --size <size>`: size of the SVG (default: 1000)
- `-t, --theme <theme>`: theme to use, light or dark (default: dark)
- `-b, --background <color>`: background color (default: white for the light theme, none otherwise)
- `-r, --raster-size <size>`: max size of the rasterized PNG (default: the SVG size)
- `--strict`: throw on rendering fallbacks instead of drawing them
- `--seed <seed>`: seed for `random`/`uniform`/`normal`/`integer`

**Inspecting the output:**

Beyond looking at the picture, two options help check placement precisely. `--zoom` crops to a region and magnifies it, so `-z 0,0,0.5,0.5` shows the top left quadrant at double size and `-z 0.4,0.4,0.6,0.6` shows the center at five times. It applies to svg, png, and kitty output. The `layout` format skips the picture and prints one JSON line per element with its path in the tree, type, `rect` (the pixel box it was placed in), `alloc` (the box its parent allocated to it), plus any `id`, `class`, `text`, or `rotate`. This is the quickest way to check overlap, containment, and alignment numerically. `--select` narrows it to matching elements, `--depth` controls how far down the tree it goes, and `--zoom` restricts it to the elements intersecting that region.

```bash
# zoom into the lower right quadrant
gum test.jsx -z 0.5,0.5,1,1 -o zoom.png

# where did the axis labels land?
gum test.jsx -f layout --select Labels

# everything in the top left corner, down to the leaves
gum test.jsx -f layout -z 0,0,0.25,0.25 --depth 10
```

# Using Gum in TypeScript

gum.jsx is published as a set of packages. Which one you import from depends on where the code runs:

| Package | What it is | Runs in |
|---|---|---|
| `gum-jsx` | Batteries included: re-exports everything below and ships the `gum`, `gum-tex`, and `gum-mark` commands | node / bun only |
| `@gum-jsx/core` | The evaluator, the elements, the constants and utilities, and the IBM Plex fonts | browser and node |
| `@gum-jsx/math` | The `math` plugin: `<Latex>`, `<Tex>`, the math layout elements, KaTeX fonts, and standalone `mathToSvg` | browser and node |
| `@gum-jsx/web` | Browser runtime: font loading and installation, font embedding, canvas rasterization, downloads | browser only |
| `@gum-jsx/react` | React bindings (`GUM`, `<Gum>`, `createGumRoot`) and the `gum-react` command | browser and node |
| `@gum-jsx/node` | PNG rasterization with node-canvas and kitty terminal output | node / bun only |

The rule of thumb: in a script or a server, import from `gum-jsx`; in anything that gets bundled for a browser, import only from the `@gum-jsx/*` packages. `gum-jsx` re-exports `@gum-jsx/node`, which imports `child_process` and node-canvas, so a browser build that touches `gum-jsx` fails to bundle. The old `react-gum-jsx` package on npm is abandoned and no longer works with current core; use `@gum-jsx/react`.

## Evaluating JSX strings

`evaluateGum` parses a string of gum.jsx and returns the root `Svg` element; call `.svg()` on it to get the SVG markup. In node, `gum-jsx/eval` gives you the default Env with the math plugin already applied, and `gum-jsx/render` rasterizes to PNG:

```typescript
import { evaluateGum } from 'gum-jsx/eval'
import { rasterizeSvg } from 'gum-jsx/render'
import { writeFileSync } from 'fs'

// parse the JSX into an element tree, then serialize to SVG
const tree = evaluateGum('<Rectangle rounded fill={blue} />', { size: 500, theme: 'light' })
const svg = tree.svg()

// rasterize to a PNG buffer (node only)
const png = rasterizeSvg(svg, { size: tree.size, background: 'white' })
writeFileSync('output.png', png)
```

In a browser, import the same function from `@gum-jsx/core/eval` and apply the math plugin yourself if you need `<Latex>`:

```typescript
import { gum } from '@gum-jsx/core'
import { evaluateGum } from '@gum-jsx/core/eval'
import { math } from '@gum-jsx/math'
gum.use(math)   // once, before evaluating anything with math in it
```

Options to `evaluateGum`: `size` (a number or `[width, height]`), `theme` (`light` or `dark`), `bindings` (extra names in scope), `prelude`, `seed`, `strict`, `loadFile`, `debug`, and any `Svg` argument such as `padding` or `unit_size`. The realized size of the output is on the element as `size`.

## Using components directly

The elements are plain classes and can be constructed from TypeScript. Each takes a single args object with props in `snake_case` (`stroke_width`, not `stroke-width`), and `children` is always an array:

```typescript
import { Svg, Square, Circle, HStack, Text, blue, red, white } from '@gum-jsx/core'

const rect = new Square({ rounded: true, fill: blue })
const circle = new Circle({ fill: red })
const label = new Text({ children: ['Hello'], color: white })
const layout = new HStack({ children: [rect, circle, label], spacing: 0.1 })

const tree = new Svg({ children: [layout], size: 500 })
const svg = tree.svg()
```

The constants (`blue`, `red`, `none`, `pi`, ...) and utilities (`range`, `linspace`, `zip`, `palette`, ...) are exported from `@gum-jsx/core` (and re-exported by `gum-jsx`).

## Fonts in the browser

gum measures text with real font metrics, so the faces have to be loaded before anything with text is rendered; otherwise rendering throws `FontNotLoadedError`. In node they are read from disk on first use and nothing is needed. In a browser, await a loader first:

```typescript
import { loadWebFonts } from '@gum-jsx/web'
await loadWebFonts()   // fetch every face the default Env knows and register them with document.fonts
```

`loadWebFonts` both fetches the bytes core measures with and hands them to the page through the `FontFace` API, so the SVG's `font-family` names resolve without any `@font-face` CSS. Call it once before the first render and again after applying a plugin that brings its own faces (`gum.use(math)` then `await loadWebFonts()`). To keep the initial download small, pass a list of family names (`loadWebFonts([...TEXT_FONTS])` with `TEXT_FONTS` from `@gum-jsx/core`); loading is memoized per file. Figures with no text at all render without loading anything. `@gum-jsx/web` also has `embedFonts` (inline the faces into an SVG so it stands alone as a file), `rasterizeSvg`/`rasterizePixels` (draw on a canvas, same interface as `@gum-jsx/node`), and `downloadSvg`/`downloadFile`.

## Using in React with `@gum-jsx/react`

`GUM` is a proxy that hands out a React component for any gum element name, so a figure is written as ordinary JSX. Props are the same as in gum.jsx code, including hyphenated ones like `stroke-width`. Write the figure as a component with a default export:

```tsx
import { blue, red } from '@gum-jsx/core'
import { GUM } from '@gum-jsx/react'
const { Frame, HStack, Square, Circle, Text } = GUM

export default function Demo() {
  return <Frame padding margin rounded>
    <HStack spacing>
      <Square fill={blue} />
      <Circle fill={red} />
      <Text>Hello</Text>
    </HStack>
  </Frame>
}
```

`GUM` tracks the default Env's element registry, so a plugin's elements appear on it once the plugin is used (`gum.use(math)` then `const { Latex } = GUM`). Components can return fragments and arrays, and can be composed and mapped over like any React component; the reconciler builds gum elements from them and lays them out in one pass.

To check a component from the command line, pass the file to `gum-react`, which prints SVG to stdout (options: `-s/--size`, `-u/--unit-size`, `-t/--theme`, `-c/--cwd`; the math elements are always registered here):

```bash
gum-react demo.tsx -s 800 -t dark > demo.svg
```

In a web page, wrap the component in `<Gum>`, which renders into a `<div>` it owns and re-renders when its children change. It takes `size` (a number or `[width, height]`), `theme`, an optional `env`, `className`/`style` for the host div, and any `Svg` props:

```tsx
import { Gum } from '@gum-jsx/react'

<Gum size={[640, 360]} theme="dark" className="my-figure">
  <Demo />
</Gum>
```

If the inner component has an `aspect` it is embedded inside the given size; if it is aspectless it stretches to fill it. The SVG is emitted at that pixel size, so for a responsive figure give the host div a rule like `svg { width: 100%; height: auto }`. Fonts follow the same rule as above: gate the first `<Gum>` render with text on `await loadWebFonts()`.

**Typing note.** `GUM` is typed so that core's element names are always present, while a plugin's (such as `Latex` from `@gum-jsx/math`) are only known at runtime and come out as `GumPrimitiveComponent | undefined` under TypeScript's `noUncheckedIndexedAccess`. The proxy always returns a component, so narrow those once where you destructure them:

```typescript
import { GUM, type GumPrimitiveComponent } from '@gum-jsx/react'
const { Frame, Plot } = GUM            // core names: typed as present
const Latex = GUM.Latex!               // plugin names: assert once, after gum.use(math)
```

**Bundling note.** The `@gum-jsx/*` packages ship TypeScript sources as their runtime (with `.d.ts` declarations alongside for the type checker, so your own `tsconfig` strictness never applies to them), and core's fonts are imported as assets. So a bundler that handles `.ts` and binary imports (bun, Vite, esbuild) is needed, and the fonts land in the build output as separate files, fetched on `loadWebFonts()`.
