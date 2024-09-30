import {
  View,
  Text,
  Switch,
  StyleSheet,
  ImageBackground,
  Linking,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { router } from "expo-router";
import { handleLogout } from "../../FirebaseConfig";
import TopBar from "../../components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";

const Menu = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [isVibrateEnabled, setIsVibrateEnabled] = useState(false);

  const handleLinkPress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };
  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      resizeMode="cover"
      className="h-full w-full"
    >
      <SafeAreaView>
        <TopBar />

        <View className="flex-row items-center m-6 justify-around">
          <View
            style={{ borderRadius: 5 }}
            className=" bg-purple-700 border-white"
          >
            <Text className=" text-white p-2 text-sm font-psemibold">
              Sound {isSoundEnabled ? "On" : "Off"}
            </Text>
          </View>
          <View>
            <Switch
              className="ml-[155px]"
              value={isSoundEnabled}
              onValueChange={setIsSoundEnabled}
            />
          </View>
        </View>
        <View className="flex-row items-center mx-6 justify-around">
          <View
            style={{ borderRadius: 5 }}
            className=" bg-purple-700 border-white"
          >
            <Text className=" text-white p-2 text-sm font-psemibold">
              Music {isMusicEnabled ? "On" : "Off"}
            </Text>
          </View>
          <View>
            <Switch
              className="ml-[155px] "
              value={isMusicEnabled}
              onValueChange={setIsMusicEnabled}
            />
          </View>
        </View>

        <View className="flex-row items-center mx-6 mt-6 justify-around">
          <View
            style={{ borderRadius: 5 }}
            className=" bg-purple-700 border-white"
          >
            <Text className=" text-white p-2 text-sm font-psemibold">
              Vibrate {isVibrateEnabled ? "On" : "Off"}
            </Text>
          </View>
          <View>
            <Switch
              className="ml-[155px] "
              value={isVibrateEnabled}
              onValueChange={setIsVibrateEnabled}
            />
          </View>
        </View>

        <View className="flex-row  mx-6 mt-6 justify-around">
          <TouchableOpacity
            className="flex-row items-center "
            onPress={() => router.push("../Menu/privacy")}
          >
            <View
              style={{ borderRadius: 5 }}
              className=" bg-purple-700 border-white"
            >
              <Text className=" text-white p-2 text-sm font-psemibold">
                Privacy Policy
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => router.push("../Menu/Terms")}
          >
            <View
              style={{ borderRadius: 5 }}
              className=" bg-purple-700 border-white"
            >
              <Text className=" text-white p-2 text-sm font-psemibold">
                Terms and Conditions
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex-row  mx-6 mt-6 justify-around">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => router.push("../Menu/About")}
          >
            <View
              style={{ borderRadius: 5 }}
              className=" bg-purple-700 border-white"
            >
              <Text className=" text-white p-2 text-sm font-psemibold">
                About Us
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => router.push("../Menu/Refund")}
          >
            <View
              style={{ borderRadius: 5 }}
              className=" bg-purple-700 border-white"
            >
              <Text className=" text-white p-2 text-sm font-psemibold">
                Refund and Cancellation
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex-row  mx-6 mt-6 justify-around">
          <TouchableOpacity onPress={handleLogout}>
            <View
              style={{ borderRadius: 5 }}
              className=" bg-purple-700 border-white"
            >
              <Text className=" text-white p-2 text-sm font-psemibold">
                Logout
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("../Menu/Help")}>
            <View
              style={{ borderRadius: 5 }}
              className=" bg-purple-700 border-white"
            >
              <Text className=" text-white p-2 text-sm font-psemibold">
                Help Desk
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("../Menu/Feedback")}>
            {/* <Text className=" text-slate-400 mt-2 text-lg font-psemibold">
            Feedback
          </Text> */}

            <View
              style={{ borderRadius: 5 }}
              className=" bg-purple-700 border-white"
            >
              <Text className=" text-white p-2 text-sm font-psemibold">
                Feedback
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        <View className="flex-row  mx-12 mt-6">
        <View
              style={{ borderRadius: 5 }}
              className=" bg-purple-700 border-white"
            >
              <Text className=" text-white p-2 text-sm font-psemibold">
              Follow Us
              </Text>
            </View>
        </View>

        <View style={{borderRadius:5 ,borderWidth:2,borderColor:'#7e22ce'}} className="flex-row justify-around mx-12 p-3 mt-6 bg-white">
          <TouchableOpacity
            className="ml-2"
            onPress={() => handleLinkPress("https://youtube.com")}
          >
            <Ionicons name="logo-youtube" size={32} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            className="ml-2"
            onPress={() => handleLinkPress("https://instagram.com")}
          >
            <Ionicons name="logo-instagram" size={32} color="#C13584" />
          </TouchableOpacity>
          <TouchableOpacity
            className="ml-2"
            onPress={() => handleLinkPress("https://facebook.com")}
          >
            <Ionicons name="logo-facebook" size={32} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity
            className="ml-2"
            onPress={() => handleLinkPress("https://twitter.com")}
          >
            <Ionicons name="logo-twitter" size={32} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity
            className="ml-2"
            onPress={() => handleLinkPress("https://sharechat.com")}
          >
            <Ionicons name="chatbox-ellipses" size={32} color="#FFCC00" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Menu;
