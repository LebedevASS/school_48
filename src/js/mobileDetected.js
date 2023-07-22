const modalMobile = document.querySelector(".mobile-detected");
const container = document.querySelector(".container");
window.onload = function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
        .test(navigator.userAgent)) {
        container.style.pointerEvents = "none";
        modalMobile.style.opacity = "1";
    }
}