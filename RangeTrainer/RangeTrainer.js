import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Button, Divider } from "react-native-elements";
import Scoreboard from "./Scoreboard";
import ActionButtonGroup from "./ActionButtonGroup";
import ActionHistoryMessages from "./ActionHistoryMessages";
import ACTIONS from "./ACTIONS";
import { textStyle, colors } from "./sharedStyles";

class RangeTrainer extends Component {
  constructor(props) {
    super(props);
    this.state = { score: 0, wrongHands: [] };
    this.newHand = this.newHand.bind(this);
    this.checkAction = this.checkAction.bind(this);
  }

  async componentDidMount() {
    const highScore = await this.getHighScore();
    this.setState({ highScore });
    await this.newHand();
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

    let randomNumberBetweenOneAndFiftyOne = Math.floor(Math.random() * 51) + 1;

    let suited = "";
    if (cardOne !== cardTwo) {
      if (randomNumberBetweenOneAndFiftyOne <= 12) {
        suited = "s";
      } else {
        suited = "o";
      }
    }

    return `${cardOne}${cardTwo}${suited}`;
  }

  async getHighScore() {
    try {
      const highScore = await AsyncStorage.getItem("@RangeTrainer:highScore");
      if (highScore !== null) {
        return parseInt(highScore);
      }

      await this.setHighScore(0);
      console.log("no current highscore setting to 0");
      return 0;
    } catch (error) {
      console.log("Error retrieving highScore: ", error);
    }
  }

  async setHighScore(newScore) {
    try {
      await AsyncStorage.setItem(
        "@RangeTrainer:highScore",
        newScore.toString()
      );
      this.setState({ highScore: newScore });
    } catch (error) {
      console.log("Error saving highScore: ", error);
    }
  }

  async checkIfHighScore() {
    const highScore = await this.getHighScore();
    const { score } = this.state;
    return score > highScore;
  }

  async newHand() {
    const isHighScore = await this.checkIfHighScore();
    if (isHighScore) {
      await this.setHighScore(this.state.score);
    }

    this.setState({
      position: this.getRandomPosition(),
      hand: this.getRandomHand()
    });
  }

  findCorrectActionForHandInPosition(hand, position) {
    const positionGroups = this.props.positionWithGroups[position];
    if (positionGroups.raise.includes(hand)) {
      return ACTIONS.RAISE;
    }

    if (positionGroups.limp.includes(hand)) {
      return ACTIONS.LIMP;
    }

    return ACTIONS.FOLD;
  }

  checkAction(playerAction) {
    const { hand, position } = this.state;

    const correctAction = this.findCorrectActionForHandInPosition(
      hand,
      position
    );
    const handSuccess = playerAction === correctAction;
    const newState = { handSuccess, action: playerAction };

    if (!handSuccess) {
      const actionMessage = `For Hand ${hand} and position ${position} Correct action is ${correctAction}.`;
      return this.setState(
        ({ wrongHands }) => {
          let newWrongHands = wrongHands.slice(0);
          newWrongHands.unshift(actionMessage);
          return {
            ...newState,
            score: 0,
            wrongHands: newWrongHands
          };
        },
        async () => {
          try {
            await this.newHand();
          } catch (error) {
            console.log("Error calling newHand: ", error);
          }
        }
      );
    }

    return this.setState(
      ({ score: oldScore }) => ({
        ...newState,
        score: oldScore + 10
      }),
      async () => {
        try {
          await this.newHand();
        } catch (error) {
          console.log("Error calling newHand: ", error);
        }
      }
    );
  }

  render() {
    const {
      position,
      hand,
      handSuccess,
      action,
      score,
      wrongHands,
      highScore
    } = this.state;
    return (
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.scoreboard}>
            <Scoreboard score={score} highScore={highScore} />
          </View>
          <View style={styles.posHandView}>
            <Text style={styles.position}>
              Position: <Text style={styles.positionTitle}>{position}</Text>
            </Text>
            <Text style={styles.hand}>
              Hand: <Text style={styles.handTitle}>{hand}</Text>
            </Text>
          </View>
          {hand && <ActionButtonGroup onAction={this.checkAction} />}
          {action && (
            <View style={styles.actionMessageView}>
              {handSuccess && (
                <Text style={styles.correctActionMessage}>Correct action</Text>
              )}

              {!handSuccess && (
                <Text style={styles.wrongActionMessage}>Wrong action</Text>
              )}
            </View>
          )}
          <View style={styles.actionHistoryMessages}>
            <ActionHistoryMessages hands={wrongHands} />
          </View>
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
  outerContainer: {
    flex: 1,
    backgroundColor: colors.main,
    padding: 30
  },
  innerContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "space-between"
  },
  scoreboard: {
    backgroundColor: colors.secondary,
    marginBottom: 30,
    alignSelf: "stretch"
  },
  posHandView: {
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15
  },
  position: { ...textStyle.default, color: colors.textSecondary },
  positionTitle: {
    alignContent: "flex-end"
  },
  handTitle: {
    alignContent: "flex-end"
  },
  hand: { ...textStyle.default, color: colors.textSecondary },
  actionMessageView: {
    alignSelf: "stretch",
    marginTop: 15,
    marginBottom: 15
  },
  correctActionMessage: {
    ...textStyle.default,
    textAlign: "center",
    backgroundColor: "green",
    color: colors.textSecondary,
    padding: 15
  },
  wrongActionMessage: {
    ...textStyle.default,
    textAlign: "center",
    padding: 15,
    color: colors.textSecondary,
    backgroundColor: "red"
  },
  actionHistoryMessages: {
    flex: 1,
    alignSelf: "stretch"
  }
});
