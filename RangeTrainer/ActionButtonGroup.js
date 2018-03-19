import React from "react";
import { StyleSheet, Button, View } from "react-native";
import ACTIONS from "./ACTIONS";
// import "./ActionButtonGroup.css";

const ActionButtonGroup = ({ onAction }) => (
  <View>
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
