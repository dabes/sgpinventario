import React, { Component } from "react";
import { Text, CardItem, Card, Button, Input, Item, Icon } from "native-base";
import { SetConfigIp } from "../../utils/Database";

export default class ConfigurationIp extends Component {
  constructor(props) {
    super(props);
    this.state = { ccusto: null, ccustoselecionado: null };
  }

  componentDidMount = () => {
    this.setState({ ip: global.ip });
  };

  _okip = () => {
    SetConfigIp(this.state.ip).then(() => {
      //   this.props.navigation.navigate("Applic");
    });
  };

  ipconfig = () => {
    return (
      <Card>
        <CardItem
          style={{
            paddingBottom: 1
          }}
        >
          <Text>IP:</Text>
        </CardItem>
        <CardItem
          style={{
            paddingTop: 1
          }}
        >
          <Item>
            <Icon name="ios-navigate" />
            <Input
              placeholder="Endereço IP"
              onChangeText={text => this.setState({ ip: text })}
              value={this.state.ip}
            />
          </Item>
        </CardItem>
        <CardItem>
          <Button onPress={this._okip}>
            <Text>Confirmar</Text>
          </Button>
        </CardItem>
        <CardItem>
          <Text>
            Preencher com ex:
            {"\n"}servidor.com.br ou 127.0.0.1
            {"\n"}ou caso tenha porta
            {"\n"}servidor.com.br:porta ou 127.0.0.1:porta
          </Text>
        </CardItem>
      </Card>
    );
  };

  render() {
    return this.ipconfig();
  }
}
