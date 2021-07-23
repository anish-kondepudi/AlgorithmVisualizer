import { useState } from "react"
import "./GraphPage.css";
import { Node } from './graph_components/Node.js';

const NUM_ROWS = 16;
const NUM_COLS = 40;


export const GraphPage = () => {

    // Creates a Grid with Row x Col Nodes
  const createGrid = (rows,cols) => {
    const grid = [];
    for (let row=0; row<rows; row++) {
      const currentRow = [];
      for (let col=0; col<cols; col++) {
        currentRow.push(createNode)
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

  // Initializes Grid
  const [grid, setGrid] = useState(createGrid(NUM_ROWS,NUM_COLS));

  return (
    <div className="graphPage">

      {/* Title */}
      <h1> Graph Algorithms </h1>

      {/* Graph Buttons */}
      <div className="nav-bar">
        <button className="btn">Clear</button>
        <span className="divider"></span>
        <button className="btn">Dijkstra</button>
        <button className="btn">Depth First Search</button>
        <button className="btn">Breadth First Seaarch</button>
      </div>

      {/* Graph Algorithm Grid */}
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {row, col} = node;
                  return (
                    <Node
                      row={row}
                      col={col}>
                    </Node>
                  );
              })}
            </div>
          );
        })}
      </div>

    </div>
  );

}