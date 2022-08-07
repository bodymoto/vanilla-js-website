/* Style Guide
https://airbnb.io/javascript/ */

const navBar = document.getElementById('nav-banner');
const navBtn = document.querySelector('.menu-btn');
let previousYPos;

const iconSwap = (element, starturl='', endurl='') => {
    if (element.src.endsWith(starturl)) {
        element.src = endurl;
    } else if (element.src.endsWith(endurl)) {
        element.src = starturl;
    }
};

const navIcon = (element, starturl='', endurl='') => {
    return iconSwap(navBtn.firstChild.nextElementSibling,
        '/img/nav/menu-ready.svg',
        '/img/nav/menu-close.svg')
}

navBtn.addEventListener('click', navIcon);

/* https://www.freecodecamp.org/news/javascript-debounce-example/
https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086 */
const debounce = (func, delay) => {
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

const updateNavBar = () => {
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

    return debounce(navBarDrop(previousYPos), 300)
}

const allCards = document.querySelectorAll('.cta__card');

allCards.forEach((element) => {
    element.addEventListener('mouseover', () => {
        return element.classList.add('is-flipped');
    })
    element.addEventListener('contextmenu', (event) => {
        return event.preventDefault();
    })
});

const spinCards = () => {
    const forEachCard = (card) => {
        if (screenBotPosition > heroContainerBot) {
            card.classList.add('is-spinning');
        } else { card.classList.remove('is-spinning'); }
    };

    return cardsFrontFace.forEach( (card) => {forEachCard(card)} )
};

// !NOTE currently the hero element position is before cta element
const heroContainer = document.getElementById('hero');
let heroContainerBot;

const ctaNarrative = document.querySelector('.cta__narrative');
const cardsFrontFace = document.querySelectorAll('.cta__face-front');

let screenBotPosition;

let flag = false;

const animationEvent = (element, attribute='', topOfElement, scrollY) => {
    if (flag) {return;}
    // if top of an element crosses a particular y coordinate
    if (topOfElement > scrollY) {
        element.classList.add(attribute);
        flag = true;
    }
};

const animateNarrative = (element, attribute='', topOfElement, scrollY) => {
    animationEvent(ctaNarrative, 'active', screenBotPosition, heroContainerBot)

    return debounce(animationEvent, 300)
};


const documentScroll = () => {
    updateNavBar(previousYPos);
    // optimizes runtime when scrolling post-executed DOM animations
    if (!flag) {
        animateNarrative();
        spinCards();
    }
    previousYPos = window.pageYOffset;
    heroContainerBot = heroContainer.getBoundingClientRect().bottom;
    screenBotPosition = (previousYPos - 200) + heroContainerBot;
}

document.addEventListener('scroll', documentScroll);