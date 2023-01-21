import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { theme, styles } from "./../utils/style.js";
import BurgerMenu from "./../utils/BurgerMenu.js";

export default function LandingPage() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    console.log(`menu : ${menu}`);
  }, [menu]);

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
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => setMenu((prev) => !prev)}>
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
