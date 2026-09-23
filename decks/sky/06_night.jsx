<Page title="At night, our side faces away" prompt="Earth keeps turning. Daytime will come again!" background={night} color={paper}>
  <HStack width="fill" height="fill" align="center" gap={em(1.3)}>
    <Group width={em(22)} height={em(12)}>
      <Sun x={0} y={0.26} width={0.24} />
      {[0.34,0.5,0.66].map(y => <Ray from={[0.24,y]} to={[0.46,y]} paint={gold} />)}
      <Group x={0.46} y={0.04} width={0.45} aspect={1}>
        <Circle width={1} fill="#6BB8DE" stroke="none" />
        <Path width={1} height={1} fill="#304263" stroke="none"
          commands={[move_to(0.5,0), curve_to(0.776,0,1,0.224,1,0.5), curve_to(1,0.776,0.776,1,0.5,1), close_path()]} />
        <Text x={0.23} y={0.5} anchor="center" font-weight="bold" color={ink}>day</Text>
        <Text x={0.73} y={0.5} anchor="center" font-weight="bold" color={paper}>night</Text>
      </Group>
      <Text x={0.685} y={1} anchor={[0.5,1]} font-weight="bold">Earth</Text>
    </Group>
    <VStack grow={1} gap={em(0.65)}>
      <Text font-size={em(1.4)} font-weight="bold">Earth turns.</Text>
      <Text font-size={em(1.35)}>Our side turns away from the Sun.</Text>
      <Text font-size={em(1.35)}>The sky grows dark.</Text>
    </VStack>
  </HStack>
</Page>
