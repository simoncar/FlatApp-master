import React, { Component } from "react";
import Constants from "expo-constants";
import { Animated, TextInput, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

import { Container, Spinner } from "native-base";

import { getParameterByName } from "../global.js";

import styles from "./styles";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const timer = require("react-native-timer");

var WEBVIEW_REF = "webview";
//var DEFAULT_URL = 'https://saispta.com/app/Authentication.php';
//var DEFAULT_URL = 'https://www.google.com';

//var DEFAULT_URL = 'https://mystamford.edu.sg/login/api/getsession?ffauth_device_id=SOME_RANDOM&ffauth_secret=MERGE_AUTH_SECRET&prelogin=https://mystamford.edu.sg/pta/pta-events/christmas-2017';
var DEFAULT_URL = global.switch_portalURL; //'https://mystamford.edu.sg/login/login.aspx?prelogin=http%3a%2f%2fmystamford.edu.sg%2f&kr=iSAMS:ParentPP';

var injectScript = "";

const tabBarIcon = name => ({ tintColor }) => (
  <MaterialIcons style={{ backgroundColor: "transparent" }} name={name} color={tintColor} size={24} />
);

class authPortal extends Component {
  static navigationOptions = {
    title: "myStamford",
    headerBackTitle: null,
  };

  constructor(props) {
    super(props);
    DEFAULT_URL = global.switch_portalURL;

    injectScript =
      'document.getElementById("username").value="' +
      //this.props.userX.name +
      '"';
    injectScript =
      injectScript +
      ";" +
      'document.getElementById("password").value="' +
      //this.props.userX.password +
      '"';
    injectScript = injectScript + ";" + "document.forms[0].submit()";
    injectScript =
      injectScript +
      ";" +
      'document.getElementsByClassName("ff-login-personalised-logo")[0].style.visibility = "hidden";';
    injectScript =
      injectScript + ";" + 'document.getElementsByClassName("global-logo")[0].style.visibility = "hidden";';
    //  injectScript = injectScript + ';' +  'window.postMessage(document.cookie)'
    //  injectScript = '';

    console.log("going to this URL (constructor)=" + DEFAULT_URL);

    //var authSecret2 = this.props.userX.authSecret;

    DEFAULT_URL = "https://mystamford.edu.sg/login/api/getsession?";

    DEFAULT_URL = DEFAULT_URL + "ffauth_device_id=";
    //DEFAULT_URL = DEFAULT_URL + this.props.userX.ffauth_device_id; // "AB305CAC-1373-4C13-AA04-79ADB8C17854"

    DEFAULT_URL = DEFAULT_URL + "&ffauth_secret=";
    //DEFAULT_URL = DEFAULT_URL + this.props.userX.ffauth_secret; //"6fbfcef8d9d0524cbb90cb75285df9a1"

    DEFAULT_URL = DEFAULT_URL + "&prelogin=";
    DEFAULT_URL = DEFAULT_URL + "https://mystamford.edu.sg/cafe/cafe-online-ordering";

    DEFAULT_URL =
      "https://mystamford.edu.sg/login/login.aspx?prelogin=http%3a%2f%2fmystamford.edu.sg%2f&kr=iSAMS:ParentPP";
    DEFAULT_URL = global.switch_portalURL;
    console.log("im hereyyy -= " + global.switch_portalURL);
  }

  state = {
    url: global.switch_portalURL,
    status: "No Page Loaded",
    backButtonEnabled: false,
    forwardButtonEnabled: false,
    loading: true,
    scalesPageToFit: true,
    cookies: {},
    webViewUrl: "",
    visible: this.props.visible,
    myText: "My Original Text",
    showMsg: false,
  };

  componentWillUnmount() {
    timer.clearTimeout(this);
  }

  showMsg() {
    if (Constants.manifest.extra.instance == "0001-sais_edu_sg") {
      this.setState({ showMsg: true }, () =>
        timer.setTimeout(this, "hideMsg", () => this.setState({ showMsg: false }), 5000),
      );
    }
  }

  onNavigationStateChange = navState => {
    console.log(navState.url);
    this.setState({ url: navState.url });

    if (navState.url != "https://mystamford.edu.sg/parent-dashboard") {
      this.setState({ canGoBack: navState.canGoBack });
    } else {
      this.setState({ canGoBack: false });
    }

    if (navState.url == "https://mystamford.edu.sg/logout.aspx") {
      this.props.setauthSecret("");
      console.log("PROCESS LOGOUT - CLEAR SECRET");
    }

    this.setState({ updateFirebaseText: navState.url });

    var string = navState.url;

    if (string.indexOf("ffauth_secret") > 1) {
      //var authSecret = getParameterByName("ffauth_secret", string);
      //this.props.setauthSecret(authSecret);
    } else {
    }
  };

  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  componentWillMount() {
    if (Constants.manifest.extra.instance == "0001-sais_edu_sg") {
      this._visibility = new Animated.Value(this.props.visible ? 1 : 0);

      this.setState({ showMsg: true }, () =>
        timer.setTimeout(this, "hideMsg", () => this.setState({ showMsg: false }), 10000),
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true });
    }
  }

  getInitialState = () => {
    return {
      webViewHeight: 100, // default height, can be anything
    };
  };

  toggleCancel() {
    this.setState({
      showCancel: !this.state.showCancel,
    });
  }

  _renderSpinner() {
    if (this.state.showMsg) {
      return (
        <View style={styles.settingsMessage}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 2 }}>
            <Spinner color="#172245" />
          </View>

          <View style={{ flex: 3 }} />
        </View>
      );
    } else {
      null;
    }
  }

  _onMessage = event => {
    const { data } = event.nativeEvent;
    console.log(event.nativeEvent.data.toString());
    returnData = event.nativeEvent.data;

    string = [].map
      .call(returnData, function(node) {
        console.log(node.textContent || node.innerText || "");
      })
      .join("");
  };

  render() {
    const _login = () => {
      Animated.visible = false;
      Animated.height = 0;
      //this.toggleCancel();
      this.state.showCancel = true;
      this.setState({ url: "My Changed Text" });
    };

    // this.setState({url: 'My Changed Text'})
    const { visible, style, children, ...rest } = this.props;
    const runFirst = `
    document.body.style.backgroundColor = 'red';
    setTimeout(function() { window.alert('hi') }, 2000);
    true; // note: this is required, or you'll sometimes get silent failures
  `;

    const run = `document.body.style.backgroundColor = 'blue';
    true;`;

    const jsCode = "window.ReactNativeWebView.postMessage(document.innerHTML())";

    setTimeout(() => {
      //this.webref.injectJavaScript(jsCode);
    }, 7000);

    return (
      <Container>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 2 }}>
            <View style={styles.topbar}>
              <TouchableOpacity disabled={!this.state.canGoBack} onPress={this.onBack.bind(this)}>
                <Ionicons style={styles.navIcon} name="ios-arrow-back" />
              </TouchableOpacity>

              <TextInput
                ref="pageURL"
                value={this.state.url}
                placeholderTextColor="#FFF"
                style={styles.url}
                autoCapitalize="none"
                autoFocus={true}
                selectionColor="#FFF"
              />

              <Ionicons style={styles.navIcon} name="ios-arrow-forward" />
            </View>

            <WebView
              source={{ uri: this.state.url }}
              javaScriptEnabled={true}
              // injectedJavaScript={runFirst}
              automaticallyAdjustContentInsets={false}
              onNavigationStateChange={this.onNavigationStateChange.bind(this)}
              //onMessage={this._onMessage}
              domStorageEnabled={true}
              startInLoadingState={true}
              ref={r => (this.webref = r)}
              // onMessage={this._onMessage}
            />
          </View>
        </View>
      </Container>
    );
  }

  reload = () => {
    this.refs[WEBVIEW_REF].reload();
  };
}

export default authPortal;
