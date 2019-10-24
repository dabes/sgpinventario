import React, { Component } from "react";

import { connect } from "react-redux";
import { Card, CardItem, Item, Icon, Input, Button, Text } from "native-base";
import BarcodeScanner from "./BarcodeScanner";
class BuscarBem extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.state.bensReducer, getbarcode: false };
  }

  barcode = valor => {
    this.setState({ getbarcode: valor });
  };

  _getbens = valor => {
    this.props.selecionaBem(this.state.dados.codigo);
  };
  render() {
    if (this.state.getbarcode !== false) {
      return <BarcodeScanner barcode={this.barcode}></BarcodeScanner>;
    } else {
      return (
        <Card>
          <CardItem style={{ paddingBottom: 0 }}>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Buscar Bem"
                keyboardType="numeric"
                returnKeyType="send"
                onChangeText={text =>
                  this.setState({ dados: { codigo: text } })
                }
                value={this.state.dados.codigo}
                onEndEditing={this._getbens}
              />
              <Button
                onPress={() => {
                  this.setState({ getbarcode: true });
                }}
                transparent
              >
                <Icon name="md-barcode" />
              </Button>
            </Item>
          </CardItem>
          <CardItem style={{ paddingTop: 0 }}>
            <Button transparent onPress={this._getbens}>
              <Text>Buscar</Text>
            </Button>
          </CardItem>
        </Card>
      );
    }
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
)(BuscarBem);
