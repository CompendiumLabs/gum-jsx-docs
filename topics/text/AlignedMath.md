# Aligned equations

*Category*: math

Use `aligned` to line up relations across several equations. Put `&` before
the relation and `\\` between rows. The first column is right aligned, the
second is left aligned, and relation spacing is retained at the start of the
second column. Additional pairs are separated by one em.

```jsx
<Latex>
  {String.raw`
    \begin{aligned}
      a+b &= c \\
        a &= c-b
    \end{aligned}
  `}
</Latex>
```

| Environment | Behavior |
| --- | --- |
| `aligned` | Alternating right/left columns, with a one-em gap between equation pairs. |
| `alignedat` | Required pair count, such as `{2}`; no automatic gap between pairs. Use explicit math spaces where needed. |
| `gathered` | Centered display-style lines. |
| `split` | Up to two relation-aligned columns. |
| `align`, `align*` | Display-only forms of the aligned layout. |
| `alignat`, `alignat*` | Display-only forms with an explicit pair count. |
| `gather`, `gather*` | Display-only centered lines. |
| `equation`, `equation*` | A single display row; it can contain `split` or other nested math. |

All these environments use display-style cells. Multiline forms add 0.3 em of
leading **between** rows, with no extra leading after the last row. Tall cells,
row gap commands, and array stretch are measured before the complete table is
centered on its math axis.

Use `Latex` for display-only environments. Embedded `aligned`, `alignedat`, and
`gathered` also work in `Tex`, where their cells still use display style. These
are naturally sized math elements: they do not distribute columns across an
available display width, wrap equations, or shrink to a width offer.

Both starred and unstarred display environments currently render **without
equation numbers**. Automatic numbering awaits a display container; explicit
`\tag` is an unsupported error. `\notag` and `\nonumber` can suppress a
future number but do not change the current body layout. KaTeX's supported
environment syntax applies; optional top/bottom positioning arguments such as
`\begin{aligned}[t]` are not supported by this adapter.

[MathArray](../../elements/text/MathArray.md) is the direct JSX counterpart.
Use explicit `cols` descriptors to specify alignment and gaps, `cell-style="display"`
for display cells, and `jot={true}` for multiline leading. A direct cell beginning
with a relation or binary operator can use a TeX empty group, such as `"{}=b"`,
to preserve the intended spacing. Parsed aligned environments insert this
group automatically.

See [matrices and arrays](MathArrays.md) for rules, cases, and small tables.
`\substack` and `subarray` make script-style multiline content for limits and
scripts. Phase 5 comparison galleries are available through
`bun run compare --suite 5`; `--inline` covers the embeddable environments and
omits display-only cases.
