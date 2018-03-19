import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import ACTIONS from "./ACTIONS";

const ActionButtonGroup = ({ onAction }) => (
  <View style={styles.container}>
    <Button title="Limp" onPress={onAction.bind(null, ACTIONS.LIMP)} />
    <Button
      title="Raise Fold"
      onPress={onAction.bind(null, ACTIONS.RAISE_FOLD)}
    />
    <Button
      title="Raise Defend"
      onPress={onAction.bind(null, ACTIONS.RAISE_DEFEND)}
    />
    <Button title="Fold" onPress={onAction.bind(null, ACTIONS.FOLD)} />
  </View>
);

export default ActionButtonGroup;

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    flexDirection: "row"
  }
});
