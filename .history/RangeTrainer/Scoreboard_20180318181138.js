import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Scoreboard = ({ score }) => (
  <View>
    <Text>Score: {score}</Text>
  </View>
);

export default Scoreboard;
