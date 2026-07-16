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

  window.addEventListener("load", () => {
    duplicateLogosUntilFull();
    animateLogos();
  });
}

/* ===================================================
   UPCOMING EVENT CAROUSEL
=================================================== */

const eventTrack = document.querySelector(".upcoming-track");
const eventSlides = document.querySelectorAll(".event-slide");
const eventIndicators = document.querySelectorAll(".indicator");

if (eventTrack && eventSlides.length > 0) {

    let currentSlide = 0;
    let autoPlay;

    function updateSlider() {

        eventTrack.style.transform =
            `translateX(-${currentSlide * 100}%)`;

        eventIndicators.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });

    }

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= eventSlides.length) {

            currentSlide = 0;

        }

        updateSlider();

    }

    function previousSlide() {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide = eventSlides.length - 1;

        }

        updateSlider();

    }

    function startAutoPlay() {

        autoPlay = setInterval(nextSlide, 7000);

    }

    function stopAutoPlay() {

        clearInterval(autoPlay);

    }

    eventIndicators.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentSlide = index;

            updateSlider();

            stopAutoPlay();

            startAutoPlay();

        });

    });

    /* =====================
       TOUCH SUPPORT
    ====================== */

    let startX = 0;
    let endX = 0;

    eventTrack.addEventListener("touchstart", e => {

        startX = e.touches[0].clientX;

        stopAutoPlay();

    });

    eventTrack.addEventListener("touchmove", e => {

        endX = e.touches[0].clientX;

    });

    eventTrack.addEventListener("touchend", () => {

        const distance = startX - endX;

        if (distance > 60) {

            nextSlide();

        }

        else if (distance < -60) {

            previousSlide();

        }

        startAutoPlay();

    });

    /* =====================
       MOUSE DRAG
    ====================== */

    let mouseDown = false;
    let mouseStart = 0;
    let mouseEnd = 0;

    eventTrack.addEventListener("mousedown", e => {

        mouseDown = true;

        mouseStart = e.clientX;

        stopAutoPlay();

    });

    window.addEventListener("mouseup", () => {

        if (!mouseDown) return;

        mouseDown = false;

        const distance = mouseStart - mouseEnd;

        if (distance > 60) {

            nextSlide();

        }

        else if (distance < -60) {

            previousSlide();

        }

        startAutoPlay();

    });

    window.addEventListener("mousemove", e => {

        if (!mouseDown) return;

        mouseEnd = e.clientX;

    });

    /* =====================
       KEYBOARD
    ====================== */

    document.addEventListener("keydown", e => {

        if (e.key === "ArrowRight") {

            nextSlide();

        }

        if (e.key === "ArrowLeft") {

            previousSlide();

        }

    });

    updateSlider();

    startAutoPlay();

}