import * as React from "react";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import {
  Text,
  View,
  Col,
  Button,
  Container,
  Header,
  Grid,
  Content
} from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { connect } from "react-redux";

class BarcodeScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.state.bensReducer,
      hasCameraPermission: null,
      scanned: false,
      close: false
    };
  }
  async componentDidMount() {
    this._getPermissionsAsync();
  }

  _getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  _getbens = valor => {
    this.props.selecionaBem(this.state.dados.codigo);
  };

  render() {
    const { props, hasCameraPermission, scanned, close } = this.state;
    const deviceHeight = Dimensions.get("window").height * 0.81;
    const deviceWidth = Dimensions.get("window").width;
    console.log(deviceHeight, deviceWidth);
    if (hasCameraPermission === null) {
      return <ActivityIndicator size="large" />;
    }
    if (hasCameraPermission === false) {
      return <Text>Acesso a camera bloqueado</Text>;
    }

    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={
          ([StyleSheet.absoluteFillObject],
          {
            width: deviceWidth,
            height: deviceHeight,
            backgroundColor: "red",
            alignSelf: "flex-start"
          })
        }
      ></BarCodeScanner>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.selecionaBem(data);
    this.props.barcode(false);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}
const styles = StyleSheet.create({
  cameraContainer: {
    marginHorizontal: 0,
    marginLeft: 0,
    marginStart: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingStart: 0,
    height: "115%",
    padding: 0
  }
});

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
)(BarcodeScanner);
