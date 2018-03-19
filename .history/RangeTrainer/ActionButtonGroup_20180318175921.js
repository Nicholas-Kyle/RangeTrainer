import React from "react";
import { StyleSheet, Button, View } from "react-native";
import ACTIONS from "./ACTIONS";
// import "./ActionButtonGroup.css";

const ActionButtonGroup = ({ onAction }) => (
  <View className="actionButtonGroup">
    <Button title='Limp' onClick={onAction.bind(null, ACTIONS.LIMP)} />></Button>
    <Button onClick={onAction.bind(null, ACTIONS.RAISE_FOLD)}>
      Raise Fold
    </Button>
    <Button onClick={onAction.bind(null, ACTIONS.RAISE_DEFEND)}>
      Raise Defend
    </Button>
    <Button onClick={onAction.bind(null, ACTIONS.FOLD)}>Fold</Button>
  </View>
);

export default ActionButtonGroup;
