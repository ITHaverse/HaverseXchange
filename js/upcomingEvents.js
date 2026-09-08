/* ===================================================
   UPCOMING EVENT CAROUSEL
=================================================== */

const slider = document.querySelector(".upcoming-slider");
const eventTrack = document.querySelector(".upcoming-track");
const eventSlides = document.querySelectorAll(".event-slide");
const eventIndicators = document.querySelectorAll(".indicator");

if (slider && eventTrack && eventSlides.length > 0) {

    let currentSlide = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let autoPlay = null;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    const swipeThreshold = 60;
    const autoPlayDelay = 7000;

    function updateIndicators() {
        eventIndicators.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }

    function updateSlider(animate = true) {
        const slideWidth = slider.offsetWidth;

        currentTranslate = -(currentSlide * slideWidth);
        previousTranslate = currentTranslate;

        eventTrack.style.transition = animate
            ? "transform .55s cubic-bezier(.22,.61,.36,1)"
            : "none";

        eventTrack.style.transform =
            `translate3d(${currentTranslate}px, 0, 0)`;

        updateIndicators();
    }

    function setTranslate(x) {
        currentTranslate = x;
        eventTrack.style.transition = "none";
        eventTrack.style.transform =
            `translate3d(${x}px, 0, 0)`;
    }

    function goToSlide(index) {
        currentSlide = (index + eventSlides.length) % eventSlides.length;
        updateSlider(true);
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function previousSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlay = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlay !== null) {
            clearInterval(autoPlay);
            autoPlay = null;
        }
    }

    /* =====================
       DOT INDICATORS
    ====================== */
    eventIndicators.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            goToSlide(index);
            startAutoPlay();
        });
    });

    /* =====================
       DRAG / SWIPE
    ====================== */
    slider.addEventListener("pointerdown", (e) => {
        // Allow links and buttons inside the event card to work normally.
        if (e.target.closest("a, button")) return;

        isDragging = true;
        startX = e.clientX;
        currentX = e.clientX;
        previousTranslate = currentTranslate;

        stopAutoPlay();
        slider.setPointerCapture(e.pointerId);
        eventTrack.classList.add("dragging");
    });

    slider.addEventListener("pointermove", (e) => {
        if (!isDragging) return;

        currentX = e.clientX;
        const delta = currentX - startX;
        setTranslate(previousTranslate + delta);
    });

    function finishDrag(e) {
        if (!isDragging) return;

        isDragging = false;

        if (slider.hasPointerCapture(e.pointerId)) {
            slider.releasePointerCapture(e.pointerId);
        }

        eventTrack.classList.remove("dragging");

        const distance = currentX - startX;

        if (distance < -swipeThreshold) {
            currentSlide++;
        } else if (distance > swipeThreshold) {
            currentSlide--;
        }

        currentSlide = (currentSlide + eventSlides.length) % eventSlides.length;
        updateSlider(true);
        startAutoPlay();
    }

    slider.addEventListener("pointerup", finishDrag);
    slider.addEventListener("pointercancel", finishDrag);

    /* =====================
       KEYBOARD
    ====================== */
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            nextSlide();
            startAutoPlay();
        } else if (e.key === "ArrowLeft") {
            previousSlide();
            startAutoPlay();
        }
    });

    /* =====================
       RESIZE
    ====================== */
    window.addEventListener("resize", () => {
        updateSlider(false);
    });

    // Initial state.
    updateSlider(false);
    startAutoPlay();
}
