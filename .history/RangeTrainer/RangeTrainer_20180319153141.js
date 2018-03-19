import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Scoreboard from "./Scoreboard";
import ActionButtonGroup from "./ActionButtonGroup";

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
      : `Correct action is ${correctAction}. For Hand ${hand} and position ${position}`;

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
        <Scoreboard score={score} />
        <View>
          <Button title="Next hand" onClick={this.newHand} />
          <Text>Pos: {position}</Text>
        </View>
        <View>
          <Text>Hand: {hand}</Text>
        </View>
        {!!hand && <ActionButtonGroup onAction={this.checkAction} />}
        {/* {!!action && (
          <View>
            {!!action &&
              handSuccess && (
                <Text style={{ backgroundColor: "green" }}>Correct action</Text>
              )}

            {!handSuccess && (
              <Text style={{ backgroundColor: "red" }}>Wrong action</Text>
            )}
          </View>
        )}

        {!!wrongHands && (
          <View> {wrongHands.map(wrongHand => <Text>{wrongHand}</Text>)}</View>
        )} */}
      </View>
    );
  }
}

export default RangeTrainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
