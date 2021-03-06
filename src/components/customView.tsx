import React from "react";
import { Linking, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { MapView } from "expo";

export default class CustomView extends React.Component {
	render() {
		if (this.props.currentMessage.location) {
			return (
				<TouchableOpacity
					style={[styles.container, this.props.containerStyle]}
					onPress={() => {
						const url = Platform.select({
							ios: `http://maps.apple.com/?ll=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`,
							android: `http://maps.google.com/?q=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`,
						});
						Linking.canOpenURL(url)
							.then((supported) => {
								if (supported) {
									return Linking.openURL(url);
								}
							})

					}}>
					<MapView
						style={[styles.mapView, this.props.mapViewStyle]}
						region={{
							latitude: this.props.currentMessage.location.latitude,
							longitude: this.props.currentMessage.location.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
						scrollEnabled={false}
						zoomEnabled={false}
					/>
				</TouchableOpacity>
			);
		} else return null;
	}
}

const styles = StyleSheet.create({
	container: {},
	mapView: {
		width: 150,
		height: 100,
		borderRadius: 13,
		margin: 3,
	},
});

