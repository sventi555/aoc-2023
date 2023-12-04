import { Solver } from "shared";

export const partA: Solver = (lines: string[]) => {
  let pointTotal = 0;
  for (const line of lines) {
    let cardVal = 0;

    let [winningNums, myNums] = line
      .split(/:\s+|\s+\|\s+/)
      .slice(1)
      .map((part) => part.split(/\s+/).map((num) => parseInt(num)));

    let winningSet = new Set(winningNums);

    myNums.forEach((num) => {
      if (winningSet.has(num)) {
        cardVal = cardVal === 0 ? 1 : cardVal * 2;
      }
    });
    pointTotal += cardVal;
  }

  return pointTotal;
};

export const partB: Solver = (lines: string[]) => {
  return 0;
};
