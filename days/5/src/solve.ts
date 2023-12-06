import { Solver } from "shared";

type Category =
  | "seed"
  | "soil"
  | "fertilizer"
  | "water"
  | "light"
  | "temperature"
  | "humidity"
  | "location";

type Mappings = Record<
  string,
  Record<string, { src: number; dest: number; range: number }[]>
>;

const mapNumber = (
  val: number,
  from: Category,
  to: Category,
  mappings: Mappings
) => {
  const mapRanges = mappings[from][to];
  for (const mapRange of mapRanges) {
    const { src, dest, range } = mapRange;
    if (val >= src && val - src < range) {
      return dest + (val - src);
    }
  }

  return val;
};

export const partA: Solver = (lines: string[]) => {
  let seedNums: number[] = [];
  const mappings: Mappings = {};

  lines = [...lines, ""];
  let group: string[] = [];
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];
    if (/seeds:/.exec(line)) {
      seedNums = line
        .split(": ")[1]
        .split(" ")
        .map((n) => parseInt(n));
      lineNum++;
      continue;
    }

    if (line === "") {
      const [from, to] = /(\w+)-to-(\w+)/.exec(group[0])!.slice(1) as [
        Category,
        Category
      ];
      if (mappings[from] == null) {
        mappings[from] = {};
      }
      mappings[from][to] = [];

      for (const rangeMapping of group.slice(1)) {
        const [dest, src, range] = rangeMapping
          .split(" ")
          .map((n) => parseInt(n));
        mappings[from][to].push({ src, dest, range });
      }

      group = [];
    } else {
      group.push(line);
    }
  }

  let minLocation = Infinity;
  for (const seedNum of seedNums) {
    const soilNum = mapNumber(seedNum, "seed", "soil", mappings);
    const fertNum = mapNumber(soilNum, "soil", "fertilizer", mappings);
    const waterNum = mapNumber(fertNum, "fertilizer", "water", mappings);
    const lightNum = mapNumber(waterNum, "water", "light", mappings);
    const tempNum = mapNumber(lightNum, "light", "temperature", mappings);
    const humidNum = mapNumber(tempNum, "temperature", "humidity", mappings);
    const locNum = mapNumber(humidNum, "humidity", "location", mappings);

    minLocation = Math.min(minLocation, locNum);
  }

  return minLocation;
};

export const partB: Solver = (lines: string[]) => {
  return 0;
};
