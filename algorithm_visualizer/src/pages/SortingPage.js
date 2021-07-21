import { useState } from "react"
import "./SortingPage.css";
import { insertionSortAnimation } from "./sort_components/sortingAlgorithms.js"

const NUM_BARS = 75;

const DEFAULT_COLOR = "DarkCyan";
const SORTED_COLOR = "green";
const COMPARE_COLOR = "FloralWhite";

const DELAY_TIME = 5;

export const SortingPage = () => {

  // Returns a random number between min (inclusive) and max (inclusive)
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Returns randomized array
  const randomArray = () => {
    const array = [];
    for (let i=1; i<=NUM_BARS; i++) {
      array.push(i);
    }

    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array.map(x => x*5);
  }

  // Create randomized array upon launch of page
  const [arr, setArr] = useState(randomArray());

  // Resets array with default color and randomized values 
  const resetArray = () => {
    setArr(randomArray());
    const arrayBars = [...document.getElementsByClassName('bar')];
    arrayBars.map((bar) => {
      bar.style.backgroundColor = DEFAULT_COLOR;
    })
  }

  // Quick Sort
  const quickSort = () => {

  }

  // Bubble Sort
  const bubbleSort = () => {

  }

  // Merge Sort
  const mergeSort = () => {

  }

  // Insertion Sort
  const insertionSort = () => {
    const animations = insertionSortAnimation(arr);
    const arrayBars = document.getElementsByClassName('bar');

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('bar');
      const [bar1_id, bar2_id] = animations[i];

      //Array of size 1 is sorted
      arrayBars[0].style.backgroundColor = SORTED_COLOR;

      // Swaps bars (-1 indicates end of iteration)
      if (bar1_id !== -1) {
        const bar1_style = arrayBars[bar1_id].style;
        const bar2_style = arrayBars[bar2_id].style;

        setTimeout(() => {
          bar1_style.backgroundColor = SORTED_COLOR;
          bar2_style.backgroundColor = COMPARE_COLOR;

          let temp = bar1_style.height;
          bar1_style.height = bar2_style.height;
          bar2_style.height = temp;

        }, i * DELAY_TIME);
      } else {
        setTimeout(() => {
          const bar2_style = arrayBars[bar2_id].style;
          bar2_style.backgroundColor = SORTED_COLOR;
        }, i * DELAY_TIME);
      }

    }


  }

  return (
    <div className="sortingPage">
      
      <h1> Sorting Algorithms </h1>
      
      <div className="nav-bar">
        <button className="btn" onClick={() => resetArray()}>Reset</button>
        <span class="divider"></span>
        <button className="btn" onClick={() => quickSort()}>Quick Sort</button>
        <button className="btn" onClick={() => bubbleSort()}>Bubble Sort</button>
        <button className="btn" onClick={() => mergeSort()}>Merge Sort</button>
        <button className="btn" onClick={() => insertionSort()}>Insertion Sort</button>
      </div>

      {/* Dynamically sets bar heights */}
      <div className="bars-container">
        {arr.map((value,index) => 
          <div className="bar" key={index} style={{'height': `${value}px` }}>
          </div>)} 
      </div>

    </div>
  );
}