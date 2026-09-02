# Random

*Category*: utilities

These functions draw from a seeded, stateful random stream, so a figure that uses them renders the same way every time. Every evaluation starts from a fresh stream at the default seed of `42`, and you can pick your own seed at the top of the code with `setSeed`. Hosts can also set the seed from outside with the `seed` option when evaluating.

Gum's own internal draws (the ids it generates for clip and mask elements) come from a separate stream, so adding a clipped element to a figure never shifts the random data the figure draws elsewhere.

## Functions

- `setSeed(seed)` — reset the stream to start from integer `seed`
- `random()` — a uniform draw from `[0, 1)`
- `uniform(lo=0, hi=1)` — a uniform draw from `[lo, hi)`
- `normal(mean=0, stdv=1)` — a normal draw with the given mean and standard deviation
- `integer(lo, hi)` — a uniform integer draw from `lo` to `hi` inclusive (with one argument, from `0` to `lo`)
