# Changelog

Version numbers follow the published artifact versions.

## Unreleased — 22 Sept 2026
- **User manual in the prototype**: a button in the top right opens `docs/user-manual.md`, rendered in a dialog with a contents list. The markdown is embedded in `index.html`, so a downloaded single file carries its manual with no server and no network. `tools/embed-manual.js` re-embeds it after an edit and the test suite fails if the two drift apart.
- `docs/`: product description, user manual, and the meeting notes (Turkish) behind each iteration.
- `tests/`: Playwright regression suite (56 specs) over `index.html` plus reference screenshots of the main screens.

### Fixed
- The prototype opens on the **Dashboard** instead of the Journey Builder, matching how the Dashboard is described everywhere else. The journey canvas is now fitted the first time the builder is opened rather than at boot, because `fitView` measures the SVG and it is 0x0 while the view is hidden; later visits keep the pan and zoom the user left behind.
- **Escape** now closes the segment assistant dialog, like every other dialog in the prototype.

## v42 — 22 Sept 2026
**Guided tours + Getting started.** An onboarding layer over the existing screens; nothing about the product itself changed.
- **Getting started** page under Home, per role, with a progress bar. Items tick themselves off from real app state — a segment you actually saved, a campaign that actually reached *Pending approval* — not merely from having watched a tour. Journey and Program items are listed as "coming soon".
- **Guided tours**: a dimmed page, a spotlight on the element, and a dark card with the explanation, a step counter and a progress bar. Tours are interactive — they move on when you do the step, not when you press Next. Every waiting step has a **Fill for me** link so the whole thing can be demoed end to end.
- Five tours: *Create your first campaign* (16 steps, marketer), *Create a segment*, *Review and approve a campaign* (approver), *Read the dashboard*, *Admin setup*.
- **?** button in the top bar: tour list with status and restart, Getting started, the user manual, and a "Show tips on first visit" switch.
- First visit per role shows a welcome card; a tour left halfway offers to resume. Progress is kept in `localStorage` under `ecm-tours-v1`, with an in-memory fallback when storage is unavailable.
- `?notour` in the URL suppresses everything that starts on its own; so does `navigator.webdriver`, which keeps the test suite clean.

## v41 — 22 Sept 2026
- Brand name corrected to ETIYA everywhere (logo, footer, campaign labels, role names).
- Journey Builder and Journey Monitor: simulation controls moved into a marked "Simulation · demo only" strip so demo clock/event controls are not mistaken for product features.

## v40 — 21 Sept 2026
- Program module: list, Overview, Timeline (Gantt), Members picker, Settings (goal, contact cap, summary report).
- Dashboard: Opened / Clicked headline KPIs (8-tile strip).

## v38–39 — 21 Sept 2026
- Dashboard (Home) with role presets, live counters, needs-attention list, trend, funnel & eliminations, channel/category breakdowns, top campaigns/journeys, control-group uplift.

## v37 — 21 Sept 2026
- Visual pass: stronger type scale, two greys, bordered cards with tinted section headers, 36px inputs, table headers, 8-pt spacing.

## v35–36 — 21 Sept 2026
- Segment editor rebuilt as a workbench (definition left, audience right) with live Audience insight charts; assistant moved to a dialog; result rows on demand.

## v33–34 — 21 Sept 2026
- Template = design / content = text: Templates module moved to Administration; slots per channel; content written per delivery with live render; copy content from campaign.
- Segment result panel opens only after Search (superseded by v35).

## v31–32 — 21 Sept 2026 (meeting 3)
- Info: configurable Objective/Description/Brand, push/pull channel groups + MMS, priority for pull/TM only, pre-sent period moved to Parameters.
- Targeting redesign; A/B and Dynamic as independent switches; Approval as its own step; Reports page; status colours; tooltips everywhere.

## v29–30 — 18 Sept 2026 (meeting 2)
- Segments two-screen; groups in Parameters; campaign flow flattened (Channel & content · Rules · Schedule as steps); Offer skipped for Info; promo code; execution log removed; Copy-target and event-triggered removed from campaign.

## v20s — 16–17 Sept 2026 (meeting 1)
- Role views, collapsible menu and panels, breadcrumb, labelled actions, readiness layer, Etiya palette, exclusion redesign, NL filter assistant.
