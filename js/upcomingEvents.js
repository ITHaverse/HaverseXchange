/* ===================================================
   UPCOMING EVENT CAROUSEL
=================================================== */

const slider = document.querySelector(".upcoming-slider");
const eventTrack = document.querySelector(".upcoming-track");
const eventSlides = document.querySelectorAll(".event-slide");
const eventIndicators = document.querySelectorAll(".indicator");

if (eventTrack && eventSlides.length > 0) {

    let currentSlide = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let animationID = null;
    let autoPlay;

    function updateSlider(animate = true) {

        const slideWidth = slider.offsetWidth;

        currentTranslate = -(currentSlide * slideWidth);
        previousTranslate = currentTranslate;

        if(animate){

            eventTrack.style.transition =
                "transform .55s cubic-bezier(.22,.61,.36,1)";

        }else{

            eventTrack.style.transition = "none";

        }

        eventTrack.style.transform =
            `translate3d(${currentTranslate}px,0,0)`;

        updateIndicators();
    }

    function setTranslate(x){

    currentTranslate = x;

    eventTrack.style.transform =
        `translate3d(${x}px,0,0)`;

    }

    function updateIndicators() {

    eventIndicators.forEach((dot, index) => {

        if (index === currentSlide) {

            dot.classList.add("active");

        } else {

            dot.classList.remove("active");

        }

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
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    const swipeThreshold = 60;

    slider.addEventListener("pointermove",(e)=>{

        if(!isDragging) return;

        currentX = e.clientX;

        const delta = currentX - startX;

        setTranslate(previousTranslate + delta);

    });
    
    slider.addEventListener("pointerdown", (e) => {

    isDragging = true;

    startX = e.clientX;
    currentX = e.clientX;

    previousTranslate = currentTranslate;

    stopAutoPlay();

    slider.setPointerCapture(e.pointerId);

    eventTrack.classList.add("dragging");

    });

    function finishDrag(e){
    
    if (!isDragging) return;

    isDragging = false;

    slider.releasePointerCapture(e.pointerId);

    eventTrack.classList.remove("dragging");
    
    const distance = currentX - startX;

    if(distance < -swipeThreshold){

        currentSlide++;

    }
    else if(distance > swipeThreshold){

        currentSlide--;

    }

    if(currentSlide < 0){

        currentSlide = eventSlides.length - 1;

    }

    if(currentSlide >= eventSlides.length){

        currentSlide = 0;

    }

    updateSlider(true);
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