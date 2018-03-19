import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import "./Scoreboard.css";

const Scoreboard = ({ score }) => (
  <View className="scoreboard">
    <Text>Score: {score}</Text>
  </View>
);

export default Scoreboard;
