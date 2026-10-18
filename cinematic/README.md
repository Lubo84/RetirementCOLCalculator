# A good life. Today and tomorrow.

Independent Hostplus-inspired retirement spending target prototype. Updated 18 October 2026.

## Experience

The design incorporates Ian's retirement reflection: money is a tool for a meaningful life; time, health, people and opportunities matter too. The opening uses his line “Don't save your healthiest dreams for your oldest body”, balanced with providing for one's future self and allowing room to just be. There is no lifestyle score, prescribed priority or pressure to spend.

- Self-hosted Three.js ocean horizon with an animated water surface, reflected sunlight, pointer perspective and scroll-driven light.
- Explicit pause/play, reduced-motion preference handling, off-screen and background-tab suspension, WebGL context-loss fallback and capped pixel ratio/frame rate.
- Optional priorities, carried into the result without changing budget amounts.
- Optional named experience plan: before retirement is separate from the retirement spending target; during retirement is also excluded from the annual target and exported as a full, timed expense. No saving allowance, investment return, price growth or tax assumption is applied to those separate expenses. Double-counting warning shown.
- Original household, housing, category review, frequency, buffer, future purchase, scenario, inflation illustration, print and CSV features retained.
- Default session-only state; localStorage saving is optional. Notes and priorities use the same setting. No inputs leave the browser. Notes render as text; CSV formula prefixes are escaped.

## Running and rebuilding

Serve this folder as static files. There are no runtime CDN requests, remote fonts or tracking. The shipped `assets/horizon.js` is a bundle of scene code and Three.js 0.180.0. License is in `assets/THREE-LICENSE.txt`.

```
cd cinematic
npm install --ignore-scripts
npm run build
npm test
```

`source/horizon.js` is the readable scene source; `index.html` contains calculator source and styling. `previous.html` preserves the original concept for reference; Git history supports reverting changes.

## Calculations and sources

55 automated checks cover ongoing calculations, one-off exclusion, full-cost handoff, timing, repeat intervals, saved-plan migration and buffer rules. Live browser QA verifies interactions and rendering separately.

Category starters use rounded monthly figures observed in the original RCC on 17 October 2026; they are examples rather than exact ASFA detailed budget data. Annualised totals can differ slightly from exact benchmarks. Benchmarks: ASFA June quarter 2026, ages 65–84. Single modest 36,548; comfortable 56,166; modest renter 51,418. Couple modest 52,690; comfortable 78,998; modest renter 69,376. Homeowner assumes outright ownership. Renter benchmark is after Commonwealth Rent Assistance, unlike the full rent input; caveat is shown. Mortgage is not directly compared to these benchmarks.

Sources:
- https://hostplus.gbsau.com/hitting-the-target/
- https://hostplus.gbsau.com/supermodeller-v3/#/
- https://www.superannuation.asn.au/consumers/retirement-standard/

This is not an official Hostplus tool, financial advice or an affordability model. It does not determine tax, pension eligibility, drawdown sustainability, debt repayment timing or aged care costs. A member-facing release requires content, compliance, accessibility and source-data review.

Shader QA: compiled and rendered the scene through standalone Mesa/EGL at desktop and mobile dimensions. Distinct time samples produced measurable water movement. The review browser disables WebGL, so live browser QA used the matching rendered fallback; full browser GPU animation verification remains limited.

## One-off expense separation — 18 October 2026

Ongoing annual target now excludes all separately recorded major purchases and experiences. Full cash costs, timing before/at/after retirement, and an optional purchase repeat interval are recorded separately. Unknown timing stays null; the old savings period is never reused as an expense date. Existing version 1 saves migrate to version 2 with full costs retained and outdated annual comparisons cleared.

Results, print, CSV, copied handoff and JSON all distinguish ongoing annual income from one-offs. `projectionPlan()` defines a versioned, today-dollar handoff schema for future integration. The current official Hostplus calculator has no supported automatic import here; manual entry/scenario exploration is explicitly stated.
