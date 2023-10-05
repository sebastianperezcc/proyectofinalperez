/* const slider = document.getElementById("slider");
const images = slider.querySelectorAll("img");
const imageCount = images.length;
let currentIndex = 0;

function changeImage() {
    currentIndex = (currentIndex + 1) % imageCount;
    const translateX = -currentIndex * 100; // Ancho de la imagen
    slider.style.transform = `translateX(${translateX}%)`;
}

setInterval(changeImage, 5000); // Cambia de imagen cada 5 segundos (5000 ms)
