import React, { Component } from "react";
import { View, Text, Button } from "native-base";
import { connect } from "react-redux";
import CardBem from "./CardBem";
import BuscarBem from "./BuscarBem";

class ListagemBem extends Component {
  constructor(props) {
    super(props);
    this.state = { codigo: 12345 };
  }

  render() {
    return (
      <View>
        <BuscarBem />
        <CardBem />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    selecionaBem: bem => dispatch(selecionaBem(bem))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListagemBem);
