import React from "react";
import { FlatList, View } from "react-native";

const WrongActionMessage = ({ hands }) => <View><FlatList data={hands} renderItem={}    /></View>;

export default WrongActionMessage;
