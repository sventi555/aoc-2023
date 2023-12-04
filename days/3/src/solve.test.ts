import { describe, expect, it } from "bun:test";
import { partA, partB } from "./solve";

describe("part A", () => {
  it("should add all the part numbers", () => {
    expect(
      partA([
        "467..114..",
        "...*......",
        "..35..633.",
        "......#...",
        "617*......",
        ".....+.58.",
        "..592.....",
        "......755.",
        "...$.*....",
        ".664.598..",
      ])
    ).toEqual(4361);
  });
});

describe("part B", () => {
  it("should pass", () => {
    expect(
      partB([
        "467..114..",
        "...*......",
        "..35..633.",
        "......#...",
        "617*......",
        ".....+.58.",
        "..592.....",
        "......755.",
        "...$.*....",
        ".664.598..",
      ])
    ).toEqual(467835);
  });
});
