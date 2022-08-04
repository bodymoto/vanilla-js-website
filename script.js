const navBar = document.querySelector('.header__container');
const navBtn = document.querySelector('.nav__btn');
let previousYPos;

const iconSwap = (element, starturl='', endurl='') => {
    if (element.src.endsWith(starturl)) {
        element.src = endurl;
    } else if (element.src.endsWith(endurl)) {
        element.src = starturl;
    }
};

navBtn.addEventListener('click', () => {
    iconSwap(
        navBtn.firstChild.nextElementSibling,
        '/img/nav/menu-ready.svg',
        '/img/nav/menu-close.svg'
    )
});

const debounce = (func, timeout) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
};

const updateNavBarDrop = debounce((previousYPos) => {
    let currentYPos = window.pageYOffset;

    if (currentYPos <= 100) {
        navBar.classList.remove('active');
    } else if(currentYPos > previousYPos) {
        navBar.classList.remove('active');
    } else if(currentYPos < previousYPos) {
        navBar.classList.add('active');
    }
}, 300);

document.addEventListener('scroll', () => {
    updateNavBarDrop(previousYPos);
    previousYPos = window.pageYOffset;
});

const allCards = document.querySelectorAll('.cta__card');

allCards.forEach( element => {
    element.addEventListener('mouseover', () => {
        element.classList.add('is-flipped');
    })
    element.addEventListener('contextmenu', (event) => {
        // set to false to protect privacy
        event.preventDefault();
    })
});

const cardScene = document.querySelector('.cta__grid');
const cardsFront = document.querySelectorAll('.cta__face-front');

const spinCards = function spinCards() {
    const fieldOfView = window.innerHeight;
    const baseLine = cardScene.getBoundingClientRect().top;

    cardsFront.forEach(card => {
        if (baseLine < fieldOfView) {
            card.classList.add('is-spinning');
        } else { card.classList.remove('is-spinning'); }
    })
};

window.addEventListener('scroll', spinCards);