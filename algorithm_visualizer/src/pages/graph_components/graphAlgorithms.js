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
        if (!neighbor.known && neighbor.ref.className !== 'node-wall') {
          neighbor.dv = currentNode.dv + neighbor.weight;
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

export function aStar(grid, startNode, endNode) {
  const visitedNodesInOrder = [];

  const open = [];
  const closed = [];

  startNode.f = 0;
  open.push(startNode)
  let x = 0;

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

      if (neighbor.ref.className === 'node-wall' || closed.includes(neighbor)) continue;

      const [x1, y1] = [currentNode.row, currentNode.col];
      const [x2, y2] = [neighbor.row, neighbor.col];
      const [x3, y3] = [endNode.row, endNode.col];

      const g = currentNode.g + Math.hypot(x2-x1, y2-y1);
      const h = Math.hypot(x3-x2, y3-y2);
      const f = g + h;

      if (f < neighbor.f || !open.includes(neighbor)) {
        neighbor.f = f;
        neighbor.g = g;
        neighbor.pv = currentNode;
        
        if (!open.includes(neighbor)) {
          open.push(neighbor);
        }
      }
    }
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



