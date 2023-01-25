import { TouchableOpacity, View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import { theme, styles } from "./../utils/style.js";

export default function Login({ state, setState }) {
  const [menuOpacity, setMenuOpacity] = useState(0);
  const [menuHeight, setMenuHeight] = useState(100);

  useEffect(() => {
    if (state) {
      setMenuOpacity(0);
      setMenuHeight(100);
      var counter = 1;
      var fadein = setInterval(() => {
        if (counter == 11) {
          clearInterval(fadein);
        } else {
          counter++;
          setMenuOpacity((prev) => prev + 0.1);
        }
      }, 10);
    }
    if (!state) {
      var counter = 1;
      var fadeout = setInterval(() => {
        if (counter == 11) {
          setMenuHeight(0);
          clearInterval(fadeout);
        } else {
          counter++;
          setMenuOpacity((prev) => prev - 0.1);
        }
      }, 10);
    }
  }, [state]);

  const Background = () => {
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          opacity: menuOpacity / 2,
        }}
      ></View>
    );
  };

  const Foreground = () => {
    return (
      <View
        style={{
          width: "80%",
          height: "70%",
          backgroundColor: theme.lightGray,
          borderRadius: 10,
          opacity: menuOpacity,
        }}
      >
        <TouchableOpacity
          style={{
            position: "relative",
            left: "80%",
            top: "5%",
            zIndex: 11,
            opacity: state ? 1 : 0,
          }}
          onPress={() => {
            setState((prev) => !prev);
          }}
        >
          <Image
            source={require("./../assets/close.png")}
            style={{ height: 40, width: 40 }}
          ></Image>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 50,
            textAlign: "center",
            fontWeight: "600",
            color: theme.lightBlue,
          }}
        >
          Login
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: `${menuHeight}%`,
        zIndex: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Background />
      <Foreground />
    </View>
  );
}
