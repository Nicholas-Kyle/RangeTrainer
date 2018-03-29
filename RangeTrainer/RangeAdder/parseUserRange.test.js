import parseUserRange from "./parseUserRange";
import each from "jest-each";
import rangeGroups from "./rangeGroups";

describe("parseUserRange", () => {
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
});
