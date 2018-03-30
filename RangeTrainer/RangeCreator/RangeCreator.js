import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import parseUserRange from "./parseUserRange";

const data = [{
  value: "Button",
}, {
  value: "Cut-off",
}]

class RangeCreator extends Component {

  constructor(){
    super();
    this.state = {
      buttonRange: [],
      cutoffRange: [],
      userRange: ""
    }
  }

  handleChange(text){
    this.setState({userRange: text});
  }

  handlePress(){
    let rangeString = this.state.userRange.replace(/\s+/g, "");
    let rangeArray = rangeString.split(",");
    let range = parseUserRange(rangeArray);
    this.setState({buttonRange: range});
    this.setState({userRange: ""});
  }

  render() {
    return (
      <View  style={{ flex: 1, marginTop: 50}}>
        <Dropdown
              label="Select position"
              value={data[0].value}
              data={data}
              />
        <View style={{ flexDirection: "row"}}>
          <TextInput
            value={this.state.userRange}
            onChangeText={ text => this.setState({userRange: text})}
          />
          <TouchableOpacity
            onPress={this.handlePress.bind(this)}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <Text>Button: {this.state.buttonRange}</Text>
        <Text>Cut-off: {this.state.cutoffRange}</Text>
      </View>
    );
  }
}

export default RangeCreator;
