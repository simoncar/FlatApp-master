import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import firebase from "firebase";
import Loader from "./components/common/Loader";
import { actionSetSelectedCommunity } from "./store/community";
import { setCommunityCreate } from "./store/communityCreation";



class CommunityCreateScreen extends Component {
    state = {
        communityName: "",
        kind: "",
        users: 0,
        region: "",
        language: "",
        errorMessage: null,
        loading: false
    }

    _handleCommunityCreation = async () => {
        try {
            this.setState({ loading: true });
            let {
                communityName,
                kind,
                users,
                region,
                language
            } = this.state;

            communityName = communityName.trim();
            const node = communityName.toLowerCase().split(' ').join('_')
            kind = kind.trim();
            region = region.trim();
            language = language.trim();

            const dict = {
                name: communityName,
                node,
                kind,
                users,
                region,
                language
            };

            const communityRef = firebase
                .firestore()
                .collection("domains")
                .doc(node);

            const doc = await communityRef.get();

            if (doc.exists) {
                throw new Error("Community name already existed");
            } else {
                await communityRef.set(dict);

                const setUserClaim = firebase.functions().httpsCallable('setUserClaim');
                const result = await setUserClaim({ email: this.props.auth.userInfo.email, claim: "ADMIN_" + node })
                console.log("set claim result", result);
                global.domain = node;
                this.props.dispatch(actionSetSelectedCommunity(dict));
                this.props.dispatch(setCommunityCreate(false))
            }
            this.setState({ loading: false });
        } catch (error) {
            this.setState({
                errorMessage: error.message,
                loading: false
            })
        }
    };
    render() {
        console.log("this.props", this.props);
        return (
            <SafeAreaView style={{ marginTop: 30 }}>
                <Loader
                    modalVisible={this.state.loading}
                    animationType="fade"
                />
                <ScrollView>
                    <Text>{this.state.errorMessage}</Text>
                    <View style={styles.titleContainer}>
                        <Text style={styles.nameText} numberOfLines={1}>
                            Community Name:
                    </Text>
                        <TextInput
                            style={styles.sectionContentText}
                            onChangeText={(text) => this.setState({ communityName: text })}
                            value={this.state.communityName}
                        />
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.nameText} numberOfLines={1}>
                            Kind:
                    </Text>
                        <TextInput
                            style={styles.sectionContentText}
                            onChangeText={(text) => this.setState({ kind: text })}
                            value={this.state.kind}
                        />
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.nameText} numberOfLines={1}>
                            Users:
                    </Text>
                        <TextInput
                            style={styles.sectionContentText}
                            onChangeText={(text) => this.setState({ users: text })}
                            value={this.state.users}
                            keyboardType='numeric'
                            maxLength={10}
                        />
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.nameText} numberOfLines={1}>
                            Region:
                    </Text>
                        <TextInput
                            style={styles.sectionContentText}
                            onChangeText={(text) => this.setState({ region: text })}
                            value={this.state.region}
                        />
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.nameText} numberOfLines={1}>
                            Language:
                    </Text>
                        <TextInput
                            style={styles.sectionContentText}
                            onChangeText={(text) => this.setState({ language: text })}
                            value={this.state.language}
                        />
                    </View>
                    <View style={{ flexDirection: "column", alignItems: "center", marginTop: 12 }}>
                        <TouchableOpacity
                            style={styles.SubmitButtonStyle}
                            activeOpacity={0.5}
                            onPress={this._handleCommunityCreation}>
                            <Text style={styles.TextStyle}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const mapStateToProps = state => ({
    communityCreate: state.communityCreate,
    auth: state.auth
});
export default connect(mapStateToProps)(CommunityCreateScreen);

const styles = StyleSheet.create({
    titleContainer: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    nameText: {
        fontWeight: "600",
        fontSize: 18,
        color: "black"
    },
    sectionContentText: {
        color: "#808080",
        fontSize: 14,
        height: 40, borderColor: '#100c08', borderBottomWidth: 1, width: "80%"
    },

    SubmitButtonStyle: {
        backgroundColor: "#fff",
        height: 50,
        width: 250,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "rgba(0,0,0, .4)",
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 4,
        marginBottom: 30,
    },
});