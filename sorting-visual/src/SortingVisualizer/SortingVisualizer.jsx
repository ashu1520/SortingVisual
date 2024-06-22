import React from 'react';
import './SortingVisualizer.css'
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';


//Change this value for the speed of the animantion
const ANIMATION_SPEED_MS = 1;

//Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

//This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

//This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [], // Main array that is stored in state
        };
    }
componentDidMount() { // When the app load or when this compoenets loads for 1st time we call this resetArray.
    this.resetArray();
}
//This resetArray Method is same method that we call when we click on generate array button
resetArray() {
    const array =[]; // array declaration
    for(let i=0;i<NUMBER_OF_ARRAY_BARS;i++) { // iterates 310 times
        array.push(randomIntFromInterval(5, 730)); // Pushes random values between 5 and 730 in the array
    }
    this.setState({array});//re-sets the state to have this new array 
}
//Merge Sort
mergeSort(){
    //There is a built in JavaSript Sort function to sort the array 
    /*
    In the case of the sort((a, b) => a - b) function, the compare function returns a negative number if the first element is
     less than the second element, a positive number if the first element is greater than the second element, and 0 if the two elements
      are equal.
    This means that the sort() method will sort the elements of the array in ascending order.
    */
   const animantions = getMergeSortAnimations(this.state.array);
   for(let i = 0; i < animantions.length; i++ ) {
    const arrayBars = document.getElementsByClassName('array-bar');
    const isColorChange = i % 3 !== 2;
    if(isColorChange) {
        const [barOneIndex, barTwoIndex] = animantions[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style; 
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() =>{
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
        }, i*ANIMATION_SPEED_MS);

    }
    else {
        setTimeout(() => {
            const [barOneIndex, newHeight] = animantions[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            barOneStyle.height = `${newHeight}px`;
            }, i* ANIMATION_SPEED_MS);
    }
   }
  /*  console.log('Merge Sort')
    const javaScriptSortedArray = this.state.array
    .slice()
    .sort((a, b) => a - b);
    const mergeSortedArray = sortingAlgorithms.mergeSort(this.state.array);
   
    console.log(arrayAreEqual(javaScriptSortedArray, mergeSortedArray))
 */
}
//Quick Sort
/* quickSort () {
    console.log('Quick Sort')
    const javaScriptSortedArray = this.state.array
    .slice()
    .sort((a, b) => a - b);
    console.log("javaScriptSortedArray length = "+javaScriptSortedArray.length)
    const quickSortedArray = sortingAlgorithms.quickSort(this.state.array);
    console.log('Quick Sorted Array length = '+quickSortedArray.length)
    console.log(arrayAreEqual(javaScriptSortedArray, quickSortedArray))
} */
//test Sorting Algo
testSortingAlgo() {
    for(let i=0;i < 100;i++) { // Creates 100 of arrays
        const array =[];
        const randomArrayRange = randomIntFromInterval(1,1000); // Length of every array is 1 to 100.
        const randomArrayRangeLength =randomArrayRange.length;
        for(let i=0;i< randomArrayRangeLength ;i++) {
            array.push(randomIntFromInterval(-1000,1000)); // Every array contains random values ranging from -1000 to 1000.
        }
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    const mergeSortedArray = getMergeSortAnimations(array.slice());
    console.log("javaScriptSortedArray length = "+javaScriptSortedArray.length)
    console.log('MergeSort Sorted array length = '+mergeSortedArray.length) 
    console.log(arrayAreEqual(javaScriptSortedArray, mergeSortedArray))
    }
}

render() {
    const {array} = this.state;
    return(// for all the array contianers
        <div className='array-container'> 
        {array.map((value, idx) => ( //iterating through array and mapping all the values to this "div".
            <div className="array-bar" key={idx} style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`}}></div>
            //Height of the bar is the value that is randomly generated.
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort Array</button>
        <button onClick={() => this.quickSort()}>Quick Sort Array</button>
        <button onClick={() => this.heapSort()}>Heap Sort Array</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort Array</button>
        <button onClick={() => this.testSortingAlgo()}>Test sorting Algorithms</button>
        </div>
    );
    }
}
// This function generate Random Number between two value min & max.
// here i am allowing duplicate value in the generation.
function randomIntFromInterval(min, max){
    //min and max included
    return Math.floor(Math.random() * (max-min+1)+min);
}

// to check whether the output of both sort fucntion is same or not.
function arrayAreEqual(arrayOne, arrayTwo) {
    if(arrayOne.length !== arrayTwo.length) return false;
    for(let i=0;i< arrayOne.length;i++) {
        if(arrayOne[i] !== arrayTwo[i])  return false;
    }
    return true;
}


