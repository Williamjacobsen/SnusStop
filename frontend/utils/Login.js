import { TouchableOpacity, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { theme, styles } from "./../utils/style.js";

export default function Login({ state, setState }) {
  const [menuOpacity, setMenuOpacity] = useState(0);
  const [menuHeight, setMenuHeight] = useState(88);

  useEffect(() => {
    if (state) {
      setMenuOpacity(0);
      setMenuHeight(88);
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
          opacity: state ? 0.5 : 0,
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
        }}
      ></View>
    );
  };

  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: state ? "100%" : "0%",
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
