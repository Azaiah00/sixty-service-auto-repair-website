# Launch notes — Sixty Service, Inc.

Everything below must be confirmed with the owner before the site goes live.

## Facts to confirm
- [ ] **Hours**: Mon–Fri 7:30 AM–5:30 PM, closed Saturday and Sunday (shown site-wide and in schema).
- [ ] **Years in business**: site says "serving Richmond for over two decades" and "on file with the BBB since 2007".
      Yellow Pages lists 27 years in business; if confirmed, the copy can say "27 years" / the founding year.
- [ ] **Virginia State Inspections**: confirm Sixty Service is an official Virginia inspection station
      (shown as a service with its own section, FAQ and schema entry). Remove if not.
- [ ] **ASE certification**: NOT stated anywhere on the site. Add an ASE badge and copy only if confirmed with current certificates.
- [ ] **25-year safety award** seen in a shop photo: not used. Add to About page if the owner provides details.
- [ ] **Ownership / leadership**: BBB lists Mickey Smith as owner. The site intentionally names no staff or owner.
      Confirm how the family wants to be presented (names, photos, story) before adding any.
- [ ] **Ratings**: Google 4.9 from 72 reviews (in schema `aggregateRating` on the home page) and SureCritic 5.0 from 170 reviews.
      Update the numbers at launch; they change over time.
- [ ] **Review themes** (honesty, family-run feel, reliable repairs, personal attention) summarize public SureCritic reviews.
      The only quoted text is the SureCritic review title "An Honest Family Run Business". Owner may supply approved quotes.
- [ ] **Nextdoor Neighborhood Fave 2023**: from the award letter photo. Add later years if they won again.
- [ ] **Location wording**: described as "North Chesterfield area" of Richmond, VA 23236. Confirm the owner is happy with that.
- [ ] **Vehicle types**: copy mentions daily drivers, SUVs and classic cars (all seen in shop photos). Confirm any makes they do not service.
- [ ] **Process wording**: service "what to expect" notes and the appointment flow ("the shop will reach out to confirm") describe
      general practice only. Confirm they match how the shop actually works. No warranties, loaners, shuttles, towing, prices,
      fleet accounts or dealer comparisons are claimed anywhere.
- [ ] **Text messages**: "Send a text" links use sms:+18043799240. Confirm the shop number can receive texts, or remove those links.
- [ ] **Email**: none published. Add a shop email to the footer and schema if they want one.

## Photos
- All photos come from the business's own public Facebook page and must be approved/licensed by the owner before launch.
- Used (renamed): classic-convertible-on-lift, service-bays-on-lifts, wheel-service-two-lifts, hofmann-alignment-console (cropped to
  the monitor), tire-off-in-service-bay, open-hood-engine-bay, coolant-leak-residue-hose, engine-module-repair (cropped to hands),
  intake-manifold-ports, throttle-body-removed, throttle-body-closeup, under-hood-diagnosis-explorer, technician-under-hood,
  nextdoor-neighborhood-fave-2023.
- Some photos show team members at work (faces partly visible, never named). Get their OK or swap for a new shoot.
- Deliberately excluded: family, children, beach, personal messages and portrait photos.
- Recommended: a professional shoot of the building exterior and sign, the bays and the Hofmann alignment rack.

## Items to swap / set up
- [ ] Netlify Forms: the appointment form works once deployed on Netlify. Set up email notifications to the shop.
- [ ] Add a Google Maps embed or Google Business Profile link if the owner wants one (currently a directions link, no third-party embed).
- [ ] Update `sitemap.xml` lastmod dates at launch.
- [ ] Submit sitemap to Google Search Console and Bing Webmaster Tools; link the site from the Google Business Profile and Facebook page.

## Domain
- Proposed: sixtyservice.com (availability to check). Alternative: sixtyservicerva.com.


## Live preview domain (updated 27 Sep 2026)
The site is live at https://sixty-service-auto-repair.netlify.app/ and every canonical URL, Open Graph/Twitter tag, JSON-LD URL, sitemap.xml, robots.txt and llms.txt now points there, so text-message and social link previews show this address.
When the owner's own domain (sixtyservice.com) is connected in Netlify, find-and-replace `sixty-service-auto-repair.netlify.app` with `sixtyservice.com` across the .html/.xml/.txt/.toml files, then redeploy.
