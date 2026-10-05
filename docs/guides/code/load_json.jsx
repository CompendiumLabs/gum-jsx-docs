// Read a title, axis label, and nested records from an external JSON file.
const survey = loadJSON('survey.json')
const values = survey.sites.map(site => site.count)
const labels = survey.sites.map((site, index) => [index, site.name])

return (
  <Box width={px(600)} font-size={px(18)} padding={em(1)} fit>
    <BarPlot
      height={em(16)}
      title={survey.title}
      ylabel={survey.unit}
      values={values}
      xticks={labels}
      ylim={[0, 40]}
      fill={green}
      stroke={none}
      border-radius={{ t: em(0.3) }}
      xgrid={false}
    />
  </Box>
)
