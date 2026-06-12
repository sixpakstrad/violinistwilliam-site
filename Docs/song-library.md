# Song Library

## Route

- Page: `/music`
- Primary component/content sources: `app/music/page.tsx`, `components/SongLibrary.tsx`, `data/repertoire.ts`, `data/songs.ts`, `data/songRequests.ts`, `data/songRequestSettings.ts`, `data/pageContent.ts`
- SEO key: `song-library`

## Page Purpose

The Song Library helps clients browse repertoire for ceremonies, celebrations, cocktail hours, funerals, parties, and other live events. It is both a planning tool and a discovery tool, giving visitors a way to search by song, artist, genre, recommendation type, and musical moment.

## Current Page Intro

- Eyebrow: `Song Library`
- Title: `A song library curated for ceremony, celebration, and atmosphere.`
- Copy: `Browse repertoire by mood, artist, category, or wedding moment. This is where clients can begin shaping the soundtrack of the event.`

## Library Scope

The main repertoire source currently contains 704 songs.

Genre counts:

- Classical: 205
- Pop: 176
- Movie/Game: 78
- Oldies: 65
- Traditional: 48
- Jazz/Lounge: 24
- Rock/Metal: 24
- Musical/Opera: 20
- Dance/Techno: 14
- Holiday: 12
- Country: 8
- Klezmer: 8
- Latin: 7
- Fiddle: 5
- Blues: 4
- Religious: 3
- Asian: 2
- Reggae: 1

Current recommendation flags:

- Wedding recommended: 89 songs
- Funeral recommended: 0 songs
- Party recommended: 0 songs
- Favorite recommended: 0 songs
- Extra charge: 57 songs

## Song Data Model

Each repertoire song may include:

- Title
- Artist
- Source
- Primary genre
- Optional multiple genres
- Notes
- Sheet music reference
- Backing track reference
- URL
- Wedding recommended flag
- Funeral recommended flag
- Party recommended flag
- Favorite recommended flag
- Extra charge flag

The public library normalizes older `recommended` values into `weddingRecommended` so legacy admin data still displays correctly.

## Public Library Features

The Song Library component supports:

- Search by title, artist, source, genre, and recommendation labels.
- Genre filtering.
- Recommendation filtering by Wedding, Funeral, Party, or Favorite.
- Pagination.
- Songs-per-page controls with 25, 50, and 100 song options.
- Mobile expansion for individual song details.
- Optional song request behavior when requests are enabled.
- Optional student instrument fund/tip support through request settings.

## Lightweight Curated Song List

In addition to the full repertoire file, `data/songs.ts` contains a smaller curated set with categories, moods, and event moments. This appears suited for a more editorial or featured-song experience.

Current curated categories:

- Ceremony
- Cocktail Hour
- Romantic
- Cinematic
- Classical
- Pop
- Upbeat

Current curated examples:

- `Perfect` by Ed Sheeran
- `Wildest Dreams` by Taylor Swift
- `A Thousand Years` by Christina Perri
- `Can't Help Falling in Love` by Elvis Presley
- `Viva La Vida` by Coldplay
- `Clair de Lune` by Claude Debussy
- `Canon in D` by Johann Pachelbel
- `All of Me` by John Legend
- `La Vie en Rose` by Edith Piaf
- `Yellow` by Coldplay
- `Experience` by Ludovico Einaudi
- `Here Comes the Sun` by The Beatles
- `Signed, Sealed, Delivered` by Stevie Wonder
- `Meditation from Thais` by Jules Massenet

## Example Wedding-Recommended Repertoire

Examples from the full library include:

- `Sherlock - Waltz for John and Mary` by David Arnold
- `Arioso, from Cantata No. 156` by J.S. Bach
- `Aire on the G String` by J.S. Bach
- `Jesu, Joy of Man's Desiring` by J.S. Bach
- `Con te Partiro` by Andrea Bocelli
- `The Prayer` by Andrea Bocelli and Celine Dion
- `Minuet in A Major, from String Quintet in E` by Luigi Boccherini
- `Adoration` by Felix Borowski
- `Trumpet Tune` by Jeremiah Clark
- `Butterfly Waltz` by Brian Crain
- `Salut D'Amour (Love's Greeting)` by Edward Elgar
- `Ave Maria` by Charles Gounod

## SEO Notes

- Page title: `Violin Song Library | William Samorey`
- Meta description: browse William Samorey's violin song library for weddings, funerals, ceremonies, cocktail hours, and live event requests.
- Primary keyword: `violin song list for weddings`
- Secondary keywords: `wedding violin songs`, `funeral violin songs`, `ceremony music`
- Service area: Minnesota, Twin Cities, Midwest
- Internal linking notes: link to Performance, Contact, and live request information.

## Maintenance Notes

- Full public repertoire lives in `data/repertoire.ts`.
- The smaller curated list lives in `data/songs.ts`.
- Live request settings live in `data/songRequestSettings.ts` and `data/songRequests.ts`.
- Admin-edited songs can be read from local storage through `adminStorageKeys.songs`, so public behavior may differ from the default data when admin changes are present in a browser.
- If recommendation filters are shown publicly, consider filling out Funeral, Party, and Favorite flags so those filters do not appear empty.
