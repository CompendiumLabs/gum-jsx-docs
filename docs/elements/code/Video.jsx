// Four explicit frames at two frames per second: a two-second video.
<Video size={[640, 360]} fps={2} background={white}>
  {linspace(0.2, 0.8, 4).map((x, i) =>
    <Group font-size={px(24)}>
      <Line from={[0.2, 0.5]} to={[0.8, 0.5]} />
      <Circle pos={[x, 0.5]} width={em(2)} fill={blue} stroke={none} />
      <Text pos={[0.5, 0.8]}>Frame {i+1}</Text>
    </Group>
  )}
</Video>
