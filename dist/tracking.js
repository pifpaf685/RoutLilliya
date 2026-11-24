(() => {
  'use strict';
  const CONTAINER = 'GTM-PP79W3P5';
  const DISABLE = 'ga-disable-G-HS9FHZEBMN';
  const KEY = 'lillyrout.analytics-consent.v1';
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  const panel = document.querySelector('#consent-panel');
  let choice = null;
  let loaded = false;
  let sectionObserver;
  const seenSections = new Set();
  const places = new Set(['header','hero','about','care','prices','home_visit','booking','faq','contact','footer','mobile_bar','other']);
  window[DISABLE] = true;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });
  // Keep only the fixed, non-sensitive campaign labels used by our Search ads.
  // Never forward arbitrary queries, click IDs, search terms, or medical details.
  let pageLocation = location.origin + location.pathname;
  try {
    const incoming = new URL(location.href).searchParams;
    if (incoming.get('utm_source') === 'google' &&
        incoming.get('utm_medium') === 'cpc' &&
        incoming.get('utm_campaign') === 'lilly_rout_search' &&
        incoming.get('utm_id') === '24448387892') {
      const safe = new URLSearchParams({ utm_source: 'google', utm_medium: 'cpc',
        utm_campaign: 'lilly_rout_search', utm_id: '24448387892' });
      const group = incoming.get('utm_content') || '';
      if (/^\d{1,20}$/.test(group)) safe.set('utm_content', group);
      pageLocation += '?' + safe.toString();
    }
  } catch {}
  let referrer = '';
  try { if (document.referrer) referrer = new URL(document.referrer).origin; } catch {}
  gtag('set', {
    page_location: pageLocation,
    page_referrer: referrer,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  function readChoice() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (saved && typeof saved.analytics === 'boolean' &&
          Number.isFinite(saved.time) && Date.now() >= saved.time &&
          Date.now() - saved.time < MAX_AGE) return saved.analytics;
    } catch {}
    return null;
  }
  function clearCookies() {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!/^(_ga(?:_|$)|_gid$|_gat(?:_|$)|_gcl_)/.test(name)) continue;
      for (const domain of ['', location.hostname, '.' + location.hostname, '.lillyrout.at']) {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' +
          (domain ? '; Domain=' + domain : '');
      }
    }
  }
  function emit(name, place) {
    if (choice !== true) return;
    window.dataLayer.push({ event: name, interaction_location: places.has(place) ? place : 'other' });
  }
  function observeSections() {
    if (!window.IntersectionObserver) return;
    sectionObserver?.disconnect();
    sectionObserver = new window.IntersectionObserver(entries => {
      if (choice !== true) return;
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5) continue;
        const id = entry.target.closest('section')?.id;
        const place = { preise: 'prices', termin: 'booking', kontakt: 'contact' }[id];
        if (!place || seenSections.has(place)) continue;
        seenSections.add(place);
        emit('section_view', place);
        sectionObserver.unobserve(entry.target);
      }
    }, { threshold: 0.5 });
    document.querySelectorAll('#preise h2,#termin h2,#kontakt h2').forEach(heading => sectionObserver.observe(heading));
  }
  function activate() {
    if (loaded || choice !== true) return;
    if (!['lillyrout.at', 'www.lillyrout.at'].includes(location.hostname)) return;
    loaded = true;
    window[DISABLE] = false;
    gtag('consent', 'update', { analytics_storage: 'granted',
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + CONTAINER;
    document.head.append(script);
    observeSections();
  }
  function apply(allowed, persist) {
    const wasLoaded = loaded;
    choice = allowed;
    if (persist) {
      try { localStorage.setItem(KEY, JSON.stringify({ analytics: allowed, time: Date.now() })); } catch {}
    }
    panel.hidden = true;
    if (allowed) activate();
    else {
      sectionObserver?.disconnect();
      window[DISABLE] = true;
      gtag('consent', 'update', { analytics_storage: 'denied',
        ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      clearCookies();
      // Unload already running Google libraries after withdrawing permission.
      if (wasLoaded) location.reload();
    }
  }
  document.querySelector('#consent-accept').addEventListener('click', () => apply(true, true));
  document.querySelector('#consent-reject').addEventListener('click', () => apply(false, true));
  document.querySelector('#privacy-settings').addEventListener('click', () => {
    panel.hidden = false;
    document.querySelector('#consent-reject').focus();
  });
  document.addEventListener('click', event => {
    if (choice !== true) return;
    const anchor = event.target.closest?.('a,button');
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    let name;
    if (anchor.id === 'copy-email') name = 'email_copy_click';
    else if (href.startsWith('tel:')) name = 'phone_click';
    else if (anchor.id === 'email-booking' || href.startsWith('mailto:') ||
      href.startsWith('/cdn-cgi/l/email-protection')) name = 'email_click';
    else if (href === '#termin') name = 'booking_cta_click';
    else if (href === '#preise') name = 'prices_cta_click';
    else {
      try { if (new URL(href, location.href).hostname === 'www.instagram.com') name = 'instagram_click'; } catch {}
    }
    // Never send link text, destination, treatment, form values, or message body.
    if (name) emit(name, anchor.dataset?.trackLocation);
  }, true);
  window.addEventListener('storage', event => {
    if (event.key !== KEY) return;
    const next = readChoice();
    if (next === null) {
      if (loaded) apply(false, false);
      choice = null;
      panel.hidden = false;
    } else apply(next, false);
  });
  choice = readChoice();
  if (choice === true) activate();
  else {
    clearCookies();
    panel.hidden = choice !== null;
  }
})();
