import React, { Component } from "react";
import { View } from "react-native";
import defaultRange from "./RangeTeacher/defaultRange";
import RangeAdder from "./RangeAdder/RangeAdder";
import RangeTeacher from "./RangeTeacher/RangeTeacher";

class RangeTrainer extends Component {
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

export default RangeTrainer;
