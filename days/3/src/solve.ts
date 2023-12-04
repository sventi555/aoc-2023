import { Solver } from "shared";

const isDigit = (c: string) => /\d/.exec(c) != null;
const isSymbol = (c: string) => /[\d\.]/.exec(c) == null;

const getFullNum = (line: string, index: number) => {
  let curStart = index;
  let curEnd = index;

  while (curStart >= 0 && isDigit(line[curStart])) {
    curStart--;
  }
  curStart++;

  while (curEnd < line.length && isDigit(line[curEnd])) {
    curEnd++;
  }
  curEnd--;

  return [parseInt(line.substring(curStart, curEnd + 1)), curStart];
};

// call on a coord that is a symbol
const getSurroundingNums = (lines: string[], row: number, col: number) => {
  const nums: Record<string, number> = {};

  for (let curRow = row - 1; curRow <= row + 1; curRow++) {
    for (let curCol = col - 1; curCol <= col + 1; curCol++) {
      if (
        curRow >= 0 &&
        curRow < lines.length &&
        curCol >= 0 &&
        curCol < lines[0].length
      ) {
        const char = lines[curRow][curCol];
        if (isDigit(char)) {
          const [num, startIndex] = getFullNum(lines[curRow], curCol);
          nums[`${curRow}-${startIndex}`] = num;
        }
      }
    }
  }

  return nums;
};

export const partA: Solver = (lines: string[]) => {
  const partNums: Record<string, number> = {};

  for (let row = 0; row < lines.length; row += 1) {
    const line = lines[row];
    for (let col = 0; col < line.length; col += 1) {
      let char = line[col];

      if (isSymbol(char)) {
        const nums = getSurroundingNums(lines, row, col);
        for (const [coordString, num] of Object.entries(nums)) {
          partNums[coordString] = num;
        }
      }
    }
  }

  return Object.values(partNums).reduce((sum, cur) => sum + cur, 0);
};

export const partB: Solver = (lines: string[]) => {
  let ratioSum = 0;

  for (let row = 0; row < lines.length; row += 1) {
    const line = lines[row];
    for (let col = 0; col < lines.length; col += 1) {
      const char = line[col];

      if (char === "*") {
        const nums = Object.values(getSurroundingNums(lines, row, col));
        if (nums.length === 2) {
          ratioSum += nums.reduce((prod, num) => prod * num, 1);
        }
      }
    }
  }

  return ratioSum;
};
