(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) document.documentElement.classList.add('js-motion');

  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const preloader = document.getElementById('preloader');

  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 32);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  window.addEventListener('load', () => {
    window.setTimeout(() => preloader?.classList.add('is-hidden'), reducedMotion ? 0 : 850);
  });

  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    menuToggle?.classList.toggle('is-open', open);
    mobileMenu?.classList.toggle('is-open', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    mobileMenu?.setAttribute('aria-hidden', String(!open));
  };

  menuToggle?.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('is-open')));
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  document.querySelectorAll('.nav-dropdown > button').forEach((button) => {
    button.addEventListener('click', () => {
      button.setAttribute('aria-expanded', button.getAttribute('aria-expanded') !== 'true' ? 'true' : 'false');
    });
  });

  if (!reducedMotion) {
    document.querySelectorAll('.magnetic').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const box = button.getBoundingClientRect();
        const x = (event.clientX - box.left - box.width / 2) * .12;
        const y = (event.clientY - box.top - box.height / 2) * .12;
        button.style.transform = `translate(${x}px, ${y}px)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }
})();
