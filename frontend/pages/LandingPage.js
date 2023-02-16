import {
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
import Login from "./../utils/Login.js";
import Signup from "./../utils/Signup.js";

export default function LandingPage({ setIsAuth, userInfo, setUserInfo }) {
  const [googleID, setGoogleID] = useState(null);
  const [newAccount, setNewAccount] = useState(false);

  const [menu, setMenu] = useState(false);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  useEffect(() => {
    console.log(`\nmenu : ${menu}\nlogin : ${login}\nsignup : ${signup}\n`);
  }, [menu, login, signup]);

  useEffect(() => {
    if (newAccount) {
      setMenu(false);
      setLogin(false);
      setSignup(true);
    }
  }, [newAccount]);

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
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setLogin((prev) => !prev);
              setSignup(false);
              setMenu(false);
            }}
          >
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
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setSignup((prev) => !prev);
              setLogin(false);
              setMenu(false);
            }}
          >
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
          <TouchableOpacity
            onPress={() => {
              setMenu((prev) => !prev);
              setSignup(false);
              setLogin(false);
            }}
          >
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
      {newAccount ? (
        <></>
      ) : (
        <Login
          state={login}
          setState={setLogin}
          setNewAccount={setNewAccount}
          setGoogleID={setGoogleID}
          setIsAuth={setIsAuth}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      )}
      <Signup
        state={signup}
        setState={setSignup}
        googleID={googleID}
        setIsAuth={setIsAuth}
        userInfo={userInfo}
      />

      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "40%",
          top: "20%",
          alignItems: "center",
          zIndex: 0,
        }}
      >
        <Text
          style={{
            fontSize: 50,
            textAlign: "center",
            fontWeight: "700",
            color: theme.lightBlue,
          }}
        >
          VIL DU PÅ AFVÆNNING?
        </Text>
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            fontWeight: "600",
            opacity: 0.5,
          }}
        >
          Flere forskellige programmer {"\n"}Kalender & timers {"\n"}Finansielle
          tracker
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: theme.lightBlue,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          position: "relative",
          bottom: "20%",
          width: "80%",
          height: "7,5%",
          left: "10%",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          Opret Konto & Start Nu
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: 3,
          width: "80%",
          backgroundColor: "gray",
          opacity: 0.5,
          position: "relative",
          left: "10%",
          bottom: "17.5%",
          borderRadius: 10,
        }}
      ></View>
    </View>
  );
}
