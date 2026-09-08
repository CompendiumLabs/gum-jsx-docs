// Various food emojis are arranged in a spaced out grid and framed with the title "Fruits & Veggies". Each emoji is framed by a rounded square
const emoji = [ '🍇', '🥦', '🍔', '🍉', '🍍', '🌽', '🍩', '🥝', '🍟' ]
return <TitleFrame title="Fruits & Veggies" margin padding={1.5} rounded>
  <Grid rows={3} spacing={0.05}>
    {emoji.map(e =>
      <Frame aspect rounded padding={0.25}><Text>{e}</Text></Frame>
    )}
  </Grid>
</TitleFrame>
