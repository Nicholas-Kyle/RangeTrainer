import React, { Component } from "react";
import { View, Text } from "react-native";
import parseUserRange from "./parseUserRange";

class RangeCreator extends Component {
  /**R
   * // for testing in browser can be removed once integrated
  var customRangeString = prompt("Please enter a range");

customRangeString = customRangeString.replace(/\s+/g, "");
var customRangeArray = customRangeString.split(",");
   */
  render() {
    return (
      <View  style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>The back button will take you....um I forget</Text>
      </View>
    );
  }
}

export default RangeCreator;
