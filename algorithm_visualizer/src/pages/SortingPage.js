import { useState } from 'react'
import "./SortingPage.css";

const NUM_BARS = 75;

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
    for (let i=0; i<NUM_BARS; i++) {
      array.push(getRandomInt(5,500));
    }
    console.log(array);
    return array;
  }

  // Create randomized array upon launch of page
  const [arr, setArr] = useState(() => {
      return randomArray();
  })

  // Resets array with randomized values
  const resetArray = () => {
    setArr(randomArray());
  }

  return (
    <div className="sortingPage">
      
      <h1> Sorting Algorithms </h1>
      
      <div className="nav-bar">
        <button className="btn" onClick={() => resetArray()}>Reset</button>
        <button className="btn">Sort</button>
        <span class="divider"></span>
        <button className="btn">Quick Sort</button>
        <button className="btn">Bubble Sort</button>
        <button className="btn">Merge Sort</button>
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