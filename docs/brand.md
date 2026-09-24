# Brand kit in the prototype

How the Etiya brand kit is wired into `index.html`. Everything is a CSS custom
property on `:root` — changing a value here changes the whole prototype, and no
module carries its own palette.

> **A note on the brand name.** The kit is written "Etya" in some source
> material; the prototype writes **ETIYA**, corrected deliberately in v41. This
> was a visual re-skin, so no wording changed.

---

## 1. Palette

| Role | Dark | Light |
| --- | --- | --- |
| **Primary** — Dark Blue & Lilac | `#242441` | `#5D5D8D` |
| **Secondary** — Orange | `#F58220` | `#F9AA56` |
| **Complimentary** — Turquoise | `#00B5CB` | `#37DBDF` |
| **Grey** | `#DFE1DF` | `#EBECEB` |

### The one rule worth remembering

> **Orange is accent. Turquoise is action.**

Orange marks and tints: 3px bars, borders, the current step, header strips, the
selected chip. It is **never** a background with white text on it — at 13px,
white on `#F58220` is 2.6:1 and fails badly. Where something orange needs a
label, use the tint `--sec-soft` with `--sec-ink` text, or navy text on the
solid orange.

Turquoise is what you press: primary buttons, links, toggles that are on, the
focus ring, the selection highlight. As a background it only appears in the
darkened shades `--cta` / `--cta-hover`, never the bright `#00B5CB`.

### Three kit values we had to darken

The kit's own values do not reach WCAG AA where the mapping asked for text on
them. Each was moved to the nearest passing shade in the same hue:

| Use | Kit value | Measured | Shipped | Measured |
| --- | --- | --- | --- | --- |
| White label on the CTA | `#00879A` | **4.26:1** ✗ | `#00818F` | 4.63:1 ✓ |
| Orange ink on the orange tint | `#B3610F` | **4.04:1** ✗ | `#9E560D` | 4.94:1 ✓ |
| Status "ok" on its tint | `#2E7D32` | 4.50:1 (on the line) | `#2A7230` | 5.19:1 ✓ |

---

## 2. Token map

Historical variable names are kept so the rest of the CSS keeps working; only
the values changed.

| Token | Value | Where it is used |
| --- | --- | --- |
| `--brand-navy` | `#242441` | mail preview header, code blocks, phone bezel |
| `--brand-lilac` | `#5D5D8D` | Gantt "done" bars, lilac accents |
| `--glass-nav` | navy at 4.5% | left menu — composites to `#E9EAED` over the page |
| `--glass-bar` | lilac at 10% | top bar and footer — composites to `#E3E4EB` |
| `--glass-hover` / `--glass-active` | navy 7% / lilac 16% | menu hover and active row |
| `--glass-line` | navy at 10% | hairline under the top bar, beside the menu, above the footer |
| `--sec` | `#F58220` | active-row left bar, KPI tile accents, node badge, current node glow, logo mark |
| `--sec-light` | `#F9AA56` | assistant borders, parameter chips, avatar gradient |
| `--sec-ink` | `#9E560D` | text on orange tints — header strips, table headers, stepper |
| `--sec-soft` | `#FDF0E2` | card header strips, table header row, stepper current, selected chips |
| `--cta` | `#00818F` | primary buttons, toggles on, chart second series |
| `--cta-hover` | `#00707E` | primary button hover, links, turquoise pill text |
| `--cta-bright` | `#00B5CB` | focus ring, selected journey node border |
| `--cta-soft` | `#E2F6F8` | row selection, info pills |
| `--grey-1` / `--grey-2` | `#DFE1DF` / `#EBECEB` | borders, tracks, disabled fills |
| `--green` | `#242441` | *(historical name)* chart bars, dark accents |
| `--green-ink` | `#1A1A33` | card titles, section headings |
| `--green-soft` | `#ECECF3` | lilac wash — delivery node tint |
| `--orange` / `--orange-ink` / `--orange-soft` | same as `--sec` family | kept as aliases for older rules |
| `--acc` / `--acc-soft` | `#00818F` / `#E2F6F8` | info status, turquoise accents |
| `--bg` `#F2F3F5` · `--surface` `#FFFFFF` · `--surface-2` `#F7F7F9` | | page, cards, subtle fills |
| `--line` `#DFE1DF` · `--line-2` `#EBECEB` | | borders, hairlines |
| `--ink` `#242441` · `--ink-2` `#4A4A60` · `--ink-3` `#6B6B80` | | body, secondary, muted text |
| `--ok` `#2A7230` · `--warn` `#9E560D` · `--bad` `#C62828` | | status only — not in the kit, kept semantic |

**Journey step tints** (`--t-entry`, `--t-delivery`, …) were re-toned into the
brand families — turquoise, lilac, orange and grey washes with dark ink. Every
tint/ink pair measures ≥ 4.5:1; the lowest is `--t-offer` at 4.58:1.

### Chrome surfaces are translucent, not dark

The menu, top bar and footer are **translucent washes of the brand hues**, not
solid navy and lilac fills. The v44 kit mapping had them solid; the palette
benchmark by Murat's team found that most competitors and vendors have moved
away from full dark backgrounds, and in review (Fahri Kerçek, 24 Sept) the
solid navy menu kept pulling the eye to the chrome instead of the content. Same
colours, far less weight.

What stays: the active menu row keeps its 3px orange bar on a lilac wash, and
the logo keeps its orange block mark.

**One consequence to remember:** on these surfaces `--ink-3` fails — 4.32:1 on
the menu, 4.10:1 on the bars. Secondary text on chrome is therefore `--ink-2`
(7.16:1 on the menu, 6.79:1 on the bars). Menu items and captions use `--ink-2`;
the active item uses `--green-ink` (11.4:1).

---

## 3. Type

**Roboto** 400 / 500 / 700 from Google Fonts; IBM Plex Mono stays for `--mono`.

| Role | Size / line | Weight |
| --- | --- | --- |
| Title Large — card titles | 22 / 28 | 500 |
| Title Medium — section headings, `.h4` | 16 / 24 | 500 |
| Title Small / Label Large | 14 / 20 | 500 |
| Body Medium — body, tables, inputs, buttons | 14 / 20 | 400 |
| Label Medium — field labels, table headers, chips | 12 / 16 | 500 |
| Label Small — pills | 11 / 16 | 500 |
| Numbers that must dominate — KPI values | 22 / 28 | 700 |

700 is used **only** where a number has to dominate. Everything else is 400 or
500.

> `body` carries `line-height:1.43`, not `20px`. An absolute line-height is
> inherited literally by 9.5px chart labels, which then grow into the bars they
> label — that is exactly what the contrast audit caught.

---

## 4. Contrast rules

- Body text is `--ink` on white. Muted text never goes lighter than `--ink-3`
  (`#6B6B80`, 5.20:1 on white).
- Every text/background pair ships at **≥ 4.5:1**, or ≥ 3:1 for text that is
  genuinely large (≥ 24px, or ≥ 18.66px bold).
- Orange is not a text background. Turquoise is a background only at `--cta` /
  `--cta-hover`.

### Verifying it

`tests/brand-audit.js` walks every page at 1280 and 1440 px, menu open and
collapsed, plus five deep states, and measures the **rendered** contrast of
every text node against its real background:

```bash
cd tests && node brand-audit.js
```

It resolves the background by collecting every painted layer the element
actually overlaps, up to the first opaque one, and **compositing them** — so text
on a translucent wash is measured against the wash, not against the page behind
it. A chart label positioned above its bar is measured against the card behind
it, not against the bar it is a child of. Translucent text is composited the
same way. It skips nodes the browser is not painting (`font-size:0` in the
collapsed rail, zero-size boxes). Current run: **8047 text nodes, no failures.**
