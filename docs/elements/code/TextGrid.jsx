// A natural label column stays aligned beside a fixed-width column of wrapped prose.
<TextGrid
  columns={["auto", em(16)]}
  font-size={px(18)}
  column-gap={em(1.2)}
  row-gap={em(0.8)}
  fit
>
  <Text font-weight={bold} color={blue}>Columns</Text>
  {"Shared widths keep labels and descriptions aligned across every row."}
  <Text font-weight={bold} color={purple}>Rows</Text>
  {"Each row grows to fit its tallest cell after the text has wrapped."}
  <Text font-weight={bold} color={green}>Gaps</Text>
  {"Horizontal and vertical spacing can be set independently."}
</TextGrid>
