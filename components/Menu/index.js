import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Drawer,
  Container,
  Header,
  Content,
  Button,
  Left,
  Body,
  Title,
  Right,
  List,
  ListItem,
  Badge
} from "native-base";
import { ScrollView } from "react-navigation";
// IMPORT DE TELAS PARA CONTROLE PELO MENU
import ListagemBem from "../ListagemBem";
import ConfigurationIp from "../Configurations";

// const deviceHeight = Dimensions.get("window").height;
// const deviceWidth = Dimensions.get("window").width;

// CONTEUDO DO MENU
const menu = [
  {
    name: "Listagem de Bens",
    route: (
      <Content>
        <ListagemBem />
      </Content>
    ),
    icon: "star",
    icon_color: "red",
    bg: "#C5F442",
    key: "0"
  },
  {
    name: "Configurações",
    route: (
      <Content>
        <ConfigurationIp />
      </Content>
    ),
    icon: "arrow-up",
    icon_color: "blue",
    bg: "#477EEA",
    types: "11",
    key: "1"
  },
  {
    name: "Listagem de Bens 3",
    route: (
      <Content>
        <ListagemBem />
      </Content>
    ),
    bg: "#477EEA",
    key: "2"
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "Home", content: <ListagemBem /> };
  }

  render() {
    return (
      <Content
        style={{ flex: 1, backgroundColor: "#fff", top: -1, marginTop: 25 }}
      >
        <List
          dataArray={menu}
          renderRow={data => (
            <ListItem
              button
              onPress={() => this.props.handdle(data.route, data.name)}
            >
              <Left>
                <Icon
                  active
                  name={data.icon}
                  style={{
                    color: data.icon_color ? data.icon_color : "#777",
                    fontSize: 26,
                    width: 30
                  }}
                />
                <Text style={styles.text}>{data.name}</Text>
              </Left>
              {data.types && (
                <Right style={{ flex: 1 }}>
                  <Badge
                    style={{
                      borderRadius: 3,
                      height: 25,
                      width: 72,
                      backgroundColor: data.bg,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={styles.badgeText}
                    >{`${data.types} Types`}</Text>
                  </Badge>
                </Right>
              )}
            </ListItem>
          )}
        />
      </Content>
    );
  }
}

//CONSTRUTOR DO MENU
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "Home", content: <View></View> };
  }

  _toggleMenu = open => {
    if (open) {
      this.drawer._root.open();
    } else {
      this.drawer._root.close();
    }
  };

  _contentHanddler = (component, title) => {
    this.setState({ content: component, title: title });
    this._toggleMenu();
  };

  _cabecalho = () => {
    return (
      <Header style={{ backgroundColor: "rgb(137, 195, 150)" }}>
        <Icon
          onPress={() => this._toggleMenu(true)}
          name="bars"
          size={30}
          color="#fff"
          style={{
            marginLeft: 10,
            marginTop: 10,
            padding: 2
          }}
        />
        <Title
          style={{
            alignSelf: "center",
            width: "100%"
          }}
        >
          {this.state.title}
        </Title>
      </Header>
    );
  };

  _body = () => {
    return (
      <Content contentContainerStyle={styles.container}>
        {this.state.content}
      </Content>
    );
  };

  render() {
    return (
      <Drawer
        onClose={() => this._toggleMenu()}
        negotiatePan={true}
        panOpenMask={0.25}
        ref={ref => {
          this.drawer = ref;
        }}
        content={
          <SideBar navigator={this.navigator} handdle={this._contentHanddler} />
        }
      >
        <Container style={styles.application_container}>
          {this._cabecalho()}
          {this._body()}
        </Container>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  application_container: { marginTop: 25 },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  }
});
