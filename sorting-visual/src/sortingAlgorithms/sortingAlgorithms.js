//Merge sort work on Divide & Conqure therefor its a recursive algorithm
/*If the problem is large then break the problem into sub-Problems and when the problem becomes small then solve it and combine
the solution of the Small problem to get the solution of the large problem.
Merge Sort Says that :- If there is a single elements that means that we dont have to sort it.*/
// Algorithm for Merge Sort
/*
Algortihm MergeSort(low,high)  --------------- T(n)
{
    if(low < high)  -------------------------- 
    {
        mid=(low + high)/2; ------------------ 1
        MergeSort(low, mid); ----------------- T(n/2)
        MergeSort(mid+1 , high); ------------- T(n/2)
        Merge(low, mid, high);   ------------- n
    }
}                        ---------------------T(n) = 2T(n/2)+n   when n>1
                                                         1       when n=1            
    Time Complexity is  n(log(n))
*/

/* MERGE SORT WITHOUT ANIMATION 
export const mergeSort = array => {
    if(array.length === 1) return array;
    const middleIndex = Math.floor(array.length / 2);
    const firstHalf = mergeSort(array.slice(0, middleIndex));
    const secondHalf = mergeSort(array.slice(middleIndex));
    //Merge() function below
    const sortedArray = [];
    let i=0, j=0;
    while(i < firstHalf.length && j < secondHalf.length) {
        if(firstHalf[i] < secondHalf[j]) {
            sortedArray.push(firstHalf[i++]);
        }
        else{
            sortedArray.push(secondHalf[j++]);
        }
    }
    // for( ;i<=firstHalf.length;i++) sortedArray.push(firstHalf[i]);
    while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
    // for( ;j<=secondHalf.length;j++) sortedArray.push(secondHalf[j]);
    while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);
    return sortedArray;
}; */
export function getMergeSortAnimations(array) {
    const animations = [];
    if(array.length <= 1) return array;
    const auxiliaryArray =  array.slice();
    mergeSortHelper(array, 0, array.length-1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIndex,
    endIndex,
    auxiliaryArray,
    animations,
) {
    if (startIndex === endIndex) return;
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(auxiliaryArray, startIndex, middleIndex, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIndex+1, endIndex, mainArray, animations);
    doMerge(mainArray, startIndex, middleIndex, endIndex, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIndex,
    middleIndex,
    endIndex,
    auxiliaryArray,
    animations,
) {
    let k = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;
    while (i <= middleIndex && j <= endIndex) {
        // These are the values that we are comparing. we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we are comparing. We push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else  {
            // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIndex) {
        // These are the values that we are comparing. We push them once to change their color.
        animations.push([i, i]);
        // These are the values that we are comparing. We push them a second time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];

    }
    while (j <= endIndex) {
        // These are the values that we are comparing. We push them once to change their color.
        animations.push([j, j]);
        // These are the values that we are comparing. We push them a second time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];

    }
}



// Quick Sort
export const quickSort = array => {

};