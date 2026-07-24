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
   POINTER DRAG (Desktop + Mobile)
===================== */

    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    eventTrack.addEventListener("pointerdown", (e) => {

        isDragging = true;

        startX = e.clientX;
        currentX = startX;

        stopAutoPlay();

        eventTrack.setPointerCapture(e.pointerId);

    });

    eventTrack.addEventListener("pointermove", (e) => {

        if (!isDragging) return;

        currentX = e.clientX;

    });

    eventTrack.addEventListener("pointerup", () => {

        if (!isDragging) return;

        isDragging = false;

        const distance = startX - currentX;

        if (distance > 60) {

            nextSlide();

        }

        else if (distance < -60) {

            previousSlide();

        }

        startAutoPlay();

    });

    eventTrack.addEventListener("pointercancel", () => {

        isDragging = false;

        startAutoPlay();

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