import { View, Text, SafeAreaView ,Image } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <SafeAreaView className=" mt-40 justify-center items-center">
    <View className="flex-column justify-center items-center">
      <Image className="w-24 h-24 mb-5"source={require("../assets/profile.png")}/> 
      <Text className="items-center justify-center text-2xl  "> UserName </Text>
      <Image  className="w-14 h-14  " source={require("../assets/india.png")}/>
      <Text className="items-center justify-center text-2xl"> 🪙2563 </Text>
      <Text className="items-center justify-center text-2xl"> 💎50 </Text>
     
    </View>
    </SafeAreaView>
  )
}

export default Profile