import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
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

  handlePressAdd(){
    let rangeString = this.state.userRange.replace(/\s+/g, "");
    let rangeArray = rangeString.split(",");
    let range = parseUserRange(rangeArray);
    if(this.refs.myDropdown.selectedIndex() === 0){
      this.setState({buttonRange: [...this.state.buttonRange, range]});
    } else {
      this.setState({cutoffRange: [...this.state.cutoffRange, range]});
    }
    this.setState({userRange: ""});
  }

  handlePressReset(){
    if(this.refs.myDropdown.selectedIndex() === 0){
      this.setState({buttonRange: []});
    } else {
      this.setState({cutoffRange: []});
    }
    this.setState({userRange: ""});
  }

  render() {
    return (
      <View  style={{ flex: 1, marginTop: 30}}>
        <Dropdown
              label="Select position"
              value={data[0].value}
              data={data}
              ref="myDropdown"
              />
        <View style={{ flexDirection: "row"}}>
          <TextInput
            value={this.state.userRange}
            onChangeText={ text => this.setState({userRange: text})}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.handlePressAdd.bind(this)}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handlePressReset.bind(this)}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <Text>Button: {this.state.buttonRange.toString()}</Text>
        <Text>Cut-off: {this.state.cutoffRange.toString()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
      borderWidth: 5,
      borderColor: "red",
      borderRadius: 5,
      //justifyContent: "center",
      //alignItems: "center"
  },
  buttonText: {
      fontWeight: "bold"
  }
})

export default RangeCreator;
