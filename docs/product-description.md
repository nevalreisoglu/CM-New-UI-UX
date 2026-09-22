# ECM Journey Studio — product description

What the redesigned Etiya Campaign Management (ECM) front end is, who uses it,
and why each screen is shaped the way it is. This describes the **prototype** in
`index.html`; anything not yet built is called out as such.

---

## 1. The problem the redesign set out to fix

ECM had grown one field at a time. The result:

- **One flat form per object.** A campaign was a single long page with every
  field on it, whether or not the campaign used it. Budget and Campaign Status
  had been dead for years and were still there.
- **No sense of progress.** Nothing told a marketer what was still missing, so
  campaigns were saved half-finished and discovered later by the approver.
- **Everyone saw everything.** A CMO opening ECM landed in the same screen as an
  administrator configuring channels.
- **Segments were a query tool, not an audience tool.** You wrote filters and
  got a row count, with no feel for who was in the segment.
- **Template and content were the same object**, so changing wording meant
  touching a design, and designs multiplied.

The redesign keeps the ECM data model and reorganises the surface: who sees
what, in what order, with what feedback.

---

## 2. Who uses it

| Role | What they do | What they see |
| --- | --- | --- |
| **Marketer** | Builds campaigns, journeys, segments and content. | Dashboard, Program, Campaign, Journey Builder, Offers, Policies, Segments, Reports, Journey Monitor. |
| **Approver** (checker) | Reviews and activates what marketers submit. | The same plan/operate pages, plus the approval actions. No audience or content authoring. |
| **Admin** | Configures the platform: channels, senders, rule defaults, form fields, templates, licences. | Everything, including Datamart, Parameters and Release & licences. |
| **CMO / Executive** | Watches outcomes. | Dashboard, Program and Reports only. Never the build pages. |

The role is a picker in the top bar (in the product it comes from the signed-in
user). Changing it hides menu entries and, if the open page is no longer
allowed, moves to the first page that is. Maker/checker is a real separation:
the person who builds is not the person who activates.

---

## 3. The object model

- **Program** — a business initiative with a goal, a period, an owner and a
  contact cap. Campaigns and journeys are its *members*; results roll up.
  A program is the answer to "what are we trying to achieve this quarter".
- **Campaign** — one offer or message to one audience over one period, through
  push channels (we send) or pull channels (shown when the customer comes).
- **Journey** — a flow of steps a customer moves through over time, with its own
  delivery steps, timers, conditions and goals.
- **Segment** — a saved audience definition, built from filters over a datamart,
  a file, or SQL. Channel-scoped exclusion lists sit beside it.
- **Offer / NBO** — what is being given. A campaign either names offers or hands
  the decision to Next Best Offer.
- **Template** (design) and **content** (text) — deliberately separate, see §5.

---

## 4. The campaign in eight steps

`Info · Targeting · Offer · Channel & content · Communication rules · Schedule ·
Approval · Summary`

Two rules shape the whole flow:

**Steps are not a wizard you must finish in order.** You can jump to any step.
The **readiness panel** on the right lists the seven things that make a campaign
complete, ticks what is done, and links to whatever is not. It never blocks
saving. Parts of a campaign are done by different people on different days, and
the UI now says so out loud: *"nothing here blocks saving"*.

**Steps that do not apply are visibly inert, not missing.** An Info campaign has
no offer, so the Offer step stays in the stepper, greyed and marked `–`, and the
readiness panel shows it as *"Offer (Info campaign — skipped)"*. A step that
vanishes makes people wonder what they lost.

Step by step:

1. **Info** — name, type (Offer / Info), category, period, control group,
   program, and **channels**. Channels are grouped into **push** (SMS, MMS,
   e-mail, mobile/web push, telemarketing — we send) and **pull** (in-app card,
   self-care banner, chatbot — shown when the customer comes). A campaign uses
   one kind or the other, never both; a follow-up on the other kind is a second
   campaign or a journey step. Priority applies to pull and telemarketing only,
   because only there do campaigns compete for a slot.
   Objective, Description and Campaign Brand are **configurable fields** — an
   admin turns them on per customer in Parameters, so single-brand operators
   never see a brand picker.
2. **Targeting** — two columns: available segments on the left, the target on
   the right, with a live count. Exclusions are channel-scoped.
3. **Offer / NBO** — name offers, or hand the choice to Next Best Offer.
   Optional promo code. Skipped for Info campaigns.
4. **Channel & content** — one content block per channel, written into the
   slots of a chosen template, with a live render (phone frame for SMS/push,
   mail frame for e-mail). A/B and dynamic content are two independent
   switches. Content can be copied from another campaign.
5. **Communication rules** — contact policies, frequency caps, quiet hours.
6. **Schedule** — when it runs. The pre-sent period lives in Parameters now, not
   here.
7. **Approval** — its own step, with a timeline of who did what. The approver
   activates; the marketer cannot.
8. **Summary** — everything on one page for the final read.

---

## 5. Template is design, content is text

The decision that removed the most duplication.

- A **template** is a design: a layout with named slots, per channel. Templates
  are **administration**, not campaign work, so they live under Administration
  and only an admin edits them.
- **Content** is what goes in the slots, and it is written **inside a delivery**
  — in the campaign step or the journey step that sends it, with the render
  updating as you type.

So changing wording never touches a design, and one design serves many
campaigns. Content can be copied from another campaign when a message is nearly
the same.

---

## 6. Segments as a workbench

The segment editor is two columns:

- **Left — definition.** Name, description, group, source (datamart query,
  uploaded file, or SQL), and the query builder: column · operator · value,
  combined with AND or OR.
- **Right — audience.** Live insight that updates as filters change: headline
  counts, distribution charts, reachability by channel. Result rows are pulled
  on demand with **Search**, not on every keystroke.

The **natural-language assistant** ("prepaid customers in Kyiv whose package
expires in 2 days") sits in a dialog, not in the form. It proposes filters into
the query builder; you see and edit every one. It is a starting point, never a
black box — a long list such as regions becomes a single `in` filter you can
read.

---

## 7. Journeys

The **Journey Builder** is a canvas of typed steps — entry, delivery, timer,
wait, condition, offer, NBO, parallel, external call, exit — colour-coded by
type, connected by edges you draw from a step's out port. Delivery steps are
owned by the journey, with their content written in the step.

The **Journey Monitor** shows per-customer state: participants, who is active,
deliveries, goal reached, events rejected by re-entry or concurrency rules, a
funnel by step, and a point-in-time participant list.

Both carry a **simulation strip** (see §9).

---

## 8. Dashboard, Program and Reports

- **Dashboard** — the page the prototype opens on: eight headline KPIs, live counters, a "needs attention" list
  that links straight to the thing that needs attention, trend, funnel and
  eliminations, channel and category breakdowns, top campaigns and journeys, and
  control-group uplift. Presets per role, and panels can be dismissed.
- **Program** — list, overview, a Gantt timeline of members, a members picker,
  and settings: goal, contact cap, summary report.
- **Reports** — campaign and journey results, with CSV export (disabled in the
  prototype).

---

## 8b. Onboarding: Getting started and guided tours

ECM is a product people are dropped into, usually with a deadline. The
onboarding layer answers two questions — *what should I do first?* and *what is
this control?* — without turning either into an obstacle.

**The design principle: first-run guidance is shown once, can be restarted, and
never blocks.** A welcome card appears once per role. Everything else is opt-in
from the **?** button or the Getting started page. No tour prevents using the
page underneath it: the spotlight leaves the target fully live, and Skip and
Escape are on every step.

**Getting started** is a checklist per role — the marketer's runs from the
dashboard through a first campaign; the approver's is about the queue; the
admin's is the five Parameters screens; the executive's is reading results.
Items tick themselves off **from real application state wherever that can be
observed** — a segment that was actually saved, a campaign that actually reached
*Pending approval* — rather than from having sat through a tour. Watching a tour
is not the same as having done the thing, and the checklist should not pretend
otherwise. Journey and Program are listed but not yet built.

**Guided tours** dim the page, cut a hole around one element and put a short
explanation beside it, with a step counter and a progress bar. Two things make
them more than a slideshow:

- They are **interactive**. A step that asks you to name the campaign waits
  until you have typed a name; a step that asks you to pick a channel waits
  until a channel is picked. The tour follows the user, not a script. On those
  steps the primary button is **Do it for me** and performs the step, so the
  same tour runs as a hands-off demo end to end. A secondary **Show me where**
  flashes the control instead. The primary button is never a no-op: a button
  whose only effect is a subtle highlight reads as broken.
- They follow the **real editor**. The campaign tour moves through the actual
  eight steps and honours their rules — on an Info campaign the Offer step is
  skipped, exactly as the editor skips it.

Five tours ship: *Create your first campaign* (the important one — sixteen
steps ending with a real campaign submitted for approval), *Create a segment*,
*Review and approve a campaign*, *Read the dashboard*, and *Admin setup*.

Progress is remembered per role, so a tour abandoned halfway offers to resume.
A tour is written for one role; changing role stops it rather than walking
someone through screens they cannot see.

---

## 9. What is prototype scaffolding, not product

The prototype has **no back end, no clock and no sends**. Nothing leaves the
browser. Two things exist only to make it demonstrable, and since v41 they are
fenced off visually — a dashed purple strip with a `⚗ Simulation · demo only`
badge, in both the Journey Builder and the Journey Monitor:

- **Advance 1 day / Advance 5 days / Reset** — move a simulated clock so you can
  watch customers progress. In the product the monitor updates on its own.
- **Send event** — inject a business event for a chosen customer.

Buttons inside the strip are deliberately not styled as primary actions. The
prototype runs three simulated days at load so the monitor is not empty.

Also demo-only: 30 customers, 16 campaigns, 3 journeys of fixed sample data;
CSV export and test sends raise a toast instead of doing anything.

---

## 10. Visual language

One theme, Etiya commercial palette: navy primary, dark-orange accent, two
greys. Bordered cards with tinted section headers, an 8-point spacing grid,
36px inputs, tabular numerals for anything countable. Orange is reserved for
the primary action and the current step — it is never decoration.

Every field that needs explaining carries a tooltip. Row actions are labelled
buttons, not bare icons; the only icon-only control is the menu burger, and
collapsing the menu moves each label into a tooltip.

---

## 11. Known gaps in the prototype

- Reports is a layout with sample numbers, not a reporting engine.
- Nothing is persisted: a reload starts over. A guided tour resumed after a
  reload therefore always picks up from *New campaign* — the draft it was
  building no longer exists.
