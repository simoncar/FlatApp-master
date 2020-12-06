
import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import firebase from "firebase";
import ListItem from "./FeatureListItem";
import { getLanguageString } from "../lib/global";
import { SettingsListItem } from "./SettingsListItem";
import { connect } from "react-redux";

interface TProps {
	navigation: any,
	albums: [],
	editMode: boolean,
	language: string,
	show: string,
}
interface TState {
	loading: boolean,
	featureItems: {
		source: string,
		summaryMyLanguage: string,
		descriptionMyLanguage: string,
		_key: string;
	}[]
}
class FeatureMoreItems extends Component<TProps, TState> {
	constructor(props: {} | Readonly<{}>) {
		super(props);

		this.state = {
			loading: true,
			featureItems: []
		};
	}

	componentDidMount() {
		try {
			this.ref = firebase.firestore().collection(global.domain).doc("feature").collection("features").orderBy("order");
			this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
		} catch (e) {
			console.error(e.message);
		}
	}

	onCollectionUpdate = (querySnapshot: any[]) => {
		var trans = {};
		var featureItems: any[] = [];

		querySnapshot.forEach((doc: { data: () => { (): any; new(): any; translated: boolean; summary: any; description: any; visibleMore: any; }; id: any; }) => {
			if (doc.data().translated == true) {
				trans = {
					source: "feature",
					summaryMyLanguage: getLanguageString(this.props.language, doc.data(), "summary"),
					descriptionMyLanguage: getLanguageString(this.props.language, doc.data(), "description")

				};
			} else {
				trans = {
					source: "feature",
					summaryMyLanguage: doc.data().summary,
					descriptionMyLanguage: doc.data().description
				};
			}
			if (this.props.show == "visibleMore") {
				if (doc.data().visibleMore) {
					featureItems.push({ ...{ _key: doc.id }, ...doc.data(), ...trans });
				}
			} else {
				featureItems.push({ ...{ _key: doc.id }, ...doc.data(), ...trans });
			}
		});

		if (featureItems.length > 0) {
			this.setState({
				featureItems
			});
		}

		this.setState({
			loading: false
		});
	};

	componentWillUnmount() {
		this.unsubscribe();
	}

	keyExtractor = (item: { _key: any; }) => item._key;

	_renderItem(item) {

		const uri = item.photo1;

		if (!(this.props.show == "visibleMore")) {
			return <ListItem
				key={"feature2" + item._key}
				navigation={this.props.navigation}
				item={item}
				editMode={this.props.editMode}
				language={this.props.language}
			/>;
		} else {
			return <SettingsListItem
				key={"feature2" + item._key}
				title={item.summaryMyLanguage}
				icon={<Image style={styles.imageIcon}
					source={{ uri: uri }} />}
				onPress={() => this.props.navigation.navigate("storyMore", item)}
			/>;
		}
	}
	_listEmptyComponent = () => {
		return null;
	};

	render() {
		if (this.state.loading) {
			return <View><Text>Loading</Text></View>;
		} else if (this.state.featureItems === undefined || this.state.featureItems.length == 0) {
			return <View><Text>Empty</Text></View>;
		}
		else {
			return <View>
				{this.state.featureItems.map(item => {
					return <View key={item._key}>{this._renderItem(item)}</View>
				})}
			</View >
		}
	}

}

const styles = StyleSheet.create({
	imageIcon: {
		alignSelf: "center",
		borderColor: "lightgray",
		borderRadius: 18,
		borderWidth: 0.1,
		height: 30,
		marginLeft: 15,
		width: 30
	}
});

const mapStateToProps = (state: { auth: { language: any; }; }) => ({
	language: state.auth.language
});

export default connect(mapStateToProps)(FeatureMoreItems);