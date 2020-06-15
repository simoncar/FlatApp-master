import React, { Component } from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet, Alert } from "react-native";
import styles from "./styles";
import { Ionicons, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";
import { getLanguageString } from "../global";
import firebase from "firebase";
import { Text } from "../../components/common/sComponent"

class FeatureListItem extends Component {
	constructor(props) {
		super(props);
	}

	deleteStory = () => {
		const storyID = this.props.item._key;
		firebase.firestore().collection(global.domain).doc("feature").collection("features").doc(storyID).delete();
	};

	confirmDelete = () => {
		Alert.alert(
			"Confirm Delete Story",
			this.props.item.summary + "?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{ text: "OK", onPress: () => this.deleteStory() },
			],
			{ cancelable: true }
		);
	};

	adminMode = () => {
		if (this.props.editMode) {
			return (
				<TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.confirmDelete()}>
					<AntDesign name="delete" size={30} color="black" style={{ lineHeight: 60, marginRight: 15 }} />
				</TouchableOpacity>
			);
		}

		return (
			<TouchableOpacity
				style={{ flexDirection: "row" }}
				onPress={() => {
					this.props.navigation.navigate("chat", {
						chatroom: this.props.item._key,
						title: summary,
					});
				}}>
				<SimpleLineIcons name="bubble" size={30} color="black" style={{ lineHeight: 60, marginRight: 15 }} />
			</TouchableOpacity>
		);
	};

	render() {
		const preview = {
			uri:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAABaCAMAAAC4y0kXAAAAA1BMVEX///+nxBvIAAAAIElEQVRoge3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAPBgKBQAASc1kqgAAAAASUVORK5CYII=",
		};
		const summary = getLanguageString(this.props.language, this.props.item, "summary");
		const uri = this.props.item.photo1;

		return (
			<View style={styles.newsContentLine}>
				<TouchableOpacity onPress={() => this.props.navigation.navigate("storyMore", this.props.item)}>
					<View
						style={{
							flexDirection: "row",
							flex: 1,
							height: 60,
							backgroundColor: "white",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Image
							style={{
								width: 36,
								height: 36,
								margin: 12,
								borderRadius: 18,
								borderWidth: StyleSheet.hairlineWidth,
								borderColor: "lightgray",
							}}
							{...{ preview, uri }}
						/>

						<Text style={styles.itemTitle}>{summary}</Text>

						{this.adminMode()}
						<Ionicons name="ios-more" size={30} color="black" style={{ lineHeight: 60, marginRight: 15 }} />
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}
export default FeatureListItem;
