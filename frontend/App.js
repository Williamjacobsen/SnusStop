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
import LandingPage from "./pages/LandingPage.js";
import MainPage from "./pages/MainPage.js";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  return <>{isAuth ? <MainPage /> : <LandingPage setIsAuth={setIsAuth} />}</>;
}
