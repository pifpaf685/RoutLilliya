const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname, '../dist/tracking.js'), 'utf8');
const key = 'lillyrout.analytics-consent.v1';
function browser(saved) {
  const nodes = new Map();
  const scripts = [], events = {}, cookies = [];
  const storage = new Map(saved === undefined ? [] : [[key, saved]]);
  let reloads = 0;
  function node(id) {
    if (!nodes.has(id)) nodes.set(id, { hidden: true, handlers: {}, focus() {},
      addEventListener(name, fn) { this.handlers[name] = fn; } });
    return nodes.get(id);
  }
  const document = {
    referrer: 'https://example.com/private?email=person@example.com',
    querySelector: node,
    addEventListener(name, fn) { events[name] = fn; },
    createElement() { return {}; },
    head: { append(script) { scripts.push(script); } },
    get cookie() { return '_ga=123; _ga_TEST=456; necessary=yes'; },
    set cookie(value) { cookies.push(value); }
  };
  const window = { addEventListener(name, fn) { events[name] = fn; } };
  const location = { origin: 'https://lillyrout.at', hostname: 'lillyrout.at',
    pathname: '/', href: 'https://lillyrout.at/?email=secret@example.com#private', reload() { reloads++; } };
  vm.runInNewContext(source, { window, document, location, URL, Date,
    localStorage: { getItem: k => storage.get(k) || null, setItem: (k,v) => storage.set(k,v) } });
  return { window, scripts, storage, cookies, node, events, get reloads() { return reloads; },
    accept: () => node('#consent-accept').handlers.click(),
    reject: () => node('#consent-reject').handlers.click(),
    click(href, id = '') { events.click({ target: { closest: () => ({ id, getAttribute: () => href }) } }); } };
}
test('fresh visit and rejection make no Google request and collect no clicks', () => {
  const b = browser();
  assert.equal(b.node('#consent-panel').hidden, false);
  b.click('tel:+436607290640'); b.reject(); b.click('mailto:test@example.com');
  assert.equal(b.scripts.length, 0);
  assert.equal(b.window['ga-disable-G-HS9FHZEBMN'], true);
  assert.equal(b.window.dataLayer.filter(x => x.event).length, 0);
  assert.equal(JSON.parse(b.storage.get(key)).analytics, false);
});
test('consent loads GTM once and contact events contain no destination or treatment', () => {
  const b = browser(); b.accept(); b.accept();
  assert.equal(b.scripts.length, 1);
  assert.equal(b.window['ga-disable-G-HS9FHZEBMN'], false);
  assert.match(b.scripts[0].src, /GTM-PP79W3P5$/);
  b.click('tel:+436607290640');
  b.click('mailto:private@example.com?body=medical-information', 'email-booking');
  b.click('https://www.instagram.com/rout_liliya/');
  b.click('#preise');
  const contact = b.window.dataLayer.filter(x => /_click$/.test(x.event || ''));
  assert.deepEqual(JSON.parse(JSON.stringify(contact)), [{event:'phone_click'},{event:'email_click'},{event:'instagram_click'}]);
  const serialized = JSON.stringify(b.window.dataLayer);
  assert.ok(!serialized.includes('secret@example.com'));
  assert.ok(!serialized.includes('medical-information'));
  assert.ok(!serialized.includes('person@example.com'));
  assert.ok(!serialized.includes('ad_storage","granted'));
});
test('withdrawal clears Analytics cookies, stops events, and reloads libraries', () => {
  const b = browser(); b.accept(); b.reject();
  const before = b.window.dataLayer.length;
  b.click('tel:123');
  assert.equal(b.window.dataLayer.length, before);
  assert.equal(b.reloads, 1);
  assert.equal(b.window['ga-disable-G-HS9FHZEBMN'], true);
  assert.ok(b.cookies.some(x => x.startsWith('_ga=; Max-Age=0')));
  assert.ok(b.cookies.some(x => x.startsWith('_ga_TEST=; Max-Age=0')));
  assert.ok(!b.cookies.some(x => x.startsWith('necessary=')));
});
test('saved refusal, corrupt data, and expired consent never load tags', () => {
  for (const saved of ['broken', JSON.stringify({analytics:false,time:Date.now()}),
    JSON.stringify({analytics:true,time:Date.now()-181*86400000}),
    JSON.stringify({analytics:'true',time:Date.now()})]) assert.equal(browser(saved).scripts.length, 0);
  assert.equal(browser(JSON.stringify({analytics:true,time:Date.now()})).scripts.length, 1);
});
test('revoking consent in another tab stops tracking here', () => {
  const b = browser(); b.accept();
  b.storage.set(key, JSON.stringify({analytics:false,time:Date.now()}));
  b.events.storage({key});
  assert.equal(b.reloads,1);
  const before=b.window.dataLayer.length;
  b.click('tel:123');
  assert.equal(b.window.dataLayer.length,before);
});
