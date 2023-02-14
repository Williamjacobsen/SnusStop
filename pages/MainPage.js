import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React from "react";
import { theme, styles } from "./../utils/style.js";
import BurgerMenu from "./../utils/BurgerMenu.js";

export default function MainPage() {
  const [menu, setMenu] = React.useState(false);
  const [home, setHome] = React.useState(true);
  const [statistics, setStatistics] = React.useState(false);

  React.useEffect(() => {
    console.log(
      `\nmenu : ${menu}\nhome : ${home}\nstatistics : ${statistics}\n`
    );
  }, [menu, home, statistics]);

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
          <TouchableOpacity
            style={[styles.btn, { opacity: home ? 0.75 : 1 }]}
            onPress={() => {
              setHome(true);
              setStatistics(false);
              setMenu(false);
            }}
          >
            <Text style={{ fontSize: 20 }}>Home</Text>
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
          <TouchableOpacity
            style={[styles.btn, { opacity: statistics ? 0.75 : 1 }]}
            onPress={() => {
              setHome(false);
              setStatistics(true);
              setMenu(false);
            }}
          >
            <Text style={{ fontSize: 20 }}>Statistics</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: "100%",
            flex: 1.5,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setMenu((prev) => !prev);
            }}
          >
            <Image
              source={require("./../assets/burger_menu.png")}
              style={{
                height: "80%",
                width: 40,
                position: "relative",
                left: "60%",
              }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={{ flex: 10, backgroundColor: "#fff" }}></View>
      <BurgerMenu menu={menu} />
    </View>
  );
}
