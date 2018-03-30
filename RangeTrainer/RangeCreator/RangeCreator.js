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
      <View  style={{ flex: 1, marginTop: 100}}>
        <View style={{ flexDirection: "row"}}>
          <Dropdown
            label="Select position"
            data={data}
            />
          <TextInput
            value={this.state.btnRange}
            onChangeText={ text => this.setState({btnRange: text})}
          />
          <TouchableOpacity
            onPress={this.handlePress.bind(this)}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <Text>{this.state.ranges}</Text>
      </View>
    );
  }
}

export default RangeCreator;
