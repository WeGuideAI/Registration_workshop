# WeGuide — AI & Robotics Awareness Workshop

Production-ready event registration and admin management platform.

## Tech Stack

- **Framework**: Next.js 16 (Turbopack, App Router, React 19, TypeScript)
- **Database & Auth**: Supabase (PostgreSQL + Stored Procedures + RLS)
- **Design & Theme**: Light Glassmorphic Theme (Tailwind CSS v4 + Lucide React)
- **Utilities**: Zod (validation) · PapaParse (CSV export)
- **Deployment**: Vercel ready

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Setup Database in Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In your Supabase dashboard, click **SQL Editor** (left sidebar).
3. Click **+ New query**, paste the entire contents of:
   ```
   supabase/migrations/001_initial_schema.sql
   ```
   and click **Run**.

This creates the `registrations` table with all participant fields (School, College, Parent/Professional), indexes, RLS policies, and triggers.

### 3. Configure environment variables

In `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
Both values are found in **Supabase → Settings (gear icon) → API** (or Data API).

### 4. Admin Access

The project includes a built-in secure admin login at `/admin/login`:
- **Default Email**: `admin@weguide.work`
- **Default Password**: `weguide@2026`
*(Can be customized via `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables).*

### 5. Run locally

```bash
npm run dev
```

Visit:
- **Landing page**: [http://localhost:3000](http://localhost:3000)
- **Admin dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)

### 6. Deploy to Vercel

1. Push to GitHub (`git push -u origin master` or `main`).
2. Import repo in [Vercel Dashboard](https://vercel.com/new).
3. In **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**. Vercel will automatically build and deploy the Next.js app!

---

## Project Structure

```
app/
  page.tsx              Public landing page (server component)
  layout.tsx            Root layout + SEO metadata
  admin/
    page.tsx            Admin dashboard (server + client)
    login/page.tsx      Admin login
  actions/
    register.ts         Server action: booking RPC
    admin.ts            Server actions: slot toggle, status update

components/
  public/               Public-facing components
    Hero.tsx
    WorkshopHighlights.tsx
    SlotSelector.tsx
    RegistrationForm.tsx
    RegistrationSection.tsx
    RegistrationSuccess.tsx
    Footer.tsx
  admin/                Admin dashboard components
    AdminDashboard.tsx
    AdminHeader.tsx
    StatsCards.tsx
    SlotManagement.tsx
    AttendeeTable.tsx
    Filters.tsx
    ExportButton.tsx
  ui/                   Shared UI primitives
    Button.tsx
    Input.tsx
    Select.tsx
    Badge.tsx
    ProgressBar.tsx
    LoadingSpinner.tsx
    EmptyState.tsx
    Skeleton.tsx

lib/
  config/workshop.ts    Centralised workshop + company config
  supabase/
    client.ts           Browser Supabase client
    server.ts           Server Supabase client
  types/
    database.ts         Raw Supabase DB types
    workshop.ts         Application domain types
  utils/
    cn.ts               Class name utility
    errors.ts           DB error → user-friendly message mapping
    analytics.ts        Abstract analytics hooks
    export.ts           CSV export via PapaParse
    format.ts           Date/time formatting

middleware.ts           Session refresh + route protection
supabase/
  migrations/
    001_initial_schema.sql
```

---

## Security Design

| Layer | Mechanism |
|---|---|
| Public seat counts | Secure RPC `get_public_slots()` — no attendee PII |
| Booking | Transactional RPC `register_user_for_slot()` with row-level lock |
| Duplicate prevention | DB unique index on `lower(email) + slot_id` |
| Race conditions | `SELECT ... FOR UPDATE` prevents double-booking |
| Admin access | `admin_users` allow-list table + Supabase Auth |
| RLS | All tables have Row Level Security enabled |
| Secrets | Only `NEXT_PUBLIC_*` anon key in browser; no service role key exposed |

---

## Adding Analytics

Edit `lib/utils/analytics.ts` and uncomment/implement the provider:

```typescript
// Google Analytics 4
window.gtag?.('event', event, properties)

// PostHog
window.posthog?.capture(event, properties)
```

---

## Customisation

All workshop-specific copy lives in `lib/config/workshop.ts`. Update:
- `contactEmail`, `contactPhone`, `website`
- `address`
- `disclaimer`

Session dates are seeded in `supabase/migrations/001_initial_schema.sql`.  
Edit before running the migration, or update via Supabase Table Editor.
