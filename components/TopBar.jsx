import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { UserBalances } from '../FirebaseConfig';
import { router } from 'expo-router';

export const TopBar = () => {
  const {bonusBalance, mainBalance} = UserBalances();
  return (
    <View className=" flex-row-reverse items-center px-2 space-x-2">
            <TouchableOpacity
            onPress={() => router.replace("./Menu")}
            activeOpacity={0.7}
            >
              <Image  className=" h-8 w-8 mx-2" source={require("../app/assets/Settings-L-icon.png")  } 
              resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace("./Profile")}
            activeOpacity={0.7}
            >
              <Image  className="h-8 w-8 mx-2" source={require("../app/assets/icons/profile.png") } 
              resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.7}
            >
              <Image   className=" h-8 w-8" source={require("../app/assets/msg.jpg")  } 
              resizeMode='contain'
              />
            </TouchableOpacity>
              <Text className="text-blue-400 font-psemibold text-lg mr-2">Bonus-₹{bonusBalance}</Text>
                <Text className="text-blue-400 font-psemibold text-lg mr-2">Main-₹{mainBalance}</Text>
              </View>
  )
}

export default TopBar