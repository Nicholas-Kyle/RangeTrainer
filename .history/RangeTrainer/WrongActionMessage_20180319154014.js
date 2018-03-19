import React from "react";
import { FlatList, View } from "react-native";

const WrongActionMessage = ({ hands }) => (
  <View>
    <FlatList
      data={hands}
      renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
    />
  </View>
);

export default WrongActionMessage;
