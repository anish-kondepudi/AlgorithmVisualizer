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