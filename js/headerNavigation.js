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

  const pagePrefix = window.location.pathname.includes('/pages/') ? '../' : '';

  const pageLinks = {
    home: `${pagePrefix}index.html#intro`,
    'community-centre': `${pagePrefix}pages/community-centre.html`,
    events: `${pagePrefix}pages/events.html`,
    'event-2025': `${pagePrefix}pages/event-2025.html`,
    'event-2026': `${pagePrefix}pages/event-2026.html`,
    consultants: `${pagePrefix}pages/consultants.html`,
    members: `${pagePrefix}pages/members.html`
  };

  const activeHref = pageLinks[currentPage];

  if (activeHref) {
    const activeLink = document.querySelector(`.main-nav a[href="${activeHref}"]`);
    if (activeLink) activeLink.classList.add('active');

    const dropdown = activeLink?.closest('.nav-dropdown');
    if (dropdown) {
      dropdown.classList.add('current');
      const dropdownToggle = dropdown.querySelector('.nav-dropdown-toggle');
      if (dropdownToggle) dropdownToggle.classList.add('active');
    }
  }

  const dropdown = document.querySelector('.nav-dropdown');
  const dropdownToggle = document.querySelector('.nav-dropdown-toggle');

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', (event) => {
      /*
       * Desktop: keep normal link behaviour so clicking EVENTS opens events.html.
       * Mobile: first tap opens the submenu; the submenu links open the year pages.
       */
      if (window.innerWidth <= 900 && !dropdown.classList.contains('open')) {
        event.preventDefault();
        dropdown.classList.add('open');
        dropdownToggle.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target) && window.innerWidth <= 900) {
        dropdown.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      /*
       * On mobile, the first tap on EVENTS opens its submenu.
       * Keep the navigation open so EVENT 2026 / EVENT 2025 remain
       * clickable. A second tap on EVENTS follows events.html normally.
       */
      if (
        window.innerWidth <= 900 &&
        link === dropdownToggle &&
        dropdown.classList.contains('open')
      ) {
        return;
      }

      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      dropdown?.classList.remove('open');
      dropdownToggle?.setAttribute('aria-expanded', 'false');
    });
  });
})();
