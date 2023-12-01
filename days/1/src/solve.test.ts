import { describe, expect, it } from "bun:test";
import { partA, partB } from "./solve";

describe("part A", () => {
  it("should return the sum of calibration values", () => {
    expect(partA(["a1b2", "4abc0d"])).toEqual(52);
  });
});

describe("part B", () => {
  it("should read real numbers and written ones", () => {
    expect(partB(["two1b2", "4abc0three"])).toEqual(65);
    expect(
      partB([
        "two1nine",
        "eightwothree",
        "abcone2threexyz",
        "xtwone3four",
        "4nineeightseven2",
        "zoneight234",
        "7pqrstsixteen",
      ])
    ).toEqual(281);
  });
});
