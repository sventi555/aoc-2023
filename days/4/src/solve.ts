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
  let totalCards = 0;

  const cardNumCopies: Record<number, number> = {};

  for (let cardNum = 0; cardNum < lines.length; cardNum++) {
    cardNumCopies[cardNum] = 1;
  }

  for (let cardNum = 0; cardNum < lines.length; cardNum++) {
    const line = lines[cardNum];

    let [winningNums, myNums] = line
      .split(/:\s+|\s+\|\s+/)
      .slice(1)
      .map((part) => part.split(/\s+/).map((num) => parseInt(num)));

    let winningSet = new Set(winningNums);

    const wins = myNums.reduce(
      (sum, cur) => (winningSet.has(cur) ? sum + 1 : sum),
      0
    );

    for (let i = 0; i < wins; i++) {
      cardNumCopies[cardNum + i + 1] += cardNumCopies[cardNum];
    }

    totalCards += cardNumCopies[cardNum];
  }

  return totalCards;
};
