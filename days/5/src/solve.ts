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

export class Range {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  copy() {
    return new Range(this.start, this.end);
  }

  overlap(other: Range) {
    if (this.end < other.start || other.end < this.start) {
      return null;
    }

    return new Range(
      Math.max(this.start, other.start),
      Math.min(this.end, other.end)
    );
  }

  splitShift(from: Range, to: Range) {
    const overlap = this.overlap(from);
    if (overlap == null) {
      return { same: [this.copy()], changed: [] };
    }

    if (overlap.start < this.start || overlap.end > this.end) {
      throw new Error("cannot split outside of range");
    }

    const res: { same: Range[]; changed: Range[] } = { same: [], changed: [] };
    if (overlap.start > this.start) {
      res.same.push(new Range(this.start, overlap.start - 1));
    }
    const offset = to.start - from.start;
    res.changed.push(new Range(overlap.start + offset, overlap.end + offset));
    if (overlap.end < this.end) {
      res.same.push(new Range(overlap.end + 1, this.end));
    }

    return res;
  }
}

type Mapping = { src: Range; dest: Range };

export const partB: Solver = (lines: string[]) => {
  const seedRanges: Range[] = [];
  const mappings: Mapping[][] = [];

  lines = [...lines, ""];
  let group: string[] = [];
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];
    if (/seeds:/.exec(line)) {
      const seedNums = line
        .split(": ")[1]
        .split(" ")
        .map((n) => parseInt(n));

      for (let i = 0; i < seedNums.length; i += 2) {
        const start = seedNums[i];
        const d = seedNums[i + 1];
        seedRanges.push(new Range(start, start + d - 1));
      }
      lineNum++;
      continue;
    }

    if (line === "") {
      mappings.push([]);
      for (const rangeMapping of group.slice(1)) {
        const [dest, src, range] = rangeMapping
          .split(" ")
          .map((n) => parseInt(n));
        mappings.at(-1)!.push({
          src: new Range(src, src + range - 1),
          dest: new Range(dest, dest + range - 1),
        });
      }

      group = [];
    } else {
      group.push(line);
    }
  }

  let ranges = seedRanges;
  for (const mappingGroup of mappings) {
    const shifted: Range[] = [];
    for (const mapping of mappingGroup) {
      for (let rangeIndex = ranges.length - 1; rangeIndex >= 0; rangeIndex--) {
        const range = ranges.splice(rangeIndex, 1)[0];
        const { same, changed } = range.splitShift(mapping.src, mapping.dest);
        ranges.push(...same);
        shifted.push(...changed);
      }
    }
    ranges.push(...shifted);
  }

  return ranges.reduce((min, range) => Math.min(range.start, min), Infinity);
};
