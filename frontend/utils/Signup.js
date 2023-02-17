import {
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { theme, styles } from "./../utils/style.js";
import React from "react";
import backendURL from "./../env.json";

const closeBtnPath = require("./../assets/close.png");
const CloseBtn = React.memo(function () {
  return (
    <Image
      style={{ height: 30, width: 30 }}
      source={closeBtnPath}
      defaultSource={closeBtnPath} // stop flickering, but lags animation
    />
  );
});

const userIconPath = require("./../assets/user.png");
const UserIcon = React.memo(function () {
  return (
    <Image
      style={{
        height: "15%",
        width: "23%",
        marginTop: "7.5%",
        opacity: 0.5,
      }}
      source={userIconPath}
      defaultSource={userIconPath}
    />
  );
});

export default function Signup({
  state,
  setState,
  googleID,
  setIsAuth,
  userInfo,
  setInsertedUserInfo,
}) {
  // todo: display userInfo pic & userInfo name

  const [menuOpacity, setMenuOpacity] = useState(0);
  const [menuHeight, setMenuHeight] = useState(100);

  const [ugenligSnusOmkostninger, setUgenligSnusOmkostninger] = useState(null);
  const [snusPerDag, setSnusPerDag] = useState(null);
  const [programType, setProgramType] = useState(null);

  useEffect(() => {
    if (state) {
      setMenuOpacity(1);
      setMenuHeight(100);
    }
    if (!state) {
      setMenuOpacity(0);
      setMenuHeight(0);
    }
  }, [state]);

  const postUserData = () => {
    fetch(`${backendURL.NgrokURL}/UserData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        googleID: googleID,
        ugenligSnusOmkostninger: ugenligSnusOmkostninger,
        snusPerDag: snusPerDag,
        programType: programType,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          setIsAuth(true);
          setInsertedUserInfo(true);
        }
      });
  };

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
          <CloseBtn />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 40,
            textAlign: "center",
            fontWeight: "700",
            color: theme.lightBlue,
          }}
        >
          SIGNUP
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
          <UserIcon />
          {true ? ( // change true to newAccount
            <>
              <Text
                style={{
                  fontSize: "16px",
                  position: "relative",
                  top: 10,
                  left: -20,
                }}
              >
                Ugentlig snus omkostninger:
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    height: state ? 50 : 0,
                    zIndex: state ? 10 : 0,
                    fontSize: "16px",
                  },
                ]}
                placeholder="Penge..."
                onChangeText={(e) => setUgenligSnusOmkostninger(e)}
              />
              <Text
                style={{
                  fontSize: "16px",
                  position: "relative",
                  top: 10,
                  left: -70,
                }}
              >
                Snus per dag:
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    height: state ? 50 : 0,
                    zIndex: state ? 10 : 0,
                    fontSize: "16px",
                  },
                ]}
                placeholder="1234..."
                onChangeText={(e) => setSnusPerDag(e)}
              />
              <Text
                style={{
                  fontSize: "16px",
                  position: "relative",
                  top: 10,
                  left: -70,
                }}
              >
                Program type:
              </Text>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    height: "10%",
                    width: "38%",
                    marginTop: "4%",
                    backgroundColor: "#FFF9",
                    borderColor: "black",
                    borderWidth: "1px",
                    marginRight: "40%",
                  },
                ]}
                onPress={() => setProgramType("Lineær")}
              >
                <Text style={{ fontSize: 18 }}>Lineær</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    height: "10%",
                    width: "38%",
                    marginTop: "-15.5%",
                    backgroundColor: "#FFF9",
                    borderColor: "black",
                    borderWidth: "1px",
                    marginRight: "-40%",
                  },
                ]}
                onPress={() => setProgramType("Eksponentiel")}
              >
                <Text style={{ fontSize: 18 }}>Eksponentiel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <></>
          )}
          <TouchableOpacity
            style={[
              styles.btn,
              { height: "10%", width: "80%", marginTop: "7.5%" },
            ]}
            onPress={() => postUserData()}
          >
            <Text style={{ fontSize: 20 }}>Signup</Text>
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
      {Foreground()}
    </View>
  );
}
