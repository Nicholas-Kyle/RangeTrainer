import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import parseUserRange from "./parseUserRange";

class RangeCreator extends Component {

  constructor(){
    super();
    this.state = {
      ranges: [],
      btnRange: ""
    }
  }

  handleChange(text){
    this.setState({btnRange: text});
  }

  handlePress(){
    let rangeString = this.state.btnRange.replace(/\s+/g, "");
    let rangeArray = rangeString.split(",");
    let range = parseUserRange(rangeArray);
    this.setState({ranges: range});
    this.setState({btnRange: ""});
  }

  render() {
    return (
      <View  style={{ flex: 1, alignItems: "center", marginTop: 100}}>
        <Text>Button Range</Text>
        <TextInput
          value={this.state.btnRange}
          onChangeText={ text => this.setState({btnRange: text})}
        />
        <TouchableOpacity
          onPress={this.handlePress.bind(this)}>
          <Text>Add</Text>
        </TouchableOpacity>
        <Text>{this.state.ranges}</Text>
      </View>
    );
  }
}

export default RangeCreator;
