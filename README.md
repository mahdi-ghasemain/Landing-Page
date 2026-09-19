# FluentFolio — Landing Page

A fully responsive landing page for FluentFolio, a language-learning platform.

## Libraries used (kept intentionally small)

1. **Tailwind CSS** (CDN) — utility layer / preflight reset
2. **Poppins** — self-hosted webfont, stored in `assets/fonts/` (no Google Fonts request)
3. **Bootstrap Icons** (CDN) — icon set

All layout and styling is written by hand in `assets/css/styles.css`.
No inline styles and no inline scripts anywhere.

## Project structure

```
fluentfolio/
├── assets/
│   ├── css/
│   │   └── styles.css        # all page styles + responsive media queries
│   ├── js/
│   │   └── main.js           # header, tabs, search, FAQ, back-to-top
│   ├── fonts/
│   │   ├── fonts.css         # @font-face declarations (self-hosted)
│   │   └── poppins-*.woff2   # Poppins 400–900 (latin + latin-ext)
│   ├── images/
│   │   └── hero-person.jpg, ielts-bg.jpg   # photos taken from the design PDF
│   └── libs/                 # reserved for local copies of CDN libraries
├── pages/                    # (next pages will go here, each with its own header/footer)
├── videos/
│   └── landing.mp4
├── index.html
├── server.js                 # tiny local static server (dev preview only)
└── README.md
```

Every page keeps its **own header and footer** markup, so a page can be edited
without touching the others.

## Running it locally

Open `index.html` directly, or run the included static server so that fonts and
images are served with the correct MIME types:

```bash
node server.js 5500
# then open http://127.0.0.1:5500/
```

In VS Code you can also right-click `index.html` → **Open with Live Server**.

`server.js` is only a development helper; it is safe to delete before handing the
project in.

## Vercel deployment

`vercel.json` explicitly selects a static deployment. Vercel runs
`node scripts/build-static.js` and publishes `dist/`, containing only
`index.html` and `assets/`. The local preview server is not deployed as a function.
Push to `main` to trigger the connected Vercel deployment.

## Responsive breakpoints

| Range            | Layout                                                     |
| ---------------- | ---------------------------------------------------------- |
| ≥ 1200px         | Desktop — full navbar, 3-column courses, 5-step journey     |
| 1024 – 1199px    | Small laptop — tighter navbar, same desktop structure       |
| 768 – 1023px     | Tablet — hamburger navigation, 2-column grids               |
| 480 – 767px      | Mobile — single column, stacked hero, full-width buttons    |
| < 480px          | Small phone — compact header, shortened CTA label           |

Checked for horizontal overflow on every breakpoint (no sideways scrolling).

## Sections on the home page

1. Header (logo · nav · search · CTA · hamburger)
2. Hero (two-tone badge, headline, buttons, image with floating tags)
3. Why Fluentfolio
4. Explore Our Courses (search + level tabs + cards)
5. IELTS preparation
6. Learning Journey
7. Find Your Way (age bands)
8. Teacher Training
9. FAQ (accordion)
10. Footer

## Browser support

Chrome, Edge, Firefox and Safari (latest versions).
