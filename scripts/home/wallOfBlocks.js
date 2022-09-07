export const blockBtnContainer = document.getElementById('engine__block-btn');
export const blockBtn = document.querySelector('.engine-btn');

export const updateBtn = () => {
    blockBtn.classList.add('bye');
};

export const createBlockGrid = (blockCount = 184) => {
    const blocks = document.querySelector('.engine__block-container');

    for (let i = 0; i < blockCount; i++) {
        const newBlock = document.createElement('div');
        newBlock.classList.add('block');
        blocks.appendChild(newBlock);
    }
}

// reference: https://tinyurl.com/reference-wait
const wait = (ms) => new Promise( (resolve) => {
    setTimeout(resolve, ms)
});

export const updateBox = async () => {
    const squares = document.querySelectorAll('.block');

    for (let square of squares) {
        square.classList.add('bye');
        await wait(10)
    }
};