// Parse numeric measurements while preserving a station ID's leading zeros.
const rows = loadCSV('temperatures.csv', {
  dynamicTyping: column => column !== 'station',
})
const points = rows.map(row => [row.hour, row.temperature])

return (
  <Box width={px(600)} font-size={px(18)} padding={em(1)} fit>
    <VStack gap={em(0.75)}>
      <Text font-size={em(1.3)} font-weight={bold}>
        Station {rows[0].station}: {rows.length} readings
      </Text>
      <Plot
        height={em(14)}
        xlabel="Hour"
        ylabel="Temperature (°C)"
        xlim={[7, 19]}
        ylim={[10, 25]}
        xticks={rows.map(row => row.hour)}
      >
        <Polyline points={points} stroke={blue} stroke-width={em(0.15)} />
        <Points points={points} point-size={em(0.5)} fill={blue} stroke={none} />
      </Plot>
    </VStack>
  </Box>
)
