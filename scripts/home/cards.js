export const allCards = document.querySelectorAll('.friendly__card');

export const animateCards = (allCards) => {
    allCards.forEach((element) => {
        element.addEventListener('mouseover', () => {
            return element.classList.add('is-flipped');
        })
        element.addEventListener('contextmenu', (event) => {
            return event.preventDefault();
        })
    });
}