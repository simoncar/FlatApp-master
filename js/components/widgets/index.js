
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  WebView, Image, View, Platform } from 'react-native';

import { Container, Header, Content, Text, Button, Icon, Left, Right, Body } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';

import theme from '../../themes/base-theme';
import styles from './styles';
import {getUsername, getPassword} from '../global.js'

const primary = require('../../themes/variable').brandPrimary;

var WEBVIEW_REF = 'webview';

  var injectScript = 'document.getElementById(\"username\").value=\"' + getUsername() + '\"';
  injectScript = injectScript + ';' +  'document.getElementById(\"password\").value=\"' + getPassword() + '"';
  injectScript = injectScript + ';' +  'document.forms[0].submit()';

class Widgets extends Component {

  render() {
    return (
      <Container>
        <Image source={require('../../../images/glow2.png')} style={styles.container} >
          <Header>
            <Left>
              <Button transparent onPress={this.props.openDrawer} >
                <Icon active name="menu" />
              </Button>
            </Left>

            <Body>
              <Image source={require('../../../images/Header-Logo-White-0001.png')} style={styles.imageHeader} />
            </Body>

            <Right>
              <Button transparent>
                <Icon active name="ios-restaurant" />
              </Button>

            </Right>
          </Header>

          <View>

        <Text  style={styles.weatherTime}> Fetch Recipes </Text>

    </View>


        </Image>
      </Container>
    );
  }
}


function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

export default connect(null, bindAction)(Widgets);
