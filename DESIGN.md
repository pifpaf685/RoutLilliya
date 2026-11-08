# Lilly Rout

German language personal pedicure and manicure website. Existing static Sites project, preserve project ID and owner-private access.

Inventory: Lilly Rout brand from supplied price menu; extensive professional experience (user); portrait of the actual practitioner at work in supplied 8-second video; printed cream/brown menu; pedicure with scalpel and drill 45 min / 50 EUR; manicure 35 EUR; Japanese techniques; nail brace 35–45 EUR; mobile pedicure on request; phone 0660 7290640; email routliliya@gmail.com; Instagram rout_liliya. No street address or certification supplied.

Argument: skilled personal care -> actual practitioner at work; precise service choice -> complete supplied menu; clear next step -> phone/email with service preselected; expectations -> short useful FAQ; personal contact -> same verified contact details.

Taste v2 direction: split-stage, seed 1689878393. Keep original brand's neutral ivory and warm brown wordmark, use dark sage ink from Jonas reference. A fixed portrait of Lilly at work accompanies her own printed menu translated into an interactive treatment selector. Existing artifact becomes useful rather than a generic salon gallery.

One live thing: choose a real service, see the exact price and available duration, prepare a German email enquiry. No form submission or fake success.

Adaptations: no stripes because client brand/reference does not include a stripe; no generic room imagery, forest imagery, or invented portraits; only supplied practitioner footage. Price section is a real two-column price menu rather than two invented product plans. Full-width price section breaks the split. A single image source means fewer independent photographs than Taste's general floor; no stock substituted as client work.

German copy: Pediküre mit Erfahrung. Persönliche Fußpflege und Maniküre bei Lilly Rout, mit Zeit für Ihre Wünsche. Ihre Fußpflegerin. Behandlungen & Preise. Häufige Fragen. Ihr Termin bei Lilly. Prices and contacts transcribed from supplied screenshot; date of price validity not provided, contact to confirm.

Validation: use source lint and managed browser QA. Taste's browser inspector is not used because browser automation must use the environment's CUA interface.

## Render review
ROUND 1
Seen in one second: Lilly herself working, beside a short German pedicure headline.
Idea: Lilly's own working portrait accompanies a readable, interactive version of her existing price menu.
Live thing: all 20 services can prepare a precise German email enquiry with price.
Layout words by section: hero=split / about=letter / pricing=two-column menu / booking=selector / faq=reading text / contact=colour field.
Scores: design 6.5 · usability 8 · creativity 7 · content 8 → overall 7.15.
Caps applied: only one independent photographic source supplied, so fewer than four genuine images; no stock or invented practitioner imagery added.
Top three problems: limited photographic material (can add real work photos later); address and full business identity not supplied (kept private draft and explicit incomplete legal details); 8-second footage includes an Instagram outro (video is opened intentionally rather than autoplayed as a background).

Verified in managed browser: desktop 1366px view; embedded real 390px and 768px viewports; no horizontal overflow at 390px; all visible headings within two lines; mobile menu opens and closes on navigation; video loaded and played (8 seconds); treatment selection shows 50 EUR and 45 minutes and correctly encodes email subject/body. Source lint: 0 FAIL / 0 WARN; JavaScript syntax passed. Automated browser inspector not run under environment browser-control restrictions.

## Care-focused revision

The revised hero uses “Pediküre mit Sorgfalt” and speaks to sensitive feet and individual needs without claiming a medical qualification. A new editorial block pairs an illustrative, AI-generated treatment detail with three services and prices taken from the supplied menu. The actual photograph of Lilly remains the main portrait. The generated detail is labelled as illustrative on the page.

The site avoids “medizinische Fußpflege” as a service title. The WKO guidance distinguishes that protected-sounding term from ordinary Fußpflege: https://www.wko.at/noe/gewerbe-handwerk/fusspfleger-kosmetiker-masseure/fusspfleger-bezeichnung-rechtslage-2.pdf . This is a content precaution, not verification of Lilly’s credentials or licensing.

Local browser recheck: image loaded and no horizontal overflow at 390, 768 or 1366 px. Mobile menu opened and closed via navigation. Selecting Nagelspange displayed 35–45 € and produced the matching encoded email enquiry. Full legal identity/address and hosting-specific privacy details are still missing; the legal dialogs explicitly say draft and must be completed before public release of this revision.

## Portrait polish

Taste reading: preserve-mode redesign for people choosing a trusted local foot-care practitioner. Direction is calm, documentary and legible (variance 4, motion 2, density 4), with the real practitioner as the visual anchor. ImageGen produced an exploratory portrait retouch, but it changed the composition and facial details too much for an identity-sensitive client photograph. It was not inserted into the site. The actual portrait file stays byte-for-byte unchanged. Only its CSS presentation was adjusted: slightly more natural saturation, gentle brightness/contrast and a softer caption scrim. Verified that the original loads and the portrait has no horizontal overflow at 390, 768 and 1366 px. This change is local only.

## Revised portrait background

The user supplied a different square portrait and requested a more professional backdrop. ImageGen edited that supplied image into a restrained, tidy treatment-room setting. This is an illustrative composite, not evidence of the actual room. The new JPEG is used as the hero image, and a visible caption notes that the background was digitally designed. The original documentary image and video remain in the assets. Browser verification: the new portrait loaded at 390, 768 and 1366 px, with no horizontal overflow. No public deployment was made.
