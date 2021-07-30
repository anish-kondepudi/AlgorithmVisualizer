import "./GraphPage.css";
import { dijkstra, getNodesInShortestPathOrder } from "./graph_components/graphAlgorithms";
import { useState, useEffect } from "react"
import { Node } from './graph_components/Node.js';


const CELL_SIZE = 1.5;
const GRID_HEIGHT = 70;
const PX_TO_REM = 1 / parseFloat(getComputedStyle(document.documentElement).fontSize);

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;


export const GraphPage = () => {

  // Initializes States
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [prevTimeout, setPrevTimeout] = useState(0);

  // Updates Grid when Window Size Changes
  useEffect(() => {
    updateGrid();
    window.addEventListener('resize', updateGrid);
  }, []);

  // Clears all setTimeout()'s [Hack]
  const clearAllTimeouts = () => {
    // Set a fake timeout to get the highest timeout id
    const highestTimeoutId = setTimeout(";");
    for (let i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
        
    }
    setPrevTimeout(highestTimeoutId);
  }

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  }

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  }

  // Animates Dijkstra
  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  // Animated Shortest Path
  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  // Performs Dijkstra and Animates Grids
  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  // Updates Grid based on Current Window Size
  const updateGrid = () => {
    const gridElement = document.getElementById('grid');
    setGrid(createGrid(
      Math.floor(gridElement.offsetHeight*PX_TO_REM/CELL_SIZE), 
      Math.floor(gridElement.offsetWidth*PX_TO_REM/CELL_SIZE)
    ));
  }

  // Creates a New Grid given #Rows and #Columns
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

  // Returns New Grid with Walls
  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  // Creates a Node (Object Data)
  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  // Resets Grids
  const resetGrid = () => {
    clearAllTimeouts();

    const gridElement = document.getElementById('grid');
    const rows = Math.floor(gridElement.offsetHeight*PX_TO_REM/CELL_SIZE);
    const cols = Math.floor(gridElement.offsetWidth*PX_TO_REM/CELL_SIZE);

    const newGrid = createGrid(rows,cols);

    for (let row=0; row<rows; row++) {
      for (let col=0; col<cols; col++) {
        const isEndNode = (row===FINISH_NODE_ROW && col===FINISH_NODE_COL);
        const isStartNode = (row===START_NODE_ROW && col===START_NODE_COL);

        const extraClassName = isEndNode ? 'node-finish' : isStartNode ? 'node-start' : '';

        let node = document.getElementById(`node-${row}-${col}`);
        node.className = `node ${extraClassName}`;
      }
    }

    setGrid(newGrid);
  }

  

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
                const {row, col, isFinish, isStart, isWall} = node;
                return (
                  <Node 
                    key={nodeIdx}
                    row={row}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                  />
                );
              })}
            </div>
          );
        })}
      </div>


      {/* Graph Buttons */}
      <div className="mb-3 gap-2 d-flex justify-content-start flex-wrap">
        <button className="btn btn-info" onClick={resetGrid}>Reset</button>
        <button className="btn btn-outline-light" onClick={visualizeDijkstra}>Dijkstra</button>
        <button className="btn btn-outline-light" >Depth First Search</button>
        <button className="btn btn-outline-light" >Breadth First Search</button>
      </div>

    </div>
  );
}