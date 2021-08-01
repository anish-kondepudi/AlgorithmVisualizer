import "./GraphPage.css";
import { dijkstra, getNodesInShortestPathOrder } from "./graph_components/graphAlgorithms";
import { useState, useEffect, useRef } from "react"
import Node from './graph_components/Node';

const VISIT_DELAY = 1;
const PATH_DELAY = 40;
const CELL_SIZE = 2;
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

    return () => {
      window.removeEventListener('resize', resizeGrid);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
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
        if (node.state.type === 'start') {
          selectedNode = 'start';
        }
        else if (node.state.type === 'end') {
          selectedNode = 'end';
        }
        else {
          grid[row][col].setState({type: 'wall'})
        }
      }
      else if (mouseButton == 2) {
        switch(node.state.type) {
          case 'wall':
            grid[row][col].setState({type: 'empty'})
            break;
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
        if (selectedNode === 'start') {
          node.setState({type: 'start'});
          grid[startRow][startCol].setState({type: 'empty'});
          [startRow, startCol] = [row, col];
          if (running) {
            clearVisualization(false);
            Dijkstra()
          }
        }
        else if (selectedNode === 'end') {
          node.setState({type: 'end'});
          grid[endRow][endCol].setState({type: 'empty'});
          [endRow, endCol] = [row, col];
          if (running) {
            clearVisualization(false);
            animateNoDelay(Dijkstra())
          }
        }
        else {
          node.setState({type: 'wall'})
        }
      }
    }
    else if (mouseButton == 2) {
      if (node.state.type == 'wall') {
        grid[row][col].setState({type: 'empty'});
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
        const {row, col} = visitedNodesInOrder[i];
        grid[row][col].setState({type: 'visited'});
      }, VISIT_DELAY * i);
    }
    setTimeout(() => {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
          const {row, col} = nodesInShortestPathOrder[i];
          grid[row][col].setState({type: 'shortest-path'});
        }, PATH_DELAY * i);
      }
    }, VISIT_DELAY * visitedNodesInOrder.length)
  }

  const animateNoDelay = ({visitedNodesInOrder, nodesInShortestPathOrder}) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const {row, col} = visitedNodesInOrder[i];
      grid[row][col].setState({type: 'visited'});
    }
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const {row, col} = nodesInShortestPathOrder[i];
      grid[row][col].setState({type: 'shortest-path'});
    }
  }


  // Performs Dijkstra and Animates Grids
  const Dijkstra = () => {
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
          grid[row][col].setState({type: 'empty'});

        grid[row][col].reset();
      }
    }
    grid[startRow][startCol].setState({type: 'start'});
    grid[endRow][endCol].setState({type: 'end'});
  }

  const clearVisualization = (stopRunning=true) => {
    clearAllTimeouts();
    if (stopRunning) {
      running = false;
    }

    for (let row=0; row<grid.length; row++) {
      for (let col=0; col<grid[0].length; col++) {
        const node = grid[row][col];
        if (
          node.state.type === 'visited' || 
          node.state.type === 'shortest-path'
        ) {
          grid[row][col].setState({type: 'empty'})
        }

        grid[row][col].reset();
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
      grid[endRow][endCol].setState({type: 'end'});
      grid[startRow][startCol].setState({type: 'start'});
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
                        type={'empty'}
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