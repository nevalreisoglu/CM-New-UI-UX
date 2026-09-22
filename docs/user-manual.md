# ECM Journey Studio — user manual

How to drive the prototype, screen by screen. It is a click-through model of the
redesigned Etiya Campaign Management front end: **nothing is sent and nothing is
saved between reloads.**

> Open `index.html` in a browser. No build, no server, no sign-in.

---

## Getting around

**The top bar** carries the menu burger, the **Role view** picker and your name.

**The left menu** is grouped: Home · Plan & build · Audience & content · Operate
· Administration. The burger collapses it to an icon rail; the labels move into
tooltips, so nothing becomes unidentifiable.

**The breadcrumb** under the top bar reads *group › page › what you have open*.

**Role view** decides what you see. Switch it to check a screen as someone else:

| Role | Sees |
| --- | --- |
| Marketer | Dashboard, Program, Campaign, Journey Builder, Offers, Policies, Segments, Reports, Journey Monitor |
| Approver | The same, minus audience and content authoring, plus the approve/activate actions |
| Admin | Everything, including Datamart, Parameters, Templates, Release & licences |
| CMO / Executive | Dashboard, Program, Reports |

If you switch to a role that may not see the open page, you are moved to the
first page it can.

**Tooltips.** A small `?` beside a label explains the field. Hover it.

**? (help).** Top right: guided tours, Getting started, this manual, and the
first-visit tips switch. See **Getting started and guided tours** below.

**User manual.** The button at the top right opens this manual. It is embedded
in the prototype, so it works offline and travels with the file — close it with
**Close**, **Esc**, or a click outside.

---

## Getting started and guided tours

The first time you open the prototype in a role, a card offers a short guided
tour. Take it or dismiss it — everything it covers is also on the **Getting
started** page, at your own pace.

### The ? button

Top right, beside the role picker. It opens:

- **Guided tours** — every tour for your role with its status (not started, part
  way through, or done ✓). Click one to start it, or to pick it up where you
  stopped.
- **Getting started** — the checklist page.
- **User manual** — this document.
- **Show tips on first visit** — turn the welcome card off for good.

### Getting started

Under **Home** in the left menu. A checklist for your role with a progress bar:
what to do, in what order, with **Show me** to run the matching tour and **Go to
page** to just go there.

Items tick themselves off when you do the real thing, not when you watch the
tour. Saving a segment ticks "Create a segment"; submitting a campaign ticks
"Submit a campaign for approval". Journey and Program items are marked *coming
soon* — those tours are not built yet.

### What a tour looks like

The page dims, one control stays lit with an orange outline, and a dark card
beside it explains that control. The card shows which step you are on, a
progress bar, **Back**, **Skip tour**, and the main button.

The tours are **interactive**: on a step that asks you to do something, the tour
moves on by itself **once you actually do it**. Type the name and it advances;
pick a channel and it advances. You do not press Next on those steps.

On those steps the main button reads **Do it for me** and performs the step for
you with sample data, so you can watch rather than type. Using only *Do it for
me* and *Next*, the campaign tour runs end to end and leaves a real campaign
waiting for approval.

Next to the hint there is also **Show me where**, which flashes a ring around
the control the step is talking about — useful when the highlight is somewhere
you are not looking.

The lit control stays fully usable — you can click it and type in it; the rest
of the page is simply out of the way.

**Keyboard:** `→` or `Enter` for Next when it is allowed, `←` for Back, `Esc` to
leave the tour (it asks first).

### The tours

| Tour | Role | What it covers |
| --- | --- | --- |
| Create your first campaign | Marketer | Sixteen steps: name, type, channels, targeting, offer, content, rules, schedule, and submitting for approval. Ends with a real campaign in the approver's queue. |
| Create a segment | Marketer | The workbench: name, group, DataMart, filters, the live audience insight, exclusion lists, save. |
| Review and approve a campaign | Approver | From "Needs attention" to the approval step and the decision. |
| Read the dashboard | Everyone | Period, headline KPIs, Live now, Needs attention, funnel and eliminations, control-group uplift. |
| Admin setup | Admin | The five Parameters screens. |

### Turning it off

- **Show tips on first visit** in the **?** menu stops the welcome card.
- **Don't show again** on the welcome card does the same.
- Adding **`?notour`** to the URL suppresses the welcome card and the resume
  prompt for that visit — useful when demoing or taking screenshots.

A tour is written for one role. If you change the role picker while a tour is
running, it stops and says so; restart it from **? › Guided tours**.

Because the prototype keeps nothing across a reload, a tour resumed after
refreshing the page starts again from **New campaign** — the draft it was
building is gone.

---

## Dashboard

The page the prototype opens on. Eight headline KPIs across the top, then:

- **Live counters** — click one to jump to what it counts.
- **Needs attention** — campaigns waiting for approval, journeys with failures,
  segments that have gone stale. Click a row to open it.
- **Trend, funnel & eliminations** — where audiences are lost.
- **Channel and category breakdowns**, **top campaigns and journeys**, and
  **control-group uplift**.

Panels can be dismissed with the × in their header, and the preset follows the
role.

---

## Program

A program is the business initiative campaigns and journeys belong to.

1. **Program** in the menu → the list.
2. **New program** (+) or click a row.
3. **Overview** — goal progress, period, owner, rolled-up results of the members.
4. **Timeline** — a Gantt of the members over the program period, with today
   marked.
5. **Members** — **Add members** opens a picker of campaigns and journeys; tick
   and add.
6. **Settings** — goal, contact cap (how often this program may touch one
   customer), and the summary report.

---

## Building a campaign

**Campaign** in the menu → **+** for a new one, or **Open** / **Continue** on a
row. **Copy** on a row clones its settings into a new draft.

The list has a search box, status chips, and **More filters** for type,
category, program, brand and dates.

### The eight steps

`Info · Targeting · Offer · Channel & content · Communication rules · Schedule ·
Approval · Summary`

**You do not have to go in order.** Click any step in the stepper. The
**readiness panel** on the right lists the seven parts of a complete campaign,
ticks what is done, and jumps to any item you click. It never stops you saving —
parts get done by different people on different days.

A step that does not apply stays visible but greyed: an Info campaign shows the
**Offer** step marked `–`, because it has nothing to offer.

#### 1 · Info

Name (required — Next will refuse without it), Campaign Type (Offer or Info),
category and sub-category, start and end, control group, and program.

**Channels** are in two groups:

- **Push — we send to the customer.** SMS, MMS, e-mail, mobile/web push,
  telemarketing. One schedule for all of them.
- **Pull — shown when the customer comes.** In-app card, self-care banner,
  chatbot. Nothing is sent; **Priority** decides which campaign wins the slot.

A campaign uses one group or the other. Click a channel chip to toggle it.

*Objective*, *Description* and *Campaign Brand* appear only if an admin has
turned them on in Parameters.

#### 2 · Targeting

Available segments on the left, your target on the right. Search or filter by
group, then **›** to add. The audience count updates as you go. Exclusion lists
are channel-scoped — excluding by SMS does not exclude by e-mail.

**New segment** here takes you to Segments; save it and come back, and it is in
the list.

#### 3 · Offer / NBO

Name the offers, or set the strategy to **NBO** and let Next Best Offer decide.
Optionally attach a promo code. Skipped for Info campaigns.

#### 4 · Channel & content

One tab per channel you picked. For each:

1. Choose a **template** (the design, with named slots).
2. Fill the **slots** — subject, headline, body, CTA. The preview on the right
   renders as you type: a phone for SMS and push, a mail frame for e-mail.
3. `{{parameters}}` in yellow are personalisation tokens; click one to see what
   it resolves to.
4. **Copy content from campaign** pulls wording from another campaign.

**A/B** and **Dynamic content** are independent switches — you can use either,
both, or neither.

#### 5 · Communication rules

Contact policies, frequency caps and quiet hours. Defaults come from Parameters;
what you change here applies to this campaign.

#### 6 · Schedule

When it runs — once, recurring, or on a trigger.

#### 7 · Approval

Submit for approval as a marketer. As an **approver**, the same step offers
**Approve & activate** or **Reject** with a note. The timeline shows who did
what, when.

#### 8 · Summary

The whole campaign on one page. **Save**, **Save & close**, or go back to any
step.

---

## Segments

**Segments** in the menu → the list → **+ New segment**, or click a row.

The editor is a workbench:

**Left — definition.** Name, description, group, and the source: a datamart
query, an uploaded file, or SQL. In the query builder each filter is
*column · operator · value*; add as many as you need and combine with **AND** or
**OR**.

**Right — audience.** Counts and charts that update as you change filters:
distribution by the columns you filtered, reachability per channel.

**✦ Assistant** opens a dialog. Describe the audience in a sentence —
*"prepaid customers in Kyiv or Odesa whose package expires in 2 days"* — and
**Build filters** turns it into filters in the query builder, which you then
review and edit. Close it with **Close** or **Esc**.

**Search** pulls the matching customer rows and opens the result list. Counts
update without it; rows need it, because pulling rows on every keystroke would
be slow.

**Save** or **Save as new**. Exclusion lists are managed here too, scoped per
channel; segment **groups** are set up in Parameters.

---

## Journeys

### Journey Builder

**Journey Builder** in the menu. Pick a journey from the dropdown, or
**New journey**.

- **The palette** on the left holds the step types. Drag one onto the canvas, or
  click it. The burger at the top of the palette collapses it to icons.
- **Connect steps** by dragging from a step's orange out-port to the next step.
- **Click a step** to open its panel on the right and configure it — for a
  delivery step, that is where its channel, template and content live.
- **The toolbar** has zoom, fit, auto-layout and direction. The right panel
  collapses with its own toggle.
- **Delete** a step with the × on it, or cut an edge with the marker on the line.

### Journey Monitor

Per-customer state for the selected journey: participants and how they were
admitted, who is active, deliveries and failures, goal reached, and events
rejected by re-entry or concurrency rules. Below that, a funnel by step and a
point-in-time participant list. **Report** opens the full execution log.

### The simulation strip — demo only

Both screens carry a dashed purple strip badged **⚗ Simulation · demo only**.
It is **not part of the product**. The prototype has no real clock and sends
nothing; these controls move a simulated clock so you can watch customers move:

- **Send event** (builder) — inject a business event for a chosen customer.
  Immediate steps run at once.
- **Advance 1 day** / **Advance 5 days** — timers expire, mock delivery outcomes
  are generated, customers move on.
- **Reset** — back to day 0, participants reloaded from the entry segment.

The prototype runs three simulated days at load, so the monitor opens on
**Day 3** with something to show. In the product, the monitor updates on its own.

---

## Offers, Policies, Reports

- **Offers** — the offer catalogue; **+** adds one. Journey and campaign offer
  steps point at these.
- **Policies** — contact policies and eligibility rules.
- **Reports** — campaign and journey results. **Export CSV** is disabled in the
  prototype and says so.

---

## Administration (admin role)

- **Templates** — the designs, per channel, with their named slots. Wording is
  *not* here; it is written inside each delivery.
- **Parameters**
  - **Campaign form** — turn Objective, Description and Campaign Brand on or off
    for this customer. Hidden fields keep their default value. Campaign Status
    and Budget are gone for good.
  - **Rule defaults** — the communication rules new campaigns start with.
  - **Channels & senders** — the channel list and sender IDs.
  - **Segment groups** — the groups segments are filed under.
  - **Pre-sent period** — moved here from the campaign form.
- **Datamart** — the source tables and their columns.
- **Release & licences** — version and licence information.

---

## Things worth knowing

- **Nothing is saved.** Reloading starts over from the sample data.
- **Nothing is sent.** Test sends and CSV exports raise a toast instead.
- The sample data is 30 customers, 16 campaigns and 3 journeys.
- **Esc** closes any dialog: the manual, the report, new journey, the journey
  list and the segment assistant.
- The prototype opens on the **Dashboard**.
- Guided tours never block the page, and `?notour` in the URL turns off anything
  that would start on its own.
