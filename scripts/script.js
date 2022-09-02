import { debounce, throttle, wait } from './performance.js';
import { iconSwap, navBarDrop } from './navBar.js';

/* Styling https://airbnb.io/javascript/ */

const navBar = document.getElementById('nav-banner');
const navBtn = document.querySelector('.nav__menu-btn');
const menu = document.querySelector('.nav__menu');
const menuItems = document.querySelector('.nav__menu-items');
const body = document.body;
let previousYPos;

const navMenuExpand = () => {
    return (
        menu.classList.add('expand'),
        menuItems.classList.add('visible'),
        body.classList.add('no-scroll')
    )
}

const navMenuShrink = () => {
    return (
        menu.classList.remove('expand'),
        menuItems.classList.remove('visible'),
        body.classList.remove('no-scroll')
    )
}

const navIcon = () => {
    const navElement = navBtn.firstChild.nextElementSibling;
    return iconSwap(
        navElement,
        '/img/nav/menu-ready.svg',
        '/img/nav/menu-close.svg',
        navMenuExpand,
        navMenuShrink
    )
};

navBtn.addEventListener('click', navIcon);

const throttledNavBarDrop = throttle(navBarDrop);

const ctaIndexFrames = document.querySelectorAll('.cta__content-index-frame');
const ctaTitleFrames = document.querySelectorAll('.cta__content-title-frame');

const ctaIndexFrameElements = document.querySelectorAll('.content-index');
const ctaTitleFrameElements = document.querySelectorAll('.content-title');
const ctaBodyFrameElements = document.querySelectorAll('.content-body');

let ctaIndexFramesCoordinatesY = [];
let ctaTitleFramesCoordinatesY = [];
const connectNarrative = document.querySelector('.friendly__narrative');
const connectContainerCoordinates = document.querySelector('.friendly__container-wrap');

const storeNodeListCoordinates = (emptyArray, nodeList) => {
    let count = 0
    nodeList.forEach((index) => {
        emptyArray[count] = index.getBoundingClientRect().bottom;
        count++;
    })
    return emptyArray
};

const animateNodeListElements = (listOfCoordinates, nodeList, attribute='') => {
    let count = 0;
    listOfCoordinates.forEach((coordinate) => {
        if ( (coordinate - window.innerHeight) <= 0) {
            nodeList[count].classList.add(attribute);
            count++;
        } else {
            nodeList[count].classList.remove(attribute);
            count++;
        }
    })
};

const allCards = document.querySelectorAll('.friendly__card');
const cardsFrontFace = document.querySelectorAll('.friendly__face-front');
let cardsCoordinatesY = [];

const animateElement = (elementCoordinates, element, attribute='') => {
    if ((elementCoordinates - window.innerHeight) <= 0) {
        element.classList.add(attribute);
    } else { 
        element.classList.remove(attribute);
    }
}

const checkCondition = (child, throttleFn) => {
    // checks if users view has entered container with event conditions
    const targetChild = document.body.children[1].children[child].getBoundingClientRect().top;
    if ( (targetChild - window.innerHeight) > 0) {
        return;
    } else {
        return throttleFn();
    }
}

const getCtaFrameLocations = () => {
    return ( 
        storeNodeListCoordinates(ctaIndexFramesCoordinatesY, ctaIndexFrames),
        storeNodeListCoordinates(ctaTitleFramesCoordinatesY, ctaTitleFrames)
    )
};

const animateCtaElementsOnScroll = () => {
    getCtaFrameLocations();
    return (
        animateNodeListElements(ctaIndexFramesCoordinatesY, ctaIndexFrameElements, 'slide-effect'),
        animateNodeListElements(ctaTitleFramesCoordinatesY, ctaTitleFrameElements, 'slide-effect'),
        // title and body elements share trigger for frame coordinates
        animateNodeListElements(ctaTitleFramesCoordinatesY, ctaBodyFrameElements, 'slide-effect')
    )
};

const throttledCtaEvents = throttle(animateCtaElementsOnScroll, 300);

allCards.forEach((element) => {
    element.addEventListener('mouseover', () => {
        return element.classList.add('is-flipped');
    })
    element.addEventListener('contextmenu', (event) => {
        return event.preventDefault();
    })
});

const animateConnectElementOnScroll = () => {
    const connectNarrativeCoordinatesY = connectNarrative.getBoundingClientRect().bottom;
    storeNodeListCoordinates(cardsCoordinatesY, allCards);
    return (
        animateElement(connectNarrativeCoordinatesY, connectNarrative, 'active'),
        animateNodeListElements(cardsCoordinatesY, cardsFrontFace, 'is-spinning')
    )
}

const throttledConnectEvents = throttle(animateConnectElementOnScroll, 300);

const throttledCheckCondition = (conditionFn) => {
    throttle(conditionFn, 300);
};

const documentScroll = () => {

    throttledNavBarDrop(previousYPos);
    
    throttledCheckCondition(checkCondition(1, throttledCtaEvents))
    throttledCheckCondition(checkCondition(3, throttledConnectEvents))

    previousYPos = window.pageYOffset;
    // console.log('windowY= ', window.pageYOffset)
};

document.addEventListener('scroll', documentScroll);


const blockBtnContainer = document.getElementById('engine__block-btn');
const blockBtn = document.querySelector('.engine-btn');
const blocks = document.querySelector('.engine__block-container');

const updateBox = async () => {
    const squares = document.querySelectorAll('.block');

    for (let square of squares) {
        square.classList.add('bye');
        await wait(10)
    }
};

const createBlockGrid = (blockCount = 184) => {
    for (let i = 0; i < blockCount; i++) {
        const newBlock = document.createElement('div');
        newBlock.classList.add('block');
        blocks.appendChild(newBlock);
    }
}

const updateBtn = () => {
    blockBtn.classList.add('bye');
};

createBlockGrid();
blockBtnContainer.addEventListener('click', updateBox);
blockBtn.addEventListener('click', updateBtn);