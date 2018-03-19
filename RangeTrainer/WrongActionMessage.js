import React from "react";
import { FlatList, View, Text } from "react-native";

const WrongActionMessage = ({ hands }) => (
  <View>
    <FlatList data={hands} renderItem={({ item }) => <Text>{item}</Text>} />
  </View>
);

export default WrongActionMessage;
