# Retirement target concept

Independent Hostplus-inspired prototype, created 17 October 2026. This is a spending target builder, not an official Hostplus calculator or financial advice.

## Run and verify

Open `index.html` directly in a modern browser. There are no dependencies, external fonts, trackers or remote assets. From the repository root, run `node cinematic/check.cjs` for source and calculation checks.

## Design and behaviour

- Cinematic SVG coastal scene, Hostplus navy / blue / yellow, system typography and reduced-motion support.
- Three stages: household and housing, editable category budget, target and next steps.
- Nine category examples use rounded monthly figures observed in the original RCC for singles and couples. They are labelled as examples. Annualised examples can differ from exact benchmark totals.
- Housing payments are separate. Home category examples include ownership costs; renters are prompted to review them.
- Zero amounts allowed. Invalid entries retain the last valid value and block step navigation.
- Big purchase allowance = amount divided by years. Other annual allowance plus optional buffer. Buffer excludes travel and future allowances.
- Frequency changes preserve underlying annual values; the displayed input is rounded to cents.
- ASFA June 2026 annual benchmarks: single modest 36,548, comfortable 56,166, modest renter 51,418; couple modest 52,690, comfortable 78,998, modest renter 69,376. Renters' benchmark is after Commonwealth Rent Assistance, unlike the full rent input; caveat shown. No direct mortgage benchmark.
- Comparison point, travel what-if, optional inflation illustration, CSV, print/PDF, clipboard handoff to the projection calculator.
- Session-only inputs by default. Optional localStorage. No network requests or user data transmission.

## Sources inspected

- https://hostplus.gbsau.com/hitting-the-target/ — full live inspection by a sub-agent, both household types and all categories.
- https://hostplus.gbsau.com/supermodeller-v3/#/ — direct visual and interaction review for brand alignment.
- https://www.superannuation.asn.au/consumers/retirement-standard/ — June quarter 2026 benchmark table.

## Scope and limits

This prototype does not calculate tax, Age Pension eligibility, affordability, investment returns, aged care costs or retirement drawdown sustainability. Production use requires Hostplus content, accessibility, privacy and compliance review and validation of licensed source budget data. Official projection calculator linking is manual; no unsupported prefill URL is claimed.

The prototype is added in its own `cinematic/` folder so prior repository content is retained.
