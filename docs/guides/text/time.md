---
category: api
description: "Generate calendar ranges and axis ticks, convert timestamps, and format date and clock labels."
---

# Dates and times

Date/time helpers return numeric milliseconds since January 1, 1970. These
coordinates work directly with [Plot](../../elements/text/Plot.md),
[Axis](../../elements/text/Axis.md), and ordinary marks. All four helpers are
available in JSX and as named imports from `@gum-jsx/core`.

| Call | Behavior |
| --- | --- |
| `timestamp(value)` | Convert an ISO string or JS Date to milliseconds; retain numeric values |
| `time_range(start, stop, unit, step = 1)` | Aligned calendar boundaries, excluding stop |
| `time_ticks(lim, count = 5)` | Readable automatic tick positions, including aligned endpoints |
| `format_time(value, pattern = "%Y-%m-%d")` | Deterministic English date and clock labels |

## Inputs and coordinates

Inputs accept numbers, Date objects, or strict ISO strings: `YYYY-MM-DD`,
`YYYY-MM-DDTHH:mm`, or `YYYY-MM-DDTHH:mm:ss` with optional one-to-three-digit
fractional seconds. Date/time strings may end in `Z`. Signed six-digit ISO years
are also supported. Bare strings and `Z` strings have the same meaning.
Calendar calculations use UTC fields internally, so results do not depend on
the machine's timezone. Offsets and locale-specific date strings are unsupported.

Invalid dates such as `2023-02-29` throw instead of rolling into another month.
Numeric values must be finite and within the JavaScript Date range
(±8640000000000000 milliseconds). Date inputs are never mutated.
Fractional numeric milliseconds are preserved as coordinates; calendar fields
and formatting use the containing whole millisecond.

Convert data coordinates and limits with `timestamp`; axes and marks continue
to receive numbers. Month positions reflect actual elapsed time, so February
occupies less space than March.

```jsx
const lim = [timestamp("2026-01-01"), timestamp("2026-07-01")]
return <HAxis
  lim={lim}
  ticks={time_range(...lim, "month")}
  format={value => format_time(value, "%b")}
/>
```

## Calendar ranges

Units are `"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`,
`"week"`, `"month"`, and `"year"`. Step is a nonzero safe integer.
For quarters, use `"month", 3`; for quarter-hour marks, use `"minute", 15`.

Ranges include an aligned start and exclude the stop. A monthly range from
January 15 through April 15 gives February 1, March 1, and April 1. A negative
step generates descending boundaries, and a step pointing away from the stop
returns an empty array.

Alignment is stable across calls: fixed units count from the Unix epoch,
weeks count from Monday, January 5, 1970, months count from January of year 0,
and years count from year 0. Thus quarterly marks always fall in January,
April, July, and October. Multiday steps continue evenly across month boundaries.
Month and year steps account for month lengths and leap years.

```js
time_range("2024-02-28", "2024-03-02", "day")
  .map(value => format_time(value))
// ["2024-02-28", "2024-02-29", "2024-03-01"]
```

Generated arrays are readonly and follow core's runtime freezing policy.
Ranges are limited to 100000 entries.

## Automatic ticks

`time_ticks([start, stop], count)` chooses useful clock or calendar intervals
near the requested count. Count is a target, just like `linear_ticks`.
The interval is chosen from seconds, minutes, hours, days, weeks, months,
and years; short spans use 1/2/5 millisecond steps, and long spans use 1/2/5
year steps. Only boundaries within the domain are returned.

Reversed limits produce descending ticks. Count 0 returns `[]`; count 1
returns the midpoint. Equal limits return that single timestamp when count is
positive. Counts and generated tick arrays are limited to 10000.

```jsx
const xlim = [timestamp("2026-01-01T08:00"), timestamp("2026-01-01T09:00")]
return <Plot
  xlim={xlim}
  xticks={time_ticks(xlim, 5)}
  xaxis-format={value => format_time(value, "%H:%M")}
/>
```

## Label formats

Formatting is explicit, so a plot keeps the intended amount of date context.
Use `%b` for `Jan`, `%b %Y` for `Jan 2026`, `%m-%d` for `01-15`, or `%H:%M`
for `09:30`. Include the date when a clock axis crosses midnight, and the year
when month labels span multiple years.

| Token | Meaning |
| --- | --- |
| `%Y`, `%y` | Full ISO year, two-digit year |
| `%m`, `%b`, `%B` | Two-digit month, abbreviated month, full month |
| `%d` | Two-digit day of month |
| `%a`, `%A` | Abbreviated weekday, full weekday |
| `%H`, `%M`, `%S` | Two-digit hour (00–23), minute, second |
| `%L` | Three-digit milliseconds |
| `%F`, `%T` | ISO date (`%Y-%m-%d`), clock time (`%H:%M:%S`) |
| `%%` | Literal percent sign |

Unknown tokens and a trailing `%` throw. Pass a callback such as
`format={value => format_time(value, "%b")}` to Axis, or `xaxis-format` /
`yaxis-format` to Plot. For explicit labeled pairs, use
`ticks.map(value => [value, format_time(value, "%b")])`.
