const carousel = document.querySelector(".logo-carousel");
const track = document.querySelector(".logo-track");

let position = 0;
let speed = 1.0;
let isPaused = false;

function getGapValue() {
  const trackStyle = window.getComputedStyle(track);
  return parseFloat(trackStyle.gap) || 0;
}

function duplicateLogosUntilFull() {
  const originalCards = Array.from(track.children).map(card => card.cloneNode(true));

  while (track.scrollWidth < carousel.offsetWidth * 3) {
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }
}

function moveFirstLogoToEndIfNeeded() {
  const firstLogo = track.children[0];

  if (!firstLogo) return;

  const firstLogoWidth = firstLogo.offsetWidth;
  const gap = getGapValue();
  const totalMoveDistance = firstLogoWidth + gap;

  if (Math.abs(position) >= totalMoveDistance) {
    position += totalMoveDistance;
    track.appendChild(firstLogo);
  }
}

function animateLogos() {
  if (!isPaused) {
    position -= speed;
    moveFirstLogoToEndIfNeeded();
    track.style.transform = "translateX(" + position + "px)";
  }

  requestAnimationFrame(animateLogos);
}

if (carousel && track) {
  carousel.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  carousel.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  duplicateLogosUntilFull();
  animateLogos();
}