import React from "react";
import Setup from "./components/Menu";
import * as Font from "expo-font";
import { ActivityIndicator, View } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.navigationOptions = {
      header: null
    };

    this.state = {
      isReady: false
    };
  }
  componentWillMount = async () => {
    // initDB();
    await Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  };

  render() {
    if (!this.state.isReady) {
      return <ActivityIndicator />;
    } else return <Setup />;
  }
}
