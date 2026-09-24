---
category: plotting
description: "A Sankey-style chart divides 2024 U.S. GDP into goods, services, government, and their industry groups."
---

# Where U.S. GDP Was Produced

A Sankey-style chart divides 2024 U.S. GDP into private goods-producing
industries, private services-producing industries, and government, then into
their industry groups. Ribbon thickness represents each group's share of
current-dollar GDP. The ribbons show a breakdown of the total, rather than
transactions between industries.

The shares come from [Table 9 of the U.S. Bureau of Economic Analysis's April
2025 *Survey of Current Business*](https://apps.bea.gov/scb/issues/2025/04-april/pdf/0425-gdp-economy.pdf).
Figures are rounded to one decimal place. “Other private services” combines
the service categories that are not labeled separately.

The JSX checks that child shares add up to each major group and that the three
groups total 100%. It derives node heights and vertical positions from those
shares, then draws the ribbons with curved [Path](../../elements/text/Path.md)
commands inside a positioned [Group](../../elements/text/Group.md). Rectangles
mark each column; text labels and percentages sit beside the industry nodes.
The page has a fixed width, while its height follows the chart content.

[View the source](../code/industry_sankey.jsx).
