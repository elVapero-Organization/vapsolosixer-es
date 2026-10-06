(() => {
  const ageGate = document.querySelector('#age-gate');
  const confirm = document.querySelector('.age-confirm');
  const deny = document.querySelector('.age-deny');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.main-nav');
  const ageKey = 'sixer-age-confirmed';
  let opener;

  const focusable = () => [...ageGate.querySelectorAll('button')];
  const openGate = () => {
    opener = document.activeElement;
    ageGate.hidden = false;
    document.body.style.overflow = 'hidden';
    confirm.focus();
  };
  const closeGate = () => {
    ageGate.hidden = true;
    document.body.style.overflow = '';
    opener?.focus?.();
  };
  try { if (localStorage.getItem(ageKey) !== 'yes') openGate(); } catch { openGate(); }
  confirm.addEventListener('click', () => { try { localStorage.setItem(ageKey, 'yes'); } catch {} closeGate(); });
  deny.addEventListener('click', () => { window.location.replace('about:blank'); });
  ageGate.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { event.preventDefault(); deny.click(); }
    if (event.key !== 'Tab') return;
    const items = focusable();
    const first = items[0], last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menú'); }));
  const productUrl = document.querySelector('.buy-link').href;
  document.querySelectorAll('.gallery-item').forEach((card) => {
    const button = document.createElement('a');
    button.className = 'product-buy';
    button.href = productUrl;
    button.target = '_blank';
    button.rel = 'noopener';
    button.innerHTML = 'COMPRAR AHORA <b aria-hidden="true">↗</b>';
    card.append(button);
  });
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
