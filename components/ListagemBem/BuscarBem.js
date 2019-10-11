import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardItem, Item, Icon, Input, Button, Text } from "native-base";

class BuscarBem extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.state.bensReducer;
  }

  _getbens = valor => {
    this.props.selecionaBem(this.state.dados.codigo);
  };
  render() {
    return (
      <Card>
        <CardItem header bordered></CardItem>
        <CardItem style={{ paddingBottom: 0 }}>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Buscar Bem"
              keyboardType="numeric"
              onChangeText={text => this.setState({ dados: { codigo: text } })}
              value={this.state.dados.codigo}
            />
            <Button onPress={this.getbarcode} transparent>
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
