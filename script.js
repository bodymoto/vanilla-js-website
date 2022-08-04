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

// !NOTE currently the hero element position is before cta element
const heroContainer = document.getElementById('hero');
let heroContainerTop;

const ctaNarrative = document.querySelector('.cta__narrative-scene');
const cardsFrontFace = document.querySelectorAll('.cta__face-front');

let ctaTopPosition;

const animationEvent = function animationEvent(element, attribute='', triggerPos, scrollYPos) {
    // if top of an element crosses a particular y coordinate
    if (triggerPos > scrollYPos ) {
        element.classList.add(attribute);
    } else { element.classList.remove(attribute); }
}

const spinCards = function spinCards() {
    cardsFrontFace.forEach(card => {
        if (ctaTopPosition > heroContainerTop) {
            card.classList.add('is-spinning');
        } else { card.classList.remove('is-spinning'); }
    })
};

document.addEventListener('scroll', () => {
    updateNavBarDrop(previousYPos);
    animationEvent(ctaNarrative, 'active', ctaTopPosition, heroContainerTop);
    spinCards();
    previousYPos = window.pageYOffset;
    heroContainerTop = heroContainer.getBoundingClientRect().bottom;
    ctaTopPosition = previousYPos + heroContainerTop;
});