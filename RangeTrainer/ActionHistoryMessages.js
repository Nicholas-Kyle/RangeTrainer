import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

const ActionHistoryMessages = ({ hands }) => (
  <View style={styles.container}>
    <FlatList
      data={hands}
      renderItem={({ item }, index) => <Text>{item}</Text>}
      keyExtractor={(item, index) => index}
    />
  </View>
);

export default ActionHistoryMessages;

const styles = StyleSheet.create({
  container: {}
});
