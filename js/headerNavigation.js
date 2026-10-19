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
    home: `${pagePrefix}index.html`,
    'about-us': `${pagePrefix}pages/about-us.html`,
    'community-centre': `${pagePrefix}pages/community-centre.html`,
    events: `${pagePrefix}pages/events.html`,
    'event-2025': `${pagePrefix}pages/event-2025.html`,
    'event-2026': `${pagePrefix}pages/event-2026.html`,
    consultants: `${pagePrefix}pages/consultants.html`,
    members: `${pagePrefix}pages/members.html`
  };

  const activeHref = pageLinks[currentPage];
  if (activeHref) {
    const activeLink = [...document.querySelectorAll('.main-nav a')].find(a => a.getAttribute('href') === activeHref);
    if (activeLink) activeLink.classList.add('active');

    const services = document.querySelector('.services-dropdown');
    if (['community-centre', 'consultants', 'members'].includes(currentPage)) {
      services?.classList.add('current');
      services?.querySelector('.nav-dropdown-toggle')?.classList.add('active');
      services?.querySelectorAll('.nav-dropdown-menu a').forEach(a => {
        if (a.getAttribute('href') === activeHref) a.classList.add('active');
      });
    }

    const events = document.querySelector('.events-dropdown');
    if (['events', 'event-2025', 'event-2026'].includes(currentPage)) {
      events?.classList.add('current');
      events?.querySelector('.nav-dropdown-toggle')?.classList.add('active');
      events?.querySelectorAll('.nav-dropdown-menu a').forEach(a => {
        if (a.getAttribute('href') === activeHref) a.classList.add('active');
      });
    }
  }

  const dropdowns = [...document.querySelectorAll('.nav-dropdown')];
  dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!dropdownToggle) return;

    // Services and Events are toggle-only controls: clicking them must never navigate.
    dropdownToggle.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      const shouldOpen = !dropdown.classList.contains('open');
      dropdowns.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });

      if (shouldOpen) {
        dropdown.classList.add('open');
        dropdownToggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-dropdown')) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
        dropdown.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      // A top-level dropdown toggle only opens/closes its submenu.
      if (link.classList.contains('nav-dropdown-toggle')) return;

      // Only actual navigation links (submenu items, Home, About Us, Contact Us) close the mobile menu.
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
        dropdown.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
    });
  });
})();
