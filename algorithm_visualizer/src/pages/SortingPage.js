import { useState } from "react"
import "./SortingPage.css";
import { bubbleSortAnimation, insertionSortAnimation } from "./sort_components/sortingAlgorithms.js"

let NUM_BARS = 75;
let DELAY_TIME = 10;


const DEFAULT_COLOR = "DarkCyan";
const SORTED_COLOR = "Green";
const SWAP_COLOR = "Red";
const COMPARE_COLOR = "FloralWhite";

export const SortingPage = () => {

  // Returns randomized array
  const randomArray = () => {
    const array = [];
    for (let i=1; i<=NUM_BARS; i++) {
      array.push(i);
    }
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
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
    arrayBars.forEach((bar) => {
      bar.style.backgroundColor = DEFAULT_COLOR;
    })
  }

  // Quick Sort
  const quickSort = () => {

  }

  // Bubble Sort
  const bubbleSort = () => {
    const animations = bubbleSortAnimation(arr);

    for (let i=0; i<animations.length; i++) {
      const arrayBars = document.getElementsByClassName('bar');
      const [action, bar1_id, bar2_id] = animations[i];

      const bar1_style = arrayBars[bar1_id].style;
      const bar2_style = arrayBars[bar2_id].style;

      // Performs corresponding animation for each action
      if (action === 'compare') {
        setTimeout(() => {
          bar1_style.backgroundColor = COMPARE_COLOR;
          bar2_style.backgroundColor = COMPARE_COLOR;
        }, i * DELAY_TIME);
      } else if (action === 'swap') {
        setTimeout(() => {
          bar1_style.backgroundColor = SWAP_COLOR;
          bar2_style.backgroundColor = SWAP_COLOR;
          // Swap Bars
          let temp = bar1_style.height;
          bar1_style.height = bar2_style.height;
          bar2_style.height = temp;
        }, i * DELAY_TIME);
      } else if (action === 'clear') {
        setTimeout(() => {
          bar1_style.backgroundColor = DEFAULT_COLOR;
          bar2_style.backgroundColor = DEFAULT_COLOR;
        }, i * DELAY_TIME);
      } else if (action === 'sorted') {
        setTimeout(() => {
          bar1_style.backgroundColor = SORTED_COLOR;
        }, i * DELAY_TIME);
      }
    }
  }

  // Merge Sort
  const mergeSort = () => {

  }

  // Insertion Sort (Performs Animation for Insertion Sort)
  const insertionSort = () => {
    const animations = insertionSortAnimation(arr);
    
    // Array of size 1 is sorted
    const firstBar = document.getElementsByClassName('bar')[0];
    firstBar.style.backgroundColor = SORTED_COLOR;

    // Performs Animation
    for (let i = 0; i < animations.length; i++) {

      const arrayBars = document.getElementsByClassName('bar');
      const [action, bar1_id, bar2_id] = animations[i];

      const bar1_style = arrayBars[bar1_id].style;
      const bar2_style = arrayBars[bar2_id].style;

      // Performs corresponding animation for each action
      if (action === 'swap') {

        setTimeout(() => {
          bar1_style.backgroundColor = SWAP_COLOR;
          bar2_style.backgroundColor = SWAP_COLOR;

          let temp = bar1_style.height;
          bar1_style.height = bar2_style.height;
          bar2_style.height = temp;

        }, i * DELAY_TIME);
      } else if (action === 'clear') {
        setTimeout(() => {
          bar1_style.backgroundColor = SORTED_COLOR;
          bar2_style.backgroundColor = SORTED_COLOR;
        }, i * DELAY_TIME);
      } else if (action === 'sorted') {
        setTimeout(() => {
          bar1_style.backgroundColor = SORTED_COLOR;
        }, i * DELAY_TIME);
      }
    }
  }

  return (
    <div className="sortingPage">
      
      <h1> Sorting Algorithms </h1>
      
      {/* Buttons to Start/Reset Sorting Visualizer */}
      <div className="nav-bar">
        <button className="btn" onClick={() => resetArray()}>Reset</button>
        <span className="divider"></span>
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

    {/* Sliders to Adjust Sorting Visualizer */}
      <div className="sliders">
        <div className="slider">
          <label htmlFor="speedSlider" className="form-label">Animation Speed</label><br></br>
          <input type="range" className="form-range" min="1" max="500" id="speedSlider"></input>
        </div>
        <div className="slider">
          <label htmlFor="numBarsSlider" className="form-label">Number of Bars</label><br></br>
          <input type="range" className="form-range"  min="10" max="150" id="numBarsSlider"></input>
        </div>
      </div>


    </div>
  );
}