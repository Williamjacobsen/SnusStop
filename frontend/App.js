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

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  return <LandingPage setIsAuth={setIsAuth} />;
}
