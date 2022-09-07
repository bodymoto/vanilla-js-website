export const animateElementEvent = (elementCoordinates, element, attribute='') => {
    if ((elementCoordinates - window.innerHeight) <= 0) {
        element.classList.add(attribute);
    } else { 
        element.classList.remove(attribute);
    }
}

export const storeNodeListCoordinates = (emptyArray, nodeList) => {
    let count = 0
    nodeList.forEach((index) => {
        emptyArray[count] = index.getBoundingClientRect().bottom;
        count++;
    })

    return emptyArray
};

export const animateNodeListElements = (listOfCoordinates, nodeList, attribute='') => {
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