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

export function recursiveDivision(grid) {
    const walls = [];

    const RecursiveDivision = (grid, x1, y1, x2, y2) => {
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
        RecursiveDivision(grid, x1, y1, x2, wallIdx);
        RecursiveDivision(grid, x1, wallIdx, x2, y2);
      }
      else
      {
        for(let i = y1 + 1; i < y2; i++) {
            if (i === pathIdx) continue;
            walls.push(grid[i][wallIdx]);
        }
        RecursiveDivision(grid, x1, y1, wallIdx, y2);
        RecursiveDivision(grid, wallIdx, y1, x2, y2);
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

    RecursiveDivision(grid, 0, 0, grid[0].length-1, grid.length-1);

    return walls;
}


/*

export const recursiveDivision = (grid, rows, columns) => {
  addedWalls = [];
  for (let i = 0; i < rows; i++) {
    addedWalls.push(grid[i][0]);
    addedWalls.push(grid[rows - i - 1][columns - 1]);
  }
  for (let j = 0; j < columns; j++) {
    addedWalls.push(grid[0][columns - j - 1]);
    addedWalls.push(grid[rows - 1][j]);
  }
  const width = columns;
  const height = rows;
  divide(grid, 0, 0, width, height, chooseOrientation(width, height));

  return addedWalls;
};

const divide = (grid, x, y, width, height, orientation) => {
  if (height < 2 && width < 2) return;
  const horizontal = orientation === HORIZONTAL;
  let wx = x + (horizontal ? randEven(height - 2) : 0);
  let wy = y + (horizontal ? 0 : randEven(width - 2));
  const px = wx + (horizontal ? 0 : randOdd(height));
  const py = wy + (horizontal ? randOdd(width) : 0);
  const dx = horizontal ? 0 : 1;
  const dy = horizontal ? 1 : 0;
  do {
    if (wx !== px || wy !== py) {
      addedWalls.push(grid[wx][wy]);
    }
    wx += dx;
    wy += dy;
  } while (wx < grid.);
  let nx = x;
  let ny = y;
  let w = horizontal ? width : wy - y;
  let h = horizontal ? wx - x : height;
  divide(grid, nx, ny, w, h, chooseOrientation(w, h));
  ny = horizontal ? y : wy;
  nx = horizontal ? wx : x;
  w = horizontal ? width : y + width - wy - 1;
  h = horizontal ? x + height - wx - 1 : height;
  divide(grid, nx, ny, w, h, chooseOrientation(w, h));
};

const chooseOrientation = (width, height) => {
  if (width < height) return HORIZONTAL;
  else if (width > height) return VERTICAL;
  return Math.random() >= 0.5 ? HORIZONTAL : VERTICAL;
};


*/
