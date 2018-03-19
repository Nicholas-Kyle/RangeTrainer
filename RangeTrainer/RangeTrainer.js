import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Scoreboard from "./Scoreboard";
import ActionButtonGroup from "./ActionButtonGroup";
import ActionHistoryMessages from "./ActionHistoryMessages";
import { textStyle } from "./sharedStyles";

const POSITIONS = ["EP", "MP", "HJ", "CO", "BTN"];
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
const groupTwlegth = ["Q9s", "J8s", "107s", "96s", "85s", "74s", "63s", "52s"];
const groupThirteen = ["JTo", "T9o", "98o", "87o", "76o", "65o", "54o"];

const positionWithGroups = {
  [POSITIONS[0]]: {
    raiseDefend: [...groupOne, ...groupTwo, ...groupThree],
    raiseFold: [...groupfour, ...groupfive, ...groupSix],
    limp: [...groupSeven]
  },
  [POSITIONS[1]]: {
    raiseDefend: [...groupOne, ...groupTwo, ...groupThree],
    raiseFold: [...groupfour, ...groupfive, ...groupSix, ...groupSeven],
    limp: [...groupEight]
  },
  [POSITIONS[2]]: {
    raiseDefend: [
      ...groupOne,
      ...groupTwo,
      ...groupThree,
      ...groupfour,
      ...groupfive
    ],
    raiseFold: [...groupSix, ...groupSeven, ...groupEight],
    limp: [...groupNine, ...groupTen]
  },
  [POSITIONS[3]]: {
    raiseDefend: [
      ...groupOne,
      ...groupTwo,
      ...groupThree,
      ...groupfour,
      ...groupfive,
      ...groupSix
    ],
    raiseFold: [...groupSeven, ...groupEight, ...groupNine],
    limp: [...groupTen, ...groupEleven, ...groupTwlegth]
  },
  [POSITIONS[4]]: {
    raiseDefend: [
      ...groupOne,
      ...groupTwo,
      ...groupThree,
      ...groupfour,
      ...groupfive,
      ...groupSix
    ],
    raiseFold: [...groupSeven, ...groupEight, ...groupNine, ...groupTen],
    limp: [...groupEleven, ...groupTwlegth, ...groupThirteen]
  }
};

function reverseArray(array) {
  return array.slice(0).reverse();
}

class RangeTrainer extends Component {
  constructor(props) {
    super(props);
    this.state = { score: 0, wrongHands: [] };
    this.newHand = this.newHand.bind(this);
    this.checkAction = this.checkAction.bind(this);
  }

  getRandomPosition() {
    return POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
  }

  getRandomHand() {
    let ranks = [
      "A",
      "K",
      "Q",
      "J",
      "T",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2"
    ];
    let randomIndexOne = Math.floor(Math.random() * ranks.length);
    let randomIndexTwo = Math.floor(Math.random() * ranks.length);
    let cardOne;
    let cardTwo;
    if (randomIndexOne < randomIndexTwo) {
      cardOne = ranks[randomIndexOne];
      cardTwo = ranks[randomIndexTwo];
    } else {
      cardOne = ranks[randomIndexTwo];
      cardTwo = ranks[randomIndexOne];
    }

    let randomNumberBetweenOneAndFour = Math.floor(Math.random() * 4) + 1;

    let suited = "";
    if (cardOne !== cardTwo) {
      if (randomNumberBetweenOneAndFour === 4) {
        suited = "s";
      } else {
        suited = "o";
      }
    }

    return `${cardOne}${cardTwo}${suited}`;
  }

  newHand() {
    this.setState({
      position: this.getRandomPosition(),
      hand: this.getRandomHand(),
      action: null
    });
  }

  findCorrectActionForHandInPosition(hand, position) {
    const positionGroups = positionWithGroups[position];
    if (positionGroups.raiseDefend.includes(hand)) {
      return "raiseDefend";
    }
    if (positionGroups.raiseFold.includes(hand)) {
      return "raiseFold";
    }
    if (positionGroups.limp.includes(hand)) {
      return "limp";
    }

    return "fold";
  }

  checkAction(playerAction) {
    const { hand, position } = this.state;

    const correctAction = this.findCorrectActionForHandInPosition(
      hand,
      position
    );
    const handSuccess = playerAction === correctAction;

    const correctActionMessage = handSuccess
      ? ""
      : `For Hand ${hand} and position ${position} Correct action is ${correctAction}.`;

    const extraScore = handSuccess ? 10 : -10;

    this.setState(
      ({ score: oldScore, wrongHands }) => ({
        score: oldScore + extraScore,
        handSuccess,
        action: playerAction,
        correctActionMessage,
        wrongHands: wrongHands.concat(correctActionMessage)
      }),
      this.newHand()
    );
  }

  render() {
    const {
      position,
      hand,
      handSuccess,
      action,
      score,
      correctActionMessage,
      wrongHands
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.scoreboard}>
          <Scoreboard score={score} />
        </View>
        <View style={styles.newHand}>
          <Button title="Next hand" onPress={this.newHand} />
        </View>
        <View style={styles.posHand}>
          <Text style={styles.position}>
            Position: <Text style={styles.positionTitle}>{position}</Text>
          </Text>
          <Text style={styles.hand}>
            Hand: <Text style={styles.handTitle}>{hand}</Text>
          </Text>
        </View>
        <View style={styles.actionButtons}>
          {hand && <ActionButtonGroup onAction={this.checkAction} />}
        </View>

        {action && (
          <View style={styles.actionMessage}>
            {action &&
              handSuccess && (
                <Text style={styles.correctActionMessage}>Correct action</Text>
              )}

            {!handSuccess && (
              <Text style={styles.wrongActionMessage}>Wrong action</Text>
            )}
          </View>
        )}
        <View style={styles.actionHistoryMessages}>
          <ActionHistoryMessages hands={reverseArray(wrongHands)} />
        </View>
      </View>
    );
  }
}

export default RangeTrainer;

const markerBorder = {
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "black"
};

const styles = StyleSheet.create({
  container: {
    ...markerBorder,
    flex: 1,
    backgroundColor: "powderblue",
    padding: 30,
    alignItems: "center",
    justifyContent: "space-between"
  },
  scoreboard: {
    ...markerBorder,
    padding: 15,
    alignSelf: "stretch"
  },
  newHand: {
    ...markerBorder,
    alignSelf: "stretch"
  },
  posHand: {
    ...markerBorder,
    alignSelf: "stretch",
    padding: 15
  },
  position: { ...textStyle.default },
  positionTitle: {
    alignContent: "flex-end"
  },
  handTitle: {
    alignContent: "flex-end"
  },
  hand: { ...textStyle.default },
  actionButtons: {
    ...markerBorder
  },
  actionMessage: {
    ...markerBorder,
    alignSelf: "stretch"
  },
  correctActionMessage: {
    backgroundColor: "green",
    padding: 15,
    ...textStyle.default
  },
  wrongActionMessage: {
    padding: 15,
    backgroundColor: "red",
    ...textStyle.default
  },
  actionHistoryMessages: {
    ...markerBorder,
    flex: 1,
    alignSelf: "stretch",
    padding: 15
  }
});
