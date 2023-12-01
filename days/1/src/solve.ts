import { Solver } from "shared";

export const partA: Solver = (lines: string[]) => {
  let total = 0;
  for (const line of lines) {
    let num = "";
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (/\d/.exec(char) != null) {
        num += char;
        break;
      }
    }
    for (let i = line.length - 1; i >= 0; i--) {
      const char = line[i];
      if (/\d/.exec(char) != null) {
        num += char;
        break;
      }
    }
    total += parseInt(num);
  }
  return total;
};

export const partB: Solver = (lines: string[]) => {
  const nums: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  let total = 0;
  for (const line of lines) {
    let num = "";

    const firstDigitIndex = /\d/.exec(line)?.index ?? Infinity;
    let minWordIndex = Infinity;
    let minWord = "";
    for (const word of Object.keys(nums)) {
      const index = line.indexOf(word);
      if (index !== -1 && index < minWordIndex) {
        minWordIndex = index;
        minWord = word;
      }
    }
    num +=
      firstDigitIndex < minWordIndex ? line[firstDigitIndex] : nums[minWord];

    const lastDigit = /.*(\d)/.exec(line)?.[1];
    const lastDigitIndex = lastDigit ? line.lastIndexOf(lastDigit) : -1;
    let maxWordIndex = -1;
    let maxWord = "";
    for (const word of Object.keys(nums)) {
      const index = line.lastIndexOf(word);
      if (index > maxWordIndex) {
        maxWordIndex = index;
        maxWord = word;
      }
    }
    num += lastDigitIndex > maxWordIndex ? line[lastDigitIndex] : nums[maxWord];

    total += parseInt(num);
  }

  return total;
};
