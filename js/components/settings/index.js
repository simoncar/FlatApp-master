"use strict";
import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";
import SettingsList from "react-native-settings-list";
import * as Localization from "expo-localization";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import { isAdmin } from "../global";

class Settings extends Component {
  static navigationOptions = {
    title: "Menu",
    headerBackTitle: null
  };

  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      switchValue: false,
      loggedIn: false,
      language: ""
    };
  }

  componentWillMount() {
    this._retrieveLanguage();
  }
  _retrieveLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem("language");
      if (value !== null) {
        // We have data!!
        console.log(value);
        this.setState({ language: value });
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  _changeLanguage(language) {
    this.state.language = "ja";
    this.setState({ language: language });
    global.language = language;
    AsyncStorage.setItem("language", language);

    const { goBack } = this.props.navigation;

    goBack(null);
    setTimeout(() => {
      goBack(null);
    }, 100);
  }
  _getStyle(language) {
    if (language == this.state.language) {
      return styles.imageStyleCheckOn;
    } else {
      return styles.imageStyleCheckOff;
    }
  }

  render() {
    var bgColor = "#DCE3F4";
    return (
      <View style={{ backgroundColor: "#EFEFF4", flex: 1 }}>
        <View style={{ backgroundColor: "#EFEFF4", flex: 1 }}>
          <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />

            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/wifi.png")}
                />
              }
              title="myStamford"
              titleInfo=""
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() =>
                this.props.navigation.navigate("webportalURL", {
                  url:
                    "https://mystamford.edu.sg/login/login.aspx?prelogin=http%3a%2f%2fmystamford.edu.sg%2f&kr=iSAMS:ParentPP",
                  title: "myStamford"
                })
              }
            />

            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/wifi.png")}
                />
              }
              title="Athletics"
              titleInfo=""
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() =>
                this.props.navigation.navigate("webportalURL", {
                  url: "https://www.stamfordlionsathletics.com/",
                  title: "Athletics"
                })
              }
            />

            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/wifi.png")}
                />
              }
              title="CCA's"
              titleInfo="After School"
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() =>
                this.props.navigation.navigate("webportalURL", {
                  url:
                    "https://mystamford.edu.sg/login/login.aspx?prelogin=https%3a%2f%2fmystamford.edu.sg%2fco-curricular-activities-cca-1%2fcca-brochure-semester-1&kr=iSAMS:ParentPP",
                  title: "CCA's"
                })
              }
            />

            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/wifi.png")}
                />
              }
              title="Camp Asia"
              titleInfo="Holidays"
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() =>
                this.props.navigation.navigate("webportalURL", {
                  url: "https://www.campasia.asia",
                  title: "Camp Asia"
                })
              }
            />

            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/cellular.png")}
                />
              }
              title="Cafe Top Up"
              titleInfo="Balance $999.99"
              onPress={() => Alert.alert("This function is not active")}
            />

            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/hotspot.png")}
                />
              }
              title="Contact School"
              titleInfo=""
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => {
                this.props.navigation.navigate("contact");
              }}
            />

            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/cellular.png")}
                />
              }
              title="PTA Onlne Shop"
              titleInfo="Parent Teacher Association"
              onPress={() =>
                this.props.navigation.navigate("webportalURL", {
                  url: "https://www.saispta.com/",
                  title: "PTA Online Shop"
                })
              }
            />

            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/display.png")}
                />
              }
              title="Campus Map"
              titleInfo=""
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => {
                this.props.navigation.navigate("campusMap");
              }}
            />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/display.png")}
                />
              }
              title="Library"
              titleInfo=""
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => {
                this.props.navigation.navigate("library");
              }}
            />

            {isAdmin(this.props.adminPassword) && (
              <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            )}
            {isAdmin(this.props.adminPassword) && (
              <SettingsList.Item
                icon={
                  <Image
                    style={styles.imageStyle}
                    source={require("./images/notifications.png")}
                  />
                }
                title="[Admin] Attendance Dashboard"
                titleInfo="3,139"
                onPress={() =>
                  this.props.navigation.navigate("AttendanceOverviewScreen")
                }
              />
            )}
            {isAdmin(this.props.adminPassword) && (
              <SettingsList.Item
                icon={
                  <Image
                    style={styles.imageStyle}
                    source={require("./images/cellular.png")}
                  />
                }
                title="[Admin] Gateways"
                titleInfo="Online"
                onPress={() => this.props.navigation.navigate("beacon")}
              />
            )}

            {isAdmin(this.props.adminPassword) && (
              <SettingsList.Item
                icon={
                  <Image
                    style={styles.imageStyle}
                    source={require("./images/control.png")}
                  />
                }
                title="[Admin] Reports"
                onPress={() => Alert.alert("Route To Reports")}
              />
            )}

            {isAdmin(this.props.adminPassword) && (
              <SettingsList.Item
                icon={
                  <Image
                    style={styles.imageStyle}
                    source={require("./images/dnd.png")}
                  />
                }
                title="[Admin] Student Lookup"
                onPress={() => Alert.alert("Route Student Search")}
              />
            )}

            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/general.png")}
                />
              }
              title="Language"
              titleInfo={this.state.language}
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => this.props.navigation.navigate("selectLanguage")}
            />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/airplane.png")}
                />
              }
              hasSwitch={true}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={true}
              title="Admin Access"
              onPress={() => this.props.navigation.navigate("adminPassword")}
            />

            <SettingsList.Header headerStyle={{ marginTop: 15 }} />

            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/airplane.png")}
                />
              }
              hasSwitch={true}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              title="ELV"
              hasNavArrow={false}
              onPress={() => Alert.alert("NA")}
            />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/airplane.png")}
                />
              }
              hasSwitch={true}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              title="Elementary"
              titleInfo="KG2 - Grade 5"
              hasNavArrow={false}
              onPress={() => Alert.alert("NA")}
            />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/airplane.png")}
                />
              }
              hasSwitch={true}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              title="Middle School"
              titleInfo="Grade 6 - 8"
              hasNavArrow={false}
              onPress={() => Alert.alert("NA")}
            />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("./images/airplane.png")}
                />
              }
              hasSwitch={true}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              title="High School"
              titleInfo="Grade 9 - 12"
              hasNavArrow={false}
              onPress={() => Alert.alert("NA")}
            />
          </SettingsList>
        </View>
      </View>
    );
  }
  toggleAuthView() {
    this.setState({ toggleAuthView: !this.state.toggleAuthView });
  }
  onValueChange(value) {
    this.setState({ switchValue: value });
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    marginLeft: 15,
    alignSelf: "center",
    height: 30,
    width: 30
  },
  imageStyleCheckOn: {
    marginLeft: 15,
    alignSelf: "center",
    height: 30,
    width: 30,
    fontSize: 30,
    width: 30,
    color: "#007AFF"
  },
  imageStyleCheckOff: {
    marginLeft: 15,
    alignSelf: "center",
    height: 30,
    width: 30,
    fontSize: 30,
    width: 30,
    color: "#FFF"
  },

  titleInfoStyle: {
    fontSize: 16,
    color: "#8e8e93"
  }
});

module.exports = Settings;
