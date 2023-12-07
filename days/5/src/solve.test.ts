import { describe, expect, it } from "bun:test";
import { Range, partA, partB } from "./solve";

describe("part A", () => {
  it("should pass", () => {
    expect(
      partA([
        "seeds: 79 14 55 13",
        "",
        "seed-to-soil map:",
        "50 98 2",
        "52 50 48",
        "",
        "soil-to-fertilizer map:",
        "0 15 37",
        "37 52 2",
        "39 0 15",
        "",
        "fertilizer-to-water map:",
        "49 53 8",
        "0 11 42",
        "42 0 7",
        "57 7 4",
        "",
        "water-to-light map:",
        "88 18 7",
        "18 25 70",
        "",
        "light-to-temperature map:",
        "45 77 23",
        "81 45 19",
        "68 64 13",
        "",
        "temperature-to-humidity map:",
        "0 69 1",
        "1 0 69",
        "",
        "humidity-to-location map:",
        "60 56 37",
        "56 93 4",
      ])
    ).toEqual(35);
  });
});

describe("Range", () => {
  describe("overlap", () => {
    it("should return null for no overlap", () => {
      const r1 = new Range(1, 5);
      const r2 = new Range(6, 10);

      expect(r1.overlap(r2)).toBeNull();
      expect(r2.overlap(r1)).toBeNull();
    });

    it("should find overlap at either end", () => {
      const r1 = new Range(1, 5);
      const r2 = new Range(3, 8);

      expect(r1.overlap(r2)).toEqual(new Range(3, 5));
      expect(r2.overlap(r1)).toEqual(new Range(3, 5));
    });

    it("should find overlap with inclusive ends", () => {
      const r1 = new Range(1, 5);
      const r2 = new Range(1, 3);
      const r3 = new Range(3, 5);

      expect(r1.overlap(r2)).toEqual(new Range(1, 3));
      expect(r2.overlap(r1)).toEqual(new Range(1, 3));

      expect(r1.overlap(r3)).toEqual(new Range(3, 5));
      expect(r3.overlap(r1)).toEqual(new Range(3, 5));

      expect(r1.overlap(r1)).toEqual(new Range(1, 5));
    });

    it("should find fully contained overlap", () => {
      const r1 = new Range(1, 5);
      const r2 = new Range(2, 4);

      expect(r1.overlap(r2)).toEqual(new Range(2, 4));
      expect(r2.overlap(r1)).toEqual(new Range(2, 4));
    });
  });

  describe("split shift", () => {
    it("should work with no overlap", () => {
      const r = new Range(1, 5);

      const from = new Range(6, 10);
      const to = new Range(7, 11);

      expect(r.splitShift(from, to)).toEqual({
        same: [new Range(1, 5)],
        changed: [],
      });
    });

    it("should work with partial overlap at start", () => {
      const r = new Range(3, 6);

      const from = new Range(1, 4);
      const to = new Range(11, 14);

      expect(r.splitShift(from, to)).toEqual({
        same: [new Range(5, 6)],
        changed: [new Range(13, 14)],
      });
    });

    it("should work with partial overlap at end", () => {
      const r = new Range(3, 6);
      const from = new Range(5, 8);
      const to = new Range(11, 14);

      expect(r.splitShift(from, to)).toEqual({
        same: [new Range(3, 4)],
        changed: [new Range(11, 12)],
      });
    });

    it("should work with boundary overlap at start", () => {
      const r = new Range(3, 6);

      const from = new Range(3, 5);
      const to = new Range(11, 13);

      expect(r.splitShift(from, to)).toEqual({
        same: [new Range(6, 6)],
        changed: [new Range(11, 13)],
      });
    });

    it("should work with boundary overlap at end", () => {
      const r = new Range(3, 6);

      const from = new Range(4, 6);
      const to = new Range(11, 13);

      expect(r.splitShift(from, to)).toEqual({
        same: [new Range(3, 3)],
        changed: [new Range(11, 13)],
      });
    });

    it("should work with exact overlap", () => {
      const r = new Range(3, 6);

      const from = new Range(3, 6);
      const to = new Range(11, 14);

      expect(r.splitShift(from, to)).toEqual({
        same: [],
        changed: [new Range(11, 14)],
      });
    });

    it("should work with inner containment", () => {
      const r = new Range(3, 6);

      const from = new Range(1, 8);
      const to = new Range(11, 18);

      expect(r.splitShift(from, to)).toEqual({
        same: [],
        changed: [new Range(13, 16)],
      });
    });

    it("should work with outer containment", () => {
      const r = new Range(1, 8);

      const from = new Range(3, 6);
      const to = new Range(11, 14);

      expect(r.splitShift(from, to)).toEqual({
        same: [new Range(1, 2), new Range(7, 8)],
        changed: [new Range(11, 14)],
      });
    });
  });
});

describe("part B", () => {
  it("should pass", () => {
    expect(
      partB([
        "seeds: 79 14 55 13",
        "",
        "seed-to-soil map:",
        "50 98 2",
        "52 50 48",
        "",
        "soil-to-fertilizer map:",
        "0 15 37",
        "37 52 2",
        "39 0 15",
        "",
        "fertilizer-to-water map:",
        "49 53 8",
        "0 11 42",
        "42 0 7",
        "57 7 4",
        "",
        "water-to-light map:",
        "88 18 7",
        "18 25 70",
        "",
        "light-to-temperature map:",
        "45 77 23",
        "81 45 19",
        "68 64 13",
        "",
        "temperature-to-humidity map:",
        "0 69 1",
        "1 0 69",
        "",
        "humidity-to-location map:",
        "60 56 37",
        "56 93 4",
      ])
    ).toEqual(46);
  });
});
