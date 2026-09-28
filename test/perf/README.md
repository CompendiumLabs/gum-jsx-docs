# Demo performance

From this repository, run `bun run perf` or `bun run perf:demos`. From the
workspace root, run `bun run perf:demos`; `bun run perf` includes this suite too.

```sh
bun run perf:demos --list
bun run perf:demos --smoke
bun run perf:demos --filter '^demos/render/'
bun run perf:demos --json > /tmp/gum-demos-perf.json
```

The suite discovers every `demos/**/*.jsx` file in sorted order, including the
minimal Winkel Tripel example. Sources stay in their existing demo directories.
The current six sources produce 24 cases:

| Prefix | One measured operation |
| --- | --- |
| `demos/evaluate/` | Parse and evaluate the source into a new element tree, including demo data preparation and construction. |
| `demos/layout/` | Lay out an existing tree, including viewport wrapping and a fresh layout pass. |
| `demos/svg/` | Serialize a previously laid-out viewport fragment. |
| `demos/render/` | Evaluate, construct, lay out, and serialize the complete demo to SVG. |

The evaluator exposes the public core, math, and maps bindings. Fonts use
`createMathFonts()` and are warmed outside timing. File reads, module loading,
and evaluator/provider construction are setup work. Evaluation cases still
include geography loading/cloning performed by the JSX itself. Complete renders
use a fresh pass each time; no layout cache survives between operations.

Figures retain their authored dimensions and default outline text. No PDF/PNG
conversion, disk writes, or network requests are measured. These are warm-process
benchmarks, not CLI startup measurements. Stage times use different reuse patterns
and should not be added together to predict complete-render latency.

`--list`, `--filter <regex>`, `--smoke`, and `--json` behave like the other perf
suites. Smoke mode executes each selected operation twice without timing. Mitata
1.0.34 handles warmup and sampling; its JSON times are nanoseconds. Run suites
sequentially on an idle machine and repeat comparisons before interpreting small
differences. Keep `runner.ts` identical to the core, math, and maps adapters.
