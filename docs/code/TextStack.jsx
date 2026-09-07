// A text stack twenty em wide: a heading at twice the size, a paragraph, then a row holding a two-em circle, a formula, and the text they sit beside on one anchor line.
<TextStack width={20} gap={0.6}>
  <Text scale={2}>Stacks in em</Text>
  <Text>Every child is laid out in the stack's em, so the text, the formula and the figure below share one size.</Text>
  <TextStack direc="h" gap={0.75} valign="anchor">
    <TextFigure height={2}><Circle fill={blue} /></TextFigure>
    <Latex>{"\\int_0^\\infty e^{-x^2} dx"}</Latex>
    <Text>on the text's anchor</Text>
  </TextStack>
</TextStack>
