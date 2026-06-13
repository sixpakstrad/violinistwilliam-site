export type RepertoireSong = {
  id?: string | number;
  title: string;
  artist: string;
  category?: string;
  source: string;
  genre: string;
  genres?: string[];
  notes?: string;
  sheetMusic?: string;
  backingTrack?: string;
  url?: string;
  sheet_music_location?: string;
  backing_track_location?: string;
  reference_url?: string;
  weddingRecommended: boolean;
  funeralRecommended: boolean;
  partyRecommended?: boolean;
  wills_favorite?: boolean;
  favoriteRecommended?: boolean;
  extraCharge: boolean;
  is_public?: boolean;
  sort_order?: number | null;
};

export const repertoireGenres = [
  "Classical",
  "Movie/Game",
  "Musical/Opera",
  "Latin",
  "Traditional",
  "Religious",
  "Fiddle",
  "Country",
  "Jazz/Lounge",
  "R&B",
  "Blues",
  "Klezmer",
  "Pop",
  "Dance/Techno",
  "Reggae",
  "Rock/Metal",
  "Oldies",
  "Asian",
  "Holiday"
] as const;

export const repertoireSongs: RepertoireSong[] = [
  {
    "title": "The Syncopated Clock",
    "artist": "Anderson, Leroy",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Waltzing Cat",
    "artist": "Anderson, Leroy",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sherlock – Waltz for John and Mary",
    "artist": "Arnold, David",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Arioso, from Cantata No. 156",
    "artist": "Bach, J.S.",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Aire on the G String",
    "artist": "Bach, J.S.",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Concerto for 2 violins",
    "artist": "Bach, J.S.",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Jesu, Joy of Man’s Desiring",
    "artist": "Bach, J.S.",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "6 sonatas and Partitas",
    "artist": "Bach, J.S.",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Romanian Folk Dance No. 1 – Joc c Bata",
    "artist": "Bartok, Bela",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Romance op. 23",
    "artist": "Beach, Amy",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Fur Elise",
    "artist": "Beethoven, Ludwig van",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Minuet No. 2 in G Major",
    "artist": "Beethoven, Ludwig van",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Moonlight Sonata – Mvt 1. Adagio sostenuto",
    "artist": "Beethoven, Ludwig van",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Romance No. 2 in F Major, Op 30",
    "artist": "Beethoven, Ludwig van",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonata # 2 (complete)",
    "artist": "Beethoven, Ludwig van",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonata # 3 (complete)",
    "artist": "Beethoven, Ludwig van",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonata # 5 “Spring” (complete)",
    "artist": "Beethoven, Ludwig van",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonata # 7 (complete)",
    "artist": "Beethoven, Ludwig van",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Violin Sonata # 8 (complete)",
    "artist": "Beethoven, Ludwig van",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonata #9 (complete)",
    "artist": "Beethoven, Ludwig van",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Violin Sonata #10 (complete)",
    "artist": "Beethoven, Ludwig van",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "3 Nocturnes for Violin and Guitar",
    "artist": "Bergmuller, Friedrich",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Adagietto (from L’Arlesienne",
    "artist": "Bizet, Georges",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Carmen – Suite No. 1",
    "artist": "Bizet, Georges",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Baal Shem – No. 1 Vidui",
    "artist": "Bloch, Ernst",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Baal Shem – No. 2 Nigun",
    "artist": "Bloch, Ernst",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Violin Sonata No. 1",
    "artist": "Bloch, Ernst",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Con te Partiro",
    "artist": "Bocelli, Andrea",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Prayer (ft Celine Dion)",
    "artist": "Bocelli, Andrea",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Minuet in A Major, from String Quintet in E",
    "artist": "Boccherini, Luigi",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "La Zingana (Hungarian Mazurka)",
    "artist": "Bohm, Carl",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Adoration",
    "artist": "Borowski, Felix",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Valsette in G major",
    "artist": "Borowski, Felix",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Angel’s Serenade",
    "artist": "Braga, Gaetano",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Concerto (complete)",
    "artist": "Brahms, Johannes",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Violin Sonata # 1, (complete)",
    "artist": "Brahms, Johannes",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Violin Sonata # 2, (complete)",
    "artist": "Brahms, Johannes",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Violin Sonata # 3, (complete)",
    "artist": "Brahms, Johannes",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Waltz No. 6 in C# Major: Vivace",
    "artist": "Brahms, Johannes",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Miniatures, H.87-89",
    "artist": "Bridge, Frank",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "8) Hornpipe",
    "artist": "Bridge, Frank",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "9) Marche militaire",
    "artist": "Bridge, Frank",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Concerto No. 1 in g minor (complete)",
    "artist": "Bruch, Max",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Scottish Fantasy Concerto",
    "artist": "(Stick Dance)",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "3 nocturns for Violin and Guitar (#1 and #2)",
    "artist": "Burgmuller, Friedrich",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Butterfly Lovers Violin Concerto (complete)",
    "artist": "Chen Gang/He Zhanhao",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Etude in E Major Op 10, No. 3 “Tristesse”",
    "artist": "Chopin, Frederic",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Nocturne No. 2 in E flat major Op. 9 No. 2",
    "artist": "Chopin, Frederic",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Nocturne No. 20 in C# minor",
    "artist": "Chopin, Frederic",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Waltz No. 10 in b min Op. 69 No.",
    "artist": "Chopin, Frederic",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Waltz No. 6 in D flat Maj “Minute Waltz”",
    "artist": "Chopin, Frederic",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Trumpet Tune",
    "artist": "Clark, Jeremiah",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "At the River",
    "artist": "Copland, Aaron",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Boatmen’s Dance",
    "artist": "Copland, Aaron",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Chickaring Chaw",
    "artist": "Copland, Aaron",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Dodger",
    "artist": "Copland, Aaron",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Golden Willow Tree",
    "artist": "Copland, Aaron",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Little Horses",
    "artist": "Copland, Aaron",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Long Time Ago",
    "artist": "Copland, Aaron",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Simple Gifts",
    "artist": "Copland, Aaron",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Zion’s Wall",
    "artist": "Copland, Aaron",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Butterfly Waltz",
    "artist": "Crain, Brian",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Arabesque No. 1, L. 66",
    "artist": "Debussy, Claude",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Beau Soir (arr Heifetz)",
    "artist": "Debussy, Claude",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Clair de Lune",
    "artist": "Debussy, Claude",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonata (complete)",
    "artist": "Debussy, Claude",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Romance, Op. 39, No. 4",
    "artist": "Dvorak, Antonin",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Romantic Piece, Op 75 No 1, 3, and 4",
    "artist": "Dvorak, Antonin",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sonatina in G Major. Op 100 (complete)",
    "artist": "Dvorak, Antonin",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Mr. Blue Sky",
    "artist": "Electric Light Orchestra",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "La Capricieuse",
    "artist": "Elgar, Edward",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "In the South",
    "artist": "Elgar, Edward",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Morning Song",
    "artist": "Elgar, Edward",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Salut D’Amour(Love’s Greeting)",
    "artist": "Elgar, Edward",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "La vida breve – Danse espagnole No. 1",
    "artist": "Falla, Manuel de",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Popular Spanish Suite",
    "artist": "Falla, Manuel de",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "2) Nana",
    "artist": "Falla, Manuel de",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "3) Cancion",
    "artist": "Falla, Manuel de",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "5) Asturiana",
    "artist": "Falla, Manuel de",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "6) Jota",
    "artist": "Falla, Manuel de",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Elegy, Op. 24",
    "artist": "Faure, Gabriel",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Pavane, Op. 50",
    "artist": "Faure, Gabriel",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sicilienne, Op. 78",
    "artist": "Faure, Gabriel",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sonata No. 1 in A Major (complete)",
    "artist": "Faure, Gabriel",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Sonata No. 2 in e minor (complete)",
    "artist": "Faure, Gabriel",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Poem",
    "artist": "Fibich, Zdenko",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin sonata in A Major(complete)",
    "artist": "Franck, Cesar",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Summertime",
    "artist": "Gerschwin, George",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Ave Maria",
    "artist": "Gounod, Charles",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Anitra’s Dance (from Peer Gynt Suite)",
    "artist": "Grieg, Edvard",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonata No. 3 (complete)",
    "artist": "Grieg, Edvard",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Minuet in D Major",
    "artist": "Haydn, Franz Joseph",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Concerto in G Major (complete)",
    "artist": "Haydn, Franz Joseph",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Castle in the Sky: Man Theme",
    "artist": "Hisaishi, Joe",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Departures: Memory",
    "artist": "Hisaishi, Joe",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Howl’s Moving Castle theme: The Merry",
    "artist": "Hisaishi, Joe",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Round of life",
    "artist": "Hisaishi, Joe",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "My Neighbor Totoro: Path of the Wind",
    "artist": "Hisaishi, Joe",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Nausicaa of the Valley of the Wind: Towards the",
    "artist": "Hisaishi, Joe",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Faraway Land",
    "artist": "Hisaishi, Joe",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Porco Rosso: The Bygone Days",
    "artist": "Hisaishi, Joe",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Princess Mononoke:",
    "artist": "Hisaishi, Joe",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Ashitaka Sekki",
    "artist": "Hisaishi, Joe",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Ashitaka and San",
    "artist": "Hisaishi, Joe (cont)",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Wind Rises: Main Theme",
    "artist": "Hisaishi, Joe (cont)",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Marietta’s Song",
    "artist": "Korngold, Erich",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Much Ado About Nothing",
    "artist": "Korngold, Erich",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Violin Concerto",
    "artist": "Korngold, Erich",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Berceuse Romantique",
    "artist": "Kreisler, Fritz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Liebesfreud (Love’s Joy)",
    "artist": "Kreisler, Fritz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Liebesleid (Love’s Sorrow)",
    "artist": "Kreisler, Fritz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Praeludium and Allegro",
    "artist": "Kreisler, Fritz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Rondino on a theme by Beethoven",
    "artist": "Kreisler, Fritz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Schon Rosmarin",
    "artist": "Kreisler, Fritz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sicilienne and Rigaudon",
    "artist": "Kreisler, Fritz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Tambourin Chinois",
    "artist": "Kreisler, Fritz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Symphony Espagnole (complete)",
    "artist": "Lalo, Edward",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Andantino",
    "artist": "Lemare, Edwin Henry",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Meditation from Thais",
    "artist": "Massenet, Jules",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Moon River (with Johnny Mercer)",
    "artist": "Mancini, Henry",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Plaisir d’Amour (Pleasure of Love)",
    "artist": "Martini, Jean-Paul Egide",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Spring Song (from Songs without Words)",
    "artist": "Mendelssohn, Felix",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Concerto in e minor (complete)",
    "artist": "Mendelssohn, Felix",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Wedding March",
    "artist": "Mendelssohn, Felix",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Mazurka",
    "artist": "Mlynarski, Emil",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Czardas",
    "artist": "Monti, Vittorio",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Concertante for Violin and Viola (complete)",
    "artist": "Mozart, Wolfgang Amadeus",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Duofor Violin&Viola in G Major, K. 423, mvt 1",
    "artist": "Mozart, Wolfgang Amadeus",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "12 duos for Violin & violin, K. 487",
    "artist": "Mozart, Wolfgang Amadeus",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Lacrimosa from Requiem in d min",
    "artist": "Mozart, Wolfgang Amadeus",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin concerto No. 2 (complete)",
    "artist": "-Go-Violin Concerto No. 1 (complete)*",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Violin Concerto No.3(complete)",
    "artist": "-Go-Violin Concerto No. 1 (complete)*",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Violin Concerto No. 4 (complete)",
    "artist": "-Go-Violin Concerto No. 1 (complete)*",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Violin Concerto No. 5 (complete)",
    "artist": "-Go-Violin Concerto No. 1 (complete)*",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Violin Sonata in G KV 301, movement 1",
    "artist": "-Go-Violin Concerto No. 1 (complete)*",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonta No. 21 in e min, mvt 2",
    "artist": "-Go-Violin Concerto No. 1 (complete)*",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Canon",
    "artist": "Pachelbel, Johann",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Cantabile (Piano instead of guitar)",
    "artist": "Paganini, Nicolo",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Moses Fantasy",
    "artist": "Paganini, Nicolo",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Ave Maria (Tanti anni prima)",
    "artist": "Piazolla, Astor",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Bordel 1900",
    "artist": "Piazolla, Astor",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Café 1930",
    "artist": "Piazolla, Astor",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Chanson de la naissance",
    "artist": "Piazolla, Astor",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Chanson du Popo",
    "artist": "Piazolla, Astor (cont)",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Chiquilin de Bachnin",
    "artist": "Piazolla, Astor (cont)",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Libertango",
    "artist": "Piazolla, Astor (cont)",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Nightclub 1960",
    "artist": "Piazolla, Astor (cont)",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Oblivion",
    "artist": "Piazolla, Astor (cont)",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Primavera Portena",
    "artist": "Piazolla, Astor (cont)",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sensuel",
    "artist": "Piazolla, Astor (cont)",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Los suenos",
    "artist": "Piazolla, Astor (cont)",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Tango apasionado",
    "artist": "Piazolla, Astor (cont)",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Vuelvo al sur",
    "artist": "Piazolla, Astor (cont)",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Balada",
    "artist": "Porumbescu, Ciprian",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "The Pathways of Love",
    "artist": "Poulenc, Francis",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonata No. 2 (complete)",
    "artist": "Prokofiev, Sergei",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "O mio babbino caro",
    "artist": "Puccini, Giacomo",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Vocalise, Op. 34 No. 14",
    "artist": "Rachmaninov, Sergei",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Pavane for a Dead Princess",
    "artist": "Ravel, Maurice",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Introduction and Rondo Capriccioso",
    "artist": "Saint-Saens, Camille",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "The Swan, from Carnival of the Animals",
    "artist": "Saint-Saens, Camille",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Concerto No. 3 (complete)",
    "artist": "Saint-Saens, Camille",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Introduction and Tarantella",
    "artist": "Sarasate, Pablo de",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Zigeunerweisen",
    "artist": "Sarasate, Pablo de",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Ave Maria",
    "artist": "Schubert, Franz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Standchen",
    "artist": "Schubert, Franz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonata No. 1 in D Major (complete)",
    "artist": "Schubert, Franz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonata No. 2 in a minor (complete)",
    "artist": "Schubert, Franz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonata No. 3 in g minor (complete)",
    "artist": "Schubert, Franz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonata in A Major (complete)",
    "artist": "Schubert, Franz",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Abendlied (Evening Song)",
    "artist": "Schumann, Robert",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dreaming, from Scenes from Childhood",
    "artist": "Schumann, Robert",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Traumerei",
    "artist": "Schumann, Robert",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Sonata No. 1",
    "artist": "Schumann, Robert",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Violin Concerto",
    "artist": "Schumann, Robert",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Romance No. 2",
    "artist": "Schumann, Clara",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Polish Dance",
    "artist": "Severn, Edmund",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Five Pieces for 2 violins and piano",
    "artist": "Shostakovich, Dmitri",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Concerto",
    "artist": "Shostakovich, Dmitri",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Madrigale",
    "artist": "Simonetti, Achille",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Die Fledermaus Theme",
    "artist": "Strauss, Johann II",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Tritsch-Tratsch Polka",
    "artist": "Strauss, Johann II",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Solitude",
    "artist": "Strohl, Rita",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Romance, Op. 26",
    "artist": "Svendsen, Johan",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Concerto Mvt 1 & 2",
    "artist": "Tchaikovsky, P. I.",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Serenade Melancolique in B flat minor Op. 26",
    "artist": "Tchaikovsky, P. I.",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Serenade for Strings – Waltz",
    "artist": "Tchaikovsky, P. I.",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sleeping Beauty Waltz",
    "artist": "Tchaikovsky, P. I.",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Swan Lake (Swan theme)",
    "artist": "Tchaikovsky, P. I.",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Swan Lake (Waltz)",
    "artist": "Tchaikovsky, P. I.",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Nutcracker – Dance of the Reed Flutes",
    "artist": "Tchaikovsky, P. I.",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Twelve Fantasies for unaccompanied violin",
    "artist": "Telemann, Georg Philipp",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Andante religioso",
    "artist": "Thome, Francis",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Four Seasons (all movements available)",
    "artist": "Vivaldi, Antonio",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Violin Concerto No. 2 (complete)",
    "artist": "Wieniawski, Henryk",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Jurassic Park",
    "artist": "Williams, John",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "End Credits",
    "artist": "Williams, John",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Main Theme",
    "artist": "Williams, John",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Schindler’s List: Theme",
    "artist": "Williams, John",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Star Wars: Imperial March",
    "artist": "Williams, John",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Allegro brillante",
    "artist": "William Ten Have",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "River Flows in You",
    "artist": "Yiruma",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Reve d’enfant",
    "artist": "Ysaye, Eugene",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sonata No. 2 (complete)",
    "artist": "Ysaye, Eugene",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Oblivion",
    "artist": "Ysaye, Eugene",
    "source": "",
    "genre": "Classical",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "A Whole New World",
    "artist": "",
    "source": "Aladin",
    "genre": "Movie/Game",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Beauty and the Beast",
    "artist": "",
    "source": "Beauty and the Beast",
    "genre": "Movie/Game",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Beauty and the Best Medley (Lindsey Stirling)",
    "artist": "",
    "source": "Beauty and the Beast",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Never Meant to Belong",
    "artist": "",
    "source": "Bleach",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "For the Love of a Princess",
    "artist": "",
    "source": "Braveheart",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Moon River",
    "artist": "",
    "source": "Breakfast at Tiffanys",
    "genre": "Movie/Game",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Caresse sur l’ocean",
    "artist": "",
    "source": "Le Choristes",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Vois sur ton chemin",
    "artist": "",
    "source": "Le Choristes",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Arrival at Aslan’s Home",
    "artist": "",
    "source": "The Chronicles of Narnia: Prince Caspian",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The John Dunbar Theme",
    "artist": "",
    "source": "Dances With Wolves",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Chevaliers de Sangreals",
    "artist": "",
    "source": "The Davinci Code",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "We Don’t Talk About Bruno",
    "artist": "",
    "source": "Encanto",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Lumiere",
    "artist": "",
    "source": "Expedition 33",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Just Keep Watching (Tate Mc Rae)",
    "artist": "",
    "source": "F1",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Messy",
    "artist": "",
    "source": "F1",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Sorcerer’s Apprentice",
    "artist": "",
    "source": "Fantasia",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Love Me Like You Do",
    "artist": "",
    "source": "Fifty Shades of Grey",
    "genre": "Movie/Game",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Zanarkand",
    "artist": "",
    "source": "Final Fantasy X",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Main Theme",
    "artist": "",
    "source": "Forrest Gump",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sayonara no Natsu",
    "artist": "",
    "source": "From Up on Poppy Hill",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Let It Go",
    "artist": "",
    "source": "Frozen",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Bratja (Brothers)",
    "artist": "",
    "source": "Full Metal Alchemist",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Opening Title",
    "artist": "",
    "source": "Game of Thrones",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Now We Are Free",
    "artist": "",
    "source": "Gladiator",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Greatest Showman Medley (Lindsey Stirling)",
    "artist": "",
    "source": "The Greatest Showman",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "A Million Dreams",
    "artist": "",
    "source": "The Greatest Showman",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Never Enough",
    "artist": "",
    "source": "The Greatest Showman",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "This is Me",
    "artist": "",
    "source": "The Greatest Showman",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Hedwig’s Theme",
    "artist": "",
    "source": "Harry Potter",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "City on the mesa (Part 3)",
    "artist": "",
    "source": "Horizon Zero Dawn",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Skyfall",
    "artist": "",
    "source": "James Bond 007",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Die With a Smile",
    "artist": "",
    "source": "Joker: Folie A Deux",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Bare Necessities",
    "artist": "",
    "source": "The Jungle Book",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Welcome to Jurassic Park",
    "artist": "",
    "source": "Jurassic Park",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Golden",
    "artist": "",
    "source": "K-pop Demon Hunters",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Soda Pop",
    "artist": "",
    "source": "K-pop Demon Hunters",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "What It Sounds Like",
    "artist": "",
    "source": "K-pop Demon Hunters",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "City of Stars",
    "artist": "",
    "source": "La La Land",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Promontory",
    "artist": "",
    "source": "The Last of the Mohicans",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Ludlows",
    "artist": "",
    "source": "Legends of the Fall",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Great Fairy Fountain",
    "artist": "",
    "source": "Legend of Zelda",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Main Theme",
    "artist": "",
    "source": "Legend of Zelda",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Can You Feel the Love Tonight",
    "artist": "",
    "source": "The Lion King",
    "genre": "Movie/Game",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I Just Can’t Wait to be King",
    "artist": "",
    "source": "The Lion King",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Part of Your World",
    "artist": "",
    "source": "The Little Mermaid",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Concerning Hobbits",
    "artist": "",
    "source": "Lord of the Rings",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "In Dreams",
    "artist": "",
    "source": "Lord of the Rings",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Turn Me On",
    "artist": "",
    "source": "Love Actually",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I Feel Alive (Jack Black)",
    "artist": "",
    "source": "Minecraft Movie",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Gabriel’s Oboe",
    "artist": "",
    "source": "The Mission",
    "genre": "Movie/Game",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "How Far I’ll Go",
    "artist": "",
    "source": "Moana",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Beyond",
    "artist": "",
    "source": "Moana 2",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Your Song",
    "artist": "",
    "source": "Moulin Rouge",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Reflection",
    "artist": "",
    "source": "Mulan",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Your Name",
    "artist": "",
    "source": "Nandemonaiya",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "La Soledad",
    "artist": "",
    "source": "Pink Martini",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Theme",
    "artist": "",
    "source": "The Pink Panther",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Colors of the Wind",
    "artist": "",
    "source": "Pocahontas",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Theme",
    "artist": "",
    "source": "Pirates of the Caribbean",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "When You Believe",
    "artist": "",
    "source": "The Prince of Egypt",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "A Time for Us (Love theme)",
    "artist": "",
    "source": "Romeo and Juliette",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Song from a Secret Garden",
    "artist": "",
    "source": "The Secret Garden",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "You Raise Me Up",
    "artist": "",
    "source": "The Secret Garden",
    "genre": "Movie/Game",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Everything I Do, I Do It For You",
    "artist": "",
    "source": "Robin Hood – Prince of Thieves",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Hymn to the Fallen",
    "artist": "",
    "source": "Saving Private Ryan",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Waltz for John and Mary",
    "artist": "",
    "source": "Sherlock",
    "genre": "Movie/Game",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Someday My Prince Will Come",
    "artist": "",
    "source": "Snow White",
    "genre": "Movie/Game",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Waiting on a Wish",
    "artist": "",
    "source": "Snow White (2025)",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Shallow",
    "artist": "",
    "source": "A Star is Born",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Main Theme",
    "artist": "",
    "source": "Super Mario Brothers",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Swordland to be continued",
    "artist": "",
    "source": "Sword Art Online",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I See the Light",
    "artist": "",
    "source": "Tangled",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "You’ll Be In My Heart",
    "artist": "",
    "source": "Tarzan",
    "genre": "Movie/Game",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "My Heart Will Go On",
    "artist": "",
    "source": "Titanic",
    "genre": "Movie/Game",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Top Gun Anthem",
    "artist": "",
    "source": "Top Gun",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "You’ve Gota Friend in Me",
    "artist": "",
    "source": "Toy Story",
    "genre": "Movie/Game",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Married Life",
    "artist": "",
    "source": "Up",
    "genre": "Movie/Game",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Somewhere Over the Rainbow",
    "artist": "",
    "source": "The Wizard of Oz",
    "genre": "Movie/Game",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Chanson Boheme",
    "artist": "",
    "source": "Carmen",
    "genre": "Musical/Opera",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Intermezzo",
    "artist": "",
    "source": "Cavalleria Rusticana",
    "genre": "Musical/Opera",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Don’t Cry for Me Argentina",
    "artist": "",
    "source": "Evita",
    "genre": "Musical/Opera",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Flower Duet",
    "artist": "",
    "source": "Lakme",
    "genre": "Musical/Opera",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Una furtiva lagrima. Romance",
    "artist": "",
    "source": "L’elisir d’amore (The Elixir of Love)",
    "genre": "Musical/Opera",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "O mio babbino caro",
    "artist": "",
    "source": "Gianni Schicchi",
    "genre": "Musical/Opera",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Burn",
    "artist": "",
    "source": "Hamilton",
    "genre": "Musical/Opera",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dear Theodosia",
    "artist": "",
    "source": "Hamilton",
    "genre": "Musical/Opera",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dance of the Blessed Spirits",
    "artist": "",
    "source": "Orpheus and Eurydice",
    "genre": "Musical/Opera",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Can-Can",
    "artist": "",
    "source": "Orpheus in the Underworld",
    "genre": "Musical/Opera",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Main Theme",
    "artist": "",
    "source": "Phantom of the Opera",
    "genre": "Musical/Opera",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Summertime",
    "artist": "",
    "source": "Porgy and Bess",
    "genre": "Musical/Opera",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "My Heart at They Sweet Voice",
    "artist": "",
    "source": "Samson and Delilah",
    "genre": "Musical/Opera",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Singin’ in the Rain",
    "artist": "",
    "source": "Singing in the Rain",
    "genre": "Musical/Opera",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Divertissement",
    "artist": "",
    "source": "Sylvia",
    "genre": "Musical/Opera",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Barcarolle",
    "artist": "",
    "source": "Tales of Hoffmann",
    "genre": "Musical/Opera",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Meditation",
    "artist": "",
    "source": "Thais",
    "genre": "Musical/Opera",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Nessun Dorma",
    "artist": "",
    "source": "Turandot",
    "genre": "Musical/Opera",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Defying Gravity",
    "artist": "",
    "source": "Wicked",
    "genre": "Musical/Opera",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Popular",
    "artist": "",
    "source": "Wicked",
    "genre": "Musical/Opera",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Que mas puedo pedir",
    "artist": "Carin Leon",
    "source": "",
    "genre": "Latin",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "La Cumparsita",
    "artist": "Rodrigues",
    "source": "",
    "genre": "Latin",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Hijo de la Luna",
    "artist": "Mecano",
    "source": "",
    "genre": "Latin",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Tuyo",
    "artist": "Narcos",
    "source": "",
    "genre": "Latin",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Tango Habanera",
    "artist": "Nazareth",
    "source": "",
    "genre": "Latin",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Estrellita",
    "artist": "Ponce",
    "source": "",
    "genre": "Latin",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Balada",
    "artist": "Porumbescu",
    "source": "",
    "genre": "Latin",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Besame Mucho",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "El Choclo",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Guantanamera",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "La Bamba",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Tarantella Napoletana",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Gratitude",
    "artist": "Brandon Lake",
    "source": "",
    "genre": "Religious",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Great is Thy Faithfulness",
    "artist": "Carrie Underwood",
    "source": "",
    "genre": "Religious",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Goodness of God (original)",
    "artist": "Ce Ce Winans",
    "source": "",
    "genre": "Religious",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Mountain Spring",
    "artist": "Barrage",
    "source": "",
    "genre": "Fiddle",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Seven Wicked Reels",
    "artist": "Barrage",
    "source": "",
    "genre": "Fiddle",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Texas Swing",
    "artist": "Barrage",
    "source": "",
    "genre": "Fiddle",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Irish Rover",
    "artist": "The Dubliners",
    "source": "",
    "genre": "Fiddle",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Mason’s Apron",
    "artist": "The Dubliners",
    "source": "",
    "genre": "Fiddle",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Amazing Grace",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Ashokan Farewell",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Will the Circle Be Unbroken",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Oh Danny Boy",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Rocky Road to Dublin",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Scarborough Fair",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Earl’s Chair",
    "artist": "Celtic",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Flowers of Edinburgh",
    "artist": "Celtic",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Gold Ring",
    "artist": "Celtic",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Harvest Home",
    "artist": "Celtic",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Haste to the Wedding",
    "artist": "Celtic",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Julia Delaney",
    "artist": "Celtic",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Lord Mayo",
    "artist": "Celtic",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Rights of Man",
    "artist": "Celtic",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Great is Thy Faithfulness",
    "artist": "Carrie Underwood",
    "source": "",
    "genre": "Country",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Old Rugged Cross",
    "artist": "Carrie Underwood",
    "source": "",
    "genre": "Country",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Shallow (from A Star is Born)",
    "artist": "Bradley Cooper & Lady Gaga",
    "source": "",
    "genre": "Country",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Devil went down to Georgia",
    "artist": "Charlie Daniels Band",
    "source": "",
    "genre": "Country",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Tennessee Whiskey",
    "artist": "Chris Stapleton",
    "source": "",
    "genre": "Country",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Tennessee Waltz",
    "artist": "Connie Francis",
    "source": "",
    "genre": "Country",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Speechless",
    "artist": "Dan + Shay",
    "source": "",
    "genre": "Country",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sweet Home Alabama",
    "artist": "Lynyrd Skynyrd",
    "source": "",
    "genre": "Country",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Ain’t Misbehavin’",
    "artist": "Antoine Silverman",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Makin’ Whoopee!",
    "artist": "Antoine Silverman",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "The Girl from Ipanema",
    "artist": "Antonio Carlos Jobim",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I Say a Little Prayer",
    "artist": "Aretha Franklin",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Petite Fleur",
    "artist": "Bechet",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Take Five",
    "artist": "Dave Brubeck",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Cry Me a River",
    "artist": "Ella Fitzgerald",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Georgia On My Mind",
    "artist": "Ella Fitzgerald",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "At Last",
    "artist": "Etta James",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Fly Me to the Moon",
    "artist": "Frank Sinatra",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "My Funny Valentine",
    "artist": "Frank Sinatra",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "My Way",
    "artist": "Frank Sinatra",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "In the Mood",
    "artist": "Glenn Miller",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Honeysuckle Rose",
    "artist": "Jeremy Cohen",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Blue Bossa",
    "artist": "Joe Henderson",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Speak Low",
    "artist": "Joe Venuti & Dave Mc Kenna",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Tangerine",
    "artist": "Johnny Frigo w/ Bucky & John Pizzarelli",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Oi’ Man River",
    "artist": "Lenny Solomon",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "What a Wonderful World",
    "artist": "Louis Armstrong",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Something Stupid",
    "artist": "Michael Buble",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Hit the Road Jack",
    "artist": "Ray Charles",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Rose Leaf Rag",
    "artist": "Scott Joplin",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Limehouse Blues",
    "artist": "Stephane Grappelli",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Pick Yourself Up",
    "artist": "Stephane Grappelli",
    "source": "",
    "genre": "Jazz/Lounge",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Fallin’",
    "artist": "Alicia Keys",
    "source": "",
    "genre": "Blues",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sweet Home Chicago",
    "artist": "The Blues Brothers",
    "source": "",
    "genre": "Blues",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Autumn Leaves",
    "artist": "Eric Clapton",
    "source": "",
    "genre": "Blues",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Wonderful Tonight",
    "artist": "Eric Clapton",
    "source": "",
    "genre": "Blues",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Ki Mitziyon",
    "artist": "Burstyn",
    "source": "",
    "genre": "Klezmer",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Rozhinkesmit Mandlen (Raisins and Alonds)",
    "artist": "Goldfaden",
    "source": "",
    "genre": "Klezmer",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Vehaeir Eineinu",
    "artist": "Goldfaden",
    "source": "",
    "genre": "Klezmer",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Zemer Atik",
    "artist": "Ne’eman",
    "source": "",
    "genre": "Klezmer",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sher",
    "artist": "Schwartz",
    "source": "",
    "genre": "Klezmer",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Niturim",
    "artist": "Sher",
    "source": "",
    "genre": "Klezmer",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Sound of Safed",
    "artist": "Sher",
    "source": "",
    "genre": "Klezmer",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Blessing Nigun",
    "artist": "Sperling",
    "source": "",
    "genre": "Klezmer",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Don’t Leave Me",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Donna",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Hallelujah (klezmer style)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Let’s Sing",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Shiroh Hora",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Tzur Chassidi",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dancing Queen",
    "artist": "Abba",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Gimme! Gimme! Gimme!",
    "artist": "Abba",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Mamma Mia! -Chiquitita",
    "artist": "Abba",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Winner Takes It All",
    "artist": "Abba",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Hello",
    "artist": "Adele",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Oh My God",
    "artist": "Adele",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Rolling in the Deep",
    "artist": "Adele",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Skyfall",
    "artist": "Adele",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Someone Like You",
    "artist": "Adele",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Fallin’",
    "artist": "Alicia Keys",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Best Day of My Life",
    "artist": "American Authors",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Back to Black",
    "artist": "Amy Winehouse",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Rehab",
    "artist": "Amy Winehouse",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "House of the Rising Sun",
    "artist": "The Animals",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Do I Wanna Know",
    "artist": "Arctic Monkeys",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Manhattan-Kabou (ft Renaud)",
    "artist": "Axel Red",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Bad Guy",
    "artist": "Billie Eilish",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Lovely (ft Khalid)",
    "artist": "Billie Eilish",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "What Was I Made For?",
    "artist": "Billie Eilish",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "It’s My Life",
    "artist": "Bon Jovi",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Livin on a Prayer",
    "artist": "Bon Jovi",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Everything I Do, I Do It For You",
    "artist": "Brian Adams",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Die With a Smile (ft Lady Gaga)",
    "artist": "Bruno Mars",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Grenade (arr. Lindsey Stirling)",
    "artist": "Bruno Mars",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Marry You",
    "artist": "Bruno Mars",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Uptown Funk",
    "artist": "Bruno Mars",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "You Are The Reason(with guitar)",
    "artist": "Callum Scott",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Havana",
    "artist": "Camila Cabello",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Senorita",
    "artist": "Camila Cabello",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Call Me Maybe",
    "artist": "Carly Rae Jepsen",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Take Me Home (arr. Lindsey Stirling)",
    "artist": "Cash Cash ft Bebe Rexha",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Father and Son",
    "artist": "Cat Stevens",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Lady D’Arbanville",
    "artist": "Cat Stevens",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sad Lisa",
    "artist": "Cat Stevens",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "My Heart Will Go On",
    "artist": "Celine Dion",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Prayer (ft. Adrea Bocelli)",
    "artist": "Celine Dion",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Messy",
    "artist": "Chae Young Park",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "See You Again (ft. Wiz Khalifa",
    "artist": "Charlie Puth",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Beautiful",
    "artist": "Christina Aguilera",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Say Something (ft A Great Big World)",
    "artist": "Christina Aguilera",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Jar of Hearts",
    "artist": "Christina Perri",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "A Thousand Years(with piano)",
    "artist": "Christina Perri",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I Never Told You It’s Complicated (original mashup)",
    "artist": "Colbie Caillat vs Avril Lavigne",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Clocks",
    "artist": "Coldplay",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Fix You (arr. Lindsey Stirling)",
    "artist": "Coldplay",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "In My Place",
    "artist": "Coldplay",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "A Sky Full of Stars",
    "artist": "Coldplay",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Viva la Vida",
    "artist": "Coldplay",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Heather",
    "artist": "Conan Gray",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Cold Heart (ft. Elton John)",
    "artist": "Dua Lipa",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The A Team",
    "artist": "Ed Sheeran",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Castle On The Hill",
    "artist": "Ed Sheeran",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Galway Girl",
    "artist": "Ed Sheeran",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Give Me Love",
    "artist": "Ed Sheeran",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Joker and the Queen (ft. Taylor Swift)",
    "artist": "Ed Sheeran",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Lego House",
    "artist": "Ed Sheeran",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Perfect(with guitar)",
    "artist": "Ed Sheeran",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Photograph(with guitar)",
    "artist": "Ed Sheeran",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sapphire",
    "artist": "Ed Sheeran",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Shape of You",
    "artist": "Ed Sheeran",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Thinking Out Loud",
    "artist": "Ed Sheeran",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Love Me Like You Do",
    "artist": "Ellie Goulding",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Can You Feel the Love Tonight",
    "artist": "Elton John",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Cold Heart (ft. Dua Lipa)",
    "artist": "Elton John",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sorry Seems to Be the Hardest Word",
    "artist": "Elton John",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Your Song",
    "artist": "Elton John",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Mockingbird",
    "artist": "Eminem",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "May It Be",
    "artist": "Enya",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Only Time",
    "artist": "Enya",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "My Immortal (arr. Lindsey Stirling)",
    "artist": "Evanescence",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Good Feeling (arr. Lindsey Stirling)",
    "artist": "Flo Rida",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Lemon Tree",
    "artist": "Fool’s Garden",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Careless Whisper",
    "artist": "George Michael",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Gasoline (original track)",
    "artist": "Halsey",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Without Me(Either with original track or guitar)",
    "artist": "Halsey",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "As It Was",
    "artist": "Harry Styles",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sign of the Times",
    "artist": "Harry Styles",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Take Me to Church",
    "artist": "Hozier",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Believer",
    "artist": "Imagine Dragons",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Derniere danse",
    "artist": "Indila",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Love Story",
    "artist": "Indila",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I Feel Alive",
    "artist": "Jack Black",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "You’re Beautiful",
    "artist": "James Blunt",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "It’s Your World (original track)",
    "artist": "Jennifer Hudson",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "All of Me",
    "artist": "John Legend",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "You Raise Me Up",
    "artist": "Josh Groban",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Despacito",
    "artist": "Justin Bieber",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Golden Hour",
    "artist": "JVKE",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Firework",
    "artist": "Katy Perry",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Roar",
    "artist": "Katy Perry",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "This Is Me (from The Greatest Showman)",
    "artist": "Keala Settle",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "original track, or with just piano)",
    "artist": "Keala Settle",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Somewhere Only We Know",
    "artist": "Keane",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "All The Things That I’ve Done",
    "artist": "The Killers",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Always Remember Us This Way",
    "artist": "Lady Gaga",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Die with a Smile (ft. Bruno Mars)",
    "artist": "Lady Gaga",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Shallow (from A Star is Born)(with Guitar)",
    "artist": "Lady Gaga",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "You Say",
    "artist": "Lauren Daigle",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "It Ain’t Over ‘til It’s Over",
    "artist": "Lenny Kravitz",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Bird on the Wire",
    "artist": "Leonard Cohen",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Hallelujah (arr. Lindsey Stirling)",
    "artist": "Leonard Cohen",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Before You Go",
    "artist": "Lewis Capaldi",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Beauty and the Beast Medley",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Boulevard of Broken Dreams",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Don’t You Worry Child",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Fix You",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Good Feeling",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Greatest Showman Medley",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Grenade",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Hallelujah",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "It Ain’t Me",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "My Immortal",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Senbonkzaura",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Stampede",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Star Wars Medley",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "Take Me Home",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Ton invitation",
    "artist": "Louise Attaque",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Ophelia",
    "artist": "The Lumineers",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Don’t Cry for Me Argentina",
    "artist": "Madonna",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "California Dreaming",
    "artist": "Mamas & the Papas",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dream a Little Dream of Me",
    "artist": "Mamas & the Papas",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "When You Believe",
    "artist": "Mariah Carey",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Girls Like You",
    "artist": "Maroon 5",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Memories",
    "artist": "Maroon 5",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "This Love",
    "artist": "Maroon 5",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Thriller",
    "artist": "Michael Jackson",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Flowers",
    "artist": "Miley Cyrus",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I Am…I Said",
    "artist": "Neil Diamond",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Don’t Know Why",
    "artist": "+Come Away With Me+",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Help Me Make It Through the Night",
    "artist": "+Come Away With Me+",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Turn Me On",
    "artist": "+Come Away With Me+",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Drivers License",
    "artist": "Olivia Rodrigo",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Apologize",
    "artist": "One Republic",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Counting Stars",
    "artist": "One Republic",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Happy (with guitar)",
    "artist": "Pharrell Williams",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Creep",
    "artist": "Radiohead",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Angels",
    "artist": "Robbie Williams",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Narcos – Tuyo",
    "artist": "Rodrigo Amarante",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Espresso",
    "artist": "Sabrina Carpenter",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I’m Not the Only One",
    "artist": "Sam Smith",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Stay With Me",
    "artist": "Sam Smith",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Oye Como Va",
    "artist": "Santana",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Brave",
    "artist": "Sara Bareilles",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Angel",
    "artist": "Sarah Mc Lachlan",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Kiss From a Rose (with guitar)",
    "artist": "Seal",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Unstoppable",
    "artist": "Sia",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Chasing Cars",
    "artist": "Snow Patrol",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Until I Found You",
    "artist": "Stephen Sanchez",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Englishman in New York",
    "artist": "Sting",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Shape Of My Heart",
    "artist": "Sting",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Don’t You Worry Child (arr. Lindsey Stirling",
    "artist": "Swedish House Mafia",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Just Keep Watching",
    "artist": "Tate Mc Rae",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Blank Space",
    "artist": "Taylor Swift",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Cornelia Street",
    "artist": "Taylor Swift",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Exile",
    "artist": "Taylor Swift",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I Knew You Were Trouble",
    "artist": "Taylor Swift",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Love Story",
    "artist": "Taylor Swift",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Mean",
    "artist": "Taylor Swift",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Our Song",
    "artist": "Taylor Swift",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Shake It Off",
    "artist": "Taylor Swift",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "We Are Never Ever Getting Back Together",
    "artist": "Taylor Swift",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "White Horse",
    "artist": "Taylor Swift",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Wildest Dreams",
    "artist": "Taylor Swift",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "You Belong With Me",
    "artist": "Taylor Swift",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Lose Control",
    "artist": "Teddy Swims",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Mad World",
    "artist": "Thompson",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Another Love",
    "artist": "Tom Odell",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dance Monkey",
    "artist": "Tones and I",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dancing in the Moonlight",
    "artist": "Toploader",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "A Thousand Miles",
    "artist": "Vanessa Williams",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Une nuit sur son epaule",
    "artist": "Veronique Sanson",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Earned It (original track)",
    "artist": "The Weeknd",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "All At Once",
    "artist": "Whitney Houston",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I Will Always Love You",
    "artist": "Whitney Houston",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Aint My Fault",
    "artist": "Zara Larssen",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dusk Til Dawn(original track)",
    "artist": "Zayn ft Sia",
    "source": "",
    "genre": "Pop",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Faded (either Techno, or with Guitar)",
    "artist": "Alan Walker",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sing To Me (Techno)",
    "artist": "Alan Walker",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sing Me To Sleep",
    "artist": "Alan Walker",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Mr. Saxobeat",
    "artist": "Alexandra Stan",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Wake Me Up",
    "artist": "Avicci",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I’m Good (Blue)",
    "artist": ")Bebe Rexha, David Guetta",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Uptown Funk",
    "artist": "Bruno Mars",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Get Lucky (ft. Pharrell Williams)",
    "artist": "Daft Punk",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Titanium (ft. Sia)",
    "artist": "David Guetta",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sweet Dreams",
    "artist": "Eurythmics",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I Will Survive",
    "artist": "Gloria Gaynor",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "No Man No Cry",
    "artist": "Jimmy Sax",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Pokemon Theme (original sound alike)",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "If You Don’t (with original violin melody)",
    "artist": "Odesza",
    "source": "",
    "genre": "Dance/Techno",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "No Woman, No Cry",
    "artist": "Bob Marley",
    "source": "",
    "genre": "Reggae",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The House of the Rising Sun",
    "artist": "The Animals",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Do I wanna Know?",
    "artist": "The Arctic Monkeys",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Zombie",
    "artist": "The Cranberries",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Fortunate Son",
    "artist": "Creedence Clearwater Revival",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Hotel California",
    "artist": "The Eagles",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Bring Me to Life",
    "artist": "Evanescence",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sweet Child O’ Mine",
    "artist": "Guns N’ Roses",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Don’t Stop Believin’",
    "artist": "Journey",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Nothing Else Matters",
    "artist": "Metallica",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Something In The Way",
    "artist": "Nirvana",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dreamer",
    "artist": "Ozzy Osbourn",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Hey, Soul Sister",
    "artist": "Train",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Another One Bites the Dust",
    "artist": "Queen",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Crazy Little Thing Called Love",
    "artist": "Queen",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Don’t Stop Me Now",
    "artist": "Queen",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Killer Queen",
    "artist": "Queen",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Somebody to Love",
    "artist": "Queen",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "We Are The Champions",
    "artist": "Queen",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Who Wants to Live Forever",
    "artist": "Queen",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Creep",
    "artist": "Radiohead",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Your Name",
    "artist": "Radwimps",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Californication",
    "artist": "Red Hot Chili Peppers",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Eye of the Tiger",
    "artist": "Survivor",
    "source": "",
    "genre": "Rock/Metal",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Chiquitita",
    "artist": "ABBA",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dancing Queen",
    "artist": "ABBA",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Gimme! Gimme! Gimme! (a man after midnight)",
    "artist": "ABBA",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I Do, I Do, I Do, I Do, IDo",
    "artist": "ABBA",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Mamma Mia! – The Winner Takes It All",
    "artist": "ABBA",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dream On",
    "artist": "Aerosmith",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Pennsylvania 6-5000",
    "artist": "The Andrews Sisters",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "House of the Rising Sun",
    "artist": "The Animals",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Eleanor Rigby",
    "artist": "Beatles",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Here Comes the Sun",
    "artist": "Beatles",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Hey Jude",
    "artist": "Beatles",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": true
  },
  {
    "title": "In My Life",
    "artist": "Beatles",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Let It Be",
    "artist": "Beatles",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Saturday Night Fever – How Deep is Your Love",
    "artist": "Bee Gees",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Stand By Me",
    "artist": "Ben E. King",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Wind Beneath My Wings",
    "artist": "Bette Midler",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Knockin’ on Heaven’s Door",
    "artist": "Bob Dylan",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Don’t Worry Be Happy",
    "artist": "Bobbie Mc Ferrin",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Everything I Do, I Do It For You",
    "artist": "Bryan Adams",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Lady D’Arbanville",
    "artist": "Cat Stevens",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sad Lisa",
    "artist": "Cat Stevens",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Tequila",
    "artist": "The Champs",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Tennessee Waltz",
    "artist": "Connie Francis",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Fortunate Son",
    "artist": "Creedence Clearwater",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Time after Time",
    "artist": "Cyndi Lauper",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "True Colors",
    "artist": "Cyndi Lauper",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "September",
    "artist": "Earth, Wind & Fire",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "La Vie En Rose",
    "artist": "Edith Piaf",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Your Song (karaoke original track)",
    "artist": "Elton John",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Burning Love",
    "artist": "Elvis Presley",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Can’t Help Falling In Love(guitar)",
    "artist": "Elvis Presley",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Heartbreak Hotel",
    "artist": "Elvis Presley",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sweet Dreams",
    "artist": "Eurythmics",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "My Funny Valentine(karaoke original track)",
    "artist": "Frank Sinatra",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dreams",
    "artist": "Fleetwood Mac",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I Will Survive",
    "artist": "Gloria Gaynor",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Maneater",
    "artist": "Hall and Oates",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "You Are So Beautiful",
    "artist": "Joe Cocker",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Imagine",
    "artist": "John Lennon",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Let It Be",
    "artist": "John Lennon",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Somewhere Over the Rainbow (with guitaror original)",
    "artist": "Judy Garland",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dust in the Wind",
    "artist": "Kansas",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Running Up That Hill",
    "artist": "Kate Bush",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Caruso",
    "artist": "Lucio Dalla",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "California Dreamin’",
    "artist": "The Mamas & the Papas",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Dream a Little Dream of Me",
    "artist": "The Mamas & the Papas",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "L.O.V.E(guitar)",
    "artist": "Nat King Cole",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I Am …I Saidf",
    "artist": "Neil Diamond",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Every Breath You Take",
    "artist": "The Police",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I’m Gonna Be (500 miles)(0riginal track)",
    "artist": "The Proclaimers",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Hit the Road Jack",
    "artist": "Ray Charles",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Right Here Waiting",
    "artist": "Richard Marx",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Never Gonna Give You Up(original track)",
    "artist": "Rick Astley",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Unchained Melody",
    "artist": "The Righteous Brothers",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": true,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Elisa",
    "artist": "Serge Gainsbourg",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Bridge Over Troubled Water",
    "artist": "Simon & Garfunkel",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "El Condor Pasa (If I Could)",
    "artist": "Simon & Garfunkel",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The Sound of Silence",
    "artist": "Simon & Garfunkel",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "I Just Called to Say I Love You",
    "artist": "Stevie Wonder",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Superstition",
    "artist": "Stevie Wonder",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "You Can’t Hurry Love",
    "artist": "The Supremes",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Eye of the Tiger",
    "artist": "Survivor",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "River Deep – Mountain High (Simply) The Best",
    "artist": "Tina Turner",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "What’s Love Got to Do With It",
    "artist": "Tina Turner",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Africa",
    "artist": "Toto",
    "source": "",
    "genre": "Oldies",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Shinzou wo Sasageyo",
    "artist": "Linked Horizon/Revo",
    "source": "",
    "genre": "Asian",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Mayonaka no Door (Stay with Me)",
    "artist": "Miki Matsubara",
    "source": "",
    "genre": "Asian",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "O Christmas Tree Jazzy",
    "artist": "Anschutz",
    "source": "",
    "genre": "Holiday",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Last Christmas",
    "artist": "Ariana Grande",
    "source": "",
    "genre": "Holiday",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Jingle Bell Rock",
    "artist": "Bobby Helms",
    "source": "",
    "genre": "Holiday",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "All I Want for Christmas Is You",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Holiday",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Jingle Bell Rock",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Holiday",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Let It Snow! Let It Snow! Let It Snow!",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Holiday",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "We Three Gentlemen",
    "artist": "Lindsey Stirling",
    "source": "",
    "genre": "Holiday",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "All I Want for Christmas is You",
    "artist": "Mariah Carey",
    "source": "",
    "genre": "Holiday",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "It’s Beginning to Look a Lot Like Christmas",
    "artist": "Michael Buble",
    "source": "",
    "genre": "Holiday",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Snowman",
    "artist": "Sia",
    "source": "",
    "genre": "Holiday",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Walking in the Air",
    "artist": "The Snowman (movie)",
    "source": "",
    "genre": "Holiday",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Joy to the World (original arr.)",
    "artist": "Will Samorey",
    "source": "",
    "genre": "Holiday",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Angels We Have Heard on High (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Away in a Manger (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Coventry Carol (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Deck the Hall (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "The First Noel (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "God Rest Ye Merry, Gentlemen (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Greensleeves",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Have Yourself A Merry Little Christmas",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "He Is Born (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "In dulci jubilo (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "In the Bleak Midwinter (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Jingle Bell Rock",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Joy To The World(with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Let It Snow(with guitar)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Lo, How a Rose E’er Blooming (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "O Come, O Come, Emmanuel (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "O Holy Night (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "O Holy Night (Jumaane Smith version)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Once in Royal David’s City (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Silent Night (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Still, Still, Still (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "Sussex Carol (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  },
  {
    "title": "What Child is This? (with piano)",
    "artist": "",
    "source": "",
    "genre": "Traditional",
    "weddingRecommended": false,
    "funeralRecommended": false,
    "extraCharge": false
  }
];
