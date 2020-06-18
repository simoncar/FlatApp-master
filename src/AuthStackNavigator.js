import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import I18n from "./lib/i18n";

import DomainSelection from "./screens/DomainSelection";
import LoginScreen from "./screens/Login";
import SignUpScreen from "./screens/SignUpScreen";
import WelcomeScreen from "./screens/Welcome";
import CommunityCreateScreen from "./screens/CommunityCreateScreen"
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

const Stack = createStackNavigator()

function AuthStackNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='DomainSelection' component={DomainSelection} options={{ title: I18n.t("home") }} />
				<Stack.Screen name='login' component={LoginScreen} options={{ title: I18n.t("signIn") }} />
				<Stack.Screen name='signup' component={SignUpScreen} options={{ title: I18n.t("signUp") }} />
				<Stack.Screen name='welcomeScreen' component={WelcomeScreen} options={{ title: I18n.t("welcome") }} />
				<Stack.Screen name='communityCreateScreen' component={CommunityCreateScreen} options={{ title: I18n.t("create") }} />
				<Stack.Screen name='forgetpassword' component={ForgotPasswordScreen} options={{ title: I18n.t("forgetPassword") }} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}


export default AuthStackNavigator