import { PriorityQueue } from "../data_structures/PriorityQueue";

// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
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
          neighbor.dv = currentNode.dv + 1;
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
}
  
// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.pv;
  }
  nodesInShortestPathOrder.shift();
  nodesInShortestPathOrder.pop();
  return nodesInShortestPathOrder;
}