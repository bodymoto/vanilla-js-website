import { throttle } from './throttle.js';
import { allCards, animateCards } from './cards.js';
import { 
    animateElementEvent,
    storeNodeListCoordinates,
    animateNodeListElements
} from './elementChecks.js';
import {
    blockBtnContainer,
    blockBtn,
    updateBtn,
    createBlockGrid,
    updateBox
} from './wallOfBlocks.js';

// js styling: https://airbnb.io/javascript/

let ctaIndexFramesCoordinatesY = [];
let ctaTitleFramesCoordinatesY = [];

const getCtaFrameLocations = () => {
    const ctaIndexFrames = document.querySelectorAll('.cta__content-index-frame');
    const ctaTitleFrames = document.querySelectorAll('.cta__content-title-frame');

    return ( 
        storeNodeListCoordinates(ctaIndexFramesCoordinatesY, ctaIndexFrames),
        storeNodeListCoordinates(ctaTitleFramesCoordinatesY, ctaTitleFrames)
    )
};

const animateCtaElementsOnScroll = () => {
    const ctaIndexFrameElements = document.querySelectorAll('.content-index');
    const ctaTitleFrameElements = document.querySelectorAll('.content-title');
    const ctaBodyFrameElements = document.querySelectorAll('.content-body');

    getCtaFrameLocations();

    return (
        animateNodeListElements(ctaIndexFramesCoordinatesY, ctaIndexFrameElements, 'slide-effect'),
        animateNodeListElements(ctaTitleFramesCoordinatesY, ctaTitleFrameElements, 'slide-effect'),
        // title and body elements are the same coordinates to trigger both events
        animateNodeListElements(ctaTitleFramesCoordinatesY, ctaBodyFrameElements, 'slide-effect')
    )
};

const animateCardElementsOnScroll = () => {
    const cardsFrontFace = document.querySelectorAll('.friendly__face-front');
    let cardsCoordinatesY = [];
    const connectNarrative = document.querySelector('.friendly__narrative');
    const connectNarrativeCoordinatesY = connectNarrative.getBoundingClientRect().bottom;

    storeNodeListCoordinates(cardsCoordinatesY, allCards);

    return (
        animateElementEvent(connectNarrativeCoordinatesY, connectNarrative, 'active'),
        animateNodeListElements(cardsCoordinatesY, cardsFrontFace, 'is-spinning')
    )

}

const throttledCtaEvents = throttle(animateCtaElementsOnScroll, 300);
const throttledConnectEvents = throttle(animateCardElementsOnScroll, 300);

const checkCondition = (child, throttleFn) => {
    // checks if users view has entered container to trigger event conditions
    const docMainElement = document.body.children[1];
    const targetChild = docMainElement.children[child].getBoundingClientRect().top;

    if ((targetChild - window.innerHeight) > 0) {
        return;
    } else {
        return throttleFn();
    }
}

const throttledCheckCondition = (conditionFn) => {
    throttle(conditionFn, 300);
};

const documentScroll = () => {
    throttledCheckCondition(checkCondition(1, throttledCtaEvents))
    throttledCheckCondition(checkCondition(3, throttledConnectEvents))
};

document.addEventListener('scroll', documentScroll);
animateCards(allCards);
createBlockGrid();
blockBtnContainer.addEventListener('click', updateBox);
blockBtn.addEventListener('click', updateBtn);