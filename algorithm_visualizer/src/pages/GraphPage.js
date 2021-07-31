import "./GraphPage.css";
import { dijkstra, getNodesInShortestPathOrder } from "./graph_components/graphAlgorithms";
import { useState, useEffect, useRef } from "react"
import Node from './graph_components/Node';


const CELL_SIZE = 1.5;
const GRID_HEIGHT = 70;
const pxToNode = px => Math.floor(px / parseFloat(getComputedStyle(document.documentElement).fontSize) / CELL_SIZE);

var prevTimeout = 0;
var mouseIsPressed = false;
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
      resetGrid();
    })
  
    resizeGrid();
    window.addEventListener('resize', resizeGrid);
    gridRef.current.addEventListener("mousedown", handleMouseDown);
    gridRef.current.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener('resize', resizeGrid);
      gridRef.current.removeEventListener("mousedown", handleMouseDown);
      gridRef.current.removeEventListener("mousemove", handleMouseMove);
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
    const [name, row, col] = e.target.id.split('-');
    if (name === "node") {
      mouseIsPressed = true;

      const node = grid[row][col];

      switch(node.state.type) {
        case '':
          grid[row][col].setState({type: 'wall'})
          break;
        case 'start':
          selectedNode = 'start';
          break;
        case 'end':
          selectedNode = 'end';
          break;
      }
      
    }
    
  }

  const handleMouseMove = e => {
    if (!mouseIsPressed) return;

    const [name, row, col] = e.target.id.split('-');

    if (name !== 'node') return;

    const node = grid[row][col];

    if ((endRow != row || endCol != col) && (startRow != row || startCol != col)) {
      if (selectedNode === 'start') {
        node.setState({type: 'start'});
        grid[startRow][startCol].setState({type: ''});
        [startRow, startCol] = [row, col];
      }
      else if (selectedNode === 'end') {
        node.setState({type: 'end'});
        grid[endRow][endCol].setState({type: ''});
        [endRow, endCol] = [row, col];
      }
      else {
        node.setState({type: 'wall'})
      }
    }
  }

  const handleMouseUp = () => {
    mouseIsPressed = false;
    selectedNode = null;
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
        const {row, col} = visitedNodesInOrder[i];
        grid[row][col].setState({type: 'visited'});
      }, 10 * i);
    }
  }

  // Animated Shortest Path
  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const {row, col} = nodesInShortestPathOrder[i];
        grid[row][col].setState({type: 'shortest-path'});
      }, 50 * i);
    }
  }

  // Performs Dijkstra and Animates Grids
  const visualizeDijkstra = () => {
    const visitedNodesInOrder = dijkstra(grid, grid[startRow][startCol], grid[endRow][endCol]);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[endRow][endCol]);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  

  // Resets Grids
  const resetGrid = () => {
    clearAllTimeouts();

    for (let row=0; row<grid.length; row++) {
      for (let col=0; col<grid[0].length; col++) {
        grid[row][col].setState({type: ''});
        grid[row][col].reset();
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
        <button className="btn btn-outline-light" onClick={visualizeDijkstra}>Dijkstra</button>
        <button className="btn btn-outline-light" >Depth First Search</button>
        <button className="btn btn-outline-light" >Breadth First Search</button>
        <button className="btn btn-outline-light" onClick={() => {
          console.log(grid)}}>test</button>
      </div>

    </div>
  );

  
}