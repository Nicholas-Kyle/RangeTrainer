import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import "./Scoreboard.css";

const Scoreboard = ({ score }) => (
  <View style={styles.container}>
    <Text>Score: {score}</Text>
  </View>
);

export default Scoreboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
