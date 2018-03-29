import rangeGroups from "./rangeGroups";
const { connectors, highCardsAndPairs } = rangeGroups;

function parseUserRange(customRangeArray) {
  var finalRange = [];
  for (i = 0; i < customRangeArray.length; i++) {
    var userHand = customRangeArray[i];
    var currentRange = [];
    if (userHand.indexOf("+") !== -1) {
      userHand = userHand.replace("+", "");

      if (userHand.indexOf("_") !== -1) {
        userHand = userHand.replace("_", "");

        for (j = 0; j < connectors.length; j++) {
          for (k = 0; k < connectors[j].length; k++) {
            var rangeHand = connectors[j][k];
            if (rangeHand.toUpperCase() === userHand.toUpperCase()) {
              for (l = 0; l <= k; l++) {
                currentRange.push(connectors[j][l]);
              }
            }
          }
        }
      } else {
        for (j = 0; j < highCardsAndPairs.length; j++) {
          for (k = 0; k < highCardsAndPairs[j].length; k++) {
            var rangeHand = highCardsAndPairs[j][k];

            if (rangeHand.toUpperCase() === userHand.toUpperCase()) {
              for (l = 0; l <= k; l++) {
                currentRange.push(highCardsAndPairs[j][l]);
              }
            }
          }
        }
      }
    } else {
      for (j = 0; j < highCardsAndPairs.length; j++) {
        for (k = 0; k < highCardsAndPairs[j].length; k++) {
          var rangeHand = highCardsAndPairs[j][k];

          if (rangeHand.toUpperCase() === userHand.toUpperCase()) {
            currentRange.push(highCardsAndPairs[j][k]);
          }
        }
      }
    }
    for (j = 0; j < currentRange.length; j++) {
      if (!finalRange.includes(currentRange[j])) {
        finalRange.push(currentRange[j]);
      }
    }
  }

  return finalRange;
}

export default parseUserRange;
