import React, { Component } from "react";
import { Platform, StatusBar } from "react-native";
import AppNavigator from "./AppNavigator";
import registerForPush from "./lib/registerForPushNotificationsAsync";
import * as Analytics from "expo-firebase-analytics";
import { AppearanceProvider } from "react-native-appearance";

export default class App extends Component {
	componentDidMount() {
		this._registerForPushNotifications();
		Analytics.logEvent("App_Started");
	}

	_registerForPushNotifications() {
		registerForPush.reg(global.name);
	}

	render() {
		return (
			<AppearanceProvider>
				{Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
				<AppNavigator {...this.props}></AppNavigator>
			</AppearanceProvider>
		);
	}
}
