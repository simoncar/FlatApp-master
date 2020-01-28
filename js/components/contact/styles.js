const React = require("react-native");

const { Dimensions, Platform } = React;

const primary = require("../../themes/variable").brandPrimary;

export default {
  header: {
    width: Dimensions.get("window").width,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: Platform.OS === "ios" ? undefined : -30
  },
  rowHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingTop: Platform.OS === "android" ? 7 : 0
  },
  btnHeader: {
    alignSelf: "center"
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: "contain",
    alignSelf: "center"
  },
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: primary
  },
  contentIconsContainer: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  roundedButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: "#141b4d"
  },
  roundedCustomButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 60,
    height: 60
  },
  feedbackHeaderContainer: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: "transparent"
  },
  feedbackHeader: {
    fontSize: 22,
    paddingBottom: 10,
    fontWeight: "600",
    color: "black"
  },
  feedbackHead: {
    opacity: 0.8,
    fontSize: 13,
    fontWeight: "bold",
    color: "black"
  },
  feedbackButton: {
    opacity: 0.8,
    fontSize: 13,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "#141b4d"
  },
  spacer: {
    opacity: 0.8,
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFF",
    paddingBottom: 400
  },

  updateNotes: {
    opacity: 1,
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    paddingTop: 30
  },
  feedbackContainer: {
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 20
  },
  inputGrp: {
    backgroundColor: "rgba(0,0,0,0.2)",
    marginBottom: 20,
    borderWidth: 0,
    borderColor: "transparent"
  },
  feedbackInputBox: {},
  input: {
    color: "#fff"
  },
  inputBox: {},
  inputBoxIcon: {
    alignSelf: "flex-end"
  },
  forwardIcon: {
    alignSelf: "flex-end",
    paddingBottom: 5
  },
  adminButton: {
    backgroundColor: "#ff5722",
    borderColor: "#ff5722",
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    zIndex: 1,
  },
  adminContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  contactText: {
    marginTop: 12,
    marginBottm: 8,
    fontWeight: "bold"
  }
};
