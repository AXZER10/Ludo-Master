import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserBalances } from "../FirebaseConfig";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import { UserContext } from "../app/UserContext";
import firestore from "@react-native-firebase/firestore";

export const TopBar = () => {
  const { bonusBalance, mainBalance, totalBalance, refetch } = UserBalances();
  const [Username, setUserName] = useState("");
  const user = auth().currentUser;
  const myContext = useContext(UserContext);
  console.log("myContext   ", myContext.userDetails);
  console.log("myContext name   ", myContext.userDetails.name);
  useEffect(() => {
    if (user) {
      setUserName(user.displayName);
    } else {
      setUserName("Guest");
    }
    refetch();
  }, [user]);

  return (
    <View style={{borderRadius:10}} className=" flex-row items-center justify-around bg-purple-700 h-12 px-2 space-x-2 mx-5">
      <Text className="text-white font-psemibold text- mr-2">
        Welcome {myContext.userDetails.name}
      </Text>

      <TouchableOpacity
        onPress={() => router.replace("./wallet")}
        activeOpacity={0.7}
      >
        {/* <Image
          className="h-8 w-8 mx-56"
          source={require("../app/assets/icons/home.png")}
          resizeMode="contain"
        /> */}
              <Text className="text-white font-psemibold text- mr-2">
        wallet amount {myContext.userDetails.wallet}
      </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
