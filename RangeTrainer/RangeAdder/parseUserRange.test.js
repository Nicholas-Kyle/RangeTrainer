import parseUserRange from "./parseUserRange";
import each from "jest-each";
import rangeGroups from "./rangeGroups";

function getSubgroupFromHand(from, group) {
  return group.filter(hand => group.indexOf(hand) <= group.indexOf(from));
}

//Upswing Ranges
const utgRange = ["77+", "AQo+", "9_8s+", "J_9s+", "ATs+", "KTs", "A5s"];
const btnRange = [
  "22+",
  "A2o+",
  "A2s+",
  "K9o+",
  "Q9o+",
  "K3s+",
  "Q5s+",
  "T_9o+",
  "4_3s+",
  "6_4s+",
  "8_5s+",
  "J6s",
  "J7s",
  "T6s",
  "J9o"
];

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

  each([
    [
      utgRange,
      [
        ...getSubgroupFromHand("77", rangeGroups.pairs),
        "AKo",
        "AQo",
        "AKs",
        "KQs",
        "QJs",
        "JTs",
        "T9s",
        "98s",
        "KJs",
        "QTs",
        "J9s",
        "AQs",
        "AJs",
        "ATs",
        "KTs",
        "A5s"
      ]
    ],
    [
      btnRange,
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
});
