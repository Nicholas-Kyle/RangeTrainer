import parseUserRange from "./parseUserRange";
import each from "jest-each";
import { getSubgroupFromHand } from "../helpers/helpers";
import upswingRanges from "../RangeTeacher/defaultRanges/upswing";
import rangeGroups from "./rangeGroups";

console.error = jest.fn();
console.log = jest.fn();

describe("parseUserRange", () => {
  beforeEach(() => {
    console.error.mockClear();
    console.log.mockClear();
  });

  it("is a function", () => expect(parseUserRange).toBeInstanceOf(Function));

  each([
    [["22+"], rangeGroups.pairs],
    [["3_2s+"], rangeGroups.suitedConnectors],
    [["A2s+"], rangeGroups.suitedAce],
    [["AA"], ["AA"]],
    [["65o"], ["65o"]],
    [["J9o"], ["J9o"]],
    [["A2s"], ["A2s"]]
  ]).describe("when given a single range %s", (userRange, expectedRange) => {
    it(`should return the correct final range`, () => {
      expect(parseUserRange(userRange)).toEqual(expectedRange);
    });
  });

  each([
    [
      upswingRanges.UTG,
      [
        ...new Set([
          ...getSubgroupFromHand("77", rangeGroups.pairs),
          ...getSubgroupFromHand("AQo", rangeGroups.offSuitAce),
          ...getSubgroupFromHand("ATs", rangeGroups.suitedAce),
          ...getSubgroupFromHand("98s", rangeGroups.suitedConnectors),
          ...getSubgroupFromHand("J9s", rangeGroups.suitedOneGap),
          "KTs",
          "A5s"
        ])
      ]
    ],
    [
      upswingRanges.BTN,
      [
        ...new Set([
          ...rangeGroups.pairs,
          ...rangeGroups.offSuitAce,
          ...rangeGroups.suitedAce,
          ...getSubgroupFromHand("43s", rangeGroups.suitedConnectors),
          ...getSubgroupFromHand("64s", rangeGroups.suitedOneGap),
          ...getSubgroupFromHand("85s", rangeGroups.suitedTwoGap),
          ...getSubgroupFromHand("K3s", rangeGroups.suitedKing),
          ...getSubgroupFromHand("Q5s", rangeGroups.suitedQueen),
          ...getSubgroupFromHand("K9o", rangeGroups.offSuitKing),
          ...getSubgroupFromHand("Q9o", rangeGroups.offSuitQueen),
          ...getSubgroupFromHand("T9o", rangeGroups.offSuitConnectors),
          "J9o",
          "J6s",
          "J7s",
          "T6s"
        ])
      ]
    ]
  ]).describe("when given a mutipart range %s", (userRange, expectedRange) => {
    it(`should return the correct final range`, () => {
      expect(parseUserRange(userRange).sort()).toEqual(expectedRange.sort());
    });
  });

  each([[["J9O"], ["J9o"]], [["J9S"], ["J9s"]], [["j9o"], ["J9o"]]]).describe(
    "when the wrong case is given %s",
    (userRange, expectedRange) => {
      it(`should return a range without the invalid hand `, () => {
        expect(parseUserRange(userRange).sort()).toEqual(expectedRange.sort());
      });
    }
  );

  each([
    [["56"], []],
    [["56+"], []],
    [["FF"], []],
    [["FF", "22+"], [...rangeGroups.pairs]],
    [
      ["6_5s+", "89s+"],
      [...getSubgroupFromHand("65s", rangeGroups.suitedConnectors)]
    ]
  ]).describe("when given a invalid range %s", (userRange, expectedRange) => {
    it(`should error and return a range without the invalid hand`, () => {
      expect(parseUserRange(userRange).sort()).toEqual(expectedRange.sort());
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });
});
