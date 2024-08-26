import { Image, StyleSheet, Text, View } from "react-native";
import SplashScreen from "./SplashScreen";
import EmailSignIn from "../app/(auth)/EmailSignIn"
import { useEffect, useState } from "react";


export default function Index() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 3000);
  });
  return (
    <View style={styles.container}>
      {isShowSplashScreen ? <SplashScreen /> : <EmailSignIn/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});