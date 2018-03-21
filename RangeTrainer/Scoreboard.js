import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { textStyle, colors } from "./sharedStyles";

const Scoreboard = ({ score, highScore }) => (
  <View>
    <Text style={styles.scoreText}>Score: {score}</Text>
    <Text style={styles.scoreText}>High Score: {highScore}</Text>
  </View>
);

export default Scoreboard;

const styles = StyleSheet.create({
  scoreText: {
    ...textStyle.default,
    color: colors.textSecondary
  }
});
