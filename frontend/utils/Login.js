import { TouchableOpacity, View, Text, Image, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { theme, styles } from "./../utils/style.js";
const closeBtn = require("./../assets/close.png");
const userIcon = require("./../assets/user.png");

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
      }, 25);
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
      }, 25);
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
          height: "72.5%",
          backgroundColor: theme.lightGray,
          borderRadius: 10,
          opacity: menuOpacity,
        }}
      >
        <TouchableOpacity
          style={{
            position: "relative",
            left: "80%",
            top: "2.5%",
            zIndex: 11,
            opacity: state ? 1 : 0,
            backgroundColor: "#fff",
            borderRadius: "50%",
            padding: 10,
            width: 50,
          }}
          onPress={() => {
            setState((prev) => !prev);
          }}
        >
          <Image
            style={{ height: 30, width: 30 }}
            source={closeBtn}
            defaultSource={closeBtn} // stop flickering, but lags animation
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 40,
            textAlign: "center",
            fontWeight: "700",
            color: theme.lightBlue,
          }}
        >
          LOGIN
        </Text>
        <View
          style={{
            backgroundColor: "black",
            height: 2,
            opacity: 0.5,
            width: "80%",
            position: "relative",
            left: "10%",
            marginTop: 10,
          }}
        ></View>
        <View style={{ height: "80%", alignItems: "center" }}>
          <Image
            style={{
              height: "15%",
              width: "23%",
              marginTop: "7.5%",
              opacity: 0.5,
            }}
            source={userIcon}
            defaultSource={userIcon}
          />
          <TextInput
            style={[styles.input, { height: state ? 50 : 0 }]}
            placeholder="Brugernavn..."
          />
          <TextInput
            style={[styles.input, { height: state ? 50 : 0 }]}
            placeholder="Adgangskode..."
          />
          <TouchableOpacity
            style={{ width: "100%", position: "relative", left: "10%" }}
          >
            <View
              style={[
                styles.input,
                {
                  height: state ? 50 : 0,
                  marginTop: "15%",
                  justifyContent: "center",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 20,
                  opacity: 0.75,
                  paddingLeft: "10%",
                }}
              >
                Log ind med
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "100%", position: "relative", left: "10%" }}
          >
            <View
              style={[
                styles.input,
                {
                  height: state ? 50 : 0,
                  marginTop: "5%",
                  justifyContent: "center",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 20,
                  opacity: 0.75,
                  paddingLeft: "10%",
                }}
              >
                Log ind med
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              { height: "10%", width: "80%", marginTop: "7.5%" },
            ]}
          >
            <Text style={{ fontSize: 20 }}>Login</Text>
          </TouchableOpacity>
        </View>
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
