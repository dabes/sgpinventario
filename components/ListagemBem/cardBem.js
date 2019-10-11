import React, { Component } from "react";
import { View, Text, Button } from "native-base";
import { connect } from "react-redux";

class CardBem extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  componentDidMount() {
    this.props.getBem();
  }

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props.state.bensReducer)}</Text>
        <Text>{JSON.stringify(this.state)}</Text>
        <Text>lixo</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    getBem: bem => dispatch(getBem())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardBem);
