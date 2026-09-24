# Growth bases

*Category*: layout

Both rows contain the same two labels with `grow={1}`. The first row divides
the space after the gap equally: unsized growing children default to a zero
basis when the row has a finite width budget.

The second row sets `basis="auto"`. Each panel starts at its measured content
width, including padding, and receives half the remaining space. The longer
label therefore keeps a wider allocation. An explicit width would supply its
auto basis instead of a content measurement.

An explicit `basis` takes precedence over the main-axis dimension. Otherwise,
an explicit width in a row or height in a column supplies the basis. With neither
specified, positive growth uses zero under an available or exact main-axis
request. Natural measurement, omitted or zero growth, and `basis="auto"`
retain content-based starting sizes. `width="fill"`
does not supply a fixed basis.

`basis="auto"` preserves a measured starting width; `grow` can still enlarge the
final allocation. An explicit `basis={0}` also applies without a finite budget,
where it can produce a zero allocation with overflowing content.

Try changing the second panel's grow factor to 2 or adding a max-width.
Growth weights distribute surplus around the chosen bases, subject to bounds.
See [Stack](../../guides/text/stack.md) for the full allocation rules and
[Flex limits and shrinkage](./stack_flex.md) for capped growth and shrinking.
