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


export function breadthFirstSearch(grid, startNode, endNode) {

  const q = new Queue();
  q.enqueue(2);
  q.enqueue(3);

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



