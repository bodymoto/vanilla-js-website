/* Style Guide
https://airbnb.io/javascript/ */

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

// https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
const throttle = (func, limit) => {
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

    debouncedNavBarDrop(previousYPos);
    
    throttledCheckCondition(checkCondition(1, throttledCtaEvents))
    throttledCheckCondition(checkCondition(3, throttledConnectEvents))

    previousYPos = window.pageYOffset;
    // console.log('windowY= ', window.pageYOffset)
};

document.addEventListener('scroll', documentScroll);





// NEW IN PROGRESS

const blockBtnContainer = document.getElementById('code__block-btn');
const blockBtn = document.querySelector('.code-btn');
const codeBlock = document.querySelector('.code__block');
const codeImage = document.getElementById('code');
const codeContainer = document.querySelector('.code__container');


// https://thewebdev.info/2022/02/09/how-to-create-pause-or-delay-in-a-javascript-for-loop/#:~:text=JavaScript%20for%20loop%3F-,To%20create%20pause%20or%20delay%20in%20a%20JavaScript%20for%20loop,with%20a%20for%2Dof%20loop.&text=to%20define%20the%20wait%20function,to%20loop%20through%20an%20array.

const wait = (ms) => new Promise( (resolve) => {
    setTimeout(resolve, ms)
});

const loop = async () => {
    const squares = document.querySelectorAll('.block');

    for (let square of squares) {
        square.classList.add('bye');
        await wait(10)
    }
};

const updateBox = () => {
    loop().then(addImage).catch( (error) => { console.error(error); });
};

for (let i = 0; i < 184; i++) {
    const newBlock = document.createElement('div');
    newBlock.classList.add('block');
    codeBlock.appendChild(newBlock);
}

const updateBtn = () => {
    blockBtn.classList.add('bye');
};

const addImage = () => {
    codeContainer.style.overflowY = "scroll";
    codeImage.src = '/pexels-pixabay-358238.jpg';
};

blockBtnContainer.addEventListener('click', updateBox);
blockBtn.addEventListener('click', updateBtn);