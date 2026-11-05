# Inner Sleeve Archive

**Music worth listening to.**

Inner Sleeve Archive is a student music appreciation website introducing **Frank Ocean**, **Daniel Caesar** and **Tyler, the Creator**. It combines artist biographies, focused song studies, listening recommendations and short interview excerpts for listeners who want to understand more of what they hear.

The current six-page website is in `Final version-submit`. It uses semantic HTML, shared CSS and plain JavaScript, with no framework or build step.

## Links

- [Live site](https://chengdianjiang0705-dotcom.github.io/inner-sleeve-project/Final%20version-submit/)
- [GitHub repository](https://github.com/chengdianjiang0705-dotcom/inner-sleeve-project)

## Pages

| Page | File | Content |
| --- | --- | --- |
| Home | `index.html` | A three-artist gatefold illustration, an interactive album sleeve and photographic artist entries |
| Frank | `frank.html` | Biography, career milestones, Self Control study, listening recommendations and interview excerpts |
| Daniel | `daniel.html` | Biography, career milestones, Let Me Go study, listening recommendations and interview excerpts |
| Tyler | `tyler.html` | Biography, career milestones, November study, listening recommendations and interview excerpts |
| Listening Room | `machine.html` | A thirteen-track audio player and a nine-clue artist identification game |
| Sources | `sources.html` | Editorial and AI credits, recording provenance, classroom references and research sources |

The artist pages combine animated portrait-and-quotation introductions with continuous story, analysis and listening sections. A sticky section menu jumps between those sections. Twenty short interview excerpts are integrated into the three artist pages.

The homepage sleeve cycles through **Blonde**, **NEVER ENOUGH** and **Flower Boy**. Each reveal stays available, with links to its artist study and a track in the Listening Room.

## Listening and search

Thirteen supplied MP3 files are included in `Final version-submit/audio`. The Listening Room plays them through the browser's audio element, with track selection, seeking, volume, artist filters and automatic queue progression. Song buttons on artist pages open the same player in a dialog. Closing an artist player pauses its audio.

Sitewide search covers all six pages, including artist biographies, song studies, interview excerpts, sources and the game. Use the Search button or press `/` outside a text field. Searches are case-insensitive and match all entered words. Song results can select a recording in the Listening Room; Ctrl+click preserves the browser's new-tab behavior. Press Escape to close search.

Shared JavaScript generates the navigation and footer. The website also includes keyboard controls, visible focus styles and support for reduced-motion preferences. The quiz keeps only temporary state; no account, database or backend is required.

## Run locally

1. Open `Final version-submit` in Visual Studio Code, or open `Inner Sleeve Archive.code-workspace` from this workspace.
2. Use Live Server to open `index.html` in a browser.
3. Explore the artist pages, flip the homepage sleeve and try the Listening Room and game.

You can also open `Final version-submit/index.html` directly in a browser. Keep the HTML, CSS, JavaScript, images, audio and fonts together so their relative paths continue to resolve.

## Project structure

```text
music project/
├── README.md
├── Inner Sleeve Archive.code-workspace
├── Final version-submit/          # Current six-page website
│   ├── index.html
│   ├── frank.html
│   ├── daniel.html
│   ├── tyler.html
│   ├── machine.html
│   ├── sources.html
│   ├── styles.css
│   ├── redesign.css
│   ├── machine.css
│   ├── search.css
│   ├── favicon.svg
│   ├── favicon-32.png
│   ├── favicon-192.png
│   ├── apple-touch-icon.png
│   ├── icon-master.png
│   ├── js/                       # Navigation, search, players, sleeve and game
│   ├── images/                   # Illustrations, photographs and record covers
│   ├── audio/                    # Thirteen supplied MP3 recordings
│   └── fonts/                    # Self-hosted DM Sans and its licence
├── submission photo/             # Form text and five submission images
├── course stages/                # Earlier course snapshots
├── project git/                  # Numbered local checkpoints
└── research/                     # Development and verification tools
```

The course snapshots and numbered checkpoints document earlier versions. The current website is the `Final version-submit` folder; the repository's actual commits provide its Git history.

## Search maintenance

The generated index in `Final version-submit/js/search-data.js` lets search work through Live Server and when opening files directly. After changing website text or game questions, regenerate it from the workspace root:

```powershell
python research/build-search-index.py "Final version-submit"
```

Index generation uses Python's standard library and Node to read the game data. Website visitors need only a browser.

The six pages already contain complete HTTPS Open Graph URLs and a sharing image URL for the live-site directory above. If the publication directory changes, update each page's `og:url`, `og:image` and `twitter:image` to match it.

## Submission materials

Use `submission photo/FINAL-SUBMISSION.txt` for the title, short and long descriptions, repository link and live-site link.

| Field | File in `submission photo` | Size |
| --- | --- | --- |
| Cover image | `ready-to-upload/01-cover-image.jpg` | 1200 × 630, under 100 KB |
| Desktop screenshot | `ready-to-upload/02-desktop-screenshot.png` | 1920 × 1080 |
| Mobile screenshot | `ready-to-upload/03-mobile-screenshot.png` | 375 × 812 |
| App icon | `ready-to-upload/04-app-icon.png` | 180 × 180 PNG |
| Favicon | `ready-to-upload/05-favicon.png` | 32 × 32 PNG |

These five files are also packaged in `submission photo/ready-to-upload.zip`. The desktop and phone images are current homepage viewport captures, without browser bars.

Publish the complete `Final version-submit` folder at the matching repository path, including its audio, images, JavaScript, stylesheets and fonts. The submission screenshots are separate form uploads.

## Sources and editorial credits

Artist information and interview excerpts link to research sources. Listening notes are editorial interpretations. The Sources page distinguishes supplied recordings and artwork from verified release references; it records the limits of the available provenance information.

AI assisted research organisation, drafting, English polishing, code preparation, troubleshooting and the homepage gatefold illustration. The gatefold is an AI-generated composite, rather than a photograph of the artists together. These contributions are disclosed on the Sources page.

DM Sans is hosted locally with its SIL Open Font License in `Final version-submit/fonts/OFL.txt`. Article text uses Arial or Helvetica; quotations and Collection typography use Georgia.

## Author

**Diancheng Jiang**  
Email: [X20250059@stu.hibiuh.edu.cn](mailto:X20250059@stu.hibiuh.edu.cn)
