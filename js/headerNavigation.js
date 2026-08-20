(() => {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  const currentPage = document.body.dataset.page || 'home';
  const pageLinks = {
    home: 'index.html#intro',
    'community-centre': 'community-centre.html',
    events: 'events.html',
    partners: 'partners.html'
  };

  const activeHref = pageLinks[currentPage];
  if (activeHref) {
    const activeLink = document.querySelector(`.main-nav a[href="${activeHref}"]`);
    if (activeLink) activeLink.classList.add('active');
  }

  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
