import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React from "react";
import { theme, styles } from "./../utils/style.js";
import BurgerMenu from "./../utils/BurgerMenu.js";
import backendURL from "./../env.json";

export default function MainPage({ userInfo }) {
  const [menu, setMenu] = React.useState(false);
  const [home, setHome] = React.useState(true);
  const [statistics, setStatistics] = React.useState(false);

  const [nedsatAntalSnus, setNedsatAntalSnus] = React.useState(0);

  const [streak, setStreak] = React.useState(0);
  const [pengeSparet, setPengeSparet] = React.useState(0);
  const [antalSnusIDag, setAntalSnusIDag] = React.useState(0);

  React.useEffect(() => {
    console.log(
      `\nmenu : ${menu}\nhome : ${home}\nstatistics : ${statistics}\n`
    );
  }, [menu, home, statistics]);

  React.useEffect(() => {
    try {
      fetch(`${backendURL.NgrokURL}/streak`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          googleID: userInfo.id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res?.streak) {
            setStreak(res.streak);
          }
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  React.useEffect(() => {
    console.log(`antalSnusIDag ${antalSnusIDag}`);
    try {
      fetch(`${backendURL.NgrokURL}/updateAntalSnusIDag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          antalSnusIDag: antalSnusIDag,
          userInfo: userInfo,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res?.antalSnusIDag) {
            // if just logged in
            setAntalSnusIDag(res.antalSnusIDag);
          }
          if (res?.nedsatAntalSnus) {
            setNedsatAntalSnus(res.nedsatAntalSnus);
          }
        });
    } catch (err) {
      console.error(err);
    }
  }, [antalSnusIDag]);

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
            style={[styles.btn, { opacity: home ? 0.75 : 1 }]}
            onPress={() => {
              setHome(true);
              setStatistics(false);
              setMenu(false);
            }}
          >
            <Text style={{ fontSize: 20 }}>Home</Text>
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
            style={[styles.btn, { opacity: statistics ? 0.75 : 1 }]}
            onPress={() => {
              setHome(false);
              setStatistics(true);
              setMenu(false);
            }}
          >
            <Text style={{ fontSize: 20 }}>Statistics</Text>
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
      <BurgerMenu menu={menu} />
      <View style={{ flex: 10, backgroundColor: "#fff" }}>
        {home ? (
          <>
            <View
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginTop: "-15%",
                  fontSize: 30,
                  textAlign: "center",
                  fontWeight: "700",
                  color: theme.lightBlue,
                }}
              >
                STREAK
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  textAlign: "center",
                  fontWeight: "600",
                  opacity: 0.5,
                }}
              >
                {streak} Dage
              </Text>
              <Text
                style={{
                  marginTop: 25,
                  fontSize: 30,
                  textAlign: "center",
                  fontWeight: "700",
                  color: theme.lightBlue,
                }}
              >
                PENGE SPARET
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  textAlign: "center",
                  fontWeight: "600",
                  opacity: 0.5,
                }}
              >
                {pengeSparet}.- Kr
              </Text>
              <Text
                style={{
                  marginTop: 25,
                  fontSize: 30,
                  textAlign: "center",
                  fontWeight: "700",
                  color: theme.lightBlue,
                }}
              >
                NEDSAT ANTAL SNUS{"\n"} I DAG
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  textAlign: "center",
                  fontWeight: "600",
                  opacity: 0.5,
                }}
              >
                {nedsatAntalSnus} Stk. Snus
              </Text>
              <Text
                style={{
                  marginTop: 25,
                  fontSize: 30,
                  textAlign: "center",
                  fontWeight: "700",
                  color: theme.lightBlue,
                }}
              >
                ANTAL SNUS I DAG?
              </Text>
              <Text
                style={{
                  fontSize: 35,
                  textAlign: "center",
                  fontWeight: "500",
                  opacity: 0.5,
                  marginTop: 10,
                }}
              >
                {antalSnusIDag}
              </Text>
              <TouchableOpacity
                style={[
                  styles.btn,
                  { height: 50, width: 50, marginTop: -45, marginLeft: -125 },
                ]}
                onPress={() => {
                  if (antalSnusIDag > 0) {
                    setAntalSnusIDag((prev) => prev - 1);
                  }
                }}
              >
                <Text style={{ fontSize: 25 }}>-1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btn,
                  { height: 50, width: 50, marginTop: -50, marginLeft: 125 },
                ]}
                onPress={() => setAntalSnusIDag((prev) => prev + 1)}
              >
                <Text style={{ fontSize: 25 }}>+1</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
