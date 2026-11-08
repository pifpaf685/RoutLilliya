# Lilly Rout — Analytics and Ads handoff

Verified 2026-11-08.

## Production identity

- Website: https://lillyrout.at/
- Repository: pifpaf685/RoutLilliya, public, main branch; GitHub Pages publishes dist/.
- Google owner used in browser: routliliya@gmail.com.
- GA account: 415379654; property: 563198083, Lilly Rout — lillyrout.at.
- GA reporting timezone: Austria; currency: EUR.
- Web stream: 16299036851, Lilly Rout Website.
- Measurement ID: G-HS9FHZEBMN.
- GTM account: 6403499875; container: 285841165; ID: GTM-PP79W3P5.
- GTM published version 2: Lilly Rout - consent-based analytics.
- Google Ads customer: 289-996-6392. Linked to this GA4 property; auto-tagging enabled; personalized ads disabled. Broad Ads-user editing access to GA was not enabled.

## Events and consent

- GA4 base tag: Initialization - All Pages. Google Signals disabled.
- GA4 event tag: GA4 - Contact clicks; uses built-in Event variable.
- Custom event trigger: ^(phone_click|email_click|instagram_click)$.
- Site pushes only event names; no phone number, email address, service choice, message contents, or link URL are included as event parameters.
- Automatic history, outbound-link, form, video, download, and scroll event collection disabled in GTM. GA enhanced measurement disabled. User-provided data and automatic personal-data detection disabled.
- Basic consent: no Google library loaded before analytics consent. Analytics cookies cleared and page reloaded after withdrawal. ga-disable flag blocks Analytics after withdrawal. Local previews do not activate Google libraries.
- Ad storage, ad user data, and ad personalization remain denied. Advertising consent and attribution need a separate review before a paid campaign launch; current consent UI is analytics-only.
- Stored choice: lillyrout.analytics-consent.v1 in localStorage; expires after 180 days. Footer Cookie-Einstellungen opens the choice again.
- page_location omits query and fragment; referrer includes origin only. Campaign query handling needs review before advertising to preserve approved attribution without transmitting personal data.

## Goals / conversions

- phone_click and email_click marked as GA4 key events, once per session, without invented monetary values.
- Imported into Google Ads under Contact category as secondary / observation-only conversions.
- Instagram click remains an ordinary event.
- Contact clicks are not proof of a completed call, sent email, booked appointment, or sale.

## Evidence

- Node tests passed: fresh visit and rejection load no tags; acceptance loads once; withdrawal clears cookies and reloads; corrupt/expired consent rejected; cross-tab withdrawal stops events.
- Live Tag Assistant connected to lillyrout.at and identified GTM-PP79W3P5 / G-HS9FHZEBMN. Base tag fired once.
- Sent hits included page_view, phone_click, email_click, instagram_click for the correct measurement ID.
- GA4 realtime confirmed one test visitor and all three contact events, plus page_view, first_visit, session_start. These were test interactions, not customer leads.
- Tag Assistant consent table after withdrawal showed analytics_storage, ad_storage, ad_user_data, ad_personalization all denied.
- Phone-app launch was cancelled; no call was placed. No email was sent.

## Ads work remaining

- Ads UI remains at first-campaign business onboarding; company name and URL prepared. No campaign launched or budget committed.
- Separate Google / generative-AI terms confirmation was requested before proceeding past the business screen.
- User supplied practice address: Brandstätte 3/1 St/6, Wien. Published exactly with this unit notation.
- Await daily advertising budget, advertising area, and mobile-service coverage.
- Do not infer a confirmed booking from email or phone clicks, or start paid delivery without agreed budget and launch instruction.
- Full statutory business-owner details in Impressum remain incomplete; do not invent them.
