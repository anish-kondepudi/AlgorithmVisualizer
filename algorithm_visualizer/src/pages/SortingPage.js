import { useState, useEffect } from "react"
import { bubbleSortAnimation, insertionSortAnimation, quickSortAnimation, shellSortAnimation, mergeSortAnimation } from "./sort_components/sortingAlgorithms.js"
import "./SortingPage.css";

const DEFAULT_COLOR = "DarkCyan";
const SORTED_COLOR = "Green";
const SWAP_COLOR = "Red";
const HEIGHT = 50;

export const SortingPage = () => {

  const [prevTimeout, setPrevTimeout] = useState(0);
  const [timeComplexity, setTimeComplexity] = useState();
  const [numberOfBars, setNumberOfBars] = useState(100);
  const [speed, setSpeed] = useState(50);

  useEffect(() => {
    resetArray();
  }, []);

  // Clears all setTimeout()'s [Hack]
  const clearAllTimeouts = () => {
    // Set a fake timeout to get the highest timeout id
    var highestTimeoutId = setTimeout(";");
    for (var i = prevTimeout ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
        
    }
    setPrevTimeout(highestTimeoutId);
  }

  // Returns randomized array
  const randomArray = (num = numberOfBars) => {
    let min = HEIGHT/num;
    let max = HEIGHT;
    const array = [];
    var step = (max-min) / (num - 1);
    for (var i = 0; i < num; i++) {
      array.push(HEIGHT/num + (step * i));
    }
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const resetColors = () => {
    const arrayBars = [...document.getElementsByClassName('bar')];

    arrayBars.forEach((bar) => {
      bar.style.backgroundColor = DEFAULT_COLOR;
    });
  }

  // Create randomized array upon launch of page
  const [arr, setArr] = useState(randomArray());

  // Resets array with default color and randomized values 
  const resetArray = () => {
    clearAllTimeouts();

    setTimeComplexity(null);

    const array = randomArray();
    setArr(array);

    const arrayBars = [...document.getElementsByClassName('bar')];

    arrayBars.forEach((bar, index) => {
      const offsetDelay = 750 * index / numberOfBars;
      const duration = 200;

      bar.style.backgroundColor = DEFAULT_COLOR;
      bar.animate([
        {height: '0vh'},
        {opacity: .1, height: '0vh', offset: offsetDelay / (offsetDelay + duration)},
        {opacity: 1, height: `${array[index]}vh`}
      ], {
        // timing options
        duration: offsetDelay + duration,
        iterations: 1
      });
    });

    
    
  }

  const animate = (animations) => {
    const delay = 1000/numberOfBars * 3 * Math.pow(1/3,speed/50)

    clearAllTimeouts();

    const arrayBars = Array.from(document.getElementsByClassName('bar'));
    
    resetColors();

    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {     
        for (let j = 0; j < animations[i].length; j++) {
          const [color, id, height] = animations[i][j];
          const barStyle = arrayBars[id].style;

          if (height !== -1) {
            arr[id] = height;
            barStyle.height = `${height}vh`;
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
      <div className="bars-container" style={{'height': `${HEIGHT}vh`}}>
        {arr.map((value,index) => 
            <div className="bar" key={index} style={{'height': `${value}vh` }}></div>
        )} 
      </div>

      {/* Buttons to Start/Reset Sorting Visualizer */}
      <div className="buttons-bar">
        <button className="btn" onClick={() => {resetArray();}}>Reset</button>
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
          <input onMouseDown={() => {
            clearAllTimeouts();
            resetColors();
          }} onChange={(e) => {
            setNumberOfBars(e.target.value);
            setArr(randomArray(e.target.value));
          }} type="range" step="1" min="5" max="500" defaultValue={numberOfBars} className="form-range numberOfBars slider"></input>
        </div>
        <div className="slider-container">
          <h4> Animation Speed : {speed}%</h4>
          <input onMouseDown={() => {
            clearAllTimeouts();
            resetColors();
          }} onChange={(e) => {
            setSpeed(e.target.value);
          }} type="range" step="1" min="0" max="100" defaultValue={speed} className="form-range speed slider"></input>
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