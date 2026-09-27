# Sixty Service, Inc. — spec website

A finished, static spec website for **Sixty Service, Inc.**, a family owned and operated auto repair shop at
11013 Research Ct, Richmond, VA 23236. Built by Couture House Co. as a sales concept, ready to launch once the
owner approves the facts and photos listed in `LAUNCH-NOTES.md`.

## What is in here
- `index.html`, `services.html`, `about.html`, `appointment.html`, `404.html`
- `assets/css/site.css` (single stylesheet) and `assets/css/fonts.css` (self-hosted font faces)
- `assets/js/site.js` (vanilla JS: mobile menu, odometer counters, scroll gauge, alignment-grid motion, form validation)
- `assets/fonts/` Barlow Condensed 600/700 and Source Sans 3 (variable), from Fontsource, SIL Open Font License
- `assets/img/` optimized WebP photos (+ `-800` responsive versions), `og.jpg`, favicons, app icons
- `robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`, `netlify.toml`, `.gitignore`

No build step and no external requests: every font, icon and script is local.

## Preview locally
Double-click `index.html`, or for the most accurate preview (fonts, preloads) run a local server:

```
cd sixty-service-auto-repair
python3 -m http.server 8080
# open http://localhost:8080/
```

## Deploy on Netlify
1. Create a new site in Netlify and drag this folder onto the "Deploy manually" drop zone
   (or connect a Git repo containing this folder; publish directory is the folder root, no build command).
2. `netlify.toml` sets security headers, long-cache headers for `/assets/*` and the custom 404 page.
3. The appointment form is a Netlify Form (`name="appointment"`). After the first deploy, open
   Site settings > Forms, confirm "appointment" is detected, and add an email notification to the shop's inbox.
4. Add the custom domain (below) under Domain management and enable HTTPS.

## Domain
Proposed: **sixtyservice.com** (check availability). Alternative: **sixtyservicerva.com**.
If the domain changes, find-and-replace `https://sixtyservice.com/` across the HTML, `sitemap.xml`, `robots.txt` and `llms.txt`.
