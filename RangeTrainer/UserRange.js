const suitedAce = ["AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s"];
const suitedKing = ["KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s"];
const suitedQueen = ["QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s"];
const suitedJack = ["JTs", "J9s", "J8s", "J7s", "J6s", "J5s", "J4s", "J3s", "J2s"];
const suitedTen = ["T9s", "T8s", "T7s", "T6s", "T5s", "T4s", "T3s", "T2s"];
const suitedNine = ["98s", "97s", "96s", "95s", "94s", "93s", "92s"];
const suitedEight = ["87s", "86s", "85s", "84s", "83s", "82s"];
const suitedSeven = ["76s", "75s", "74s", "73s", "72s"];
const suitedSix = ["65s", "64s", "63s", "62s"];
const suitedFive = ["54s", "53s", "52s"];
const suitedFour = ["43s", "42s"];
const suitedThree = ["32s"];

const offSuitAce = ["AKo", "AQo", "AJo", "ATo", "A9o", "A8o", "A7o", "A6o", "A5o", "A4o", "A3o", "A2o"];
const offSuitKing = ["KQo", "KJo", "KTo", "K9o", "K8o", "K7o", "K6o", "K5o", "K4o", "K3o", "K2o"];
const offSuitQueen = ["QJo", "QTo", "Q9o", "Q8o", "Q7o", "Q6o", "Q5o", "Q4o", "Q3o", "Q2o"];
const offSuitJack = ["JTo", "J9o", "J8o", "J7o", "J6o", "J5o", "J4o", "J3o", "J2o"];
const offSuitTen = ["T9o", "T8o", "T7o", "T6o", "T5o", "T4o", "T3o", "T2o"];
const offSuitNine = ["98o", "97o", "96o", "95o", "94o", "93o", "92o"];
const offSuitEight = ["87o", "86o", "85o", "84o", "83o", "82o"];
const offSuitSeven = ["76o", "75o", "74o", "73o", "72o"];
const offSuitSix = ["65o", "64o", "63o", "62o"];
const offSuitFive = ["54o", "53o", "52o"];
const offSuitFour = ["43o", "42o"];
const offSuitedThree = ["32o"];

const suitedConnectors = ["AKs", "KQs", "QJs", "JTs", "T9s", "98s", "87s", "76s", "65s", "54s", "43s", "32s"];
const suitedOneGap = ["AQs", "KJs", "QTs", "J9s", "T8s", "97s", "86s", "75s", "64s", "53s", "42s"];
const suitedTwoGap = ["AJs", "KTs", "Q9s", "J8s", "T7s", "96s", "85s", "74s", "63s", "52s"]

const offSuitConnectors = ["AKo", "KQo", "QJo", "JTo", "T9o", "98o", "87o", "76o", "65o", "54o", "43o", "32o"];
const offSuitOneGap = ["AQo", "KJo", "QTo", "J9o", "T8o", "97o", "86o", "75o", "64o", "53o", "42o"];
const offSuitTwoGap = ["AJo", "KTo", "Q9o", "J8o", "T7o", "96o", "85o", "74o", "63o", "52o"];

const pairs = ["AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22"];

const highCardsAndPairs = [suitedAce, suitedKing, suitedQueen, suitedJack, suitedTen, suitedNine, suitedEight, suitedSeven,
                    suitedSix, suitedFive, suitedFour, suitedThree, offSuitAce, offSuitKing, offSuitQueen, offSuitJack, offSuitTen,
                    offSuitNine, offSuitEight, offSuitSeven, offSuitSix, offSuitFive, offSuitFour, offSuitedThree, pairs];

const connectors = [suitedConnectors, suitedOneGap, suitedTwoGap, offSuitConnectors, offSuitOneGap, offSuitTwoGap];

// for testing in browser can be removed once integrated
var customRangeString = prompt("Please enter a range");

customRangeString = customRangeString.replace(/\s+/g, "");
var customRangeArray = customRangeString.split(",");

var finalRange = [];

for (i=0; i<customRangeArray.length; i++){
    
    var userHand = customRangeArray[i];
    var currentRange = [];

    if(userHand.indexOf("+") !== -1){
        userHand = userHand.replace("+", "");

        if(userHand.indexOf("_") !== -1){
            userHand = userHand.replace("_", "");

            for (j=0; j<connectors.length; j++){
                for (k=0; k<connectors[j].length; k++){
                    var rangeHand = connectors[j][k];
                    if (rangeHand.toUpperCase() === userHand.toUpperCase()){           
                        for (l=0; l<=k; l++){
                            currentRange.push(connectors[j][l]);
                        }
                    }
                }
            }
        }

        else{
            for (j=0; j<highCardsAndPairs.length; j++){
                for (k=0; k<highCardsAndPairs[j].length; k++){
                    var rangeHand = highCardsAndPairs[j][k];

                    if (rangeHand.toUpperCase() === userHand.toUpperCase()){
                        for (l=0; l<=k; l++){
                            currentRange.push(highCardsAndPairs[j][l]);
                        }
                    }
                }
            }
        }
    } 
    
    else{
        for (j=0; j<highCardsAndPairs.length; j++){
            for (k=0; k<highCardsAndPairs[j].length; k++){
                var rangeHand = highCardsAndPairs[j][k];

                if (rangeHand.toUpperCase() === userHand.toUpperCase()){
                        currentRange.push(highCardsAndPairs[j][k]);
                }
            }
        }
    }

    for (j=0; j<currentRange.length; j++){
        if(!finalRange.includes(currentRange[j])){
            finalRange.push(currentRange[j]);
        }
    }
}
