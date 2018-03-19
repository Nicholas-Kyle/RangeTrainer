import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { textStyle } from "./sharedStyles";

const Scoreboard = ({ score }) => (
  <View>
    <Text style={styles.scoreText}>Score: {score}</Text>
  </View>
);

export default Scoreboard;

const styles = StyleSheet.create({
  scoreText: {
    ...textStyle.default
  }
});
