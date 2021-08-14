import { PriorityQueue } from "../data_structures/PriorityQueue";
import { Queue } from "../data_structures/Queue";

export function dijkstra(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const pq = new PriorityQueue((a,b) => a.dv < b.dv);
  startNode.dv = 0;
  pq.push(startNode);

  while(!pq.isEmpty()) {
    const currentNode = pq.pop();

    if (!currentNode.known) {
      currentNode.known = true;
      visitedNodesInOrder.push(currentNode);

      const neighbors = [];
      const {row, col} = currentNode;

      if (row > 0) neighbors.push(grid[row - 1][col]);
      if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
      if (col > 0) neighbors.push(grid[row][col - 1]);
      if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

      for (const neighbor of neighbors) {
        const neighborType = neighbor.ref.className;

        let weight = 1;
        if (neighborType.startsWith('node-weight-')) weight = parseInt(neighborType.split('-')[2]);

        if (!neighbor.known && neighborType !== 'node-wall' && neighbor.dv > currentNode.dv + weight) {
          neighbor.dv = currentNode.dv + weight;
          neighbor.pv = currentNode;
          if (neighbor === endNode) {
            visitedNodesInOrder.shift();
            return visitedNodesInOrder;
          }
          pq.push(neighbor);
        }
      }
    }
  }
  visitedNodesInOrder.shift();
  return visitedNodesInOrder;
}

// A* Heuristics from http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
function aStar(grid, startNode, endNode, type) {
  const ERROR = 'Invalid A* Distance Type';
  const visitedNodesInOrder = [];
  
  const open = [];
  const closed = [];

  startNode.f = 0;
  startNode.g = 0;
  startNode.h = 0;
  open.push(startNode)

  while (open.length !== 0) {

    open.sort((a, b) => a.f - b.f);
    const currentNode = open.shift();
    closed.push(currentNode);
    
    if (currentNode === endNode) {
      visitedNodesInOrder.shift();
      return visitedNodesInOrder;
    }

    visitedNodesInOrder.push(currentNode);

    const neighbors = [];
    const {row, col} = currentNode;

    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    for (const neighbor of neighbors) {
      
      const neighborType = neighbor.ref.className;

      if (neighborType === 'node-wall' || closed.includes(neighbor)) continue;

      const [x1, y1] = [neighbor.row, neighbor.col];
      const [x2, y2] = [endNode.row, endNode.col];

      const dx = Math.abs(x2-x1);
      const dy = Math.abs(y2-y1);

      let hTemp = 0;

      if (type === "Manhattan") hTemp = dx + dy;
      else if (type === "Diagonal") hTemp = (dx + dy) - 0.58578644 * Math.min(dx, dy);
      else if (type === "Euclidean") hTemp = Math.hypot(dx, dy);
      else throw ERROR;

      let weight = 1;
      if (neighborType.startsWith('node-weight-')) weight = parseInt(neighborType.split('-')[2]);

      const g = currentNode.g + weight;
      const h = hTemp;
      const f = g + h;

      if (f < neighbor.f || !open.includes(neighbor)) {

        neighbor.f = f;
        neighbor.g = g;
        neighbor.h = h;
        neighbor.pv = currentNode;

        if (!open.includes(neighbor))
          open.push(neighbor);
      }
    }
  }

  visitedNodesInOrder.shift();
  return visitedNodesInOrder;
}

export function aStarManhattan (grid, startNode, endNode) { return aStar(grid, startNode, endNode, "Manhattan"); }

export function aStarDiagonal (grid, startNode, endNode) { return aStar(grid, startNode, endNode, "Diagonal"); }

export function aStarEuclidean (grid, startNode, endNode) { return aStar(grid, startNode, endNode, "Euclidean"); }


export function breadthFirstSearch(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const queue = new Queue();

  startNode.known = true;
  queue.enqueue(startNode);

  while(!queue.isEmpty()) {
    const currentNode = queue.dequeue();

    visitedNodesInOrder.push(currentNode);

    const neighbors = [];
    const {row, col} = currentNode;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    for (const neighbor of neighbors) {
      if (!neighbor.known && neighbor.ref.className !== 'node-wall') {
        neighbor.pv = currentNode;
        neighbor.known = true;
        if (neighbor === endNode) {
          visitedNodesInOrder.shift();
          return visitedNodesInOrder;
        }
        queue.enqueue(neighbor);
      }
    }
  }
  visitedNodesInOrder.shift();
  return visitedNodesInOrder;
}

export function depthFirstSearch(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const stack = [];

  stack.push(startNode);

  while(stack.length > 0) {
    const currentNode = stack.pop();
    if (currentNode === endNode) {
      visitedNodesInOrder.shift();
      return visitedNodesInOrder;
    }
    if (!currentNode.known) visitedNodesInOrder.push(currentNode);
    currentNode.known = true;

    const neighbors = [];
    const {row, col} = currentNode;
    
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);

    for (const neighbor of neighbors) {
      if (!neighbor.known && neighbor.ref.className !== 'node-wall') {
        neighbor.pv = currentNode;
        stack.push(neighbor);
      }
    }
  }
  visitedNodesInOrder.shift();
  return visitedNodesInOrder;
}


  
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode.pv;
  if (!currentNode) return [];
  while (currentNode.pv !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.pv;
  }
  return nodesInShortestPathOrder;
}

