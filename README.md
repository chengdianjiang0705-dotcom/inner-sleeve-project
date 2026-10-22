# Inner Sleeve Archive

**Music worth listening to.**

Inner Sleeve Archive is a student music appreciation website exploring the creative worlds of **Frank Ocean**, **Daniel Caesar**, and **Tyler, the Creator**. It connects artist biographies with focused song studies, listening recommendations, and short sourced quotations. The aim is to help visitors move beyond recognising a song title and start noticing the voices, arrangements, and ideas within the music.

The project was developed for a Web Technologies course using HTML, CSS, and plain JavaScript.

## Links

- [Live course preview — Stage 04](https://chengdianjiang0705-dotcom.github.io/inner-sleeve-project/course%20stages/04-week-2-style-and-content/site/)
- [GitHub repository](https://github.com/chengdianjiang0705-dotcom/inner-sleeve-project)

The preview link opens the Stage 04 snapshot. This README describes the full local website in `project code`, which also includes the later Machine page.

## Artist studies

| Artist | Focus song | Album |
| --- | --- | --- |
| Frank Ocean | Self Control | Blonde |
| Daniel Caesar | Let Me Go | NEVER ENOUGH |
| Tyler, the Creator | November | Flower Boy |

Each artist page includes a biography, selected career milestones, a detailed listening study, three entry tracks, and supporting photographs.

## Pages and features

| Page | Content |
| --- | --- |
| Home | Introduction to the archive, artist overview, and a random quotation |
| Frank | Frank Ocean biography, Self Control study, and listening recommendations |
| Daniel | Daniel Caesar biography, Let Me Go study, and listening recommendations |
| Tyler | Tyler, the Creator biography, November study, and listening recommendations |
| Quotes | Twenty sourced quotations with artist filters |
| Machine | Nine-clue artist identification quiz and an interactive record sleeve |
| Sources | Research links, editorial credits, copyright notice, and AI assistance disclosure |

Additional features include:

- Shared navigation and footer generated with JavaScript to avoid repeated code.
- Artist-page tabs for moving between background information, song analysis, and entry tracks.
- NetEase Cloud Music listening previews that show the selected recording before opening its external listening link.
- A quiz with feedback, scoring, and restart controls.
- A record sleeve that begins with the INNER SLEEVE design, flips to a randomly selected album cover, and resets after three seconds.
- Responsive layouts, keyboard controls, visible focus styles, and reduced-motion support.

## Visual direction

The website uses a quiet music-archive style: warm walnut backgrounds, cream text, copper accents, and a subtle studio photograph. Bold headings and italic quotations create a clear reading hierarchy. Artist portraits, performance photographs, and record sleeves connect the listening notes with each artist's visual world.

## Technology

- **HTML5:** semantic page structure, images, links, buttons, and accessible labels.
- **CSS3:** typography, responsive grids, visual styling, and sleeve animations.
- **JavaScript:** navigation, artist tabs, quotations, the quiz, and listening previews.

The website does not require a framework, package installation, compilation, or a backend. Quiz scores are temporary, and no account is required. Music recordings are not hosted by the project.

## Run locally

1. Open the `project code` folder in Visual Studio Code.
2. Use the **Live Server** extension to open `index.html` in a browser.
3. Navigate through the pages and try the interactive features.

Alternatively, use your browser's **Open File** option to open `project code/index.html` directly. Keep the HTML, CSS, JavaScript, and image folders together so relative paths continue to work.

To edit the source, open the HTML files in VS Code. To see the rendered website, open them through your browser or Live Server.

## Project structure

```text
music project/
├── README.md
├── project code/              # Current seven-page website
│   ├── index.html
│   ├── frank.html
│   ├── daniel.html
│   ├── tyler.html
│   ├── quotes.html
│   ├── machine.html
│   ├── sources.html
│   ├── styles.css
│   ├── machine.css
│   ├── js/                    # Shared and page-specific interactions
│   └── images/                # Artist photographs and website artwork
├── course stages/             # Prepared course milestone versions
├── project git/               # Numbered local file checkpoints
├── photo resource/            # Supplied original image resources
└── research/                  # Development notes and verification tools
```

The course stages cover project selection, the initial layout, three development weeks, publication preparation, and submission. The numbered folders in `project git` are saved file copies; they do not replace the repository's real Git commit history.

## Checking the website

Check the layout at phone and desktop widths. Try the navigation menu, artist tabs, quotation filters, random quotation button, listening previews, quiz scoring and restart, and the random sleeve reveal. Confirm that images load and links open the intended destinations.

## Sources and credits

Biographical information and quotations link to their sources on the artist and Sources pages. Listening notes are editorial interpretations. Artist photographs and official album artwork remain the property of their respective rights holders; this project does not claim ownership of them.

AI tools assisted with research organisation, early drafting, English language polishing, HTML/CSS/JavaScript preparation, and troubleshooting. This assistance is also disclosed on the Sources page.

## Author

**Diancheng Jiang**  
Email: [X20250059@stu.hibiuh.edu.cn](mailto:X20250059@stu.hibiuh.edu.cn)
