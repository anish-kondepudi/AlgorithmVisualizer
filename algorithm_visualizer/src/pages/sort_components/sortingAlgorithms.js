
export const bubbleSortAnimation = (array) => {
    const animations = [];
    const n = array.length
    let i, j;

    for (i=0; i<n-1; i++) {
        for (j=0; j<n-i-1; j++) {
            animations.push(['compare',j,j+1]);
            if (array[j] > array[j+1]) {
                // Swap array[j] and array[j-1]
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                animations.push(['swap',j,j+1]);
            }
            animations.push(['clear',j,j+1]);
            if (j+1 === n-i-1) {
                animations.push(['sorted',j+1,j+1]);
            }
        }
    }
    return animations;
}

export const insertionSortAnimation = (array) => {
    const animations = [];
    let i, j;
 
    for (i = 1; i < array.length; i++) {
        j = i;
        // Insert array[i] into list 0..i-1
        while (j >= 0 && array[j] < array[j-1]) {
            // Swap array[j] and array[j-1]
            let temp = array[j];
            array[j] = array[j-1];
            array[j-1] = temp;
            // Add swapping to animation
            animations.push(['swap',j,j-1])
            animations.push(['clear',j,j-1]);
            // Decrement j by 1
            j -= 1;
        }
        // Add end of iteration to animation
        animations.push(['sorted',j,j])
    }
    return animations;
}