import React from "react";
import { StyleSheet, Button, View } from "react-native";
import ACTIONS from "./ACTIONS";
// import "./ActionButtonGroup.css";

const ActionButtonGroup = ({ onAction }) => (
  <View className="actionButtonGroup">
    <Button title='Limp' onClick={onAction.bind(null, ACTIONS.LIMP)} />
    <Button onClick={onAction.bind(null, ACTIONS.RAISE_FOLD)} />>
      Raise Fold
    </Button>
    <Button title='Raise Defend' onClick={onAction.bind(null, ACTIONS.RAISE_DEFEND)} />
    <Button title='Fold' onClick={onAction.bind(null, ACTIONS.FOLD)} />
  </View>
);

export default ActionButtonGroup;
