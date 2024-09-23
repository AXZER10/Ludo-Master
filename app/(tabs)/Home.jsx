import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Button,
  FlatList,
} from "react-native";
import React, { useContext } from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/TopBar";
import { UserContext } from "../UserContext";

const Home = () => {
  const myContext = useContext(UserContext);
  console.log("myContext   ", myContext);
  return (
    <SafeAreaView className="h-full w-full justify-center items-center">
      <ImageBackground
        source={require("../assets/bg.png")}
        resizeMode="cover"
        className="h-full w-full "
      >
        <TopBar />

        <View className="flex-col items-center justify-center my-2">
          <View className="flex-row items-center justify-center my-10">
            <View className="flex-1 items-center">
              <CustomButton
                title={"Leader Board"}
                ContainerStyles={"w-44 h-8 bg-fuchsia-900"}
                handlePress={() => router.push("../(leaderboard)/LeaderBoard")}
                textStyles={"text-sm font-pbold text-white"}
              />
            </View>
            <View className="flex-1 items-center">
              <CustomButton
                title={"Help"}
                ContainerStyles={"w-44 h-8 bg-fuchsia-900"}
                handlePress={() => router.push("/HowToPlay")}
                textStyles={"text-sm font-pbold text-white"}
              />
            </View>
          </View>
        </View>

        <View className="h-60 items-center justify-center">
          <Image
            source={require("../assets/logo.png")}
            className=" flex-1 justify-center w-full h-40"
            resizeMode="contain"
          />
        </View>
        <View className="items-center justify-center min-h-[30vh]">
          <View className="flex-row items-center justify-center my-2">
            <View className="flex-col  w-40 mx-2">
              <CustomButton
                title={"Play Offline"}
                ContainerStyles={"w-full bg-fuchsia-900"}
                handlePress={() => router.push("/Ludo2PlayerOffline")}
                textStyles={"text-lg font-pbold text-white"}
              />
            </View>

            <View className="flex-col w-40 mx-2">
              <CustomButton
                title={"Online play"}
                ContainerStyles={"w-40 bg-fuchsia-900"}
                handlePress={() => router.replace("/Room")}
                textStyles={"text-lg font-pbold text-white"}
              />
            </View>
          </View>
          <View className="flex-col w-40 mx-2">
              <CustomButton
                title={"Room List"}
                ContainerStyles={"w-40 bg-fuchsia-900"}
                handlePress={() => router.push("/RoomList")}
                textStyles={"text-lg font-pbold text-white"}
              />
            </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
