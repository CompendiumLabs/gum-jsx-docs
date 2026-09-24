// U.S. GDP by industry, annual 2024. Shares of current-dollar GDP (%).
// Source: BEA, Survey of Current Business, April 2025, Table 9.
// https://apps.bea.gov/scb/issues/2025/04-april/pdf/0425-gdp-economy.pdf

// The page width is an output choice. The figure's height comes from its content.
const pageWidth = 1600;
const pageInset = 82;
const chartWidth = pageWidth - 2 * pageInset;
const scale = 6.35;
const nodeW = 20;
const groupGap = 36;
const leafGap = 16;
const labelGutter = 92;
const rightLabelArea = 344;
const ribbonRun = (chartWidth - labelGutter - rightLabelArea - 3 * nodeW) / 2;
const rootX = labelGutter;
const groupX = rootX + nodeW + ribbonRun;
const leafX = groupX + nodeW + ribbonRun;
const chartHeadroom = 46;

const palette = {
  paper: '#F8FAF9',
  navy: '#172638',
  muted: '#617080',
  rule: '#D9E1E3',
  goods: '#C97C3B',
  services: '#238B9B',
  government: '#866BB7',
};

const groups = [
  {
    name: 'Private goods', share: 16.7, color: palette.goods,
    children: [
      { name: 'Manufacturing', share: 10.0 },
      { name: 'Construction', share: 4.5 },
      { name: 'Agriculture + mining', share: 2.2 },
    ],
  },
  {
    name: 'Private services', share: 72.0, color: palette.services,
    children: [
      { name: 'Finance, insurance, real estate + rental', lines: ['Finance, insurance,', 'real estate + rental'], share: 21.2 },
      { name: 'Professional + business services', lines: ['Professional + business', 'services'], share: 13.2 },
      { name: 'Other private services*', share: 11.4 },
      { name: 'Education + health care', share: 8.7 },
      { name: 'Retail trade', share: 6.3 },
      { name: 'Wholesale trade', share: 5.8 },
      { name: 'Information', share: 5.4 },
    ],
  },
  {
    name: 'Government', share: 11.3, color: palette.government,
    children: [
      { name: 'State + local', share: 7.7 },
      { name: 'Federal', share: 3.6 },
    ],
  },
];

const sum = xs => xs.reduce((a, b) => a + b, 0);
const totalShare = sum(groups.map(g => g.share));
if (Math.abs(totalShare - 100) > 1e-9 ||
    groups.some(g => Math.abs(sum(g.children.map(c => c.share)) - g.share) > 1e-9)) {
  throw new Error('Shares must balance to 100%.');
}

// Vertical positions follow ribbon thicknesses and the gaps between siblings.
// Each column is centered against the widest (industry) column.
const totalLeaves = sum(groups.map(g => g.children.length));
const rootSpan = totalShare * scale;
const groupSpan = rootSpan + (groups.length - 1) * groupGap;
const leafSpan = rootSpan + (totalLeaves - groups.length) * leafGap + (groups.length - 1) * groupGap;
const chartHeight = chartHeadroom + leafSpan + 16;
const leafTop = chartHeadroom;
const groupTop = leafTop + (leafSpan - groupSpan) / 2;
const rootTop = leafTop + (leafSpan - rootSpan) / 2;

let rootCursor = rootTop;
let groupCursor = groupTop;
let leafCursor = leafTop;
const groupFlows = [];
const leafFlows = [];
const groupNodes = [];
const leafNodes = [];

groups.forEach((group, gi) => {
  const gh = group.share * scale;
  groupFlows.push({
    sourceTop: rootCursor, targetTop: groupCursor,
    height: gh, color: group.color,
  });
  groupNodes.push({ ...group, top: groupCursor, height: gh });

  let groupOutputCursor = groupCursor;
  group.children.forEach((child, ci) => {
    const h = child.share * scale;
    leafFlows.push({
      sourceTop: groupOutputCursor, targetTop: leafCursor,
      height: h, color: group.color,
    });
    leafNodes.push({ ...child, top: leafCursor, height: h, color: group.color });
    groupOutputCursor += h;
    leafCursor += h + (ci === group.children.length - 1 ? 0 : leafGap);
  });

  rootCursor += gh;
  groupCursor += gh + (gi === groups.length - 1 ? 0 : groupGap);
  leafCursor += gi === groups.length - 1 ? 0 : groupGap;
});

function Ribbon({ x0, x1, sourceTop, targetTop, height, color }) {
  const top = Math.min(sourceTop, targetTop);
  const bottom = Math.max(sourceTop, targetTop) + height;
  const hh = bottom - top;
  const sy = (sourceTop - top) / hh;
  const ty = (targetTop - top) / hh;
  const sh = height / hh;
  return (
    <Path
      x={px(x0)} y={px(top)} width={px(x1 - x0)} height={px(hh)}
      commands={[
        move_to(0, sy),
        curve_to(0.42, sy, 0.58, ty, 1, ty),
        line_to(1, ty + sh),
        curve_to(0.58, ty + sh, 0.42, sy + sh, 0, sy + sh),
        close_path(),
      ]}
      fill={color} opacity={0.34} stroke={none}
    />
  );
}

function PlotLabel({ x, y, text, size = 20, weight = 400, color = palette.navy, anchor = 'start', width }) {
  return (
    <Text
      x={px(x)} y={px(y)} anchor={[anchor, 'center']}
      width={width === undefined ? undefined : px(width)}
      font-size={px(size)} font-weight={weight} color={color}
    >{text}</Text>
  );
}

return (
  <Svg width={px(pageWidth)} background={palette.paper} font-family={sans} font-size={px(20)}>
    <Box width={1} padding={[em(2), em(1.9), px(pageInset), px(pageInset)]}>
      <VStack width="fill" gap={em(1.2)} align="stretch">
      <VStack gap={em(0.4)}>
        <Text font-size={em(0.9)} font-weight={700} color={palette.services}>U.S. ECONOMY  /  2024</Text>
        <Text font-size={em(2.45)} font-weight={700} color={palette.navy}>Where U.S. GDP was produced</Text>
        <Text font-size={em(1.15)} color={palette.muted}>Industry value added as a share of current-dollar GDP</Text>
      </VStack>

      <Rect width="fill" height={px(2)} fill={palette.rule} stroke={none} />

      <Group width={px(chartWidth)} height={px(chartHeight)}>
        <PlotLabel x={rootX} y={16} text="TOTAL GDP" size={17} weight={700} color={palette.muted} />
        <PlotLabel x={groupX} y={16} text="MAJOR GROUP" size={17} weight={700} color={palette.muted} />
        <PlotLabel x={leafX} y={16} text="INDUSTRIES" size={17} weight={700} color={palette.muted} />

        {groupFlows.map((f, i) => <Ribbon key={`g${i}`} x0={rootX + nodeW} x1={groupX} {...f} />)}
        {leafFlows.map((f, i) => <Ribbon key={`l${i}`} x0={groupX + nodeW} x1={leafX} {...f} />)}

        <Rect x={px(rootX)} y={px(rootTop)} width={px(nodeW)} height={px(rootSpan)} fill={palette.navy} stroke={none} border-radius={px(3)} />
        {groupNodes.map((g, i) => (
          <Rect key={`gn${i}`} x={px(groupX)} y={px(g.top)} width={px(nodeW)} height={px(g.height)} fill={g.color} stroke={none} border-radius={px(3)} />
        ))}
        {leafNodes.map((d, i) => (
          <Rect key={`ln${i}`} x={px(leafX)} y={px(d.top)} width={px(nodeW)} height={px(d.height)} fill={d.color} stroke={none} border-radius={px(3)} />
        ))}

        <PlotLabel x={rootX - 21} y={rootTop + rootSpan / 2} text="100%" size={30} weight={700} anchor="end" />
        {groupNodes.map((g, i) => (
          <VStack
            key={`glabel${i}`}
            x={px(groupX + nodeW + 25)} y={px(g.top + g.height / 2)}
            anchor={['start', 'center']} gap={em(0.2)}
          >
            <Text font-size={px(22)} font-weight={700} color={palette.navy}>{g.name}</Text>
            <Text font-size={px(19)} font-weight={600} color={g.color}>{g.share.toFixed(1)}%</Text>
          </VStack>
        ))}
        {leafNodes.flatMap((d, i) => [
          <VStack
            key={`lname${i}`}
            x={px(leafX + nodeW + 22)} y={px(d.top + d.height / 2)}
            anchor={['start', 'center']} gap={0}
          >
            {(d.lines || [d.name]).map((line, j) => (
              <Text key={`line${j}`} font-size={px(19)} color={palette.navy}>{line}</Text>
            ))}
          </VStack>,
          <PlotLabel key={`lshare${i}`} x={chartWidth - 7} y={d.top + d.height / 2} text={`${d.share.toFixed(1)}%`} size={19} weight={700} color={d.color} anchor="end" />,
        ])}
      </Group>

      <Rect width="fill" height={px(2)} fill={palette.rule} stroke={none} />
      <VStack gap={em(0.55)}>
        <Text font-size={em(0.8)} color={palette.muted}>* Other private services is a residual that includes transportation, utilities, arts, hospitality, and other services.</Text>
        <Text font-size={em(0.8)} color={palette.muted}>Source: U.S. Bureau of Economic Analysis, Survey of Current Business (April 2025), Table 9. Figures rounded to 0.1 percentage point.</Text>
      </VStack>
      </VStack>
    </Box>
  </Svg>
);
