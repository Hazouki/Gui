# HouseRules

A web app that helps roommates turn unspoken household expectations into clear, fair agreements: cleaning, noise, guests, food, shared costs and privacy.

Built for the course **GUI Design & Web Optimization**.

## The problem

People who share an apartment, especially newcomers, struggle to coordinate everyday routines because many expectations are never said out loud.

**Design goal:** roommates understand one another's expectations and feel confident that everyday shared living arrangements are clear, fair and mutually understood.

## Research insights and how the UI responds

| Insight | What the app does |
|---|---|
| New residents fear seeming difficult when asking questions | **Ask the household** posts anonymously by default ("A housemate asked"). An "I was wondering too" button shows you're not the only one asking. |
| "Clean" and "quiet" mean different things to different people | Every rule has an **"In practice, this looks like"** example. Proposing a new rule requires one. |
| People often learn rules only after someone gets annoyed | A **first-week checklist** on Home and its own page shows the rules up front. Some items tick themselves off as you use the app. |
| Residents want fair, flexible agreements, not strict rules | Rules are **proposed, discussed, voted on and changeable**. Each rule keeps a history of who agreed and what changed. |
| Respectful communication prevents escalation | Friendly, non-blaming copy throughout. A **"Friendly tip"** appears (without blocking) when wording like "you never" or "lazy" could come across harshly. |

## Features

1. **Join or create a household** with an invite code (demo code: `MAPLE-4821`)
2. **Home dashboard**: first-week progress, "Needs your input", rule categories
3. **House rules by category**, each with a status chip: Agreed / Being discussed / Not set yet
4. **Rule detail**: plain-language agreement, practical example, the reason, who agreed, **I agree** and **Suggest a change**
5. **Suggest or discuss a change**: vote options (with bars and voter avatars), comments, close the vote once there's a majority
6. **New-roommate first-week checklist** with a progress bar
7. **My preferences** (tidiness, noise, guests) and an **alignment summary** that shows where members differ
8. **Ask the household** with an anonymous option, answers and filters
9. **Chores rota** with swap requests (send, accept, decline, cancel)
10. **How it works** page, plus a **Reset demo data** button under Household

## Tech

- **React 18 + Vite 6 + TypeScript + Tailwind CSS v4**
- React Router for pages; `vercel.json` rewrites every path to `index.html` so deep links work on refresh
- No backend: state lives in `localStorage` (`houserules:v1`) and is seeded with 3 sample roommates (Maya, Jonas, Lina), 10 rules, 2 open votes, 3 questions, a chore rota and a pending swap request
- Icons from `lucide-react`

**Why not Next.js?** The app has no server, database or SEO needs. Every page is personal, interactive state stored in the browser. Next.js's server rendering and API routes would go unused and add complexity. Vite builds a small static bundle that Vercel serves from its CDN.

## Folder structure

```
houserules/
├─ index.html            HTML entry, fonts, meta tags
├─ vercel.json           SPA rewrites for Vercel
├─ vite.config.ts        Vite + React + Tailwind plugins
├─ public/favicon.svg
└─ src/
   ├─ main.tsx           Providers: router, toasts, confirm dialog, household store
   ├─ App.tsx            Routes (welcome screen until you join)
   ├─ index.css          Tailwind theme tokens and shared component classes
   ├─ types.ts           Data model
   ├─ data/seed.ts       Demo household, categories, preference scales
   ├─ store/HouseholdContext.tsx   State, actions, localStorage, undo
   ├─ lib/               Formatting helpers, friendly-tone hints
   ├─ components/        Layout (sidebar + bottom tabs), Toast, Confirm, Field, HelpTip,
   │                     StatusChip, Avatar, ProgressBar, PageHeader
   └─ pages/             Welcome, Home, Rules, CategoryRules, RuleDetail, SuggestChange,
                         Checklist, Preferences, Ask, Chores, Household, More, HowItWorks, NotFound
```

## Run it locally

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev        # opens on http://localhost:5173
npm run build      # type-checks and builds to dist/
npm run preview    # serves the production build locally
```

Join with any first name and the code **MAPLE-4821**.

## Push to GitHub

1. Create an empty repository on [github.com/new](https://github.com/new), named for example `houserules`. Don't add a README, .gitignore or licence; the project already has them.
2. In a terminal, inside the `houserules` folder:

   ```bash
   git init
   git add .
   git commit -m "HouseRules: initial build"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/houserules.git
   git push -u origin main
   ```

   `node_modules` and `dist` are excluded by `.gitignore`.

## Deploy on Vercel

1. Sign in at [vercel.com](https://vercel.com) with your GitHub account.
2. Click **Add New… → Project** and **Import** the `houserules` repository.
3. Vercel detects **Vite** automatically. Check these settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: leave as `./` if the repo contains only this project. If you pushed the parent folder, set it to `houserules`.
4. Click **Deploy**. After about a minute you get a URL like `houserules-xyz.vercel.app`.
5. **Turn off Deployment Protection so anyone can open the link without logging in:**
   Project → **Settings → Deployment Protection** → set **Vercel Authentication** to **Disabled** → **Save**.
   Then open the link in a private browser window to confirm it loads without a login screen.

Every later `git push` to `main` redeploys automatically.

## Nielsen's heuristics: where to find them

| # | Heuristic | Where in the UI |
|---|---|---|
| 1 | **Visibility of system status** | Toasts for "Vote recorded", "Preferences saved", "Swap request sent" and similar. A "Saved just now" indicator in the sidebar and mobile top bar (it warns if saving fails). A loading spinner with "Checking the code…" when joining. Progress bars on the checklist. Vote counts ("3 of 4 voted"). Badges on nav items that need you. |
| 2 | **Match between system and real world** | Everyday words: "Swap", "Not this time", "I was wondering too". Real examples such as times (22:00–07:00) and amounts (€15). Preference scales describe real behaviour rather than using numbers. |
| 3 | **User control and freedom** | **Undo** on every vote, agreement, comment, answer, chore and swap toast. Change your vote any time while it's open. Withdraw an agreement. Cancel a swap request. Cancel on every form, which asks first if you've already typed something. |
| 4 | **Consistency and standards** | One status-chip system (icon + word + colour) everywhere. Shared `.btn`, `.card` and `.input` styles. The same `Field` component for every input. The same navigation items in the sidebar and the bottom tab bar. |
| 5 | **Error prevention** | Confirmation dialogs before Reset demo data, Leave household, Delete question, Withdraw agreement, Close vote and discarding a draft. Close vote stays disabled until there's a majority, and ties can't be closed. Save stays disabled until something changes. A suggestion can't repeat the current wording. Duplicate vote options are blocked. |
| 6 | **Recognition rather than recall** | Each rule shows its example and reason on the same page. Preference options are labelled with descriptions. "Needs your input" collects pending items. The demo invite code can be filled in with one tap. The current wording is pre-filled when you suggest a change. |
| 7 | **Flexibility and efficiency of use** | Keyboard navigation everywhere, plus a "Skip to content" link. Shortcuts from Home straight to each pending item. Filters on questions (All / Unanswered / Mine). |
| 8 | **Aesthetic and minimalist design** | Calm palette, one primary action per card, short copy, and details shown only when needed (answer forms and swap forms open on demand). |
| 9 | **Help users recognise, diagnose and recover from errors** | Inline, specific error messages next to the field that explain how to fix it, e.g. "Invite codes look like MAPLE-4821: letters, a dash, then 4 numbers." Focus moves to the first invalid field. A clear 404 page with a way home. |
| 10 | **Help and documentation** | A "?" help button beside every input. A **How it works** page (also reachable before joining). Empty states that explain what to do next. |

## Accessibility (WCAG 2.1 AA)

- Semantic landmarks (`header`, `nav`, `main`, `aside`), one `h1` per page, and focus moved to the heading on navigation
- Every input has a `<label>`; errors are linked with `aria-describedby` and marked `aria-invalid`
- Visible 3px focus outline; native `<dialog>` for confirmations (traps focus, Esc closes)
- Status never shown by colour alone (chips have an icon and a word)
- Text colours chosen for at least 4.5:1 contrast; touch targets of at least 44px for main buttons
- Toasts announced with `aria-live`; progress bars expose values to screen readers
- Respects `prefers-reduced-motion`

## Limitations

This is a front-end prototype. Data lives in one browser, so roommates on different devices don't see each other's changes, and the sample roommates don't respond on their own. A real version would need accounts and a shared backend.
