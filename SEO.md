# Lilly Rout — organic search configuration

Updated 2026-11-24. Canonical public site: https://lillyrout.at/. GitHub Pages publishes `dist/` from `pifpaf685/RoutLilliya`.

## Search intent and content

The primary topic is Fußpflege in 1010 Wien. Secondary topics are specialized foot care, pedicure, home visits in Vienna and manicure. The title, single H1, visible copy, address and service headings describe those topics naturally. The owner confirmed professional diplomas and 13 years of experience; the page now explicitly identifies Lilly as a diplomierte Fußpflegerin. No medical practice, doctor qualification or treatment outcome is implied by the structured data.

The visible price list is the source of truth. The JSON-LD offers quote cabinet pedicure EUR 50, classic manicure EUR 35 and mobile pedicure with a minimum EUR 65, dependent on distance. Update the visible prices, description and structured offers together when prices change.

## Technical setup

- One absolute canonical: https://lillyrout.at/. HTTP and www redirect to this URL. `/index.html` serves the same page with the same canonical.
- `robots.txt` permits crawling and identifies the sitemap. `sitemap.xml` lists the canonical page; change lastmod only after a meaningful content update, not on every deployment.
- German page language, de_AT social locale, concise service/location title and meta description, large-image preview permission, social image and image alternative text.
- JSON-LD graph: WebSite, WebPage and BeautySalon, linked through stable identifiers. Business phone, email, postal address, Instagram profile and three real service offers are included. No invented hours, coordinates, ratings, reviews or medical credentials.
- Important service copy and price tables are present in raw HTML. Contact and consent behavior do not gate search content. Analytics remains consent-based.
- FAQ copy answers practical location, prices, home visits and booking questions. It does not promise a Google FAQ rich result.

## Monitoring and next priorities

Use the existing Search Console property `https://lillyrout.at/` to monitor indexing, canonical selection, queries, devices and organic clicks. The sitemap was already successfully submitted before this update. Keep paid Ads results separate from organic Search Console data. Lighthouse SEO is a technical checklist, not a ranking score.

Keep the real Google Business Profile name, address, phone, website, service categories and appointment information consistent with this page. Add current real workplace photos and invite authentic customer reviews. Do not fabricate reviews, infer opening hours or duplicate the profile. These facts must be verified in the business account before changes.

Only add dedicated service pages when each can answer distinct customer questions with substantive, verified content. Avoid near-identical district pages, keyword repetition and hidden text. Track confirmed bookings separately from contact clicks.

## Primary references

- https://developers.google.com/search/docs/essentials
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://support.google.com/business/answer/7091/
