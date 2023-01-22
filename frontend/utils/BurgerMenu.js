import { View } from "react-native";
import { useState, useEffect } from "react";
import { theme, styles } from "./../utils/style.js";

export default function BurgerMenu({ menu }) {
  const [menuOpacity, setMenuOpacity] = useState(0);
  const [menuHeight, setMenuHeight] = useState(88);

  useEffect(() => {
    if (menu) {
      setMenuOpacity(0);
      var counter = 1;
      var fadein = setInterval(() => {
        if (counter == 11) {
          clearInterval(fadein);
        } else {
          counter++;
          setMenuOpacity((prev) => prev + 0.1);
        }
      }, 25);
    }
    if (!menu) {
      var counter = 1;
      var fadeout = setInterval(() => {
        if (counter == 11) {
          clearInterval(fadeout);
        } else {
          counter++;
          setMenuOpacity((prev) => prev - 0.1);
        }
      }, 25);
    }
  }, [menu]);

  useEffect(() => console.log(`menuOpacity : ${menuOpacity}`), [menuOpacity]);

  return (
    <View
      style={{
        position: "absolute",
        top: "12%",
        height: `${menuHeight}%`,
        width: "100%",
        backgroundColor: theme.lightBlue,
        opacity: menuOpacity,
      }}
    ></View>
  );
}
