(() => {
  'use strict';
  const CONTAINER = 'GTM-PP79W3P5';
  const DISABLE = 'ga-disable-G-HS9FHZEBMN';
  const KEY = 'lillyrout.analytics-consent.v1';
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  const panel = document.querySelector('#consent-panel');
  let choice = null;
  let loaded = false;
  window[DISABLE] = true;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });
  // Do not include query strings, fragments, or full referrer URLs in Analytics.
  let referrer = '';
  try { if (document.referrer) referrer = new URL(document.referrer).origin; } catch {}
  gtag('set', {
    page_location: location.origin + location.pathname,
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
    const anchor = event.target.closest?.('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    let name;
    if (href.startsWith('tel:')) name = 'phone_click';
    else if (anchor.id === 'email-booking' || href.startsWith('mailto:') ||
      href.startsWith('/cdn-cgi/l/email-protection')) name = 'email_click';
    else {
      try { if (new URL(href, location.href).hostname === 'www.instagram.com') name = 'instagram_click'; } catch {}
    }
    // Never send link text, destination, treatment, form values, or message body.
    if (name) window.dataLayer.push({ event: name });
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
