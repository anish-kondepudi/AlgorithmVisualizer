import "./GraphPage.css";

import { dijkstra, aStarManhattan, aStarDiagonal, aStarEuclidean, depthFirstSearch, breadthFirstSearch, getNodesInShortestPathOrder } from "./graph_components/graphAlgorithms";
import { recursiveDivision, randomMaze, randomWeightedMaze, prims, dfsMaze, binaryTreeMaze, terrainMap, fileReaderTerrain } from "./graph_components/mazeAlgorithms";

import { useState, useEffect, useRef } from "react"

import {Node} from './graph_components/Node';
import Webcam from "react-webcam";

let nodeSize = 1.6;
let prevTimeout = 0;
let mouseButton = -1;
let startRow, startCol, endRow, endCol = null;
let selectedNode = null;
let startCoveredOverNode = null;
let endCoveredOverNode = null;
let currentAlgorithm = null;
let placeableNode = 'node-wall';
let animationSpeed = 50;

const pxToNode = px => Math.floor(px / parseFloat(getComputedStyle(document.documentElement).fontSize) / nodeSize);
  
export const GraphPage = () => {
  // grid states
  const grid = useRef([]).current;
  const gridRef = useRef();
  const [dimensions, setDimensions] = useState(null);

  // slider states
  const exampleWeightRef = useRef();

  // webcam states
  const webCamRef = useRef();
  const [webcamEnabled, setWebcamState] = useState(false);

  // INITIALIZATION

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

  const readWebcam = () => {
    // https://github.com/mozmorris/react-webcam/issues/65#issuecomment-385126201
    const dataURLtoBlob = (dataurl) => {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
    }

    const screenshot = webCamRef.current.getScreenshot();
    if (!screenshot) return null;
    const blob =  dataURLtoBlob(screenshot);

    const reader = new FileReader();
    reader.readAsDataURL(blob);

    return reader;
  }

  const readImageInput = (e) => {
    const file = e.target.files[0];
    if (!file) return null;

    e.target.value = "";

    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    return reader;
  }   
  
  // MOUSE HANDLERS

  const handleMouseDown = e => {
    mouseButton = e.button;

    if (!e.target.parentNode.id) return;
    let [name, row, col] = e.target.parentNode.id.split('-');
    
    if (name !== "node") return;

    const node = grid[row][col];

    if (mouseButton === 0) {
      if (node.ref.className === 'node-start') {
        selectedNode = 'node-start';
      }
      else if (node.ref.className === 'node-end') {
        selectedNode = 'node-end';
      }
      else if (node.ref.className === placeableNode) {
        return;
      }
      else {
        node.ref.className = placeableNode;
        if (currentAlgorithm) runAlgorithm(null, true);
        else animateElement(node.ref, 100);
      }
    }
    else if (mouseButton === 2) {
      if (node.ref.className === 'node-wall' || node.ref.className.startsWith('node-weight-')) {
        node.ref.className = 'node-empty';
        if (currentAlgorithm) runAlgorithm(null, true);
      }
    }    
  }

  const handleMouseMove = e => {
    if (mouseButton === -1) return;

    if (!e.target.parentNode.id) return;
    let [name, row, col] = e.target.parentNode.id.split('-');

    if (name !== 'node') return;

    const node = grid[row][col];

    if (mouseButton === 0) {
      if (node.ref.className === 'node-start') {
        return;
      }
      else if (node.ref.className === 'node-end') {
        return;
      }
      else {
        if (selectedNode === 'node-start') {
          const prevNode = grid[startRow][startCol];

          if (startCoveredOverNode && (startCoveredOverNode === 'node-wall' || startCoveredOverNode.startsWith('node-weight-'))) prevNode.ref.className = startCoveredOverNode;
          else prevNode.ref.className = 'node-empty';
          startCoveredOverNode = node.ref.className;

          node.ref.className = 'node-start';
          [startRow, startCol] = [row, col];

          if (currentAlgorithm) runAlgorithm(null, true);
          else animateElement(node.ref, 50, [
            {transform: `scale(.75)`},
            {transform: 'scale(1)'}
          ]);
        }
        else if (selectedNode === 'node-end') {
          const prevNode = grid[endRow][endCol];

          if (endCoveredOverNode && (endCoveredOverNode === 'node-wall' || endCoveredOverNode.startsWith('node-weight-'))) prevNode.ref.className = endCoveredOverNode;
          else prevNode.ref.className = 'node-empty';
          endCoveredOverNode = node.ref.className;

          node.ref.className = 'node-end';
          [endRow, endCol] = [row, col];

          if (currentAlgorithm) runAlgorithm(null, true);
          else animateElement(node.ref, 50, [
            {transform: `scale(.75)`},
            {transform: 'scale(1)'}
          ]);
        }
        else if (node.ref.className !== placeableNode) {
          node.ref.className = placeableNode;
          if (currentAlgorithm) runAlgorithm(null, true);
          else animateElement(node.ref, 100);
        }
      }
    }
    else if (mouseButton === 2) {
      if (node.ref.className === 'node-wall' || node.ref.className.startsWith('node-weight-')) {
        node.ref.className = 'node-empty';
        if (currentAlgorithm) runAlgorithm(null, true);
      }
    }
  }

  const handleMouseUp = () => {
    mouseButton = -1;
    selectedNode = null;
  }

  //RUNNING ALGORITHMS

  const runAlgorithm = (algorithmFunction = null, noDelay = false) => {
    clearVisualization();

    if (algorithmFunction) currentAlgorithm = algorithmFunction;

    const visitedNodesInOrder = currentAlgorithm(grid, grid[startRow][startCol], grid[endRow][endCol]);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[endRow][endCol]);

    if (noDelay) {
      for (let i = 0; i < visitedNodesInOrder.length; i++) {
        visitedNodesInOrder[i].ref.childNodes[0].className = 'node-visited';
      }
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        nodesInShortestPathOrder[i].ref.childNodes[0].className = 'node-shortest-path';
      }
    }
    else {
      const delay = 10000 / (dimensions.rows * dimensions.cols) * 5 * Math.pow(1/5,animationSpeed/50);
      const iterPerTimeout = delay > 3 ? 1 : Math.ceil(3 / delay);
      const animate = iterPerTimeout < 2 && nodeSize > 1 ? true : false;

      for (let i = 0; i < visitedNodesInOrder.length; i += iterPerTimeout) {
        setTimeout(() => {
          for (let j = i; j < i + iterPerTimeout && j < visitedNodesInOrder.length; j++) {
            const overlay = visitedNodesInOrder[j].ref.childNodes[0];
            overlay.className = 'node-visited';
            if (animate) {
              animateElement(overlay, 200, [
                {transform: `scale(0)`, borderRadius: '100%'},
                {transform: 'scale(1)', borderRadius: 0}
              ]);
            }
          }
        }, delay * i);
      }
      const pathDelay = delay * 5 < 15 ? 15 : (delay * 5 > 50 ? 50 : delay * 5);
      setTimeout(() => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const overlay = nodesInShortestPathOrder[i].ref.childNodes[0];
            overlay.className = 'node-shortest-path';
            if (animate) animateElement(overlay, 200);
          }, pathDelay * i);
        }
      }, delay * visitedNodesInOrder.length)
    }
  }

  const generateMaze = (mazeFunction) => {
    resetGrid();
    const walls = mazeFunction(grid);

    const delay = 1500 / walls.length;
    const wallsPerIteration = delay > 2 ? 1 : Math.ceil(2 / delay);

    for (let i = 0; i < walls.length; i += wallsPerIteration) {
      setTimeout(() => {
        for (let j = i; j < i + wallsPerIteration && j < walls.length; j++) {
          const node = grid[walls[j][0]][walls[j][1]];
          let weight = null;
          if (walls[j].length === 3) weight = walls[j][2];

          if (
            node.ref.className !== 'node-start' &&
            node.ref.className !== 'node-end'
          ) {
            if (weight) node.ref.className = `node-weight-${weight}`;
            else node.ref.className = 'node-wall';
          }
        }
      }, delay * i);
    }
  } 

  // GRID FUNCTIONS

  const resetGrid = () => {
    startCoveredOverNode = null;
    endCoveredOverNode = null;
    currentAlgorithm = null;
    clearAllTimeouts();

    for (let row=0; row<grid.length; row++) {
      for (let col=0; col<grid[0].length; col++) {
        const node = grid[row][col];
        if ((endRow !== row || endCol !== col) && (startRow !== row || startCol !== col))
          node.ref.className = 'node-empty';
          node.ref.childNodes[0].className = 'node-empty';

        resetNode(node);
      }
    }
    grid[endRow][endCol].ref.className = 'node-end';
    grid[startRow][startCol].ref.className = 'node-start';
  }

  const clearVisualization = (completeStop = false) => {
    if (completeStop) currentAlgorithm = null;
    clearAllTimeouts();

    for (let row=0; row<grid.length; row++) {
      for (let col=0; col<grid[0].length; col++) {
        const node = grid[row][col];
        node.ref.childNodes[0].className = 'node-empty';
        resetNode(node);
      }
    }
  }

  const resizeGrid = () => {
    clearAllTimeouts();

    let rows = pxToNode(gridRef.current.offsetHeight);
    let cols = pxToNode(gridRef.current.offsetWidth);
    
    if (rows > 1 && rows % 2 === 0) rows--;
    if (cols > 1 && cols % 2 === 0) cols--;

    setDimensions({
      rows: rows, 
      cols: cols
    });

    if (startRow && startCol && endRow && endCol) {
      if (startRow > rows - 1) startRow = rows - 1;
      if (startCol > cols - 1) startCol = cols - 1;
      if (endRow > rows - 1) endRow = rows - 1;
      if (endCol > cols - 1) endCol = cols - 1;
      if ((startRow === endRow) && (startCol === endCol))
        startCol -= 1;
      grid[endRow][endCol].ref.className = 'node-end';
      grid[startRow][startCol].ref.className = 'node-start';
    }

    if (currentAlgorithm) runAlgorithm(null, true);
  }

  // NODE FUNCTIONS

  const createNode = (refs, rows, cols) => {
    return {
      ref: refs,
      row: rows,
      col: cols,
      g: Infinity,
      h: Infinity,
      f: Infinity,
      dv: Infinity,
      known: false,
      pv: null
    }
  }

  const animateElement = (element, time, animation = [{transform: `scale(0)`}, {transform: 'scale(1)'}]) => {
    element.animate(animation, {
      duration: time,
      iterations: 1
    });
  }

  const resetNode = (node) => {
    node.dv = Infinity;
    node.known = false;
    node.pv = null;
    node.g = Infinity;
    node.h = Infinity;
    node.f = Infinity;
  }

  // TOOLS

  const clearAllTimeouts = () => {
    const highestTimeoutId = setTimeout(()=>{});
    for (let i = prevTimeout ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
    }
    prevTimeout = highestTimeoutId;
  }

  // MAKE GRID HTML
 
  const makeGridElement = () => {
    grid.length = 0;

    return (
      <div className="grid d-flex flex-column mb-3" ref={gridRef}>
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
    <div className="graphPage">
      {/* SIDEBAR */}
      <div class="flex-shrink-0 p-3 bg-black scrollarea" style={{width:'18rem'}}>
        <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom text-white">
          <span class="fs-5 fw-semibold">Graph Algorithms</span>
        </a>
        <div className="mb-3 gap-2 d-flex justify-content-start flex-wrap">
          <button className="btn btn-sm btn-warning" onClick={resetGrid}>Reset Board</button>
          <button className="btn btn-sm btn-info" onClick={() => {clearVisualization(true);}}>Clear Visualization</button>
        </div>
        <ul class="list-unstyled ps-0">
          <li class="mb-3">
            <button class="btn btn-toggle align-items-center rounded mb-2" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
              Unweighted Algorithms
            </button>
            <div class="collapse" id="home-collapse" style={{}}>
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li onClick={()=> {runAlgorithm(breadthFirstSearch)}}>Breadth First Search</li>
                <li onClick={()=> {runAlgorithm(depthFirstSearch)}}>Depth First Search</li>
              </ul>
            </div>
          </li>
          <li class="mb-3">
            <button class="btn btn-toggle align-items-center rounded mb-2" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
              Weighted Algorithms
            </button>
            <div class="collapse" id="dashboard-collapse" style={{}}>
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li onClick={()=> {runAlgorithm(dijkstra)}}>Dijkstra</li>
                <li onClick={()=> {runAlgorithm(aStarManhattan)}}>A* (Manhattan)</li>
                <li onClick={()=> {runAlgorithm(aStarDiagonal)}}>A* (Diagonal)</li>
                <li onClick={()=> {runAlgorithm(aStarEuclidean)}}>A* (Euclidean)</li>
              </ul>
            </div>
          </li>
          <li class="mb-3">
            <button class="btn btn-toggle align-items-center rounded mb-2" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
              Mazes
            </button>
            <div class="collapse" id="orders-collapse" style={{}}>
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li onClick={() => {generateMaze(recursiveDivision)}}>Recursive Maze</li>
                <li onClick={() => {generateMaze(prims)}}>Prims Maze</li>
                <li onClick={() => {generateMaze(dfsMaze)}}>DFS Maze</li>
                <li onClick={() => {generateMaze(binaryTreeMaze)}}>Binary Tree Maze</li>
                <li onClick={() => {generateMaze(randomMaze)}}>Random Maze</li>
              </ul>
            </div>
          </li>
          <li class="mb-3">
            <button class="btn btn-toggle align-items-center rounded mb-2" data-bs-toggle="collapse" data-bs-target="#order-collapse" aria-expanded="false">
              Weighted Mazes
            </button>
            <div class="collapse" id="order-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li onClick={() => {generateMaze(randomWeightedMaze)}}>Random Weighted Maze</li>
                <li onClick={() => {generateMaze(terrainMap)}}>Terrain Map</li>
                <label className="w-100"><li>
                  <input type="file" onChange={(e) => {fileReaderTerrain(grid, readImageInput(e)).then(walls => generateMaze(() => walls)).catch((err) => {console.log(err)})}} accept=".jpg, .jpeg, .png"/>
                  Image Terrain
                </li></label>
                <li type="button" data-bs-toggle="modal" data-bs-target="#modal" onClick={()=>{setWebcamState(true)}}>Webcam Terrain</li>
              </ul>
            </div>
          </li>
          <li class="border-top mb-3"></li>
          <li class="mb-3">
            <button class="btn btn-toggle align-items-center rounded mb-2" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
              Options
            </button>
            <div class="collapse" id="account-collapse" style={{}}>
                {/* Grid Size Slider */}
                <label className="form-label d-block mt-2"> Set Grid Size : </label>
                <input type="range" step=".2" min=".6" max="3.2" defaultValue={nodeSize} className="form-range"
                  onChange={(e) => {
                    nodeSize = e.target.value;
                    resizeGrid();
                  }} />

                {/* Wall Weight Slider */}
                <div className="mb-2 gap-2 d-flex justify-content-start align-items-center flex-wrap">
                  <label className="form-label m-0"> Set Wall Weight : </label>
                  <div ref={exampleWeightRef} id="example-weight" className="node-wall"></div>
                </div>
                <input type="range" step="1" min="2" max="31" defaultValue={31} className="form-range"
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value === 31) placeableNode = 'node-wall';
                    else if (value >= 2 || value <= 30) placeableNode = `node-weight-${Math.floor(value)}`
                    exampleWeightRef.current.className = placeableNode;
                  }} />

                {/* Animation Speed Slider */}
                <label className="form-label d-block">Animation Speed : </label>
                <input type="range" step="1" min="1" max="100" defaultValue={50} className="form-range"
                  onChange={(e) => {
                    clearVisualization(true);
                    animationSpeed = parseInt(e.target.value);
                  }} />
              
            </div>
          </li>
        </ul>
      </div>

      {/* Graph Algorithm Grid */}
      {makeGridElement()}
        
      {/* Webcam Popup Window */}
      <div className="modal fade" id="modal" tabindex="-1" aria-labelledby="modal-label" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title text-white" id="modal-label">Webcam Terrain Generator</h5>
              <button type="button" className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setWebcamState(false)}}></button>
            </div>
            <div className="modal-body">
              {webcamEnabled && <Webcam className="w-100" ref={webCamRef} screenshotFormat="image/jpeg" audio={false}/>}
            </div>
            <div className="modal-footer">
              <button className="btn btn-info" data-bs-dismiss="modal" onClick={(e) => {fileReaderTerrain(grid, readWebcam()).then(walls => generateMaze(() => walls)).catch((err) => {console.log(err)}); setWebcamState(false)}}>Capture Image</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}