import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { UserContext, UserProvider } from "./UserContext";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
  useEffect(() => {
    if (error) {
      throw error;
    }
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);
  if (!fontsLoaded && !error) return null;
  return (
    <>
      <StatusBar/>
      <UserProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Ludo" options={{ headerShown: false }} />
          <Stack.Screen name="LudoTwoPlayer" options={{ headerShown: false }} />
          <Stack.Screen name="LudoNew" options={{ headerShown: false }} />
          <Stack.Screen
            name="Ludo2PlayerOnline"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Ludo2PlayerOffline"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="Referral" options={{ headerShown: false }} />

          <Stack.Screen name="Ads" options={{ headerShown: false }} />
          <Stack.Screen name="Room" options={{ headerShown: false }} />
          <Stack.Screen name="Menu/About" options={{ headerShown: false }} />
          <Stack.Screen name="Menu/privacy" options={{ headerShown: false }} />
          <Stack.Screen name="Menu/Refund" options={{ headerShown: false }} />
          <Stack.Screen name="Menu/Terms" options={{ headerShown: false }} />
          <Stack.Screen name="HowToPlay" options={{ headerShown: false }} />
          <Stack.Screen name="KYC" options={{ headerShown: false }} />
          <Stack.Screen name="KYCStatus" options={{ headerShown: false }} />
          <Stack.Screen name="(leaderboard)" options={{ headerShown: false }} />
          <Stack.Screen name="Menu/TDS" options={{ headerShown: false }} />
          <Stack.Screen name="Menu/Feedback" options={{ headerShown: false }} />
          <Stack.Screen name="Menu/Help" options={{ headerShown: false }} />
          <Stack.Screen name="src/screens/LudoBoardScreen" options={{ headerShown: false }} />
          <Stack.Screen name="src/screens/LudoBoard" options={{ headerShown: false }} />
          <Stack.Screen name="RoomList" options={{ headerShown: false }} />
          <Stack.Screen name="winner" options={{ headerShown: false }} />
        </Stack>
      </UserProvider>
    </>
  );
}
