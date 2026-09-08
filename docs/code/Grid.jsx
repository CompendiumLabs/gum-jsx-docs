// draw a grid of square boxes filled in light gray. each box contains an arrow that is pointing in a particular direction. that direction rotates clockwise as we move through the grid.
<Frame padding={1} rounded={30}>
  <Grid rows={3} spacing={0.07}>
    { linspace(0, 360, 10).slice(0, 9).map(th =>
      <Frame padding rounded={20}>
        <Group aspect={1} spin={th}>
          <Arrow points={[[0, 0.5], [1, 0.5]]} arrow-size={0.4} />
        </Group>
      </Frame>
    ) }
  </Grid>
</Frame>
