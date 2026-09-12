# Random

*Category*: api

Every `evaluate(source, {seed?})` call starts its own random stream, with seed 42
by default. Re-evaluating the same document gives the same samples. The host's
random stream, other evaluations, layout, and SVG IDs do not change those draws.

```jsx
setSeed(7);
const points = range(100).map(() => ({x: normal(), y: normal()}));
return <Plot><Points points={points} fill={blue} /></Plot>;
```

| Call | Meaning |
| --- | --- |
| setSeed(seed) | Reset the current stream, including any cached normal sample |
| random() | Uniform fraction in [0,1) |
| uniform(lo=0,hi=1) | Uniform value between finite bounds, with hi greater than lo |
| normal(mean=0,stddev=1) | Normal sample; stddev must be nonnegative, and zero returns mean |
| integer(stop) | Integer from 0 up to, excluding, stop |
| integer(start,stop) | Integer from start up to, excluding, stop |

Seeds must be safe integers and are reduced to 32 bits. Integer bounds and their
difference must be safe integers, with stop greater than start. The stream uses
Mulberry32; normal sampling uses the Marsaglia polar method.

Direct imports of setSeed/random/uniform/normal/integer share one host stream.
Use `new RNG(seed)` for an independent stream with the same methods. Methods are
bound, so `range(10).map(rng.random)` works. Resetting the seed starts the same
sequence again. `setSeed` inside JSX affects only that evaluation's stream.

Sampling happens while constructing elements. Resizing a figure reuses those
samples. To create different data, change the seed and evaluate again. A host
can also override individual helpers through `evaluate(source, {scope})`.

[Runnable source](../code/Random.jsx) · [Sampling](Sampling.md).
