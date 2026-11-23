# Lilly Rout — Analytics and Ads handoff

Analytics verified 2026-11-08. Ads draft updated 2026-11-09.

## 2026-11-23 optimization

- Campaign 24448387892: Maximize Clicks, verified maximum CPC bid limit EUR 0.80; budget remains EUR 15/day.
- Campaign final URL suffix saved and reopened to verify: `utm_source=google&utm_medium=cpc&utm_campaign=lilly_rout_search&utm_id=24448387892&utm_content={adgroupid}`.
- Tracking v2 preserves only these exact, approved source/medium/campaign/ID labels, plus a numeric ad-group ID, in the sanitized page_location. Arbitrary query values, medical search terms, click identifiers, and fragments are still excluded. Analytics loads only after consent; advertising permissions remain denied.
- This enables manual paid-source classification for future consenting sessions. It does not retroactively reattribute visits or establish Google Ads click-ID conversion attribution. Contact clicks remain observation-only; a confirmed appointment still requires a separate verified result.
- Seven tracking tests cover consent/rejection/withdrawal, attribution labels, and exclusion of private/unapproved query data.

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

## Google Ads draft and handoff

- First-campaign Search draft 10222045350. German ad copy and nine phrase/exact keywords for pedicure, foot care, and manicure in Vienna. Language targeting was not verified. Vienna only, with presence targeting. Display and Search Partners were disabled.
- The campaign advertises appointments at Brandstätte 3/1 St/6, Wien, and phone inquiries. Home visits are outside campaign scope. Austrian phone asset added.
- Maximize clicks with a custom average daily budget of EUR 15. Budget accepted and wizard advanced to billing. No paid delivery started.
- Call asset schedule requested for 09:00–18:00 Vienna time. Days were unspecified, with daily proposed for the draft. Schedule was not saved or verified in onboarding. Configure and verify it in Assets > Call > Advanced options before delivery.
- Billing form shows Austria and Austrian time. Confirm actual billing identity with the account owner. Submission requires separate Google Ads terms and shows a EUR 10 temporary card authorization. The form was left unsubmitted.
- Paid attribution is unverified. Analytics contact clicks are observation-only and do not measure completed calls or confirmed appointments.
- Full statutory business-owner details in Impressum remain incomplete; do not invent them.
