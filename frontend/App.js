import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.navbar}>
        <View
          style={{
            height: "100%",
            flex: 1,
            justifyContent: Platform.OS !== "ios" ? "center" : null,
            paddingLeft: 20,
          }}
        >
          <TouchableOpacity style={styles.btn}>
            <Text style={{ fontSize: 20 }}>Login</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: "100%",
            flex: 1,
            justifyContent: Platform.OS !== "ios" ? "center" : null,
            paddingLeft: 10,
          }}
        >
          <TouchableOpacity style={styles.btn}>
            <Text style={{ fontSize: 20 }}>Signup</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: "100%",
            flex: 1.5,
            justifyContent: Platform.OS !== "ios" ? "center" : null,
          }}
        >
          <Image
            source={require("./assets/burger_menu.png")}
            style={{
              height: "80%",
              width: 40,
              position: "relative",
              left: "60%",
            }}
          />
        </View>
      </SafeAreaView>
      <View style={{ flex: 10, backgroundColor: "#fff" }}></View>
    </View>
  );
}

const theme = {
  lightGray: "#F0F0F0",
  lightBlue: "#53C0E9",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightGray,
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
});
