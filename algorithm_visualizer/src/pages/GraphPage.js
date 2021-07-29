import { useEffect, useState } from "react"
import "./GraphPage.css";
import { Node } from './graph_components/Node.js';


const CELL_SIZE = 2;
const GRID_HEIGHT = 70;
const PX_TO_REM = 1 / parseFloat(getComputedStyle(document.documentElement).fontSize);


export const GraphPage = () => {

  // Initializes Grid
  const [grid, setGrid] = useState([]);

  // for later use currently useless
  useEffect(() => {
    updateGrid();
    window.addEventListener('resize', updateGrid);
  }, []);


  const updateGrid = () => {
    console.log("hello");
    const gridElement = document.getElementById('grid');
    setGrid(createGrid(
      Math.floor(gridElement.offsetHeight*PX_TO_REM/CELL_SIZE), 
      Math.floor(gridElement.offsetWidth*PX_TO_REM/CELL_SIZE)
    ));
  }



  

    // Creates a Grid with Row x Col Nodes
  const createGrid = (rows,cols) => {
    const grid = [];
    for (let row=0; row<rows; row++) {
      const currentRow = [];
      for (let col=0; col<cols; col++) {
        currentRow.push(createNode(col, row))
      }
      grid.push(currentRow);
    }
    return grid;
  }

  // Creates a Node (Object Data)
  const createNode = (col, row) => {
    return {
      col,
      row
    };
  };

  

  return (
    <div className="graphPage container">

      {/* Title */}
      <h1 className="my-4"> Graph Algorithms </h1>

      {/* Graph Algorithm Grid */}
      <div className="grid d-flex flex-column mb-3" id="grid" style={{height: `${GRID_HEIGHT}vh`}}>
        {grid.map((row, rowIdx) => {
          return (
            <div className="grid-row d-flex flex-row" key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {row, col} = node;
                  return (
                    <Node key={nodeIdx}
                      row={row}
                      col={col}>
                    </Node>
                  );
              })}
            </div>
          );
        })}
      </div>


      {/* Graph Buttons */}
      <div className="mb-3 gap-2 d-flex justify-content-start flex-wrap">
        <button className="btn btn-info" >Reset</button>
        <button className="btn btn-outline-light" >Dijkstra</button>
        <button className="btn btn-outline-light" >Depth First Search</button>
        <button className="btn btn-outline-light" >Breadth First Search</button>
      </div>

    </div>
  );

}