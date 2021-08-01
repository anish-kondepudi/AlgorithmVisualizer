import "./GraphPage.css";
import { dijkstra, getNodesInShortestPathOrder } from "./graph_components/graphAlgorithms";
import { useState, useEffect, useRef } from "react"
import {Node} from './graph_components/Node';

const VISIT_DELAY = 1;
const PATH_DELAY = 40;
const CELL_SIZE = 1;
const GRID_HEIGHT = 70;
const pxToNode = px => Math.floor(px / parseFloat(getComputedStyle(document.documentElement).fontSize) / CELL_SIZE);

var prevTimeout = 0;
var running = false;
var mouseButton = -1;
var startRow, startCol, endRow, endCol = null;
var selectedNode = null;
  
export const GraphPage = () => {

  // Initializes States
  const grid = useRef([]).current;
  const gridRef = useRef();
  const [dimensions, setDimensions] = useState(null);

  // Updates Grid when Window Size Changes
  useEffect(() => {
    requestAnimationFrame(() => {
      [startRow, startCol] = [2,2];
      [endRow, endCol] = [grid.length-3, grid[0].length-3];
      resetGrid();
    })
  
    resizeGrid();
    window.addEventListener('resize', resizeGrid);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    gridRef.current.addEventListener("contextmenu", e => e.preventDefault());

    return () => {
      window.removeEventListener('resize', resizeGrid);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      gridRef.current.removeEventListener("contextmenu", e => e.preventDefault());
    };
  }, []);

  // Clears all setTimeout()'s [Hack]
  const clearAllTimeouts = () => {
    // Set a fake timeout to get the highest timeout id
    const highestTimeoutId = setTimeout(()=>{});
    for (let i = prevTimeout ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
    }
    prevTimeout = highestTimeoutId;
  }

  const handleMouseDown = e => {
    mouseButton = e.button;
    const [name, row, col] = e.target.id.split('-');
    if (name === "node") {
      const node = grid[row][col];

      if (mouseButton == 0) {
        if (node.ref.className === 'node-start') {
          selectedNode = 'node-start';
        }
        else if (node.ref.className === 'node-end') {
          selectedNode = 'node-end';
        }
        else {
          grid[row][col].ref.className = 'node-wall';
          if (running) animateNoDelay(Dijkstra());
        }
      }
      else if (mouseButton == 2) {
        if (node.ref.className === 'node-wall') {
          grid[row][col].ref.className = 'node-empty';
          if (running) animateNoDelay(Dijkstra());
        }
      }
      
    }
    
  }

  const handleMouseMove = e => {
    if (mouseButton == -1) return;

    const [name, row, col] = e.target.id.split('-');

    if (name !== 'node') return;

    const node = grid[row][col];

    if (mouseButton == 0) {
      if ((endRow != row || endCol != col) && (startRow != row || startCol != col)) {
        if (selectedNode === 'node-start') {
          node.ref.className = 'node-start';
          grid[startRow][startCol].ref.className = 'node-empty';
          [startRow, startCol] = [row, col];
        }
        else if (selectedNode === 'node-end') {
          node.ref.className = 'node-end';
          grid[endRow][endCol].ref.className = 'node-empty';
          [endRow, endCol] = [row, col];
        }
        else {
          node.ref.className = 'node-wall';
        }
        if (running) animateNoDelay(Dijkstra());
      }
    }
    else if (mouseButton == 2) {
      if (node.ref.className == 'node-wall') {
        grid[row][col].ref.className = 'node-empty';
        if (running) animateNoDelay(Dijkstra());
      }
    }
  }

  const handleMouseUp = () => {
    mouseButton = -1;
    selectedNode = null;
  }

  
  // Animates
  const animate = ({visitedNodesInOrder, nodesInShortestPathOrder}) => {
    running = true;
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        visitedNodesInOrder[i].ref.className = 'node-visited';
        visitedNodesInOrder[i].ref.animate([
          {transform: 'scale(0)', borderRadius: '100%'},
          {transform: 'scale(1)', borderRadius: 0}
        ], {
          duration: 500,
          iterations: 1
        });
      }, VISIT_DELAY * i);
    }
    setTimeout(() => {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
          nodesInShortestPathOrder[i].ref.className = 'node-shortest-path';
          nodesInShortestPathOrder[i].ref.animate([
            {transform: 'scale(0)'},
            {transform: 'scale(1)'}
          ], {
            duration: 200,
            iterations: 1
          });
        }, PATH_DELAY * i);
      }
    }, VISIT_DELAY * visitedNodesInOrder.length)
  }

  const animateNoDelay = ({visitedNodesInOrder, nodesInShortestPathOrder}) => {
    running = true;
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const {row, col} = visitedNodesInOrder[i];
      grid[row][col].ref.className = 'node-visited';
    }
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const {row, col} = nodesInShortestPathOrder[i];
      grid[row][col].ref.className = 'node-shortest-path';
    }
  }


  // Performs Dijkstra and Animates Grids
  const Dijkstra = () => {
    clearVisualization();
    const visitedNodesInOrder = dijkstra(grid, grid[startRow][startCol], grid[endRow][endCol]);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[endRow][endCol]);
    return {visitedNodesInOrder, nodesInShortestPathOrder};
  }
  

  // Resets Grids
  const resetGrid = () => {
    clearAllTimeouts();

    for (let row=0; row<grid.length; row++) {
      for (let col=0; col<grid[0].length; col++) {
        if ((endRow != row || endCol != col) && (startRow != row || startCol != col))
          grid[row][col].ref.className = 'node-empty';

        resetNode(grid[row][col]);
      }
    }
    grid[endRow][endCol].ref.className = 'node-end';
    grid[startRow][startCol].ref.className = 'node-start';
    console.log(grid[endRow][endCol].ref)
  }

  const clearVisualization = () => {
    running = false;
    clearAllTimeouts();

    for (let row=0; row<grid.length; row++) {
      for (let col=0; col<grid[0].length; col++) {
        const node = grid[row][col];
        if (
          node.ref.className === 'node-visited' || 
          node.ref.className === 'node-shortest-path'
        ) {
          grid[row][col].ref.className = 'node-empty';
        }

        resetNode(node);
      }
    }
  }

  const resizeGrid = () => {
    clearAllTimeouts();

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
      grid[endRow][endCol].ref.className = 'node-end';
      grid[startRow][startCol].ref.className = 'node-start';
    }
  }


  const createNode = (refs, rows, cols) => {
    return {
      ref: refs,
      row: rows,
      col: cols,
      dv: Infinity,
      known: false,
      pv: null,
    }
  }

  const resetNode = (node) => {
    node.dv = Infinity;
    node.known = false;
    node.pv = null;
  }
 

  const makeGridElement = () => {
    grid.length = 0;

    return (
      <div className="grid d-flex flex-column mb-3" id="grid" ref={gridRef} style={{width: '100%', height: `${GRID_HEIGHT}vh`}}>
        { dimensions &&
          [...Array(dimensions.rows)].map((e1,r) => {
            const currentRow = [];
            const elementRow = (
              <div className="grid-row d-flex flex-row" key={r}>
                {
                  [...Array(dimensions.cols)].map((e2,c) => {
                    return (
                      <Node 
                        ref={ref=>currentRow.push(createNode(ref, r, c))}
                        key={c}
                        row={r}
                        col={c}
                        type={'node-empty'}
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
        <button className="btn btn-info" onClick={resetGrid}>Reset Board</button>
        <button className="btn btn-info" onClick={clearVisualization}>Clear Visualization</button>
        <button className="btn btn-outline-light" onClick={()=> {animate(Dijkstra())}}>Dijkstra</button>
        <button className="btn btn-outline-light" >Depth First Search</button>
        <button className="btn btn-outline-light" >Breadth First Search</button>
        <button className="btn btn-outline-light" onClick={() => {
          console.log(grid)}}>test</button>
      </div>

    </div>
  );

  
}