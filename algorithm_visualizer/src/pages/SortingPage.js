import { useState, useEffect } from "react"
import "./SortingPage.css";
import { bubbleSortAnimation, insertionSortAnimation, quickSortAnimation, shellSortAnimation, mergeSortAnimation } from "./sort_components/sortingAlgorithms.js"

const DEFAULT_COLOR = "DarkCyan";
const SORTED_COLOR = "Green";
const SWAP_COLOR = "Red";
const COMPARE_COLOR = "FloralWhite";

export const SortingPage = () => {
  
  const [timeComplexity, setTimeComplexity] = useState();
  const [numberOfBars, setNumberOfBars] = useState(100);
  const [delay, setDelay] = useState(5);

  useEffect(() => {
    resetArray();
  }, []);

  // Clears all setTimeout()'s [Hack]
  const clearAllTimeouts = () => {
    // Set a fake timeout to get the highest timeout id
    var highestTimeoutId = setTimeout(";");
    for (var i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
    }
  }

  // Returns randomized array
  const randomArray = () => {
    const array = [];
    var step = (500) / (numberOfBars - 1);
    for (var i = 0; i < numberOfBars; i++) {
      array.push(5 + (step * i));
    }
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    console.log(array);
    console.log(numberOfBars);
    return array;
  }

  // Create randomized array upon launch of page
  const [arr, setArr] = useState(randomArray());

  // Resets array with default color and randomized values 
  const resetArray = () => {
    const delay = 4;

    clearAllTimeouts();
    setArr(randomArray());

    const arrayBars = [...document.getElementsByClassName('bar')];
    
    arrayBars.forEach((bar) => {
      bar.style.opacity = 0;
    })

    arrayBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.style.backgroundColor = DEFAULT_COLOR;
        bar.style.opacity = 1;
      }, index * delay);
    })
  }

  const animate = (animations) => {
    clearAllTimeouts();

    const arrayBars = Array.from(document.getElementsByClassName('bar'));

    arrayBars.forEach((bar) => {
      bar.style.backgroundColor = DEFAULT_COLOR;
    })

    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {     
        for (let j = 0; j < animations[i].length; j++) {
          const [color, id, height] = animations[i][j];
          const barStyle = arrayBars[id].style;

          if (height !== -1) {
            arr[id] = height;
            barStyle.height = `${height}px`;
          }
          

          if (color === 'swap') barStyle.backgroundColor = SWAP_COLOR;
          if (color === 'clear') barStyle.backgroundColor = DEFAULT_COLOR;
          if (color === 'sorted') barStyle.backgroundColor = SORTED_COLOR;
        }
      }, i * delay);
    }
  }

  // Quick Sort
  const quickSort = () => {
    setTimeComplexity({
      algo: 'Quick Sort',
      best: 'Ω(nlogn)',
      avg: 'θ(nlogn)',
      worst: 'O(n^2)'
    });

    animate(quickSortAnimation(arr));
  }

  // Bubble Sort
  const bubbleSort = () => {
    setTimeComplexity({
      algo: 'Bubble Sort',
      best: 'Ω(n)',
      avg: 'θ(n^2)',
      worst: 'O(n^2)'
    });

    animate(bubbleSortAnimation(arr));
  }

  // Merge Sort (Credit to Clément Mihailescu for Merge Sort Implementation)
  const mergeSort = () => {
    setTimeComplexity({
      algo: 'Merge Sort',
      best: 'Ω(nlogn)',
      avg: 'θ(nlogn)',
      worst: 'O(nlogn)'
    });

    animate(mergeSortAnimation(arr));
  }

  // Shell Sort
  const shellSort = () => {
    setTimeComplexity({
      algo: 'Shell Sort',
      best: 'Ω(nlogn)',
      avg: 'θ(nlogn)',
      worst: 'O(n^2)'
    });

    animate(shellSortAnimation(arr));
  }

  // Insertion Sort (Performs Animation for Insertion Sort)
  const insertionSort = () => {
    setTimeComplexity({
      algo: 'Insertion Sort',
      best: 'Ω(n)',
      avg: 'θ(n^2)',
      worst: 'O(n^2)'
    });

    animate(insertionSortAnimation(arr));
  }

  

  return (
    <div className="container sortingPage">
      
      <h1 className="title"> Sorting Algorithms </h1>

      {/* Dynamically sets bar heights */}
      <div className="bars-container">
        {arr.map((value,index) => 
            <div className="bar" key={index} style={{'height': `${value}px` }}></div>
        )} 
      </div>

      {/* Buttons to Start/Reset Sorting Visualizer */}
      <div className="nav-bar">
        <button className="btn" onClick={() => resetArray()}>Reset</button>
        <span className="divider"></span>
        <button className="btn" onClick={() => {quickSort();}}>Quick Sort</button>
        <button className="btn" onClick={() => {shellSort();}}>Shell Sort</button>
        <button className="btn" onClick={() => {bubbleSort();}}>Bubble Sort</button>
        <button className="btn" onClick={() => {mergeSort();}}>Merge Sort</button>
        <button className="btn" onClick={() => {insertionSort();}}>Insertion Sort</button>
      </div>

      <input onInput={(e) => {
        setNumberOfBars(Math.round(e.target.value));
        setArr(randomArray(numberOfBars));
      }} type="range" class="form-range" step="1" min="5" max="300" className="numberOfBars"></input>

      <input onInput={(e) => {
        setDelay(31 - e.target.value);
      }} type="range" class="form-range" step="1" min="1" max="30" className="speed"></input>
      
      

      {/* Dynamically sets bar heights */}
      {timeComplexity && <div className="center-container">
        <div className="algorithm-name">
          <h1>{ timeComplexity.algo }</h1>
          <h1> Time Complexity </h1>
        </div>
        <div className="separator"></div>
        <div className="bigO-container">
          <div className="best-bigO">
              <h1> Best: </h1>
              <h1> { timeComplexity.best } </h1>
          </div>
          <div className="average-bigO">
            <h1> Average: </h1>
            <h1> { timeComplexity.avg } </h1>
          </div>
          <div className="worst-bigO">
            <h1> Worst: </h1>
            <h1> { timeComplexity.worst } </h1>
          </div>
        </div>
      </div> }
      
    </div>
  );
}