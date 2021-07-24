import { useState, useEffect } from "react"
import "./SortingPage.css";
import { bubbleSortAnimation, insertionSortAnimation, quickSortAnimation, shellSortAnimation, mergeSortAnimation } from "./sort_components/sortingAlgorithms.js"

const DEFAULT_COLOR = "DarkCyan";
const SORTED_COLOR = "Green";
const SWAP_COLOR = "Red";

export const SortingPage = () => {
  
  const [timeComplexity, setTimeComplexity] = useState();
  const [numberOfBars, setNumberOfBars] = useState(100);
  const [delay, setDelay] = useState(10);

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
    return array;
  }

  // Create randomized array upon launch of page
  const [arr, setArr] = useState(randomArray());

  // Resets array with default color and randomized values 
  const resetArray = () => {
    clearAllTimeouts();

    const arrayBars = [...document.getElementsByClassName('bar')];

    const array = randomArray();
    
    arrayBars.forEach((bar, index) => {
      const offsetDelay = 1500 * index / numberOfBars;
      const duration = 500;

      bar.style.backgroundColor = DEFAULT_COLOR;
      bar.animate([
        {height: '0px'},
        {height: '0px', offset: offsetDelay / (offsetDelay + duration)},
        {height: `${array[index]}px`}
      ], {
        // timing options
        duration: offsetDelay + duration,
        iterations: 1
      });
    });

    setArr(array);
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

  // Insertion Sort
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
      <div className="buttons-bar">
        <button className="btn" onClick={() => resetArray()}>Reset</button>
        <span className="divider"></span>
        <button className="btn" onClick={() => {quickSort();}}>Quick Sort</button>
        <button className="btn" onClick={() => {shellSort();}}>Shell Sort</button>
        <button className="btn" onClick={() => {bubbleSort();}}>Bubble Sort</button>
        <button className="btn" onClick={() => {mergeSort();}}>Merge Sort</button>
        <button className="btn" onClick={() => {insertionSort();}}>Insertion Sort</button>
      </div>

      {/* Sliders to Adjust Number of Bars and Animation Speed */}
      <div className="sliders-container">
        <div className="slider-container">
          <h4> Number of Bars : {numberOfBars} </h4>
          <input onChange={(e) => {
            setNumberOfBars(Math.round(e.target.value));
            setArr(randomArray(numberOfBars));
          }} type="range" step="1" min="5" max="300" value={numberOfBars} className="form-range numberOfBars slider"></input>
        </div>
        <div className="slider-container">
          <h4> Animation Speed : {Math.round((31-delay)/30 * 100)}% </h4>
          <input onChange={(e) => {
            setDelay(31 - e.target.value);
          }} type="range" step="1" min="1" max="30" value={31-delay} className="form-range speed slider"></input>
        </div>
      </div>    
      
      {/* Dynamically Time Complexities */}
      {timeComplexity && <div className="sorting-info-container">
        <div className="algorithm-name">
          <h2>{ timeComplexity.algo }</h2>
          <h2> Time Complexity </h2>
        </div>
        <div className="separator"></div>
        <div className="bigO-container">
          <div className="best-bigO">
              <h2> Best: </h2>
              <h2> { timeComplexity.best } </h2>
          </div>
          <div className="average-bigO">
            <h2> Average: </h2>
            <h2> { timeComplexity.avg } </h2>
          </div>
          <div className="worst-bigO">
            <h2> Worst: </h2>
            <h2> { timeComplexity.worst } </h2>
          </div>
        </div>
      </div> }
      
    </div>
  );
}