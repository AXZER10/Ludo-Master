import { Image, StyleSheet, Text, View } from "react-native";
import SplashScreen from "./SplashScreen";
import 'react-native-gesture-handler';
//import EmailSignIn from "../app/(auth)/EmailSignIn"
import Login from "./(auth)/Login";
import Details from "./(auth)/Details";
import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";





export default function Index() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 3000);
  });

  
  return (
 
    <View style={styles.container}>
      {isShowSplashScreen ? <SplashScreen /> : <Login/>}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});