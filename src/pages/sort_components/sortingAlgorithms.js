
export const bubbleSortAnimation = (array) => {
    array = array.slice();

    const animations = [];
    const n = array.length
    let i, j;

    // n-1 runs of bubble sort
    for (i = 0; i < n-1; i++) {
        // runs 1 less from the end each time
        for (j = 0; j < n-i-1; j++) {
            if (array[j] > array[j+1]) {
                // Swap array[j] and array[j+1]
                [array[j],  array[j+1]] = [ array[j+1], array[j]];
                animations.push([
                    ['swap', j, array[j]], 
                    ['swap', j+1, array[j+1]]
                ]);
                animations.push([
                    ['clear', j, array[j]], 
                    ['clear', j+1, array[j+1]]
                ]);
            }
            if (j+1 === n-i-1) {
                animations.push([
                    ['sorted', j+1, array[j+1]], 
                ]);
            }
        }
    }
    animations.push([
        ['sorted', 0, array[0]], 
    ]);

    return animations;
}

export const insertionSortAnimation = (array) => {
    array = array.slice();

    const animations = [];
    let i, j;

    animations.push([
        ['sorted', 0, array[0]]
    ]);
 
    for (i = 1; i < array.length; i++) {
        j = i;
        // Insert array[i] into list 0..i-1
        while (j >= 0 && array[j] < array[j-1]) {
            // Swap array[j] and array[j-1]
            [array[j],  array[j-1]] = [ array[j-1], array[j]];
            // Add swapping to animation
            animations.push([
                ['swap', j, array[j]], 
                ['swap', j-1, array[j-1]]
            ]);
            animations.push([
                ['sorted', j, array[j]], 
                ['sorted', j-1, array[j-1]]
            ]);
            // Decrement j by 1
            j -= 1;
        }
        // Add end of iteration to animation
        animations.push([ 
            ['sorted', j, array[j]]
        ]);
    }
    return animations;
}

export const quickSortAnimation = (array) => {
    array = array.slice();

    const animations = [];

    const partition = (arr, start, end) => {
        // Taking the last element as the pivot
        let pivotValue = arr[end];
        let pivotIndex = start; 
        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                // Swapping elements
                [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                animations.push([
                    ['swap', i, array[i]],
                    ['swap', pivotIndex, array[pivotIndex]]
                ]);
                animations.push([
                    ['clear', i, array[i]],
                    ['clear', pivotIndex, array[pivotIndex]]
                ]);
                // Moving to next element
                pivotIndex++;
            }
        }
        
        // Putting the pivot value in the middle
        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
        animations.push([
            ['swap', end, array[end]],
            ['swap', pivotIndex, array[pivotIndex]]
        ]);
        animations.push([
            ['clear', end, array[end]],
            ['clear', pivotIndex, array[pivotIndex]]
        ]);

        return pivotIndex;
    };

    const quickSort = (arr, start, end) => {
        // Base case or terminating case
        if (start > end) {
            return;
        }
        
        // Returns pivotIndex
        const index = partition(arr, start, end);

        animations.push([
            ['sorted', index, array[index]],
        ]);
        
        // Recursively apply the same logic to the left and right subarrays
        quickSort(arr, start, index - 1);
        quickSort(arr, index + 1, end);
    }

    quickSort(array, 0, array.length -1)

    return animations;
}

export const shellSortAnimation = (array) => {
    const animations = [];

    array = array.slice();

    let n = array.length;
    
    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))
    {
        // Do a gapped insertion sort for this gap size.
        // The first gap elements a[0..gap-1] are already
        // in gapped order keep adding one more element
        // until the entire array is gap sorted
        for (let i = gap; i < n; i += 1)
        {
            // add a[i] to the elements that have been gap
            // sorted save a[i] in temp and make a hole at
            // position i
            let temp = array[i];
            // shift earlier gap-sorted elements up until
            // the correct location for a[i] is found
            let j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
                animations.push([
                    ['swap', j, array[j]],
                    ['swap', j-gap, array[j-gap]]
                ]);

                if (gap === 1) { 
                    animations.push([
                        ['sorted', j, array[j]],
                        ['sorted', j-gap, array[j-gap]]
                    ]);
                }
                else {
                    animations.push([
                        ['clear', j, array[j]],
                        ['clear', j-gap, array[j-gap]]
                    ]);
                }
            }
            // put temp (the original a[i]) in its correct
            // location
            array[j] = temp;
            if (gap === 1) {
                animations.push([
                    ['sorted', j, temp]
                ]);
            }
            else {
                animations.push([
                    ['clear', j, temp]
                ]);
            }
        }
    }
    return animations;
}

// Credit to Clément Mihailescu for Merge Sort Implementation
export const mergeSortAnimation = (array) => {

    const mergeSortHelper = (mainArray, startIdx, endIdx, auxiliaryArray, animations, ) => {
      if (startIdx === endIdx) return;
      const middleIdx = Math.floor((startIdx + endIdx) / 2);
      mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
      mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
      doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
    }

    const doMerge = (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations,) => {
      let k = startIdx;
      let i = startIdx;
      let j = middleIdx + 1;
      while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.

        // These are the values that we're comparing; we push them a second
        // time to revert their color.
    
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
          // We overwrite the value at index k in the original array with the
          // value at index i in the auxiliary array.
          mainArray[k] = auxiliaryArray[i];

          animations.push([
            ['swap', k, mainArray[k]],
            ['swap', i, -1]
          ]);
          animations.push([
            ['sorted', k, -1],
            ['sorted', i, -1]
          ]);

          k++;
          i++;
        } else {
          // We overwrite the value at index k in the original array with the
          // value at index j in the auxiliary array.
          
          mainArray[k] = auxiliaryArray[j];

          animations.push([
            ['swap', k, mainArray[k]],
            ['swap', j, -1]
          ]);
          animations.push([
            ['sorted', k, -1],
            ['sorted', j, -1]
          ]);

          k++;
          j++;
        }
      }
      while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.

        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        
        mainArray[k] = auxiliaryArray[i];

        animations.push([
            ['swap', k, mainArray[k]],
            ['swap', i, -1]
        ]);
        animations.push([
            ['sorted', k, -1],
            ['sorted', i, -1]
        ]);
        k++;
        i++;
      }
      while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.

        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        mainArray[k] = auxiliaryArray[j];

        animations.push([
            ['swap', k, mainArray[k]],
            ['swap', j, -1],
        ]);
        animations.push([
            ['sorted', k, -1],
            ['sorted', j, -1]
        ]);

        k++;
        j++;
      }
    }

    array = array.slice();

    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);

    return animations;
}
