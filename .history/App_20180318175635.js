import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RangeTrainer from "./RangeTrainer/RangeTrainer";

export default class App extends React.Component {
  render() {
    return <RangeTrainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
