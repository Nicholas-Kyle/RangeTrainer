import rangeGroups from "./rangeGroups";
import { getSubgroupFromHand } from "../helpers/helpers";

let { connectors, highCardsAndPairs } = rangeGroups;

const SYMBOLS = {
  PLUS: "+",
  CONNECTOR: "_"
};

function isSingleHand(hand) {
  return !hand.includes(SYMBOLS.PLUS);
}

function isConnectorHand(hand) {
  return hand.includes(SYMBOLS.CONNECTOR);
}

function getRangeGroup(group, userHand) {
  return group.find(handGroup =>
    handGroup.some(hand => hand.toUpperCase() === userHand.toUpperCase())
  );
}

function getHandFromRangeGroup(rangeGroup, userHand) {
  return rangeGroup.find(hand => hand.toUpperCase() === userHand.toUpperCase());
}

function parseUserRange(userRange) {
  let finalRange = userRange.reduce((finalRange, userHand) => {
    if (isSingleHand(userHand)) {
      let rangeGroup = getRangeGroup(highCardsAndPairs, userHand);
      if (rangeGroup) {
        let hand = getHandFromRangeGroup(rangeGroup, userHand);

        return finalRange.concat(hand);
      }

      console.error("invalid hand", userHand);
      return finalRange;
    }

    userHand = userHand.replace("+", "");
    if (isConnectorHand(userHand)) {
      userHand = userHand.replace("_", "");

      let rangeGroup = getRangeGroup(connectors, userHand);

      return finalRange.concat(...getSubgroupFromHand(userHand, rangeGroup));
    }

    let rangeGroup = getRangeGroup(highCardsAndPairs, userHand);
    if (rangeGroup) {
      return finalRange.concat(...getSubgroupFromHand(userHand, rangeGroup));
    }

    console.error("invalid hand", userHand);

    return finalRange;
  }, []);

  return [...new Set(finalRange)];
}

export default parseUserRange;
