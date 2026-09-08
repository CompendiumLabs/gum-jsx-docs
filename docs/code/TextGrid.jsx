// three framed cards in a row, each a figure with a caption, at the same em
const shapes = [ [ 'Circle', <Circle fill={blue} /> ], [ 'Square', <Square fill={red} /> ], [ 'Triangle', <Triangle fill={green} /> ] ]
return <TextGrid cols={3} width={24} gap={1} justify="center">
  { shapes.map(([ name, shape ]) =>
    <Frame aspect rounded padding={1}>
      <TextFigure caption={name} gap={0.5}>{shape}</TextFigure>
    </Frame>
  ) }
</TextGrid>
