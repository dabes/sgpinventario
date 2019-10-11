import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Right,
  Text,
  Button,
  Card,
  CardItem,
  Item,
  Thumbnail,
  Picker,
  Icon,
  Textarea
} from "native-base";
import { connect } from "react-redux";

class CardBem extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.state.bensReducer;
  }

  componentDidMount() {
    this.props.getBem();
  }

  _encontrado = () => {
    return (
      <Card>
        <CardItem bordered>
          <Button onPress={this.getphoto} transparent>
            <Thumbnail source={{ uri: this.state.uri }} bordered />
          </Button>
          <Text>
            {"   "}Tombamento: {this.state.dados.codigo}
          </Text>
        </CardItem>
        <CardItem style={styles.CardTitulo}>
          <Text>Descrição do Bem:</Text>
        </CardItem>
        <CardItem style={styles.CardContent}>
          <Text>{this.state.dados.descricao}</Text>
        </CardItem>
        <CardItem style={styles.CardTitulo}>
          <Text>Descrição do Produto:</Text>
        </CardItem>
        <CardItem style={styles.CardContent}>
          <Text>{this.state.dados.produto_descricao}</Text>
        </CardItem>
        <CardItem style={styles.CardTitulo}>
          <Text>Centro de Custo:</Text>
        </CardItem>
        <CardItem
          style={(styles.CardContent, { paddingLeft: 10, height: 10 })}
        ></CardItem>
        <CardItem
          style={(styles.CardTitulo, { marginBottom: 5, marginTop: 5 })}
        >
          <Text>
            {this.state.dados.switchValue ? "Encontrado" : "Não Encontrado"}
          </Text>
          <Right></Right>
        </CardItem>
      </Card>
    );
  };

  _naoencontrado = () => {
    return (
      <Card>
        <CardItem bordered>
          <Text>Tombamento desconhecido</Text>
        </CardItem>
        <CardItem style={styles.CardContent}>
          <Text>
            Registre caracteristicas para posterior{"\n"}Incorporação:
          </Text>
        </CardItem>
        <CardItem style={styles.CardContent}>
          <Item>
            <Icon name="ios-information-circle-outline" />
            <Textarea
              rowSpan={5}
              placeholder="Observação"
              onChangeText={text => this.setState({ observacao: text })}
              value={this.state.observacao}
            />
          </Item>
        </CardItem>
        <CardItem style={styles.CardContent}>
          <Button transparent onPress={this.gravarobs}>
            <Text>OK</Text>
          </Button>
        </CardItem>
      </Card>
    );
  };

  render() {
    console.log(this.state.dados.encontrado);
    if (this.state.dados.encontrado) return this._encontrado();
    else if (this.state.dados.encontrado === false)
      return this._naoencontrado();
    return <Card></Card>;
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

const styles = StyleSheet.create({
  CardTitulo: {
    paddingBottom: 0,
    marginBottom: 0
  },
  CardContent: {
    paddingTop: 0,
    marginTop: 0
  }
});
