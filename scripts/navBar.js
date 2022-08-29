const iconSwap = (elementImg, starturl='', endurl='', fcExpand, fcShrink) => {
    if (elementImg.src.endsWith(starturl)) {
        elementImg.src = endurl;
        fcExpand();
    } else if (elementImg.src.endsWith(endurl)) {
        elementImg.src = starturl;
        fcShrink();
    }
};

const navBar = document.getElementById('nav-banner');

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

export { iconSwap, navBarDrop };