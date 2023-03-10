import { View } from "react-native";
import { useState, useEffect } from "react";
import { theme, styles } from "./../utils/style.js";

export default function BurgerMenu({ menu }) {
  const [menuOpacity, setMenuOpacity] = useState(0);
  const [menuHeight, setMenuHeight] = useState(88);

  useEffect(() => {
    if (menu) {
      setMenuOpacity(0);
      setMenuHeight(88);
      var counter = 1;
      var fadein = setInterval(() => {
        if (counter == 11) {
          clearInterval(fadein);
        } else {
          counter++;
          setMenuOpacity((prev) => prev + 0.08);
        }
      }, 10);
    }
    if (!menu) {
      var counter = 1;
      var fadeout = setInterval(() => {
        if (counter == 11) {
          setMenuHeight(0);
          clearInterval(fadeout);
        } else {
          counter++;
          setMenuOpacity((prev) => prev - 0.08);
        }
      }, 10);
    }
  }, [menu]);

  return (
    <View
      style={{
        position: "absolute",
        top: "11.5%",
        height: `${menuHeight + 0.5}%`,
        width: "100%",
        backgroundColor: theme.lightBlue,
        opacity: menuOpacity,
        zIndex: 10,
      }}
    ></View>
  );
}
