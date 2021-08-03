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
            walls.push(grid[wallIdx][i]);
        }
        division(grid, x1, y1, x2, wallIdx);
        division(grid, x1, wallIdx, x2, y2);
      }
      else
      {
        for(let i = y1 + 1; i < y2; i++) {
            if (i === pathIdx) continue;
            walls.push(grid[i][wallIdx]);
        }
        division(grid, x1, y1, wallIdx, y2);
        division(grid, wallIdx, y1, x2, y2);
      }
    }

    for (let i = 0; i < grid.length; i++) {
        walls.push(grid[i][0]);
        walls.push(grid[grid.length - i - 1][grid[0].length - 1]);
    }
    for (let j = 0; j < grid[0].length; j++) {
        walls.push(grid[0][grid[0].length - j - 1]);
        walls.push(grid[grid.length - 1][j]);
    }

    division(grid, 0, 0, grid[0].length-1, grid.length-1);

    return walls;
}

export function randomMaze(grid) {
    const walls = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (Math.random() < .3) {
                walls.push(grid[row][col]);
            }
        }
    }
    return walls;
}


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
            minSpanTree.push([f[0], f[1]]);

            if (row > 1 && tmp[row - 2][col] === true) frontier.push([row - 1, col, row - 2, col]);
            if (row < tmp.length - 2 && tmp[row + 2][col] === true) frontier.push([row + 1, col, row + 2, col]);
            if (col > 1 && tmp[row][col - 2] === true) frontier.push([row, col - 1, row, col - 2]);
            if (col < tmp[0].length - 2 && tmp[row][col + 2] === true) frontier.push([row, col + 1, row, col + 2]);
        }
    }

    for (let coord of minSpanTree) {
        let [row, col] = coord;

        if (tmp[row - 1][col - 1]) walls.push(grid[row - 1][col - 1]);
        if (tmp[row - 1][col]) walls.push(grid[row - 1][col]);
        if (tmp[row - 1][col + 1]) walls.push(grid[row - 1][col + 1]);
        if (tmp[row][col + 1]) walls.push(grid[row][col + 1]);
        if (tmp[row + 1][col + 1]) walls.push(grid[row + 1][col + 1]);
        if (tmp[row + 1][col]) walls.push(grid[row + 1][col]);
        if (tmp[row + 1][col - 1]) walls.push(grid[row + 1][col - 1]);
        if (tmp[row][col - 1]) walls.push(grid[row][col - 1]);
    }

    return walls;
}