import { useState, useEffect } from "react"
import { bubbleSortAnimation, insertionSortAnimation, quickSortAnimation, shellSortAnimation, mergeSortAnimation } from "./sort_components/sortingAlgorithms.js"
import "./SortingPage.css";

const DEFAULT_COLOR = "#0dcaf0";
const SORTED_COLOR = "#28a745";
const SWAP_COLOR = "#dc3545";
const HEIGHT = 50;

export const SortingPage = () => {

  const [prevTimeout, setPrevTimeout] = useState(0);
  const [timeComplexity, setTimeComplexity] = useState({algo: '', best: '', avg: '', worst: ''});
  const [numberOfBars, setNumberOfBars] = useState(100);
  const [speed, setSpeed] = useState(50);

  // Clears all setTimeout()'s [Hack]
  const clearAllTimeouts = () => {
    // Set a fake timeout to get the highest timeout id
    let highestTimeoutId = setTimeout(()=>{});
    for (let i = prevTimeout ; i < highestTimeoutId ; i++) {
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

    setTimeComplexity({algo: '', best: '', avg: '', worst: ''});

    const array = randomArray();

    const arrayBars = [...document.getElementsByClassName('bar')];

    arrayBars.forEach((bar, index) => {
      const offsetDelay = 750 * index / numberOfBars;
      const duration = 200;
      bar.style.height = `${array[index]}vh`;
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

    setArr(array);
  }

  useEffect(() => {
    resetArray();
    // eslint-disable-next-line
  }, []);

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
      
      <h1 className="title"> <a href="/AlgorithmVisualizer/#/"><i class="fas fa-arrow-circle-left fa-lg me-3" aria-hidden="true"></i></a>Sorting Algorithms</h1>

      {/* Dynamically sets bar heights */}
      <div className="bars-container mb-3" style={{'height': `${HEIGHT}vh`}}>
        {arr.map((value,index) => 
            <div className="bar" key={index} style={{'height': `${value}vh` }}></div>
        )} 
      </div>
      
      <div className="row gap-3 mb-3">
        <div className="col-md-12 col-lg-9">
          <div className="mb-3 gap-2 d-flex justify-content-start flex-wrap">
            <button className="btn btn-info" onClick={resetArray}>Reset</button>
            <button className="btn btn-outline-light" onClick={quickSort}>Quick Sort</button>
            <button className="btn btn-outline-light" onClick={shellSort}>Shell Sort</button>
            <button className="btn btn-outline-light" onClick={bubbleSort}>Bubble Sort</button>
            <button className="btn btn-outline-light" onClick={mergeSort}>Merge Sort</button>
            <button className="btn btn-outline-light" onClick={insertionSort}>Insertion Sort</button>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-6">
              <label className="form-label"> Number of Bars : {numberOfBars} </label>
              <input type="range" step="1" min="5" max="500" defaultValue={numberOfBars} className="form-range"
                onMouseDown={() => {
                  clearAllTimeouts();
                  resetColors();
                }} 
                onChange={(e) => {
                  setNumberOfBars(e.target.value);
                  setArr(randomArray(e.target.value));
                }} />
            </div>
            <div className="col-sm-12 col-md-6">
              <label className="form-label"> Animation Speed : {speed}% </label>
              <input type="range" step="1" min="1" max="100" defaultValue={speed} className="form-range"
                onMouseDown={() => {
                  clearAllTimeouts();
                  resetColors();
                }} 
                onChange={(e) => {
                  setSpeed(e.target.value);
                }} />
            </div>
          </div>
        </div>

        <div className="col">
          <table className="table table-sm table-borderless text-white w-auto mb-0">
            <tbody>
              <tr>
                <th className="pe-3 pt-0" scope="row">Algorithm</th>
                <td className="pt-0">{ timeComplexity.algo }</td>
              </tr>
              <tr>
                <th className="pe-3 pt-0" scope="row">Best</th>
                <td className="pt-0">{ timeComplexity.best }</td>
              </tr>
              <tr>
                <th className="pe-3 pt-0" scope="row">Average</th>
                <td className="pt-0">{ timeComplexity.avg }</td>
              </tr>
              <tr>
                <th className="pe-3 pt-0" scope="row">Worst</th>
                <td className="pt-0">{ timeComplexity.worst }</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>    
    </div>
  );
}