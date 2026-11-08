const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Menü öffnen'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; mobileNav.hidden = open; menuButton.setAttribute('aria-expanded',String(!open)); menuButton.setAttribute('aria-label',open?'Menü öffnen':'Menü schließen'); });
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e => { if(e.key==='Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); } });
window.matchMedia('(min-width:801px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
const treatment = document.querySelector('#treatment');
const services = [];
for (const [id,group] of [['pedicure-prices','Pediküre'],['manicure-prices','Maniküre']]) {
 const optgroup = document.createElement('optgroup'); optgroup.label = group;
 document.querySelectorAll('#'+id+' tr').forEach(row => {
  const cell = row.querySelector('th'); const small = cell.querySelector('small');
  const name = Array.from(cell.childNodes).filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();
  const price = row.querySelector('td').textContent; const detail = small?.textContent || '';
  const service = {name,price,detail,group}; const index = services.push(service)-1;
  const option = document.createElement('option'); option.value = index; option.textContent = name+' · '+price; optgroup.append(option);
 });
 treatment.append(optgroup);
}
const mobileService = {name:'Mobile Pediküre',price:'ab 65 €',detail:'je nach Entfernung',group:'Pediküre'};
const mobileIndex = services.push(mobileService)-1;
const mobileOption = document.createElement('option');
mobileOption.value = mobileIndex;
mobileOption.textContent = 'Mobile Pediküre · ab 65 €';
treatment.querySelector('optgroup').append(mobileOption);
const bookingLink = document.querySelector('#email-booking');
function updateBookingLink(){
 const service = treatment.value === '' ? null : services[Number(treatment.value)];
 document.querySelector('#treatment-name').textContent = service?.name || 'Ihre Pflege. Ihre Wahl.';
 document.querySelector('#treatment-price').textContent = service ? [service.price,service.detail].filter(Boolean).join(' · ') : 'Alle Behandlungen finden Sie in der Preisliste.';
 const subject = service ? 'Terminanfrage: '+service.name : 'Terminanfrage';
 const body = 'Guten Tag Lilly,\n\n'+(service?'ich interessiere mich für '+service.name+' ('+service.group+', '+service.price+').':'ich möchte gerne einen Termin vereinbaren.')+'\nKönnten Sie mir bitte einen freien Termin nennen?\n\nMein Wunschtermin:\nMein Name:\nMeine Telefonnummer:\n\nVielen Dank!';
 bookingLink.href = 'mailto:routliliya@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
}
treatment.addEventListener('change',updateBookingLink);
updateBookingLink();
const filmDialog = document.querySelector('#film-dialog'); const video = filmDialog.querySelector('video');
document.querySelector('[data-film]').addEventListener('click',()=> { filmDialog.showModal(); video.play().catch(()=>{}); });
filmDialog.addEventListener('close',()=>video.pause());
const legalDialog = document.querySelector('#legal-dialog');
const legal = {
 impressum: {title:'Impressum',paragraphs:['Lilly Rout · Pediküre & Maniküre','Kontakt: +43 660 7290640 · routliliya@gmail.com','Brandstätte 3/1 St/6 · Wien','Weitere gesetzlich erforderliche Angaben zur Anbieterin sind noch zu ergänzen.']},
 datenschutz: {title:'Datenschutz',paragraphs:['Für den Betrieb wird die Website über GitHub Pages und Cloudflare bereitgestellt. Dabei verarbeiten die Hosting-Anbieter technische Verbindungsdaten, etwa die IP-Adresse. Das Video wird direkt auf dieser Website bereitgestellt.','Nur nach Ihrer ausdrücklichen Zustimmung laden wir Google Tag Manager und Google Analytics 4 (Google Ireland Limited). Damit messen wir Seitenaufrufe und Klicks auf Telefon-, E-Mail- und Instagram-Links. Ein Klick ist kein Nachweis eines Anrufs, einer versendeten Nachricht oder eines vereinbarten Termins.','Google Analytics kann dabei Cookies wie _ga verwenden und technische Nutzungsdaten verarbeiten. Eine Verarbeitung in den USA kann nicht ausgeschlossen werden. Wir übermitteln keine ausgewählte Behandlung, Nachrichteninhalte, Namen, Telefonnummern oder E-Mail-Adressen als Ereignisparameter. Automatische Formular- und Linkerfassung sowie Google Signals sind deaktiviert.','Ohne Zustimmung werden keine Google-Tags geladen. Werbepersonalisierung und die Freigabe von Daten für Google-Werbung bleiben deaktiviert. Ihre Einwilligung können Sie jederzeit über Cookie-Einstellungen im Fußbereich ändern oder widerrufen. Die Auswahl wird sechs Monate lokal gespeichert.','Die Behandlungsauswahl wird nur in Ihrem Browser verarbeitet und nicht als Buchung übermittelt. Mit „Per E-Mail anfragen“ öffnet sich Ihr E-Mail-Programm. Erst wenn Sie die Nachricht dort selbst senden, wird sie übermittelt.','Der Instagram-Link führt zu einer externen Website. Beim bloßen Laden dieser Seite wird keine Verbindung zu Instagram aufgebaut.','Entwurfsfassung: Die vollständigen Datenschutzinformationen einschließlich Angaben zur Verantwortlichen und zum Hosting werden vor der öffentlichen Freigabe ergänzt.']}
};
document.querySelectorAll('[data-legal]').forEach(button=>button.addEventListener('click',()=>{ const item=legal[button.dataset.legal]; document.querySelector('#legal-title').textContent=item.title; const container=document.querySelector('#legal-copy'); container.replaceChildren(); item.paragraphs.forEach(text=>{const p=document.createElement('p');p.textContent=text;container.append(p)});legalDialog.showModal(); }));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close()); dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()})});
if (!window.matchMedia('(prefers-reduced-motion:reduce)').matches && 'IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('reveal'); observer.unobserve(entry.target) } }),{threshold:.12});
 document.querySelectorAll('h1,h2,h3,.lead,.about-text>p,.booking-copy>p,.faq-copy>p,.contact-grid address').forEach(el=>observer.observe(el));
}
