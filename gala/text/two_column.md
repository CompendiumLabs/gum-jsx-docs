# Two Columns

The plain two-column slide: a figure on the left, words on the right. The layout is a [TextRow](/docs/TextRow) inside a [Slide](/docs/Slide), and everything on it is sized in em.

The slide's `em` sets the text size as a fraction of the slide height, so `em={0.05}` fits twenty lines top to bottom and the content width follows from the frame. The row splits that width in half with `sizes`, and each half is handed down: the [TextFigure](/docs/TextFigure) takes its half for the plot, with a smaller caption underneath at `caption-scale`, and the [TextCol](/docs/TextCol) takes the other half for a heading at `scale={1.3}`, a paragraph, and a [Bullets](/docs/Bullets) list. Nothing on the right has a width of its own; it all comes from the column, which is what keeps the text one size.

The figure and the column are aligned by their tops, and the row is as tall as the taller of the two. Had the text run longer than the frame, the slide would shrink the whole column to fit, and its `overflow` would say by how much.
