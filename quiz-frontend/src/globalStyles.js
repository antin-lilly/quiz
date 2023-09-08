import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  backgroundColorPrimary: {
    backgroundColor: "#8c6cd0",
  },
  backgroundColorSecondary: {
    backgroundColor: "#fff",
  },
  textColorPrimary: {
    color: "#1C2732",
  },
  textColorWhite: {
    color: "#fff",
  },
  fontSize20: {
    fontSize: 20,
  },
  fontSize16: {
    fontSize: 16,
  },
  fontWeightBold: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#8c6cd0", // Default button color
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
  }
});
