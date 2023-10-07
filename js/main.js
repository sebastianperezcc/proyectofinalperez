let currentSlide = 1;
const totalSlides = 4;
let autoChangeInterval;

function changeSlide(slideNumber) {
    currentSlide = slideNumber;
    const slider = document.querySelector(".slider");
    const slideWidth = slider.offsetWidth;
    slider.scrollTo({ left: (slideNumber - 1) * slideWidth, behavior: "smooth" });
    clearInterval(autoChangeInterval);
    autoChangeInterval = setInterval(autoChangeSlide, 5000);
}

function autoChangeSlide() {
    currentSlide = (currentSlide % totalSlides) + 1;
    changeSlide(currentSlide);
}

autoChangeInterval = setInterval(autoChangeSlide, 5000);

window.addEventListener("resize", function () {
    changeSlide(currentSlide);
});