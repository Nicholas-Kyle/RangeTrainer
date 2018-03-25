import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RangeTrainer from "./RangeTrainer/RangeTrainer";
import positionWithGroups from "./RangeTrainer/positionWithGroups";

export default class App extends React.Component {
  render() {
    return <RangeTrainer positionWithGroups={positionWithGroups} />;
  }
}
