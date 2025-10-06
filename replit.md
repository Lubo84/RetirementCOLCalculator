# Hostplus Retirement Cost of Living Calculator

## Overview

This is a web-based retirement cost of living calculator built for Hostplus. The application helps users estimate their retirement expenses by guiding them through a multi-step form that collects information about their current financial situation, then compares their projected needs against Australian retirement benchmarks (ASFA standards and Age Pension amounts).

The calculator features a progressive disclosure design pattern with three main steps:
1. Basic demographic information (relationship status, home ownership, years to retirement)
2. Financial inputs (income, housing costs, savings)
3. Results visualization with interactive adjustments

Users can adjust their estimated retirement needs using percentage toggles (70-100% of current cost of living) and export their results as a PDF report.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack React Query for data fetching and state management

**UI Component Library:**
- Shadcn UI components (New York variant) built on Radix UI primitives
- Tailwind CSS for styling with custom Hostplus brand colors
- Recharts for data visualization (bar charts comparing benchmarks)

**Design System:**
- Custom Hostplus color palette (Navy Blue primary, Yellow accent)
- System font stack for reliability and performance
- Light-mode only interface for trust and professionalism
- Responsive design with mobile breakpoint at 768px

**State Management:**
- Local component state using React hooks for form data
- Multi-step wizard pattern with state lifted to parent Calculator component
- Form state managed separately for each step with validation

### Backend Architecture

**Server Framework:**
- Express.js as the HTTP server
- Development mode uses Vite middleware for HMR
- Production mode serves pre-built static assets

**API Structure:**
- Currently minimal backend - routes are defined but unused
- Storage interface exists (MemStorage) but calculator runs entirely client-side
- Session management setup exists (connect-pg-simple) but not actively used

**Rationale:** The calculator is computation-based rather than data-driven, so all calculations happen client-side for immediate feedback. Backend infrastructure is in place for future enhancements (saving calculations, user accounts, etc.)

### Data Storage Solutions

**Database:**
- Drizzle ORM configured with PostgreSQL dialect
- Neon Database serverless PostgreSQL provider configured
- User schema defined but not actively used in current implementation
- Migration system configured (drizzle-kit) for schema changes

**Current State:**
- No persistent storage for calculations
- All user data remains in browser memory
- PDF generation happens client-side using jsPDF

**Future Considerations:**
- Storage interface abstracted to allow easy migration from MemStorage to database-backed storage
- User schema ready for authentication implementation

### External Dependencies

**Charting & Visualization:**
- Recharts: Interactive bar charts for benchmark comparisons
- Displays user's estimated costs vs ASFA Comfortable, ASFA Modest, and Age Pension amounts

**PDF Generation:**
- jsPDF: Client-side PDF generation for downloadable reports
- Generates branded Hostplus PDF with user's retirement snapshot

**Form Handling:**
- React Hook Form with Zod resolvers for form validation
- Zod for schema validation using drizzle-zod integration

**UI Component Dependencies:**
- Radix UI primitives (accordion, dialog, radio-group, slider, etc.)
- Lucide React for consistent iconography
- class-variance-authority for variant-based styling
- Embla Carousel for potential future carousel features

**Development Tools:**
- Replit-specific plugins for runtime error overlay and dev banner
- TypeScript for type safety across entire codebase
- PostCSS with Autoprefixer for CSS processing

**Financial Calculation Logic:**
- All benchmark amounts (ASFA, Age Pension) are hardcoded constants based on current Australian standards
- Frequency conversion utilities (weekly/fortnightly/monthly/yearly)
- Cost of living calculation based on income minus housing costs minus savings