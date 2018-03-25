import ACTIONS from "./ACTIONS";
import POSITIONS from "./POSITIONS";

const groupOne = ["AA", "KK", "QQ", "JJ"];
const groupTwo = ["AKs", "AKo"];
const groupThree = ["AQs"];
const groupfour = ["TT", "99", "88"];
const groupfive = ["AJs", "AQo"];
const groupSix = ["ATs", "KQs", "AJo"];
const groupSeven = ["ATo", "KQo"];
const groupEight = ["77", "66", "55", "44", "33", "22"];
const groupNine = ["KJs", "KTs", "QJs"];
const groupTen = ["JTs", "T9s", "98s", "87s", "76s", "65s", "54s"];
const groupEleven = ["QTs", "J9s", "108s", "97s", "86s", "75s", "64s", "53s"];
const groupTwelve = ["Q9s", "J8s", "107s", "96s", "85s", "74s", "63s", "52s"];
const groupThirteen = ["JTo", "T9o", "98o", "87o", "76o", "65o", "54o"];

const defaultRange = {
  [POSITIONS[0]]: {
    [ACTIONS.RAISE]: [
      ...groupOne,
      ...groupTwo,
      ...groupThree,
      ...groupfour,
      ...groupfive,
      ...groupSix
    ],
    [ACTIONS.LIMP]: [...groupSeven]
  },
  [POSITIONS[1]]: {
    [ACTIONS.RAISE]: [
      ...groupOne,
      ...groupTwo,
      ...groupThree,
      ...groupfour,
      ...groupfive,
      ...groupSix,
      ...groupSeven
    ],
    [ACTIONS.LIMP]: [...groupEight]
  },
  [POSITIONS[2]]: {
    [ACTIONS.RAISE]: [
      ...groupOne,
      ...groupTwo,
      ...groupThree,
      ...groupfour,
      ...groupfive,
      ...groupSix,
      ...groupSeven,
      ...groupEight
    ],
    [ACTIONS.LIMP]: [...groupNine, ...groupTen]
  },
  [POSITIONS[3]]: {
    [ACTIONS.RAISE]: [
      ...groupOne,
      ...groupTwo,
      ...groupThree,
      ...groupfour,
      ...groupfive,
      ...groupSix,
      ...groupSeven,
      ...groupEight,
      ...groupNine
    ],
    [ACTIONS.LIMP]: [...groupTen, ...groupEleven, ...groupTwelve]
  },
  [POSITIONS[4]]: {
    [ACTIONS.RAISE]: [
      ...groupOne,
      ...groupTwo,
      ...groupThree,
      ...groupfour,
      ...groupfive,
      ...groupSix,
      ...groupSeven,
      ...groupEight,
      ...groupNine,
      ...groupTen
    ],
    [ACTIONS.LIMP]: [...groupEleven, ...groupTwelve, ...groupThirteen]
  }
};

export default defaultRange;
