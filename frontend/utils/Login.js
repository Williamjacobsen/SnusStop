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
const closeBtnPath = require("./../assets/close.png");
import React from "react";
import * as Google from "expo-auth-session/providers/google";

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

const GoogleAuth = function () {
  const [accessToken, setAccessToken] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "893924894033-ld7fjv8vd68shqjkh7mldknqjisvis23.apps.googleusercontent.com",
    iosClientId:
      "893924894033-0eldbtl66u94i97nivjfcf2ij4j4kqr6.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      if (response.authentication?.accessToken) {
        setAccessToken(response.authentication.accessToken);
      }
    }
  }, [response]);

  const fetchUserInfo = async () => {
    if (accessToken && !userInfo) {
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      userInfoResponse.json().then((data) => {
        console.log(data);
        setUserInfo(data);
      });
    }
  };

  return (
    <Button
      title={accessToken ? "Get User Info" : "Login"}
      onPress={
        accessToken
          ? fetchUserInfo()
          : () => promptAsync({ useProxy: true, showInRecents: true })
      }
    />
  );
};

export default function Login({ state, setState }) {
  const [menuOpacity, setMenuOpacity] = useState(0);
  const [menuHeight, setMenuHeight] = useState(100);

  useEffect(() => {
    if (state) {
      setMenuOpacity(1);
      setMenuHeight(100); /*
      var counter = 1;
      var fadein = setInterval(() => {
        if (counter == 11) {
          clearInterval(fadein);
        } else {
          counter++;
          setMenuOpacity((prev) => prev + 0.1);
        }
      }, 25);*/
    }
    if (!state) {
      setMenuOpacity(0);
      setMenuHeight(0);
      var counter = 1; /*
      var fadeout = setInterval(() => {
        if (counter == 11) {
          setMenuHeight(0);
          clearInterval(fadeout);
        } else {
          counter++;
          setMenuOpacity((prev) => prev - 0.1);
        }
      }, 25);*/
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
          <UserIcon />
          <TextInput
            style={[
              styles.input,
              { height: state ? 50 : 0, zIndex: state ? 10 : 0 },
            ]}
            placeholder="Brugernavn..."
          />
          <TextInput
            style={[
              styles.input,
              { height: state ? 50 : 0, zIndex: state ? 10 : 0 },
            ]}
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
              <GoogleAuth />
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
