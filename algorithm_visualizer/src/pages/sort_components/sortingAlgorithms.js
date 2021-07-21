
export const bubbleSortAnimation = (array) => {
    const animations = [];
    const n = array.length
    let i, j;

    // n-1 runs of bubble sort
    for (i = 0; i < n-1; i++) {
        // runs 1 less from the end each time
        for (j = 0; j < n-i-1; j++) {

            animations.push(['compare',j,j+1]);

            // Swap array[j] and array[j-1] if it's larger
            if (array[j] > array[j+1]) {

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

export const quickSortAnimation = (array) => {
    const animations = [];

    const partition = (arr, start, end) => {
        // Taking the last element as the pivot
        const pivotValue = arr[end];
        let pivotIndex = start; 
        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                // Swapping elements
                [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                animations.push(['swap', i, pivotIndex]);
                animations.push(['clear', i, pivotIndex])
                // Moving to next element
                pivotIndex++;
            }
        }
        
        // Putting the pivot value in the middle
        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
        animations.push(['swap', end, pivotIndex]);
        animations.push(['clear', end, pivotIndex]);

        return pivotIndex;
    };

    const quickSort = (arr, start, end) => {
        // Base case or terminating case
        if (start > end) {
            return;
        }
        
        // Returns pivotIndex
        const index = partition(arr, start, end);

        animations.push(['sorted', index, index]);
        
        // Recursively apply the same logic to the left and right subarrays
        quickSort(arr, start, index - 1);
        quickSort(arr, index + 1, end);
    }

    quickSort(array, 0, array.length -1)

    return animations;
}