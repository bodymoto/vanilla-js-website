const navBar = document.getElementById('navigation');
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
    );
});

// https://www.freecodecamp.org/news/javascript-debounce-example/
// https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086

const debounce = function debounce(func, delay) {
    let timeout;
    return function executeTimeout(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};


const updateNavBar = debounce(function navBarDrop(previousYPos) {
    let currentYPos = window.pageYOffset;

    if (currentYPos <= 100) {
        navBar.classList.remove('active');
    } else if(currentYPos > previousYPos) {
        navBar.classList.remove('active');
    } else if(currentYPos < previousYPos) {
        navBar.classList.add('active');
    }
}, 300);

const allCards = document.querySelectorAll('.cta__card');

allCards.forEach((element) => {
    element.addEventListener('mouseover', () => {
        return element.classList.add('is-flipped');
    })
    element.addEventListener('contextmenu', (event) => {
        return event.preventDefault();
    })
});

const spinCards = function spinCards() {
    cardsFrontFace.forEach( function forEachCard(card) {
        if (screenBotPosition > heroContainerBot) {
            card.classList.add('is-spinning');
        } else { card.classList.remove('is-spinning'); }
    })
};

// !NOTE currently the hero element position is before cta element
const heroContainer = document.getElementById('hero');
let heroContainerBot;

const ctaNarrative = document.querySelector('.cta__narrative');
const cardsFrontFace = document.querySelectorAll('.cta__face-front');

let screenBotPosition;

// flag optimizes runtime when scrolling post-executed DOM animations
let flag = false;

const animateNarrative = debounce(function animationEvent(
    element,
    attribute='',
    topOfElement,
    scrollYPos
) {
    if (flag) { return; }
    // if top of an element crosses a particular y coordinate
    if (topOfElement > scrollYPos ) {
        element.classList.add(attribute);
        flag = true;
    }
}, 500);


const documentScroll = function documentScroll() {
    updateNavBar(previousYPos);
    if (!flag) {
        animateNarrative(
            ctaNarrative,
            'active',
            screenBotPosition,
            heroContainerBot
        );
        spinCards();
    }
    previousYPos = window.pageYOffset;
    heroContainerBot = heroContainer.getBoundingClientRect().bottom;
    screenBotPosition = (previousYPos - 200) + heroContainerBot;
}

document.addEventListener('scroll', documentScroll);