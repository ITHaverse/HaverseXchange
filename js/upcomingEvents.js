/* ===================================================
   UPCOMING EVENT CAROUSEL
=================================================== */

const slider = document.querySelector(".upcoming-slider");
const eventTrack = document.querySelector(".upcoming-track");
const eventSlides = document.querySelectorAll(".event-slide");
const eventIndicators = document.querySelectorAll(".indicator");

if (eventTrack && eventSlides.length > 0) {

    let currentSlide = 0;
    let autoPlay;

    function updateSlider() {

        const gap = parseFloat(
        getComputedStyle(eventTrack).gap
        ) || 0;

        const slideWidth = slider.offsetWidth;

        eventTrack.style.transform =
        `translateX(${-currentSlide * slideWidth}px)`;

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
   DRAG / SWIPE
===================== */

    const slider = document.querySelector(".upcoming-slider");

    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    const swipeThreshold = 60;

    slider.addEventListener("pointerdown", (e) => {

        isDragging = true;

        startX = e.clientX;
        currentX = e.clientX;

        stopAutoPlay();

        slider.setPointerCapture(e.pointerId);

        eventTrack.classList.add("dragging");

    });

    slider.addEventListener("pointermove", (e) => {

        if (!isDragging) return;

        currentX = e.clientX;

    });

    function finishDrag(e){

        if(!isDragging) return;

        isDragging = false;

        slider.releasePointerCapture(e.pointerId);

        eventTrack.classList.remove("dragging");

        const distance = currentX - startX;

        if(distance < -swipeThreshold){

            nextSlide();

        }

        else if(distance > swipeThreshold){

            previousSlide();

        }

        startAutoPlay();

    }

    slider.addEventListener("pointerup", finishDrag);

    slider.addEventListener("pointercancel", finishDrag);

    slider.addEventListener("pointerleave", (e)=>{

        if(isDragging){

            finishDrag(e);

        }

    });

    window.addEventListener("resize", () => {

    updateSlider();

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