const navBar = document.querySelector('.header__container');
const navBtn = document.querySelector('.nav__btn');
let previousYPos;

const iconSwap = (element, starturl='', endurl='') => {
    if(element.src.endsWith(starturl)){
        element.src = endurl;
    }
    else if(element.src.endsWith(endurl)){
        element.src = starturl;
    }
};

navBtn.addEventListener('click', iconSwap(
    navBtn.firstChild.nextElementSibling,
    '/img/nav/menu-open.svg',
    '/img/nav/menu-close.svg')
);

const debounce = (fn, timeout) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
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

const eachCard = document.querySelectorAll('.cta__card');

eachCard.forEach( element => {
    element.addEventListener('mouseover', () => {
        element.classList.add('is-flipped');
    })
})

const cardScene = document.querySelector('.cta__grid');
const cardFront = document.querySelectorAll('.cta__face-front');

window.addEventListener('scroll', spinCards)

function spinCards() {
    const fieldOfView = window.innerHeight;
    const baseLine = cardScene.getBoundingClientRect().top;

    cardFront.forEach(card => {
        if (baseLine < fieldOfView) {
            card.classList.add('is-spinning');
        } else { card.classList.remove('is-spinning'); }
    })
}
