import React, { Component } from "react";
import { View, Text, Button } from "native-base";
import { connect } from "react-redux";
import CardBem from "./cardBem";

class ListagemBem extends Component {
  constructor(props) {
    super(props);
    this.state = { codigo: 12345 };
  }

  render() {
    return (
      <View>
        <Button
          tytle={"Lixo"}
          onPress={() => {
            codigo = this.state.codigo + 1;
            this.setState({ codigo: codigo });
            this.props.selecionaBem(codigo);
          }}
        >
          <Text>{this.state.codigo}</Text>
        </Button>
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
