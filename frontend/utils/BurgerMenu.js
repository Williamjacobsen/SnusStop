import { View, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import { theme, styles } from "./../utils/style.js";

export default function BurgerMenu({ menu }) {
  return (
    <Animated.View
      style={{
        position: "absolute",
        top: "12%", // flex 1, 1, 10 = flex 1 == 12%
        height: "88%",
        width: "100%",
        backgroundColor: theme.lightBlue,
        opacity: 1,
      }}
    ></Animated.View>
  );
}
