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