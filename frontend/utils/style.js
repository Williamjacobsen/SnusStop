import { StyleSheet } from "react-native";

const theme = {
  lightGray: "#F0F0F0",
  lightBlue: "#53C0E9",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    backgroundColor: theme.lightGray,
    width: "100%",
    flex: 0.75,
    flexDirection: "row",
  },
  btn: {
    backgroundColor: theme.lightBlue,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  input: {
    backgroundColor: "#fff",
    width: "80%",
    height: 50,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: "5%",
    fontSize: 20,
    paddingLeft: 20,
  },
});

module.exports = { theme, styles };
