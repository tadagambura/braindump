# Brain Dump: Spec

**Empty your head. It sorts itself into today, later and never.** · #17 of 17 · Wave 1: Daily keepers · Used: Daily · Easy · Revenue potential: Medium · Wellbeing & Productivity · Source: Owner's idea (ADHD brain-dump organiser request)

## One-liner

Type, talk or scribble everything rattling around your head, then sort it in seconds into Today, Later and Never. No projects, no tags, no setup. Built with ADHD brains in mind. Free gets 5 pages; Premium adds a whiteboard on tablets for visual thinkers. Starring Kaos doing 99 things at once at frantic genius-inventor speed, brain scrambled.

## Problem / audience

- **Who it's for:** People with ADHD or busy minds who feel overwhelmed by to-do apps.
- **The problem it solves:** Too many thoughts, not enough structure, and every productivity app wants you to organise before you've even emptied your head.
- **Example:** At 11pm, a user dumps 23 thoughts in two minutes, sorts them in one more: 4 for Today, 9 for Later, 10 binned. They sleep.

## MVP features (ship with only these)

1. One big dump page: type a line per thought
2. Swipe or tap to sort each thought into Today, Later or Never
3. Today list with gentle ticks; Never is a guilt-free bin
4. 5 free pages (Work, Home, Ideas…); unlimited with Premium
5. Tablet whiteboard for visual thinkers (Premium)
6. Learning cards on focus, overwhelm and ADHD-friendly tricks

## Not in MVP

- Voice dump
- Widgets with Kaos
- Daily 'empty your head' ritual reminder

## Monetisation

| Model | Detail |
|---|---|
| Free | 5 pages, sorting and the Today list, with ads |
| Premium | £34.99/year (shown first) or £3.49/month: unlimited pages, tablet whiteboard, every learning card, no ads, every Arcade game in the app |
| Arcade games | £0.99 each, kept forever, or every game in the app with Premium |
| KC All Access | £25 once (every Arcade game in every KC app, kept forever) plus £7.99/month or £79.99/year (Premium in every KC app). Needs a free KC account. |
| Ads | Never on the dump page |

Prices are starting points; test before committing. **Portfolio premium promise:** free has ads; the moment you pay you get no ads, cloud backup and storage, and sync across your devices, plus this app's extras.

## Retention: The Progression Loop

| Stage | Design |
|---|---|
| Cue | Overwhelm, and an optional evening 'empty your head' reminder |
| Tiny win | Dump and sort |
| Progress | Thoughts cleared this week |
| Share | Low |
| Next step | Tomorrow's Today list |
| Cadence | Daily to several times a week |

Follow the portfolio guardrails: no guilt-trip notifications, no fake urgency, progress is
never wiped, at most one notification a day by default.

## Animation and tone: five signature animations

**Playful.** Celebrations, confetti, cute characters, satisfying sounds and mild comic reactions. Nothing tragic.

- Dumping: Kaos juggles 99 things at genius-inventor speed
- Sorted: Kaos's scrambled brain untangles into three neat piles
- Never: thoughts get booted into a bin with a satisfying thunk
- Today done: Kaos flops onto a beanbag
- Big dump (50+ thoughts): Kaos's head steams, then a tiny 'ding'

**Line we don't cross:** Never shame a long Later list or an unfinished Today.

## AI

**Optional later.** Maybe later: suggest Today/Later/Never. Plain sorting works without it. (Portfolio rule: plain code first, code does the maths,
cheapest model, shared budget cap, premium-gated.)

## Platform & data

- **Platform:** Expo app (iOS, Android, tablets, web).
- **Data:** On the device only.
- **Backend:** None for v1. Premium backup and sync use the shared portfolio backend (see the master repo's HOSTING.md).
- **Stack:** shared portfolio foundation (Expo, PostHog, RevenueCat, AdMob, shared Progression Loop module).

## Growth engine

- **Content pillars:** ADHD-friendly productivity; Overwhelm; Focus tricks; Sleep and racing thoughts
- **Shareable output:** Low

## Risks

Never claim to treat ADHD; tips are general and sourced (NHS, ADHD UK). Keep the flow fast: the whole point is no friction.

## Launch checklist

- [ ] Name checked on the App Store, Play Store and a trademark search
- [ ] MVP features done and tested
- [ ] Progression Loop wired (cue, tiny win, progress, milestone, next step)
- [ ] Privacy policy and terms
- [ ] Landing page
- [ ] Analytics wired (D1/D7/D30 retention)
- [ ] Payments / ads wired
- [ ] Added to the Growth & Maintenance Engine as an app config
