import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { textStyle, colors } from "./sharedStyles";

const ActionHistoryMessages = ({ hands }) => (
  <View>
    <FlatList
      data={hands}
      renderItem={({ item }, index) => <Text style={styles.text}>{item}</Text>}
      keyExtractor={(item, index) => index}
    />
  </View>
);

export default ActionHistoryMessages;

const styles = StyleSheet.create({
  text: {
    ...textStyle.default,
    color: colors.textSecondary,
    backgroundColor: colors.secondary,
    fontSize: 18
  }
});
