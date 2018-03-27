import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { StackNavigator } from "react-navigation";
import RangeTrainer from "./RangeTrainer";
import RangeCreator from "./RangeCreator";

class MainMenuScreen extends Component {

    render(){
        return(
            <View style={{ flex: 1, alignItems: "center"}}>
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

class RangeTrainerScreen extends Component {
    render(){
        return (
            <RangeTrainer />
        );
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
            screen: RangeTrainerScreen,
        },
        RC: {
            screen: RangeCreatorScreen,
        }
    },
    {
        initialRouteName: "Main",
    }
);

export default class MainMenu extends Component {
    render() {
        return <RootStack />;
    }
}

