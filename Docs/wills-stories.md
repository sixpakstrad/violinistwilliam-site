# Will's Stories

## Route

- Page: `/stories`
- Primary component/content sources: `app/stories/page.tsx`, `components/StoriesJournal.tsx`, `components/StoriesAccordion.tsx`, `data/stories.ts`, `data/pageContent.ts`
- SEO key: `stories`

## Page Purpose

Will's Stories is a journal-style page for reflections on performance, teaching, repertoire, instruments, and the quiet details behind live music. The tone is more personal and literary than the service pages, giving visitors a sense of William's perspective and values.

## Current Page Intro

The route has a custom visual intro rather than the standard `PageIntro` component.

- Eyebrow: `Journal`
- Main title: `Will's Stories`
- Intro copy: `Reflections from performances, teaching, repertoire, instruments, and the quiet work behind the music.`
- Background image: `/media/theater-page-background.png`

Secondary intro in the journal section:

- `A refined personal journal for the moments that happen before, between, and after the notes.`
- `Stories from performances, teaching, repertoire, instruments, and the small details that give live music its meaning.`

## Story Behavior

The Stories page:

- Reads default entries from `data/stories.ts`.
- Checks browser local storage for admin-edited stories.
- Normalizes story body text from either arrays or paragraph-separated strings.
- Displays only stories where `published` is true.
- Shows a fallback message if no published stories are available.

## Story Data Model

Each story may include:

- ID
- Date
- Marker
- Title
- Category
- Teaser
- Optional image
- Image positioning and crop settings
- Published status
- Body paragraphs

## Current Published Stories

### The First Note

- Date: May 12, 2024
- Marker: Personal Journey
- Category: Beginnings
- Teaser: `Every musician remembers the moment sound first felt like a doorway.`
- Theme: the silence before music, the first note that made William want to listen closely, and the sense of discovery that still guides performing and teaching.

### A Wedding to Remember

- Date: Mar 3, 2024
- Marker: Performance Stories
- Category: Weddings
- Image: `/media/brahms-stained-glass.jpg`
- Teaser: `Some weddings stay with you long after the final note has faded.`
- Theme: memorable weddings as moments of timing, attention, emotion, and live music helping the room breathe with the story already unfolding.

### Teaching the Next Generation

- Date: Jan 18, 2024
- Marker: Teaching
- Category: Education
- Teaser: `Every student has a story, and every lesson is an opportunity to make progress feel possible.`
- Theme: strong lessons as clearer paths forward, connecting technique to sound, and helping students hear their own progress.

### The Instrument That Opens the Door

- Date: Nov 2, 2023
- Marker: Instrument Fund
- Category: Access
- Teaser: `A properly set-up violin or viola can change how a young musician hears their own potential.`
- Theme: the difference a properly set-up instrument can make and the purpose of the instrument loan program.

### When a Guest Requests the Right Song

- Date: Aug 9, 2023
- Marker: Repertoire
- Category: Live Requests
- Teaser: `A request can be lighthearted, nostalgic, emotional, or suddenly exactly what the room needed.`
- Theme: song requests as windows into memory and audience connection, and the reason for building request tools into the website.

## SEO Notes

- Page title: `Will's Stories | William Samorey`
- Meta description: reflections from performances, teaching, repertoire, instruments, and the quiet work behind the music.
- Primary keyword: `violinist stories`
- Secondary keywords: `music journal`, `teaching reflections`, `performance stories`
- Service area: Minnesota, Twin Cities
- Internal linking notes: link stories back to Performance, Education, Repairs, and About.

## Maintenance Notes

- Default stories live in `data/stories.ts`.
- The live component can use admin-edited local storage entries through `adminStorageKeys.stories`.
- New stories should include a clear category and teaser so the accordion/journal view remains scannable.
- Stories can support service pages by naturally linking to performance, teaching, repairs, song requests, or the instrument fund.
