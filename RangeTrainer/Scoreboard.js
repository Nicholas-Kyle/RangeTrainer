import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { textStyle, colors } from "./sharedStyles";

const Scoreboard = ({ score, highScore }) => (
  <View style={styles.container}>
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>Score: {score}</Text>
    </View>
    <View style={styles.highscoreContainer}>
      <Text style={styles.highscoreText}>High Score: {highScore}</Text>
    </View>
  </View>
);

export default Scoreboard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: colors.textSecondary,
    borderBottomWidth: 1,
    borderStyle: "dashed"
  },
  scoreContainer: {
    justifyContent: "flex-start"
  },
  highscoreContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  scoreText: {
    ...textStyle.default,
    color: colors.textSecondary,
    fontSize: 18
  },
  highscoreText: {
    ...textStyle.default,
    textAlign: "right",
    color: colors.textSecondary,
    fontSize: 18
  }
});
