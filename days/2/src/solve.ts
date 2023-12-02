import { Solver } from "shared";

type Color = "red" | "green" | "blue";

export const partA: Solver = (lines: string[]) => {
  const numCubes: Record<Color, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let idTotal = 0;

  outer: for (const line of lines) {
    const id = parseInt(/Game (\d+):/.exec(line)![1]);

    const grabs = line.split(": ")[1].split("; ");
    for (const grab of grabs) {
      const counts: Record<Color, number> = { red: 0, green: 0, blue: 0 };
      const cubeCounts = grab.split(", ");
      for (const cubeCount of cubeCounts) {
        const parts = cubeCount.split(" ");

        const color = parts[1] as Color;

        counts[color] += parseInt(parts[0]);
        if (counts[color] > numCubes[color]) {
          continue outer;
        }
      }
    }

    idTotal += id;
  }

  return idTotal;
};

export const partB: Solver = (lines: string[]) => {
  let powerTotal = 0;

  for (const line of lines) {
    const grabs = line.split(": ")[1].split("; ");
    const minCounts: Record<Color, number> = { red: 0, green: 0, blue: 0 };
    for (const grab of grabs) {
      const cubeCounts = grab.split(", ");
      for (const cubeCount of cubeCounts) {
        const parts = cubeCount.split(" ");

        const color = parts[1] as Color;

        minCounts[color] = Math.max(minCounts[color], parseInt(parts[0]));
      }
    }

    powerTotal += Object.values(minCounts).reduce(
      (power, count) => power * count,
      1
    );
  }

  return powerTotal;
};
