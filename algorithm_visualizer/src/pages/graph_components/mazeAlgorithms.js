
const randEven = (min, max) => {
    let x;
    do { x = Math.floor(Math.random() * (max - min + 1) + min); }
    while (x % 2 !== 0);
    return x;
};
const randOdd = (min, max) => {
    let x;
    do { x = Math.floor(Math.random() * (max - min + 1) + min); }
    while (x % 2 === 0);
    return x;
};

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const map = (val, in_min, in_max, out_min, out_max) => {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const clip = (val, min, max) => {
    if (val < min) val = min;
    if (val > max) val = max;
    return val;
}

export function recursiveDivision(grid) {
    const walls = [];

    const division = (grid, x1, y1, x2, y2) => {
      // Recursion Termination
      if (x2 - x1 < 3 || y2 - y1 < 3)
        return;

      // Randomly build the wall either horizontally or vertically
      let isHorizontal = Math.random() < ((y2 - y1) /((x2 - x1) + (y2 - y1)));
    
      // Randomly select the position to build the wall (disconnect cells along the line)
      let wallIdx = isHorizontal ? randEven(y1+1, y2-1) : randEven(x1+1, x2-1);
      let pathIdx = isHorizontal ? randOdd(x1+1, x2-1) : randOdd(y1+1, y2-1);
    
      // Recurse on sub areas
      if (isHorizontal)
      {
        for(let i = x1 + 1; i < x2; i++) {
            if (i === pathIdx) continue;
            walls.push([wallIdx, i]);
        }
        division(grid, x1, y1, x2, wallIdx);
        division(grid, x1, wallIdx, x2, y2);
      }
      else
      {
        for(let i = y1 + 1; i < y2; i++) {
            if (i === pathIdx) continue;
            walls.push([i, wallIdx]);
        }
        division(grid, x1, y1, wallIdx, y2);
        division(grid, wallIdx, y1, x2, y2);
      }
    }

    for (let i = 0; i < grid.length; i++) {
        walls.push([i, 0]);
        walls.push([grid.length - i - 1, grid[0].length - 1]);
    }
    for (let j = 0; j < grid[0].length; j++) {
        walls.push([0, grid[0].length - j - 1]);
        walls.push([grid.length - 1, j]);
    }

    division(grid, 0, 0, grid[0].length-1, grid.length-1);

    return walls;
}

export function randomMaze(grid) {
    const walls = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (Math.random() < .3) {
                walls.push([row, col]);
            }
        }
    }
    return walls;
}

export function randomWeightedMaze(grid) {
    const walls = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            walls.push([row, col, rand(2,20)]);
        }
    }
    return walls;
}

//https://stackoverflow.com/questions/23843197/maze-generating-algorithm-in-grid
export function prims(grid) {
    const walls = [];
    const minSpanTree = [];
    const tmp = []

    for (let row = 0; row < grid.length; row++) {
        const curRow = [];
        for (let col = 0; col < grid[0].length; col++) {
            curRow.push(true);
        }
        tmp.push(curRow);
    }

    const frontier = [];
    const [startRow, startCol] = [randOdd(1, tmp.length-2), randOdd(1, tmp[0].length-2)]
    frontier.push([startRow, startCol, startRow, startCol]);

    while (frontier.length > 0) {
        const randIdx = rand(0, frontier.length - 1)
        const f = frontier[randIdx];
        frontier.splice(randIdx, 1);

        const row = f[2];
        const col = f[3];

        if (tmp[row][col] === true) {
            tmp[row][col] = false;
            tmp[f[0]][f[1]] = false;

            minSpanTree.push([row, col]);

            if (row > 1 && tmp[row - 2][col] === true) frontier.push([row - 1, col, row - 2, col]);
            if (row < tmp.length - 2 && tmp[row + 2][col] === true) frontier.push([row + 1, col, row + 2, col]);
            if (col > 1 && tmp[row][col - 2] === true) frontier.push([row, col - 1, row, col - 2]);
            if (col < tmp[0].length - 2 && tmp[row][col + 2] === true) frontier.push([row, col + 1, row, col + 2]);
        }  
    }

    for (let coord of minSpanTree) {
        let [row, col] = coord;

        for (let coord of [
            [row - 1, col - 1], 
            [row - 1, col], 
            [row - 1, col + 1], 
            [row, col + 1], 
            [row + 1, col + 1],
            [row + 1, col],
            [row + 1, col - 1],
            [row, col - 1]
        ]) {    
            if (
                coord[0] >= 0 && 
                coord[0] < grid.length && 
                coord[1] >= 0 && 
                coord[1] < grid[0].length && 
                tmp[coord[0]][coord[1]]
            ) {
                walls.push(coord);
                tmp[coord[0]][coord[1]] = false;
            }
        }
    }

    return walls;
}

export function dfsMaze(grid) {
    const walls = [];
    const dfsTree = [];
    const tmp = []

    for (let row = 0; row < grid.length; row++) {
        const curRow = [];
        for (let col = 0; col < grid[0].length; col++) {
            curRow.push(true);
        }
        tmp.push(curRow);
    }

    const stack = [];
    const [startRow, startCol] = [randOdd(1, tmp.length-2), randOdd(1, tmp[0].length-2)]
    stack.push([startRow, startCol, startRow, startCol]);

    while (stack.length > 0) {
        const f = stack.pop();

        const row = f[2];
        const col = f[3];

        if (tmp[row][col]) {
            tmp[row][col] = false;
            tmp[f[0]][f[1]] = false;

            dfsTree.push([row, col]);

            const neighbors = [];

            if (row > 1 && tmp[row - 2][col] === true) { 
                neighbors.push([row-1, col, row-2, col])
            } 

            if (row < tmp.length - 2 && tmp[row + 2][col] === true) { 
                neighbors.push([row+1, col, row+2, col]);
            } 

            if (col > 1 && tmp[row][col - 2] === true) { 
                neighbors.push([row, col -1 , row, col-2])
            } 

            if (col < tmp[0].length - 2 && tmp[row][col + 2] === true) { 
                neighbors.push([row, col+1, row, col+2])
            } 

            if (neighbors.length > 0) {
                const randIdx = rand(0, neighbors.length -1);
                for (let i = 0; i < neighbors.length; i++) {
                    if (i !== randIdx) stack.splice(rand(0,stack.length), 0, neighbors[i]);
                }
                stack.push(neighbors[randIdx]);
            }
        }
    }

    for (let coord of dfsTree) {
        let [row, col] = coord;

        for (let coord of [
            [row - 1, col - 1], 
            [row - 1, col], 
            [row - 1, col + 1], 
            [row, col + 1], 
            [row + 1, col + 1],
            [row + 1, col],
            [row + 1, col - 1],
            [row, col - 1]
        ]) {    
            if (
                coord[0] >= 0 && 
                coord[0] < grid.length && 
                coord[1] >= 0 && 
                coord[1] < grid[0].length && 
                tmp[coord[0]][coord[1]]
            ) {
                walls.push(coord);
                tmp[coord[0]][coord[1]] = false;
            }
        }
    }
    
    return walls;
}

export function binaryTreeMaze(grid) {
    const walls = [];
    const bst = [];
    const tmp = [];

    for (let row = 0; row < grid.length; row++) {
        const curRow = [];
        for (let col = 0; col < grid[0].length; col++) {
            curRow.push(true);
        }
        tmp.push(curRow);
    }

    for (let row = 1; row < grid.length; row += 2) {
        for (let col = 1; col < grid[0].length; col += 2) {
            tmp[row][col] = false;
            bst.push([row,col]);

            const connections = [];

            if (row > 1) connections.push([row - 1, col]);
            if (col > 1) connections.push([row, col - 1]);

            if (connections.length > 0) {
                const connection = connections[rand(0, connections.length - 1)];
                tmp[connection[0]][connection[1]] = false;
            }
        }
    }

    for (let coord of bst) {
        let [row, col] = coord;

        for (let coord of [
            [row - 1, col - 1], 
            [row - 1, col], 
            [row - 1, col + 1], 
            [row, col + 1], 
            [row + 1, col + 1],
            [row + 1, col],
            [row + 1, col - 1],
            [row, col - 1]
        ]) {    
            if (
                coord[0] >= 0 && 
                coord[0] < grid.length && 
                coord[1] >= 0 && 
                coord[1] < grid[0].length && 
                tmp[coord[0]][coord[1]]
            ) {
                walls.push(coord);
                tmp[coord[0]][coord[1]] = false;
            }
        }
    }
    
    return walls;
}


var SimplexNoise = require('simplex-noise');

export function terrainMap(grid) {
    const weights = [];
    const simplex = new SimplexNoise(Math.random)
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            weights.push([
                row, 
                col, 
                Math.floor(map(clip(simplex.noise2D(.075* row, .075 *col), -.6, .6), -.6, .6, 2, 20))
            ]);
        }
    }
    return weights;
}


/*
walls.push(grid[f[0] + (f[1] - col)][f[1] + (f[0] - row)])
walls.push(grid[f[0] - (f[1] - col)][f[1] - (f[0] - row)])

else {
    walls.push(grid[f[0]][f[1]])
}
*/

