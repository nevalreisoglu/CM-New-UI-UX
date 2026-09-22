# ECM Journey Studio — UX/UI redesign prototype

Single-file, click-through prototype of the redesigned Etya Campaign Management (ECM) user experience.
Iterated after each UX/UI redesign meeting (16–18 Sept 2026) and the follow-up sessions.

**Open it:** download `index.html` and open it in a browser — no build, no server, no external calls (fonts are optional).
With GitHub Pages enabled on this repo it is served at the repo's Pages URL.

## What is in the prototype (v40)

- **Roles:** Marketer · Approver (maker/checker) · Admin · CMO/Executive — pages and actions follow the role.
- **Dashboard** with role presets, 8 headline KPIs, live counters, "needs attention", funnel & eliminations, control-group uplift.
- **Program** as a business initiative: goal, period, owner, contact cap, members (campaigns + journeys), roll-up results, Gantt timeline.
- **Campaign** in 8 steps: Info (push/pull channels, configurable fields) · Targeting (two-column segment picker) · Offer / NBO · Channel & content (template = design, content = slots; A/B and dynamic; live render) · Communication rules · Schedule · Approval · Summary; non-blocking readiness panel.
- **Journey Builder** with journey-owned delivery steps; Journey Monitor.
- **Segments** workbench: definition + query builder + live audience insight; channel-scoped exclusion lists; Segment Groups in Parameters.
- **Templates (design)** per channel — admin only; content is written inside deliveries.
- **Reports**, **Parameters** (campaign form switches, rule defaults, channels & senders), **Release & licences**.
- Etya commercial palette; tooltips on every meaningful field.

Demo data only (30 customers, 16 campaigns, 3 journeys). Nothing is sent.

## Repository layout

```
index.html                 the prototype (single file)
docs/product-description.md
docs/user-manual.md
docs/meetings/             meeting notes (Turkish) that drove each iteration
tests/                     Playwright regression scripts + screenshots
CHANGELOG.md
```

## Working on it

The prototype is one HTML file with inline CSS and vanilla JS. Data lives in constants near the top of the script
(`CAMPAIGNS`, `JOURNEYS`, `MLS` segments, `TEMPLATES`, `PROGRAMS`, `DATAMART_ROWS`, `EVENT_ROWS`).
Run `tests/` after a change (see `tests/README.md`).
