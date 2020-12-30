import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import Image from "../components/Imgix";
import { Input } from "react-native-elements";
import { Ionicons, Entypo } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import { ActionSheetProvider, connectActionSheet } from "@expo/react-native-action-sheet";
import I18n from "../lib/i18n";
import _ from "lodash";
import { launchProfileImagePicker } from "../lib/APIUploadImage";
import { Text, Button } from "../components/sComponent";
import { UserEntity } from "../lib/interfaces";
import { UpdateUser } from "../lib/APIUser";
import { useAuth, useDisplayNameP, useDomainP, usePhotoURLP, useUidP, useEmailP } from "../lib/globalState";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { saveProfilePic } from "../lib/APIUploadImage";
import firebase from "firebase";

interface TProps {
	navigation: any;
	route: any;
}

//NOTE: You can only edit yourself  (current logged in user) for now

export default function EditUserProfile(props: TProps) {
	const { showActionSheetWithOptions } = useActionSheet();

	const [errorMessage, setErrorMessage] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [lastName, setLastName] = useState("");
	const [photoURL, setPhotoURL] = useState("");
	const [stateDisplayName, setGDisplayName, isUpdatedDisplayName] = useDisplayNameP();
	const [statePhotoURL, setGPhotoURL, isUpdatedPhotoURL] = usePhotoURLP();
	const [uid, ,] = useUidP();
	const [email, setEmail, isUpdatedEmail] = useEmailP();
	const [domain, setDomain, isUpdatedDomain] = useDomainP();

	useEffect(() => {
		setDisplayName(stateDisplayName);
	}, []);

	const save = async (newUser) => {
		UpdateUser(newUser, setGDisplayName, setGPhotoURL);
		props.navigation.popToTop();
	};

	const pickImage = async () => {
		let result = await launchProfileImagePicker();
		if (!result.cancelled) {
			console.log("save to server:", result.uri);
			const downloadURL = await saveProfilePic(result.uri);

			console.log("downloadURL:", downloadURL);
			setGPhotoURL(downloadURL);
			setPhotoURL(downloadURL);
			const newUser = {
				displayName: stateDisplayName,
				uid: uid,
				photoURL: downloadURL,
			};
			save(newUser);
		}
	};

	const openActionSheet = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
		console.log("here:", status);
		if (status === "granted") {
			const options = [I18n.t("photoTake"), I18n.t("photoChoose"), I18n.t("delete"), I18n.t("cancel")];
			const destructiveButtonIndex = options.length - 2;
			const cancelButtonIndex = options.length - 1;

			console.log("here2:", showActionSheetWithOptions);

			showActionSheetWithOptions(
				{
					options,
					cancelButtonIndex,
					destructiveButtonIndex,
				},
				(buttonIndex) => {
					// Do something here depending on the button index selected
					switch (buttonIndex) {
						case 0:
							props.navigation.push("CameraApp", {
								onGoBack: setProfilePic,
							});
							break;
						case 1:
							pickImage();
							break;
					}
				}
			);
		}
	};

	const profilePic = () => {
		return (
			<View style={styles.profilePicContainer}>
				<TouchableOpacity
					onPress={() => {
						openActionSheet();
					}}>
					{statePhotoURL ? (
						<Image style={styles.profilePhoto} source={{ uri: statePhotoURL }} />
					) : (
						<Ionicons name="ios-person" size={100} color="#999999" style={styles.profilePic} />
					)}
					<View style={styles.circle}>
						<Entypo name="camera" size={17} style={styles.camera} />
					</View>
				</TouchableOpacity>
			</View>
		);
	};

	const logout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				props.navigation.popToTop();
			});
	};

	return (
		<SafeAreaView style={styles.saveAreaView}>
			<ScrollView>
				<Text>{errorMessage}</Text>

				{profilePic()}
				<View style={styles.titleContainer}>
					<Text style={styles.nameText}>{I18n.t("email")}: </Text>
					<Text style={styles.nameText}>{email}: </Text>
				</View>
				<View style={styles.titleContainerRow}>
					<View style={styles.rowFlex}>
						<Text style={styles.nameText}>{I18n.t("name")}:</Text>
						<Input
							style={styles.sectionContentText}
							onChangeText={(text) => setDisplayName(text)}
							placeholder={I18n.t("name")}
							value={displayName}
						/>
					</View>
				</View>
				<Button
					onPress={() =>
						save({
							displayName: displayName,
							uid: uid,
							photoURL: statePhotoURL,
						})
					}
					title={I18n.t("save")}
				/>

				<Button onPress={() => logout()} title={I18n.t("logout")} />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	nameText: {
		color: "#777777",
		fontSize: 10,
		fontWeight: "600",
	},
	profilePhoto: {
		borderColor: "grey",
		borderRadius: 150 / 2,
		borderWidth: 1,
		height: 150,
		overflow: "hidden",
		width: 150,
	},
	profilePic: {
		borderColor: "lightgray",
		height: 200,
	},
	profilePicContainer: {
		alignItems: "center",
		paddingBottom: 15,
		paddingHorizontal: 15,
		paddingTop: 15,
	},
	rowFlex: { flex: 1 },
	saveAreaView: { backgroundColor: "#fdfdfd", flex: 1 },
	sectionContentText: {
		borderBottomWidth: 1,
		borderColor: "#100c08",
		color: "#111111",
		fontSize: 14,
		height: 40,
	},
	titleContainer: {
		paddingBottom: 15,
		paddingHorizontal: 15,
		paddingTop: 15,
	},
	titleContainerRow: {
		flexDirection: "row",
		paddingBottom: 15,
		paddingHorizontal: 15,
		paddingTop: 15,
	},
	camera: {
		color: "white",
		marginBottom: 2,
	},
	circle: {
		position: "absolute",
		top: 115,
		left: 115,
		width: 30,
		height: 30,
		borderRadius: 30 / 2,
		backgroundColor: "lightgrey",
		borderWidth: 2,
		borderColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
});
