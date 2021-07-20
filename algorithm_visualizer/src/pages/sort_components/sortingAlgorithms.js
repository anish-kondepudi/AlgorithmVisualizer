
export const insertionSortAnimation = (array) => {
    const animations = [];

    let N = array.length;
    let i, j, key;
 
    for (i = 1; i < N; i++) {
        j = i;
 
        // Insert array[i] into list 0..i-1
        while (j >= 0 && array[j] < array[j-1]) {
 
            // Swap array[j] and array[j-1]
            let temp = array[j];
            array[j] = array[j-1];
            array[j-1] = temp;
            // Add swapping to animation
            animations.push([j,j-1])
            // Decrement j by 1
            j -= 1;
        }
        // Add end of iteration to animation
        animations.push([-1,j])
    }
    return animations;
}