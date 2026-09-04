// three framed cards in a row, each a figure with a caption, at the same em
const shapes = [ [ 'Circle', <Circle fill={blue} /> ], [ 'Square', <Square fill={red} /> ], [ 'Triangle', <Triangle fill={green} /> ] ]
return <TextGrid cols={3} width={24} gap={1} justify="center">
  { shapes.map(([ name, shape ]) =>
    <TextFrame rounded padding={0.5}>
      <TextFigure height={3} caption={name}>{shape}</TextFigure>
    </TextFrame>
  ) }
</TextGrid>
