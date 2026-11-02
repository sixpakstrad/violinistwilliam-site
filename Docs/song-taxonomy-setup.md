# Admin Genres and Collections

## One-time activation

1. In Supabase, open the project's SQL Editor and create a new query.
2. Run the complete contents of `Docs/supabase-song-taxonomy.sql`.
3. Deploy this website update through the existing GitHub/Vercel workflow.
4. Open `/admin#songs`. Add Genre and Add Collection will become available.
5. Add `1960s` as a collection and a genre of your choice. They should appear in all song editors.
6. Select them on a song and click Save Songs. Reload the editor to verify the selections.
7. Open `/music/` in a new tab or refresh it. Check the genre and collection filters and song labels.

The SQL can be run again safely. It does not delete songs or change existing song assignments.
No live database changes are performed by installing or building this code.

## Storage

- `song_taxonomy`: available names, classified as `genre` or `collection`.
- `songs.genres`: each song's selected genre names, as before.
- `songs.custom_collections`: each song's selected new collection names.
- Existing Wedding, Funeral, Party, Favorite, decade, Oldies, and Request Fee flags remain in their original columns.

Add Genre and Add Collection save names immediately. Assigning a name to a song still uses Save Songs.
Adding a name does not assign any songs automatically. Names are shared across admins and visitors on their next page load.
There is no rename or delete control in this version, so song assignments cannot be orphaned by those operations.

## Access

The catalogue is read on the server and supplied to the public library. Writes require the same Clerk admin access used for song editing.
The SQL enables RLS on the catalogue and grants access only to the server service role. Service-role credentials never go to the browser.
Duplicate names are rejected within each type, ignoring capitalization and repeated spaces.

## Compatibility

Before the SQL is run, existing songs and built-in filters continue to work. The add controls show a setup message.
A save with custom collections fails with a clear setup error if the new song column is missing; it is not silently discarded.
Old clients that omit custom collections do not overwrite them.
The public API continues to omit private notes, sheet music locations, backing tracks, and reference links.

## Checks

Run `npm run test:song-taxonomy` and `npm run build` before deployment.
The automated tests mock Supabase and Clerk. They never write to the production database.
