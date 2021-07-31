import "./GraphPage.css";
import { dijkstra, getNodesInShortestPathOrder } from "./graph_components/graphAlgorithms";
import { useState, useEffect, useRef } from "react"
import Node from './graph_components/Node';


const CELL_SIZE = 2;
const GRID_HEIGHT = 70;
const PX_TO_REM = 1 / parseFloat(getComputedStyle(document.documentElement).fontSize);
const pxToNode = (px) => {
  return Math.floor(px*PX_TO_REM/CELL_SIZE);
}

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;


export const GraphPage = () => {

  // Initializes States
  const grid = useRef([]).current;
  const gridRef = useRef();
  const [dimensions, setDimensions] = useState(null);
  const [prevTimeout, setPrevTimeout] = useState(0);

  let mouseIsPressed = false;
  let startRow, startCol, endRow, endCol = null;
  

  // Updates Grid when Window Size Changes
  useEffect(() => {
    onNextFrame(() => {
      resetGrid();
    })
      

    resizeGrid();
    window.addEventListener('resize', resizeGrid);
    gridRef.current.addEventListener("mousedown", handleMouseDown);
    gridRef.current.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);


    return function cleanup() {
      window.removeEventListener('resize', resizeGrid);
      gridRef.current.removeEventListener("mousedown", handleMouseDown);
      gridRef.current.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  }, []);

  useEffect(() => {
    console.log("hello")
  }, [dimensions]);

  // Clears all setTimeout()'s [Hack]
  const clearAllTimeouts = () => {
    // Set a fake timeout to get the highest timeout id
    const highestTimeoutId = setTimeout(()=>{});
    for (let i = prevTimeout ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
    }
    setPrevTimeout(highestTimeoutId);
  }

  function onNextFrame(callback) {
    setTimeout(function () {
        requestAnimationFrame(callback)
    })
}

  const handleMouseDown = e => {
    const [name, row, col] = e.target.id.split('-');
    if (name === "node") {
      grid[row][col].setState({type: 'wall'})
      mouseIsPressed = true;
    }
  }

  const handleMouseMove = e => {
    if (!mouseIsPressed) return;
    const [name, row, col] = e.target.id.split('-');
    if (name === "node") {
      grid[row][col].setState({type: 'wall'})
    }
  }

  const handleMouseUp = () => {
    mouseIsPressed = false;
  }

  /*
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
  */

  // Resets Grids
  const resetGrid = () => {
    clearAllTimeouts();

    for (let row=0; row<grid.length; row++) {
      for (let col=0; col<grid[0].length; col++) {
        grid[row][col].setState({type: ''});
      }
    }

    const rows = pxToNode(gridRef.current.offsetHeight);
    const cols = pxToNode(gridRef.current.offsetWidth);

    [startRow, startCol] = [2,2];
    [endRow, endCol] = [rows-3, cols-3];
    
    grid[startRow][startCol].setState({type: 'start'});
    grid[endRow][endCol].setState({type: 'end'});
  }

  const resizeGrid = () => {
    const rows = pxToNode(gridRef.current.offsetHeight);
    const cols = pxToNode(gridRef.current.offsetWidth);

    setDimensions({
      rows: rows, 
      cols: cols
    });

    if (startRow && startCol && endRow && endCol) {
      if (startRow > rows - 1) startRow = rows - 1;
      if (startCol > cols - 1) startCol = cols - 1;
      if (endRow > rows - 1) endRow = rows - 1;
      if (endCol > cols - 1) endCol = cols - 1;
      grid[endRow][endCol].setState({type: 'end'});
    }

    
  }



 

  const makeGridElement = () => {
    grid.length = 0;

    return (
      <div className="grid d-flex flex-column mb-3" id="grid" ref={gridRef} style={{width: '100%', height: `${GRID_HEIGHT}vh`}}>
        { dimensions &&
          [...Array(dimensions.rows)].map((e1,i) => {
            const currentRow = [];
            const elementRow = (
              <div className="grid-row d-flex flex-row" key={i}>
                {
                  [...Array(dimensions.cols)].map((e2,j) => {
                    return (
                      <Node 
                        ref={ref=>currentRow.push(ref)}
                        key={j}
                        row={i}
                        col={j}
                        type={''}
                      />
                    );
                  })
                }
              </div>
            );
            grid.push(currentRow);
            return elementRow;
          })
        }
      </div>
    );
  }

  return (
    <div className="graphPage container">

      {/* Title */}
      <h1 className="my-4"> Graph Algorithms </h1>

      {/* Graph Algorithm Grid */}
      {makeGridElement()}


      {/* Graph Buttons */}
      <div className="mb-3 gap-2 d-flex justify-content-start flex-wrap">
        <button className="btn btn-info" onClick={resetGrid}>Reset</button>
        <button className="btn btn-outline-light" >Dijkstra</button>
        <button className="btn btn-outline-light" >Depth First Search</button>
        <button className="btn btn-outline-light" >Breadth First Search</button>
        <button className="btn btn-outline-light" onClick={() => {
          console.log(grid)}}>test</button>
      </div>

    </div>
  );

  
}