const navBar = document.getElementById('nav-banner');
const navBtn = document.querySelector('.nav__menu-btn');
const menu = document.querySelector('.nav__menu');
const menuItems = document.querySelector('.nav__menu-items');
const body = document.body
let previousYPos;

const iconSwap = (element, starturl='', endurl='') => {
    if (element.src.endsWith(starturl)) {
        element.src = endurl;
        menu.classList.add('expand');
        menuItems.classList.add('visible');
        body.classList.add('no-scroll');
    } else if (element.src.endsWith(endurl)) {
        element.src = starturl;
        menu.classList.remove('expand');
        menuItems.classList.remove('visible');
        body.classList.remove('no-scroll');
    }
};

const navIcon = () => {
    return iconSwap(navBtn.firstChild.nextElementSibling,
        '/img/nav/menu-ready.svg',
        '/img/nav/menu-close.svg')
};

navBtn.addEventListener('click', navIcon);

/* https://www.freecodecamp.org/news/javascript-debounce-example/
https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086 */
const debounce = (func, delay = 300) => {
    let timeout;

    const executeTimeout = (...args) => {
        clearTimeout(timeout);
        const setTime = () => {
            func.apply(this, args);
        }
        timeout = setTimeout(setTime, delay);
    };

    return executeTimeout
};

const navBarDrop = (previousYPos) => {
    let currentYPos = window.pageYOffset;

    if (currentYPos <= 100) {
        navBar.classList.remove('active');
    } else if(currentYPos > previousYPos) {
        navBar.classList.remove('active');
    } else if(currentYPos < previousYPos) {
        navBar.classList.add('active');
    }
};

const debouncedNavBarDrop = debounce(navBarDrop);

const documentScroll = () => {

    debouncedNavBarDrop(previousYPos);

    previousYPos = window.pageYOffset;
    // console.log('windowY= ', window.pageYOffset)
};

document.addEventListener('scroll', documentScroll);