import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import ACTIONS from "./ACTIONS";
import { colors } from "../sharedStyles";

const ActionButtonGroup = ({ onAction }) => (
  <View style={styles.container}>
    <Button
      backgroundColor={colors.textMain}
      title="Limp"
      onPress={onAction.bind(null, ACTIONS.LIMP)}
    />
    <Button
      backgroundColor={colors.textMain}
      title="Raise"
      onPress={onAction.bind(null, ACTIONS.RAISE)}
    />
    <Button
      backgroundColor={colors.textMain}
      title="Fold"
      onPress={onAction.bind(null, ACTIONS.FOLD)}
    />
  </View>
);

export default ActionButtonGroup;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15
  }
});
