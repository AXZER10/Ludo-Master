import { View, Text ,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native'
import { handleLogout } from '../../FirebaseConfig'

const Profile = () => {
  return (
    <SafeAreaView className="  h-full justify-center items-center bg-primary">
    <View className="flex-column justify-center space-y-2 items-center">
      <Image className="w-24 h-24 mb-5"source={require("../assets/profile.png")}/> 
      <Text className="items-center  font-psemibold justify-center text-2xl text-blue-400 "> UserName </Text>
      <Image  className="w-14 h-14  " source={require("../assets/india.png")}/>
      <Text className="items-center font-psemibold justify-center text-2xl text-blue-400"> 🪙2563 </Text>
      <Text className="items-center font-psemibold justify-center text-2xl text-blue-400"> 💎50 </Text>
    </View>
    <View className="items-center justify-center">
                <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
            </View>
    </SafeAreaView>
  )
}

export default Profile