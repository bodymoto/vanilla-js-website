const navBtn = document.querySelector('.nav__menu-btn');
let previousYPos;

// reference: https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
const throttle = (func, limit = 300) => {
    let lastFunc
    let lastRan
    return function() {
        const context = this
        const args = arguments
        if (!lastRan) {
            func.apply(context, args)
            lastRan = Date.now()
        } else {
            clearTimeout(lastFunc)
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args)
                    lastRan = Date.now()
                }
            }, limit - (Date.now() - lastRan))
        }
    }
}

const expandMenu = () => {
    const navIconImg = navBtn.firstChild.nextElementSibling;
    const menu = document.querySelector('.nav__menu');
    const menuItems = document.querySelector('.nav__menu-items');
    const documentBody = document.body;

    if (navIconImg.src.endsWith('/img/nav/menu-ready.svg')) {

        navIconImg.src = '/img/nav/menu-close.svg';
        menu.classList.add('expand');
        menuItems.classList.add('visible');
        documentBody.classList.add('no-scroll');

    } else if (navIconImg.src.endsWith('/img/nav/menu-close.svg')) {

        navIconImg.src = '/img/nav/menu-ready.svg';
        menu.classList.remove('expand');
        menuItems.classList.remove('visible');
        documentBody.classList.remove('no-scroll');
    }
};

const dropDownMenu = (previousYPos) => {
    const navBar = document.getElementById('nav-banner');
    let currentYPos = window.pageYOffset;
    let headerHeight = 100;

    if (currentYPos <= headerHeight) {
        navBar.classList.remove('active');
    } else if(currentYPos > previousYPos) {
        navBar.classList.remove('active');
    } else if(currentYPos < previousYPos) {
        navBar.classList.add('active');
    }
};

const throttleddropDownMenu = throttle(dropDownMenu);

const documentScroll = () => {
    throttleddropDownMenu(previousYPos);
    previousYPos = window.pageYOffset;
    // console.log('windowY= ', window.pageYOffset)
};

document.addEventListener('scroll', documentScroll);
navBtn.addEventListener('click', expandMenu);