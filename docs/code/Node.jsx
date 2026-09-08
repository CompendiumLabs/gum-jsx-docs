// A simple connected network where each rounded node contains an emoji icon stacked above a text label. The example shows idea → design → launch.
<Network aspect={2} node-fill={gray} node-rounded node-padding={0.25} node-ysize={0.35}>
  <Node id="idea" pos={[0.2, 0.5]}>
    <VStack spacing={0.15}>
      <Text>💡</Text>
      <Text share={0.25} fit>Idea</Text>
    </VStack>
  </Node>
  <Node id="design" pos={[0.5, 0.5]}>
    <VStack spacing={0.15}>
      <Text>🎨</Text>
      <Text share={0.25} fit>Design</Text>
    </VStack>
  </Node>
  <Node id="launch" pos={[0.8, 0.5]}>
    <VStack spacing={0.15}>
      <Text>🚀</Text>
      <Text share={0.25} fit>Launch</Text>
    </VStack>
  </Node>
  <Edge start="idea" end="design" />
  <Edge start="design" end="launch" />
</Network>
