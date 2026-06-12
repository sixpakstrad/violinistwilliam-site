# Contact

## Route

- Page: `/contact`
- Primary component/content sources: `app/contact/page.tsx`, `components/Inquiry.tsx`, `data/pageContent.ts`
- SEO key: `contact`

## Page Purpose

The Contact page is the main conversion page for performance, teaching, and repair inquiries. It directs visitors into the right conversation and collects structured details before any follow-up.

## Current Page Intro

- Eyebrow: `Contact / Inquire`
- Title: `Choose the right conversation for the music, lesson, or instrument care you need.`
- Copy: `Use the inquiry forms below to share performance details, teaching goals, or bow and instrument care questions.`

## Inquiry Types

The page contains three accordion-style inquiry options.

### Performance Inquiry

Description:

`Weddings, proposals, memorials, private events, public performances, and ensemble music.`

Fields:

- Name
- Email
- Phone
- Event type
- Event date
- Event location / venue
- Start time
- Approximate guest count
- Interested package or service
- Music needs
- Song requests or style preferences
- Message / additional details

Event type options:

- Wedding
- Proposal
- Funeral / memorial
- Party
- Corporate event
- Restaurant / public performance
- Other

Music needs options:

- Ceremony
- Cocktail hour
- Dinner
- Reception
- Background music
- Funeral / memorial
- Restaurant / public performance
- Other

### Teaching Inquiry

Description:

`Private violin lessons, student goals, lesson format, scheduling, and studio questions.`

Fields:

- Name
- Email
- Phone
- Student name
- Student age
- Instrument
- Current playing level
- Preferred lesson format
- Lesson goals
- Preferred schedule or availability
- Message / additional details

Instrument options:

- Violin
- Viola
- Other

Lesson format options:

- In-person
- Online
- Unsure

### Bow Repair & Instrument Care Inquiry

Description:

`Bow rehairs, bow repair, instrument setup, maintenance, and playability questions.`

Fields:

- Name
- Email
- Phone
- Instrument or bow type
- Service needed
- Is it currently playable?
- Timeline / deadline
- Description of issue
- Message / additional details

Instrument or bow type options:

- Violin
- Viola
- Cello
- Bass
- Period instrument
- Other

Service needed options:

- Bow rehair
- Bow repair
- Instrument setup
- Instrument maintenance
- Unsure

Current note:

- Photos may be requested by email after the inquiry is received.

## Form Behavior

- Query parameters can open a specific form automatically:
  - `/contact?type=performance`
  - `/contact?type=teaching`
  - `/contact?type=repair`
- Each form includes a simple captcha question.
- On successful captcha entry, the page shows a message that the form is ready for future delivery setup.
- Email/backend sending is not connected yet.
- Form submission is currently handled client-side and prevented from actually posting.

Current captcha answers:

- Performance: `4 + 3 = 7`
- Teaching: `6 + 2 = 8`
- Repair: `5 + 4 = 9`

## SEO Notes

- Page title: `Contact William Samorey | Performance, Lessons, and Repair`
- Meta description: contact William for performance inquiries, teaching inquiries, bow repair, instrument setup, and instrument care.
- Primary keyword: `contact William Samorey`
- Secondary keywords: `book violinist`, `violin lessons inquiry`, `bow repair inquiry`
- Service area: Twin Cities, Minnesota
- Internal linking notes: primary conversion page linked from all services.

## Maintenance Notes

- The inquiry UI and field definitions live in `components/Inquiry.tsx`.
- Page intro and SEO fallback content live in `data/pageContent.ts`.
- Backend delivery still needs to be connected before public form submissions can send email or save records.
- Service pages should link to this page with the appropriate query parameter when a specific inquiry type is intended.
