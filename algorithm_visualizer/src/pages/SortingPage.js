import { useState } from "react"
import "./SortingPage.css";
import { bubbleSortAnimation, insertionSortAnimation, quickSortAnimation, shellSortAnimation, mergeSortAnimation } from "./sort_components/sortingAlgorithms.js"

let NUM_BARS = 90;
let DELAY_TIME = 10;

const DEFAULT_COLOR = "DarkCyan";
const SORTED_COLOR = "Green"; // This must be manually updated for Shell Sort
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

  // Returns RGB value as a string
  const rgb = (r, g, b) => {
  return "rgb("+r+","+g+","+b+")";
  }

  // Quick Sort
  const quickSort = () => {
    
    const animations = quickSortAnimation(arr);
    const QSORT_DELAY_TIME = DELAY_TIME*1.5;
    
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
        }, i * QSORT_DELAY_TIME);
      } else if (action === 'swap') {
        setTimeout(() => {
          bar1_style.backgroundColor = SWAP_COLOR;
          bar2_style.backgroundColor = SWAP_COLOR;
          // Swap Bars
          let temp = bar1_style.height;
          bar1_style.height = bar2_style.height;
          bar2_style.height = temp;
        }, i * QSORT_DELAY_TIME);
      } else if (action === 'clear') {
        setTimeout(() => {
          bar1_style.backgroundColor = DEFAULT_COLOR;
          bar2_style.backgroundColor = DEFAULT_COLOR;
        }, i * QSORT_DELAY_TIME);
      } else if (action === 'sorted') {
        setTimeout(() => {
          bar1_style.backgroundColor = SORTED_COLOR;
        }, i * QSORT_DELAY_TIME);
      }
    }
    
  }


  // Bubble Sort
  const bubbleSort = () => {
    const animations = bubbleSortAnimation(arr);
    const BUBBLE_DELAY_TIME = DELAY_TIME/5;

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
        }, i * BUBBLE_DELAY_TIME);
      } else if (action === 'swap') {
        setTimeout(() => {
          bar1_style.backgroundColor = SWAP_COLOR;
          bar2_style.backgroundColor = SWAP_COLOR;
          // Swap Bars
          let temp = bar1_style.height;
          bar1_style.height = bar2_style.height;
          bar2_style.height = temp;
        }, i * BUBBLE_DELAY_TIME);
      } else if (action === 'clear') {
        setTimeout(() => {
          bar1_style.backgroundColor = DEFAULT_COLOR;
          bar2_style.backgroundColor = DEFAULT_COLOR;
        }, i * BUBBLE_DELAY_TIME);
      } else if (action === 'sorted') {
        setTimeout(() => {
          bar1_style.backgroundColor = SORTED_COLOR;
        }, i * BUBBLE_DELAY_TIME);
      }
    }
  }

  // Merge Sort (Credit to Clément Mihailescu for Merge Sort Implementation)
  const mergeSort = () => {
    const MERGE_SORT_DELAY = DELAY_TIME/2;
    const animations = mergeSortAnimation(arr);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SWAP_COLOR : SORTED_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * MERGE_SORT_DELAY);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * MERGE_SORT_DELAY);
      }
    }
  }

  // Shell Sort
  const shellSort = () => {
    const animations = shellSortAnimation(arr);
    const iterations = animations[animations.length-1][0];

    const SHELL_SORT_DELAY_TIME = DELAY_TIME;

    for (let i=0; i<animations.length; i++) {
      const arrayBars = document.getElementsByClassName('bar');
      const [iteration, action, bar1_id, bar2_id] = animations[i];

      const bar1_style = arrayBars[bar1_id].style;
      const bar2_style = arrayBars[bar2_id].style;

      let rgb_shift = 24*(iterations-iteration);
      let iterationColor = rgb(0,128,rgb_shift);

      // Performs corresponding animation for each action
      if (action === 'compare') {
        setTimeout(() => {
          bar1_style.backgroundColor = COMPARE_COLOR;
          bar2_style.backgroundColor = COMPARE_COLOR;
        }, i * SHELL_SORT_DELAY_TIME);
      } else if (action === 'swap') {
        setTimeout(() => {
          bar1_style.backgroundColor = SWAP_COLOR;
          bar2_style.backgroundColor = SWAP_COLOR;
          // Swap Bars
          let temp = bar1_style.height;
          bar1_style.height = bar2_style.height;
          bar2_style.height = temp;
        }, i * SHELL_SORT_DELAY_TIME);
      } else if (action === 'semi_sorted') {
        setTimeout(() => {
          // 0,128,0
          bar1_style.backgroundColor = iterationColor;
          bar2_style.backgroundColor = iterationColor;
        }, i * SHELL_SORT_DELAY_TIME);
      } else if (action === 'sorted') {
        setTimeout(() => {
          bar1_style.backgroundColor = iterationColor;
          bar2_style.backgroundColor = iterationColor;
        }, i * SHELL_SORT_DELAY_TIME);
      }
    }

  }

  // Insertion Sort (Performs Animation for Insertion Sort)
  const insertionSort = () => {
    const animations = insertionSortAnimation(arr);
    const ISORT_DELAY_TIME = DELAY_TIME/2.5;  
    
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

        }, i * ISORT_DELAY_TIME);
      } else if (action === 'clear') {
        setTimeout(() => {
          bar1_style.backgroundColor = SORTED_COLOR;
          bar2_style.backgroundColor = SORTED_COLOR;
        }, i * ISORT_DELAY_TIME);
      } else if (action === 'sorted') {
        setTimeout(() => {
          bar1_style.backgroundColor = SORTED_COLOR;
        }, i * ISORT_DELAY_TIME);
      }
    }
  }

  const updateTimeComplexity = (algo, best, avg, worst) => {

    let algorithm = document.querySelector("#root>div>div.center-container>div.algorithm-name>h1:nth-child(1)");
    let best_time = document.querySelector("#root>div>div.center-container>div.bigO-container>div.best-bigO>h1:nth-child(2)"); 
    let avg_time = document.querySelector("#root>div>div.center-container>div.bigO-container>div.average-bigO>h1:nth-child(2)");
    let worst_time = document.querySelector("#root>div>div.center-container>div.bigO-container>div.worst-bigO>h1:nth-child(2)");

    algorithm.textContent = algo;
    best_time.textContent = best;
    avg_time.textContent = avg;
    worst_time.textContent = worst;

  }

  return (
    <div className="sortingPage">
      
      <h1 className="title"> Sorting Algorithms </h1>

      {/* Buttons to Start/Reset Sorting Visualizer */}
      <div className="nav-bar">
        <button className="btn" onClick={() => resetArray()}>Reset</button>
        <span className="divider"></span>
        <button className="btn" onClick={() => {
          quickSort();
          updateTimeComplexity('Quick Sort','Ω(nlogn)','θ(nlogn)','O(n^2)');}
        }>Quick Sort</button>
        <button className="btn" onClick={() => {
          shellSort();
          updateTimeComplexity('Shell Sort','Ω(nlogn)','θ(nlogn)','O(n^2)');}
        }>Shell Sort</button>
        <button className="btn" onClick={() => {
          bubbleSort();
          updateTimeComplexity('Bubble Sort','Ω(n)','θ(n^2)','O(n^2)');}
        }>Bubble Sort</button>
        <button className="btn" onClick={() => {
          mergeSort();
          updateTimeComplexity('Merge Sort','Ω(nlogn)','θ(nlogn)','O(nlogn)');}
        }>Merge Sort</button>
        <button className="btn" onClick={() => {
          insertionSort();
          updateTimeComplexity('Insertion Sort','Ω(n)','θ(n^2)','O(n^2)');}
        }>Insertion Sort</button>
      </div>
      
      {/* Dynamically sets bar heights */}
      <div className="bars-container">
        {arr.map((value,index) => 
          <div className="bar" key={index} style={{'height': `${value}px` }}>
          </div>)} 
      </div>

      {/* Dynamically sets bar heights */}
      <div className="center-container">
        <div className="algorithm-name">
          <h1> Insertion Sort </h1>
          <h1> Time Complexity </h1>
        </div>
        <div className="separator"></div>
        <div className="bigO-container">
          <div className="best-bigO">
              <h1> Best: </h1>
              <h1> Ω(n) </h1>
          </div>
          <div className="average-bigO">
            <h1> Average: </h1>
            <h1> θ(n^2) </h1>
          </div>
          <div className="worst-bigO">
            <h1> Worst: </h1>
            <h1> O(n^2) </h1>
          </div>
        </div>
      </div>

    </div>
  );
}