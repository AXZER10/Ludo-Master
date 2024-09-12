import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const WalletScreen = () => {
  const [totalBalance] = useState(13.5);
  const [winnings] = useState(13.5);
  const [rushRewards] = useState(0);
  const router= useRouter();

  return (
    <SafeAreaView className="h-full w-full justify-center items-center ">
      <ImageBackground source={require("../assets/bg.png")}
                  resizeMode='cover'
                  className="h-full w-full "
                  >
      <View className="flex-row justify-between ml-15">
        <Text className="text-white font-psemibold text-xl">
          Wallet
        </Text>
        <TouchableOpacity className="px-8 ml-32" >
          <Image className="w-10 h-10"
            source={require("../assets/headphone.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity className=" mr-8">
          <Image className="w-10 h-10"
            source={require("../assets/Settings-L-icon.png")}
          />
        </TouchableOpacity>
      </View>

      <View className="px-2 items-center mr-40">
        <Text className="text-white font-psemibold text-xl">
          Total Balance
        </Text>
        <Text className="text-white font-psemibold text-xl">
          ₹{totalBalance}
         </Text>
          </View>

      <View className="flex-row justify-between p-8">
        <TouchableOpacity className="flex-1 bg-black rounded-3xl p-2"
        onPress={ () => router.push('deposit')}
        >
          <Text className="text-white text-center font-psemibold text-xl">
            Deposit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-black rounded-3xl p-2"
        onPress={() => router.push('transaction')}>
          <Text className="text-white text-center font-psemibold text-xl">
            Transactions
          </Text>
        </TouchableOpacity>
      </View>

      <View  className="px-2">
        <Text className="text-white font-psemibold text-lg">
          Winnings
        </Text>
        <Text className="text-white font-psemibold text-xl">
          ₹{winnings}
        </Text>
      </View>

      <View className="flex-row justify-between mt-8">
        <TouchableOpacity className="flex-1 bg-black rounded-3xl p-3"
        onPress={() => router.push('withdraw')}>
          <Text className="text-white text-center font-psemibold text-xl">
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>

      <View className=" p-2 items-center">
        <Text className="text-white text-sm">100% Money Safety</Text>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WalletScreen;
