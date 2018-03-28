import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { StackNavigator } from "react-navigation";
import defaultRange from "./RangeTeacher/defaultRange";
import RangeCreator from "./RangeCreator/RangeCreator";
import RangeTeacher from "./RangeTeacher/RangeTeacher";

class MainMenuScreen extends Component {

  render(){
      return(
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
              <Text>Main Menu</Text>
              <Button
                  title="Start training"
                  onPress={ () => this.props.navigation.navigate("RT")}
              />
              <Button
                  title="Create new range"
                  onPress={ () => this.props.navigation.navigate("RC")}
              />
          </View>
      );
  }
}

class RangeTeacherScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      range: defaultRange
    };
  }

  onRangeAdd(range) {
    this.setState({ range });
  }

  render() {
    const { range } = this.state;
    return <RangeTeacher range={range} />;
  }
}

class RangeCreatorScreen extends Component {
  render(){
      return (
          <RangeCreator />
      );
  }
}

const RootStack = StackNavigator(
  {
      Main: {
          screen: MainMenuScreen,
      },
      RT: {
          screen: RangeTeacherScreen,
      },
      RC: {
          screen: RangeCreatorScreen,
      }
  },
  {
      headerMode: "none"
  },
  {
      initialRouteName: "Main",
  }
);

export default class RangeTrainer extends Component {
  render() {
      return <RootStack />;
  }
}