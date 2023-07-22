window.onload = function () {
    // Выбираем пункт меню в соответствии с загруженной страницей
    let links = document.querySelectorAll('.sidebar__menu > li > a');
    for (let i = 0; i < links.length; i++) {
        if (links[i].href === document.location.href)
            links[i].classList.add('active');
    }
}