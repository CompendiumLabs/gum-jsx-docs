# UI Mockup

An interface rather than a figure: notification cards floating over graph paper, one of them holding a **Plot**. All of it is one local component. `Window` is a rounded **Frame** around a **VStack** of a filled title **Box**, a rule, and a body box, and it spreads `{...attr}` onto the frame, so each call site supplies the `pos` and `width`.

The title bar is the interesting piece. A column hugs its children, so the header box would come out only as wide as its text; `align="stretch"` makes it take the column's width instead, which spans the gray band across the card and pins the column to the card's width, so `justify="left"` puts the title and the body against the left edge. Drop it and the column shrinks to its widest line and floats in the middle. The divider is an **HLine** with `height={0}`: no room in the stack, but it still spans its slot, so it draws a hairline right at the boundary.

The sizes come from one number. `em={0.03}` on the **Group** is coordinate units per em, so an em is three percent of the frame height and the cards' widths are in that unit (`30` for the plot, `16` for the notifications). Nothing has a height: the plot card is as tall as the plot at its `aspect`, a notification as tall as its text wraps to. Each is centered on its `pos`, so changing the `em` rescales the cards and their text together without moving the composition.

The background is a **Mesh2D** at low opacity. It fills the group's whole rectangle, so the outer **Frame** needs `clip` to keep it inside the rounded corners, and `border={2}` because clipping cuts the border line in half.

**Code**

```jsx
const messages = [
  { title: 'Message Alert!', body: 'There is a new message waiting in your inbox. You probably want to see it. But I\'m gonna make that really difficult for no reason.' },
  { title: 'Testing, Testing', body: 'What are we doing here?' },
]

const Window = ({ title, children, ...attr }) =>
  <Frame rounded={7} fill={white} {...attr}>
    <VStack justify="left">
      <Box padding fill={gray} align="stretch">
        <Text font-weight={bold}>{title}</Text>
      </Box>
      <HLine height={0} />
      <Box margin>
        {children}
      </Box>
    </VStack>
  </Frame>

const Visual = ({ ...attr }) =>
  <Plot aspect={2} margin={0.15} grid title="Sine Wave">
    <SymLine fy={sin} xlim={[0, 2*pi]} stroke={blue} stroke-width={2} />
  </Plot>

return <Frame rounded={15} clip border={2}>
  <Group em={0.03} aspect={1.5}>
    <Mesh2D opacity={0.1} xlocs={60} ylocs={40} />
    <Window title="Data Viz" pos={[0.45, 0.55]} width={30}>
      <Visual />
    </Window>
    <VStack gap={0.75} pos={[0.82, 0.22]}>{
      messages.map(({ title, body }) =>
        <Window width={16} title={title}>
          <Text spacing={0.15}>{body}</Text>
        </Window>
      )
    }</VStack>
  </Group>
</Frame>
```