# Admin Section Review Packet

This document summarizes the current admin section for the William Samorey / Winspiration Studio website so another ChatGPT session can review the structure, login flow, and likely causes of admin access issues.

Project path:

```text
/Users/guillaume/Documents/New project
```

## Purpose

The website is already deployed and uses a protected admin area for editing site content, song requests, song library details, pricing, education content, repairs content, stories, SEO, and global settings. Clerk is installed in this project and is the intended admin authentication system, but the local admin login flow has shown a Clerk runtime error after submitting the sign-in form.

This file is intended to help review:

- How `/admin` is protected.
- How Clerk sign-in is currently wired.
- Which environment variables are required.
- What admin tabs currently exist.
- Where admin content is stored.
- What areas may still be causing login, local preview, or editing issues.

## Important Admin Files

| Area | File |
|---|---|
| Admin dashboard page | `app/admin/page.tsx` |
| Clerk sign-in page | `app/admin/sign-in/[[...sign-in]]/page.tsx` |
| Clerk sign-up page | `app/admin/sign-up/[[...sign-up]]/page.tsx` |
| Admin auth helper | `lib/adminAuth.ts` |
| Route protection middleware | `middleware.ts` |
| Main admin UI | `components/AdminDashboard.tsx` |
| Admin logout button | `components/AdminSignOutButton.tsx` |
| Admin content defaults/storage keys | `data/adminContent.ts` |
| Song request storage/helpers | `data/songRequests.ts` |
| Request board UI | `components/SongRequestBoard.tsx` |
| Root app wrapper | `app/layout.tsx` |
| Environment variable example | `.env.local.example` |

There are also older general sign-in/sign-up routes:

```text
app/sign-in/[[...sign-in]]/page.tsx
app/sign-up/[[...sign-up]]/page.tsx
```

These may be legacy routes and should be checked if redirects are still pointing to them.

## Current Clerk Authentication Flow

### 1. ClerkProvider

`app/layout.tsx` wraps the entire app with `ClerkProvider`.

This means Clerk context should be available across the site, including admin pages and the sign-in component.

### 2. Protected Routes

`middleware.ts` protects:

```text
/admin
/admin/*
/requests
/requests/*
/api/admin/*
```

The admin auth pages are intentionally public:

```text
/admin/sign-in/*
/admin/sign-up/*
```

### 3. Unauthenticated Users

If a visitor is not signed in and tries to access a protected route, middleware redirects them to Clerk sign-in:

```ts
return authObject.redirectToSignIn({ returnBackUrl: req.url });
```

### 4. Approved Admin User IDs

Middleware first checks Clerk user IDs from:

```text
ADMIN_USER_IDS
ADMIN_CLERK_USER_ID
```

If the signed-in Clerk user ID is in the approved list, access is allowed immediately.

This is the strongest and most reliable approval method because email claims can sometimes be unavailable or shaped differently.

### 5. Approved Admin Emails

If the user ID is not approved, middleware falls back to email approval using:

```text
ADMIN_EMAILS
ADMIN_EMAIL
```

The middleware tries to read the email from Clerk session claims.

Potential issue: if the expected email is not present in `sessionClaims`, a valid user may be redirected to `/access-denied`. In that case, approving by Clerk user ID is the safest fix.

### 6. Server-Side Admin Page Check

`app/admin/page.tsx` also calls:

```ts
getAdminAccess()
```

That helper lives in `lib/adminAuth.ts` and checks the current Clerk user server-side. If the user is not approved, the page redirects to:

```text
/access-denied
```

This is good because admin content should not flash briefly before authorization finishes.

## Current Sign-In Pages

The admin sign-in page uses Clerk's prebuilt component:

```tsx
<SignIn
  routing="path"
  path="/admin/sign-in"
  signUpUrl="/admin/sign-up"
  forceRedirectUrl="/admin"
  fallbackRedirectUrl="/admin"
/>
```

The admin sign-up page uses:

```tsx
<SignUp
  routing="path"
  path="/admin/sign-up"
  signInUrl="/admin/sign-in"
  forceRedirectUrl="/admin"
  fallbackRedirectUrl="/admin"
/>
```

This is preferred over custom Clerk login code because Clerk's prebuilt components should handle verification flows such as second factor or client trust.

There is no custom Clerk sign-in flow currently in use. A search of the code did not find custom calls such as `useSignIn()`, `signIn.create()`, `attemptFirstFactor()`, or `setActive()` in the admin sign-in flow.

Current observed admin sign-in issue:

```text
ClerkJS: Response: needs_client_trust not supported yet.
```

This error appears after submitting the Clerk sign-in form. Because the app uses Clerk's official prebuilt sign-in component, this may require a Clerk dashboard setting adjustment for Client Trust/Bot Protection/device verification, allowed development domains, or an updated Clerk configuration rather than a custom form-code fix.

## Required Environment Variables

For local `.env.local` and Vercel Project Settings, the Clerk setup should include:

```text
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/admin/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/admin/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/admin
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/admin
ADMIN_EMAILS=winspirationstudio@gmail.com,william@violinistwilliam.com
ADMIN_USER_IDS=
```

Optional legacy/single-value variables also supported by the code:

```text
ADMIN_EMAIL=
ADMIN_CLERK_USER_ID=
```

Recommended: use `ADMIN_USER_IDS` once the real Clerk user ID is known.

## Clerk Dashboard Items To Check

In the Clerk dashboard, verify:

- The publishable key and secret key match this project.
- Local development URL is allowed.
- Production domain is allowed.
- Redirect URLs include:
  - `http://localhost:3000/admin`
  - `http://localhost:3000/admin/sign-in`
  - `https://violinistwilliam.com/admin`
  - `https://violinistwilliam.com/admin/sign-in`
- Email/password sign-in is enabled if that is the desired login method.
- MFA and Client Trust/Bot Protection settings are configured intentionally.
- If `needs_client_trust` appears during local testing, verify whether Client Trust/Bot Protection requires additional setup for localhost or should be temporarily relaxed for development.
- The approved admin account has a known Clerk user ID and that ID is added to `ADMIN_USER_IDS`.

## Known Login Risk Areas

These are the first things to review if admin login is still failing:

1. Clerk Client Trust/Bot Protection/device verification.
   - The current observed error is `needs_client_trust not supported yet`.
   - The sign-in page itself loads, so the issue is happening during or after authentication.
   - Review Clerk dashboard settings for Client Trust, Bot Protection, device verification, allowed origins, and localhost development behavior.

2. Missing or wrong `.env.local` values.
   - If the local project does not have valid Clerk keys, sign-in may load incorrectly or fail after submit.

3. Redirect URLs not allowed in Clerk dashboard.
   - Clerk can reject or loop login attempts if localhost or production URLs are not configured.

4. Approved email not found in session claims.
   - The middleware tries to read email from `sessionClaims`.
   - If Clerk does not expose the email in the expected shape, email-based approval can fail.
   - Use `ADMIN_USER_IDS` to avoid this problem.

5. Legacy `/sign-in` routes.
   - There are both `/admin/sign-in` and `/sign-in` pages.
   - If environment variables or Clerk dashboard redirects point to `/sign-in`, the site may use the older route instead of the intended admin route.

6. Local preview using stale build files.
   - Several earlier errors referenced missing `.next/server/*.js` chunks.
   - If this happens, stop the server, remove `.next`, and restart the dev server.

7. Stale local server process on port 3000.
   - A Node process may appear to be listening on port `3000` while not actually responding.
   - If localhost does not open, stop the server process and restart the local preview from the project folder.

## Current Admin Tabs

The main admin UI is in:

```text
components/AdminDashboard.tsx
```

The visible admin tabs currently appear to be:

1. Requests
2. Songs
3. Main Page
4. About
5. Education
6. Performance / Pricing
7. Upcoming Performances
8. Repairs
9. Will's Stories
10. SEO
11. Global Settings

There is still code support for a `donate` admin tab, but it may not currently be visible in the tab list.

## Admin Sections Summary

### Requests

Manages live song requests and event mode.

Features include:

- Turn requests on/off.
- Current event setup.
- Request status management.
- Playlist/played/archive workflow.
- Review status tools.
- Admin-only song preparation details from requested songs.

Request storage is currently browser-based, using local storage.

### Songs

Manages the song library.

Features include:

- 50 songs per admin page.
- Song title.
- Artist/composer.
- Reference/soundtrack.
- Genres.
- Wedding/Funeral/Party/Favorite/Fee tags.
- Request fee marking.
- Admin-only sheet music location.
- Admin-only backing track location.
- Admin-only reference URL.
- PDF export button for the song list.

Public visitors should not see admin-only fields.

### Main Page

Intended for editing homepage content and media.

Known editable areas include:

- Main page text/content.
- Reviews.
- Media/images.
- Image crop/framing controls.

### About

Manages About William content and related photos.

Includes:

- Biography-related content.
- Instrument loan program text on the About page.
- About page photos.

### Education

Manages the Education page.

Includes:

- Private lessons section.
- Teaching philosophy.
- How to start lessons.
- Pricing.
- Education images.

### Performance / Pricing

Manages performance content and pricing.

Includes:

- Wedding/event packages.
- Individual rates.
- Add-ons.
- Mileage.
- Ensembles.
- Upcoming performance page links may be separate.

### Upcoming Performances

Manages public performance listings.

Fields include:

- Event title.
- Date.
- Start/end time.
- Venue.
- City/state.
- Public/private toggle.
- Ticket/info URL.
- Description.
- Featured event toggle.
- Publish toggle.
- Reordering and deletion.

Public site should only show published public events.

### Repairs

Manages Bow Rehair, Repair, and Instrument Care content.

Includes:

- Repair page text sections.
- Repair page image slideshow.
- Photo add/edit/delete controls.

### Will's Stories

Manages story/journal entries.

Fields include:

- Title.
- Category/tag.
- Teaser.
- Body.
- Optional date.
- Optional image.
- Publish/unpublish.

Public page uses accordion-style stories.

### SEO

Page-by-page SEO control center.

Includes:

- Page title.
- Meta description.
- URL slug.
- Canonical URL.
- Index/noindex.
- Sitemap inclusion.
- Open Graph/social preview fields.
- Keyword planning fields.
- Google-style preview.
- Warnings for title/description length and missing keywords.

### Global Settings

Site-wide settings.

Includes:

- Business identity.
- Social and review links.
- Payment and tip links.
- Announcement/popup settings.
- Footer settings.
- Default SEO/sharing settings.

## Storage Model

The admin area currently uses browser local storage, not Supabase or another backend.

Storage keys are defined in:

```text
data/adminContent.ts
```

Current keys include:

```text
winspiration.songs
winspiration.rateGuides
winspiration.addOns
winspiration.siteDetails
winspiration.stories
winspiration.education
winspiration.repairs
winspiration.upcomingPerformances
winspiration.mainPage
winspiration.about
winspiration.donate
```

There are also request-related local storage keys in the song request data layer.

Important implication:

Admin edits are currently saved in the browser used to edit the site. They are not yet shared between devices or persisted in a real database. This is expected until Supabase or another backend is connected.

## Public/Private Separation

The intended separation is:

Public visitors can see:

- Public pages.
- Public song list.
- Request buttons for requestable songs.
- Published stories.
- Published upcoming performances.
- Public contact forms.

Public visitors should not see:

- Admin tabs.
- Admin edit controls.
- Sheet music location.
- Backing track location.
- Reference URLs.
- Request dashboard.
- Raw storage fields.
- Development errors.

## Route Notes

Public pages currently include routes such as:

```text
/
/about
/education
/performance
/music
/contact
/donate
/wills-stories
/bow-rehair-repair-instrument-care
```

Private/protected routes include:

```text
/admin
/requests
/api/admin/*
```

Auth routes include:

```text
/admin/sign-in
/admin/sign-up
```

## Review Questions For ChatGPT

When reviewing this admin section, focus on:

1. Is Clerk configured correctly for local and Vercel?
2. Are sign-in redirects pointing to `/admin/sign-in`, not old `/sign-in`?
3. Is admin approval best handled by Clerk user ID instead of email?
4. Is middleware blocking `/admin/sign-in` by mistake? It should not.
5. Is `getAdminAccess()` consistent with middleware?
6. Is any legacy password or local-only auth logic still interfering with Clerk?
7. Is local storage acceptable for preview, and what needs to move to Supabase before launch?
8. Are admin tabs visible and readable?
9. Are public pages protected from admin-only data?
10. Are image editing and crop settings actually saved and applied on public pages?
11. Is Clerk's `needs_client_trust` response being caused by dashboard configuration, allowed origins, or an unsupported local trust setting?

## Suggested First Debug Steps

1. Confirm the project is running from:

```text
/Users/guillaume/Documents/New project
```

2. Confirm dependencies are installed:

```text
npm install
```

3. Confirm `.env.local` has valid Clerk keys and admin allowlist.

4. Start the local preview:

```text
npm run dev -- -p 3000
```

5. Visit:

```text
http://localhost:3000/admin/sign-in
```

6. Sign in with the approved account.

7. If redirected to access denied, add the signed-in user's Clerk user ID to:

```text
ADMIN_USER_IDS
```

8. Restart the local server after changing `.env.local`.

9. If the app shows missing `.next` chunks, stop the server and remove the stale build folder:

```text
rm -rf .next
npm run dev -- -p 3000
```

10. If port `3000` appears stuck, restart the local preview server:

```text
lsof -ti tcp:3000 | xargs kill -9
npm run dev -- -p 3000
```

## Deployment Notes

The website is already deployed. Before relying on the deployed admin section for ongoing content management, admin content should ideally be moved from browser local storage to Supabase or another backend. Clerk protects who can open the admin, but local storage does not create shared, durable site-wide content.

For Vercel, required environment variables must be added in:

```text
Vercel Project Settings -> Environment Variables
```

At minimum:

```text
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
ADMIN_USER_IDS
ADMIN_EMAILS
```
