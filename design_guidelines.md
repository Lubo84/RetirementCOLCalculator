# Design Guidelines: Hostplus Retirement Cost of Living Calculator

## Design Approach

**Hybrid Approach: Trust-Focused Utility Design**

This calculator combines the clarity and structure of Material Design's form patterns with Hostplus's established brand identity. The design prioritizes:
- **Progressive Disclosure**: Multi-step journey that never overwhelms
- **Educational Transparency**: Each step explains the "why" before the "what"
- **Data Confidence**: Professional charts and benchmarks that build credibility
- **Brand Consistency**: Strict adherence to Hostplus visual language

**Key Principle**: Financial planning tools must feel both approachable and authoritative. We achieve this through generous whitespace, clear hierarchy, and strategic use of Hostplus's vibrant yellow for moments of encouragement and progress.

## Color Palette

**Primary Colors:**
- Navy Blue: `215 100% 26%` - Primary brand color for headers, navigation, key CTAs
- Deep Blue: `215 95% 20%` - Supporting backgrounds, darker sections
- White: `0 0% 100%` - Primary background, card surfaces

**Accent & Interaction:**
- Hostplus Yellow: `48 100% 50%` - CTAs, progress indicators, success states, highlights
- Soft Yellow: `48 100% 96%` - Subtle backgrounds for info callouts, educational sections

**Semantic Colors:**
- Success Green: `142 71% 45%` - Positive outcomes, "on track" indicators
- Warning Amber: `38 92% 50%` - Caution states, review recommendations
- Info Blue: `210 100% 56%` - Informational tooltips, help text

**Chart Colors:**
- User Data: `48 100% 50%` (Hostplus Yellow)
- ASFA Comfortable: `215 100% 26%` (Navy)
- ASFA Modest: `215 50% 60%` (Light Blue)
- Age Pension: `142 71% 45%` (Green)

**Dark Mode**: Not required for this financial tool - maintain light, trustworthy aesthetic throughout.

## Typography

**Font Stack**: System fonts for reliability and performance
- Primary: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

**Type Scale:**
- Display (Hero Headlines): 3xl-4xl, font-bold, Navy Blue
- Page Headings: 2xl-3xl, font-semibold, Navy Blue
- Section Headings: xl-2xl, font-semibold, Navy Blue
- Body Large: lg, font-normal, Neutral 700
- Body Standard: base, font-normal, Neutral 700
- Body Small/Captions: sm, font-normal, Neutral 600
- Help Text: sm, font-normal, Neutral 500, italic

**Hierarchy Rules:**
- All headings use Navy Blue for authority
- Body text uses warm gray (not pure black) for readability
- Help text and explanations are slightly lighter but never below Neutral 500

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistency
- Component padding: `p-6` to `p-8`
- Section spacing: `py-12` (mobile), `py-16` to `py-20` (desktop)
- Card gaps: `gap-6` to `gap-8`
- Form element spacing: `space-y-6`

**Grid System:**
- Max container width: `max-w-4xl` for calculator steps (optimal reading/form width)
- Results page: `max-w-6xl` for chart visibility
- Content padding: `px-4` (mobile), `px-6` (tablet), `px-8` (desktop)

**Breakpoints:**
- Mobile-first approach
- sm: 640px, md: 768px, lg: 1024px, xl: 1280px

## Component Library

### Navigation & Progress
- **Progress Stepper**: Horizontal steps with numbers in yellow circles, connected by gray lines. Active step: filled yellow circle, completed: navy checkmark in yellow circle, upcoming: gray outline
- **Header**: Fixed top, white background, navy Hostplus logo left, progress indicator center (Steps 1-4), subtle shadow

### Forms & Inputs
- **Input Fields**: Large touch targets (min 44px height), rounded-lg borders, focus:ring-2 ring-yellow-400
- **Labels**: font-semibold, mb-2, navy blue text
- **Help Text**: Italic, neutral-500, text-sm, below inputs with info icon
- **Frequency Selector**: Segmented button group (Weekly/Fortnightly/Monthly/Yearly) with yellow active state
- **Toggle Buttons (70/80/90/100%)**: Pills with navy outline, yellow fill when active, arranged horizontally

### Cards & Containers
- **Info Cards**: white background, rounded-xl, shadow-sm, p-6 to p-8, border border-neutral-200
- **Explanation Boxes**: Soft yellow background (yellow-50), rounded-lg, p-6, with info icon
- **Result Cards**: Prominent borders, larger padding (p-8), shadow-md for emphasis

### Buttons & CTAs
- **Primary CTA**: bg-yellow-400, text-navy-900, font-semibold, px-8, py-3, rounded-lg, hover:bg-yellow-500, shadow-sm
- **Secondary**: border-2 border-navy-700, text-navy-700, bg-white, px-6, py-3, rounded-lg, hover:bg-navy-50
- **Tertiary/Back**: text-navy-600, underline decoration-2, hover:text-navy-800
- **Icon Buttons**: Navy icons with hover:text-yellow-500 transition

### Data Visualization
- **Bar Chart**: Horizontal bars, rounded ends, yellow for user data, navy/blue/green for benchmarks, clear labels left-aligned, values right-aligned
- **Chart Container**: White card, p-8, with title and legend above chart
- **Data Labels**: Bold for amounts, regular for descriptions

### Educational Elements
- **Tooltip Icons**: Small info circle icons (navy with yellow on hover), trigger popover with explanation
- **Callout Boxes**: Left border (4px yellow), light yellow background, p-4, with bold heading
- **Timeline Messaging**: Conditional based on retirement timeframe, icon + text in colored container (green for <5yrs, amber for >10yrs)

### PDF & Export
- **Generate PDF Button**: Prominent placement, navy background with white text, document icon, shadow-lg
- **Preview Card**: Shows mini snapshot of what PDF will contain before generation

## Calculator-Specific Guidelines

### Welcome Screen
- Large hero section (not full viewport): 60vh min, navy gradient background (navy to deep navy)
- White text with yellow accent underlines on key words
- Clear value proposition headline
- "How it works" accordion below hero with 3-4 steps explained
- Yellow CTA button "Get Started" centered

### Step Pages (1-2)
- Clean white backgrounds
- Question as page heading (2xl, navy, mb-8)
- Form elements in centered card (max-w-2xl)
- Single column on mobile, consider 2-column for couple inputs on desktop
- Sticky footer with "Back" (secondary) and "Continue" (primary yellow) buttons
- Progress dots at top

### Results Page
- Two-column layout on desktop (lg:grid-cols-2): Left = Weekly/Annual summary cards, Right = Percentage toggles
- Full-width bar chart section below
- ASFA explanations in 2-3 column grid (md:grid-cols-2, lg:grid-cols-3)
- Next Steps section: yellow background panel with navy text, large CTA to projection calculator
- Floating action buttons: "Generate PDF" (fixed bottom-right), "Start Over" (header)

### Responsive Behavior
- Stack all columns to single on mobile
- Bar chart: scrollable horizontally on small screens if needed
- Form inputs: full width on mobile, consider optimal width (max-w-sm) on desktop
- Buttons: full width on mobile, auto width centered on desktop

## Animation & Interaction

**Minimal, Purposeful Motion:**
- Page transitions: Simple fade + slight upward slide (200ms)
- Form validation: Shake animation on error, green checkmark on success
- Chart bars: Animate width on load (500ms ease-out)
- Toggle states: Scale slightly (scale-105) on active
- No parallax, no decorative animations

## Images

**Hero Section Image**: Not applicable - use navy gradient background instead to maintain focus on calculator purpose.

**Supporting Icons**: Use Heroicons (outline style) throughout via CDN for consistency - info circles, check marks, document, chart icons.

**Trust Indicators**: Optional Hostplus logo in header, ASFA logo near benchmark explanations if approved.