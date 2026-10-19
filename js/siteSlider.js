(() => {
  const slider = document.querySelector('[data-site-slider]');
  if (!slider || slider.dataset.sliderInitialized === 'true') return;
  slider.dataset.sliderInitialized = 'true';

  const slides = Array.from(slider.querySelectorAll('.site-slide'));
  if (slides.length < 2) return;

  let current = 0;
  let timer;
  let startX = 0;
  let startY = 0;
  let dragging = false;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
  }

  function start() {
    window.clearInterval(timer);
    if (!document.hidden) timer = window.setInterval(() => show(current + 1), 5000);
  }

  slider.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    startX = event.clientX;
    startY = event.clientY;
    dragging = true;
    slider.classList.add('is-dragging');
  });

  slider.addEventListener('pointerup', (event) => {
    if (!dragging) return;
    dragging = false;
    slider.classList.remove('is-dragging');
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      show(current + (deltaX < 0 ? 1 : -1));
      start();
    }
  });

  slider.addEventListener('pointercancel', () => {
    dragging = false;
    slider.classList.remove('is-dragging');
  });
  slider.addEventListener('mouseenter', () => window.clearInterval(timer));
  slider.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', start);

  show(0);
  start();
})();
