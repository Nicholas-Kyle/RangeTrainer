import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import "./Scoreboard.css";

const Scoreboard = ({ score }) => (
  <View style={styles.container}>
    <Text>Score: {score}</Text>
  </View>
);

export default Scoreboard;
