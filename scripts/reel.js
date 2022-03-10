// increment images
let count = 0

function imageReel(){
    if (!document.images) {
        return document.getElementById('image_reel').src = reelImages[count].src
    }
    for (let i = 0; i <= count; i++)
        if (count < 3) {
            count++
        }
        else
            count = 0
};

// 2.5 seconds
setTimeout("imageReel()", 2500);

imageReel();