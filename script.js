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

const debouncedNavBarDrop = debounce(navBarDrop, 300);

const allCards = document.querySelectorAll('.cta__card');
const cardsFrontFace = document.querySelectorAll('.cta__face-front');

allCards.forEach((element) => {
    element.addEventListener('mouseover', () => {
        return element.classList.add('is-flipped');
    })
    element.addEventListener('contextmenu', (event) => {
        return event.preventDefault();
    })
});


const ctaArticleIndex = document.querySelectorAll('.content-index');
const ctaArticleTitle = document.querySelectorAll('.content-title');
const ctaArticleBody = document.querySelectorAll('.content-body');


const animateElement = (element, attribute='', pageYPosition, elementTopPosition) => {
    // if page Y coordinate exceeds an element top Y coordinate
    if (pageYPosition > elementTopPosition) {
        element.classList.add(attribute);
    } else element.classList.remove(attribute);
};

const animatedArticleIndex0 = () => {
    let pageYPosition = (previousYPos - 1300) + ctaArticleIndex[0].getBoundingClientRect().top;
    let elementTopPosition = ctaArticleIndex[0].getBoundingClientRect().top;
    return animateElement(ctaArticleIndex[0], 'slide-effect', pageYPosition, elementTopPosition)
};

const animatedArticleTitle0 = () => {
    let pageYPosition = (previousYPos - 1500) + ctaArticleTitle[0].getBoundingClientRect().top;
    let elementTopPosition = ctaArticleTitle[0].getBoundingClientRect().top;
    return animateElement(ctaArticleTitle[0], 'slide-effect', pageYPosition, elementTopPosition)
};

const animatedArticleBody0 = () => {
    let pageYPosition = (previousYPos - 1500) + ctaArticleBody[0].getBoundingClientRect().top;
    let elementTopPosition = ctaArticleBody[0].getBoundingClientRect().top;
    return animateElement(ctaArticleBody[0], 'slide-effect', pageYPosition, elementTopPosition)
};

const animatedArticleIndex1 = () => {
    let pageYPosition = (previousYPos - 1800) + ctaArticleIndex[1].getBoundingClientRect().top;
    let elementTopPosition = ctaArticleIndex[1].getBoundingClientRect().top;
    return animateElement(ctaArticleIndex[1], 'slide-effect', pageYPosition, elementTopPosition)
};

const animatedArticleTitle1 = () => {
    let pageYPosition = (previousYPos - 2100) + ctaArticleTitle[1].getBoundingClientRect().top;
    let elementTopPosition = ctaArticleTitle[1].getBoundingClientRect().top;
    return animateElement(ctaArticleTitle[1], 'slide-effect', pageYPosition, elementTopPosition)
};

const animatedArticleBody1 = () => {
    let pageYPosition = (previousYPos - 2100) + ctaArticleBody[1].getBoundingClientRect().top;
    let elementTopPosition = ctaArticleBody[1].getBoundingClientRect().top;
    return animateElement(ctaArticleBody[1], 'slide-effect', pageYPosition, elementTopPosition)
};

const animatedArticleIndex2 = () => {
    let pageYPosition = (previousYPos - 2400) + ctaArticleIndex[2].getBoundingClientRect().top;
    let elementTopPosition = ctaArticleIndex[2].getBoundingClientRect().top;
    return animateElement(ctaArticleIndex[2], 'slide-effect', pageYPosition, elementTopPosition)
};

const animatedArticleTitle2 = () => {
    let pageYPosition = (previousYPos - 2700) + ctaArticleTitle[2].getBoundingClientRect().top;
    let elementTopPosition = ctaArticleTitle[2].getBoundingClientRect().top;
    return animateElement(ctaArticleTitle[2], 'slide-effect', pageYPosition, elementTopPosition)
};

const animatedArticleBody2 = () => {
    let pageYPosition = (previousYPos - 2700) + ctaArticleBody[2].getBoundingClientRect().top;
    let elementTopPosition = ctaArticleBody[2].getBoundingClientRect().top;
    return animateElement(ctaArticleBody[2], 'slide-effect', pageYPosition, elementTopPosition)
};

const animatedArticleIndex3 = () => {
    let pageYPosition = (previousYPos - 2900) + ctaArticleIndex[3].getBoundingClientRect().top;
    let elementTopPosition = ctaArticleIndex[3].getBoundingClientRect().top;
    return animateElement(ctaArticleIndex[3], 'slide-effect', pageYPosition, elementTopPosition)
};

const animatedArticleTitle3 = () => {
    let pageYPosition = (previousYPos - 3200) + ctaArticleTitle[3].getBoundingClientRect().top;
    let elementTopPosition = ctaArticleTitle[3].getBoundingClientRect().top;
    return animateElement(ctaArticleTitle[3], 'slide-effect', pageYPosition, elementTopPosition)
};

const animatedArticleBody3 = () => {
    let pageYPosition = (previousYPos - 3200) + ctaArticleBody[3].getBoundingClientRect().top;
    let elementTopPosition = ctaArticleBody[3].getBoundingClientRect().top;
    return animateElement(ctaArticleBody[3], 'slide-effect', pageYPosition, elementTopPosition)
};

// const spinCards = () => {
//     const forEachCard = (card) => {
//         if (screenBotPosition > heroContainerBot) {
//             card.classList.add('is-spinning');
//         } else { card.classList.remove('is-spinning'); }
//     };

//     return cardsFrontFace.forEach( (card) => {forEachCard(card)} )
// };

// const ctaNarrative = document.querySelector('.cta__narrative');

// const animateNarrative = (element, attribute='', topOfElement, scrollY) => {
//     animateElement(ctaNarrative, 'active', screenBotPosition, heroContainerBot)

//     return debounce(animationEvent, 300)
// };


const documentScroll = () => {
    debouncedNavBarDrop(previousYPos);

    animatedArticleIndex0(previousYPos);
    animatedArticleTitle0(previousYPos);
    animatedArticleBody0(previousYPos);

    animatedArticleIndex1(previousYPos);
    animatedArticleTitle1(previousYPos);
    animatedArticleBody1(previousYPos);

    animatedArticleIndex2(previousYPos);
    animatedArticleTitle2(previousYPos);
    animatedArticleBody2(previousYPos);

    animatedArticleIndex3(previousYPos);
    animatedArticleTitle3(previousYPos);
    animatedArticleBody3(previousYPos);


    // spinCards();
    previousYPos = window.pageYOffset;
    // console.log('windowY= ', window.pageYOffset)
}

document.addEventListener('scroll', documentScroll);



// NEW IN PROGRESS

const blockBtnContainer = document.getElementById('code__block-btn');
const blockBtn = document.querySelector('.block-btn');
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
        await wait(20)
    }
}

const updateBox = () => {
    loop().then(addImage).catch( (error) => { console.error(error); });
};


for (let i = 0; i < 100; i++) {
    const newBlock = document.createElement('div');
    newBlock.classList.add('block');
    codeBlock.appendChild(newBlock);
}

const updateBtn = () => {
    blockBtn.classList.add('bye');
}

const addImage = () => {
    codeContainer.style.overflowY = "scroll";
    codeImage.src = '/pexels-pixabay-358238.jpg';
}

blockBtnContainer.addEventListener('click', updateBox);
blockBtn.addEventListener('click', updateBtn);