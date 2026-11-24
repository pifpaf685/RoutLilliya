# Lilly Rout — Analytics and Ads handoff

Current optimization: 2026-11-24. Historical setup notes below retain their original dates.

## 2026-11-24 mobile contact and measurement

- Campaign #1 remains paused at the owner's request. These website and measurement changes do not resume advertising.
- Hero now shows 13 years of experience, the 1010 Vienna address, pedicure from EUR 50, home visits from EUR 65, and a direct telephone button. Mobile visitors have a persistent call / inquiry bar; it hides while the consent choice is open.
- Booking is a personal inquiry by telephone or email. Treatment selection is optional and collapsed initially. A copy-email fallback supports visitors without a configured email application. No appointment is automatically booked.
- Three existing photographs are delivered as WebP with unchanged framing. The original JPEGs remain available in the repository.
- GTM version 3, `Lilly Rout - mobile contact and engagement`, published and verified on 2026-11-24. Exactly three changes: Contact clicks trigger updated, interaction_location data-layer variable added, and the existing GA4 event tag updated.
- Trigger: `^(phone_click|email_click|instagram_click|booking_cta_click|prices_cta_click|email_copy_click|section_view)$`.
- Each custom event includes only a fixed `interaction_location` label: header, hero, about, care, prices, home_visit, booking, faq, contact, footer, mobile_bar, or other. No selected treatment, message, contact destination, or form contents are sent.
- GA4 event-scoped custom dimension `Interaction location` registered against `interaction_location` on 2026-11-24 and verified in the custom-definitions list. Future processed reports can use this dimension; it is not retroactive.
- `section_view` fires once per page after at least half the prices, booking, or contact heading is visible, after consent. It measures heading visibility, not reading, heatmaps, or confirmed appointments.
- New engagement events remain ordinary events, not Ads conversions or GA4 key events. Existing phone/email secondary observation conversions are unchanged.
- Verification: eight Node tests; responsive browser checks at 320 / 390 / 768 / 1440 px; published GTM network requests verified for the correct measurement ID and fixed location labels. Analytics collection requests were intercepted locally so the QA interactions did not create customer leads. Consent rejection and withdrawal stop collection.
- This adds future measurement only. It cannot reconstruct earlier clicks or establish that a telephone call was answered, an email sent, or an appointment confirmed.

## 2026-11-23 optimization

- Campaign 24448387892: Maximize Clicks, verified maximum CPC bid limit EUR 0.80; budget remains EUR 15/day.
- Campaign final URL suffix saved and reopened to verify: `utm_source=google&utm_medium=cpc&utm_campaign=lilly_rout_search&utm_id=24448387892&utm_content={adgroupid}`.
- Tracking v2 preserves only these exact, approved source/medium/campaign/ID labels, plus a numeric ad-group ID, in the sanitized page_location. Arbitrary query values, medical search terms, click identifiers, and fragments are still excluded. Analytics loads only after consent; advertising permissions remain denied.
- This enables manual paid-source classification for future consenting sessions. It does not retroactively reattribute visits or establish Google Ads click-ID conversion attribution. Contact clicks remain observation-only; a confirmed appointment still requires a separate verified result.
- Seven tracking tests cover consent/rejection/withdrawal, attribution labels, and exclusion of private/unapproved query data.
- Publication verified: commit `ee30f64`, GitHub Pages run `45248900206` succeeded; production `tracking.js?v=2` SHA-256 matches local. Separate cabinet, mobile, and narrow 1010 manicure ad groups are saved; two old manicure keywords paused, six cabinet keywords added, eight routing negatives and ten campaign negatives saved. See `reports/2026-11-23-google-ads-changes.md` for the applied configuration and remaining measurement limits.

## Production identity

- Website: https://lillyrout.at/
- Repository: pifpaf685/RoutLilliya, public, main branch; GitHub Pages publishes dist/.
- Google owner used in browser: routliliya@gmail.com.
- GA account: 415379654; property: 563198083, Lilly Rout — lillyrout.at.
- GA reporting timezone: Austria; currency: EUR.
- Web stream: 16299036851, Lilly Rout Website.
- Measurement ID: G-HS9FHZEBMN.
- GTM account: 6403499875; container: 285841165; ID: GTM-PP79W3P5.
- GTM published version 3: Lilly Rout - mobile contact and engagement.
- Google Ads customer: 289-996-6392. Linked to this GA4 property; auto-tagging enabled; personalized ads disabled. Broad Ads-user editing access to GA was not enabled.

## Events and consent

- GA4 base tag: Initialization - All Pages. Google Signals disabled.
- GA4 event tag: GA4 - Contact clicks; uses built-in Event variable.
- Custom event trigger: `^(phone_click|email_click|instagram_click|booking_cta_click|prices_cta_click|email_copy_click|section_view)$`.
- Site pushes event names and the fixed interaction_location label; no phone number, email address, service choice, message contents, or link URL are included as custom event parameters.
- Automatic history, outbound-link, form, video, download, and scroll event collection disabled in GTM. GA enhanced measurement disabled. User-provided data and automatic personal-data detection disabled.
- Basic consent: no Google library loaded before analytics consent. Analytics cookies cleared and page reloaded after withdrawal. ga-disable flag blocks Analytics after withdrawal. Local previews do not activate Google libraries.
- Ad storage, ad user data, and ad personalization remain denied. Advertising consent and attribution need a separate review before a paid campaign launch; current consent UI is analytics-only.
- Stored choice: lillyrout.analytics-consent.v1 in localStorage; expires after 180 days. Footer Cookie-Einstellungen opens the choice again.
- page_location omits fragments and arbitrary query data; only the fixed approved Search campaign labels and a numeric ad-group ID survive. Referrer includes origin only. Google Ads click-ID conversion attribution remains unverified.

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
