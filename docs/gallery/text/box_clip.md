# Rounded box clipping
*Category*: layout

A 280px **Square** deliberately overflows a 220×100 **Box**. The **Box** centers the child
and clips its paint inside the rounded 6px border. The surrounding padding leaves
room to see the complete border.

Tree output retains the child's full allocation and overflow even though that
ink is hidden. See [Box](../../elements/text/Box.md) for sizing and clipping props,
or compare [Group clipping](./group_clip.md) on a positioned canvas.
