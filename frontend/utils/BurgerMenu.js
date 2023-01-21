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

export default function BurgerMenu({ menu }) {
  return (
    <View
      style={{
        position: "absolute",
        top: "12%", // flex 1, 1, 10 = flex 1 == 12%
        height: menu ? "88%" : 0,
        width: "100%",
        backgroundColor: theme.lightBlue,
        opacity: 0.5,
      }}
    ></View>
  );
}
