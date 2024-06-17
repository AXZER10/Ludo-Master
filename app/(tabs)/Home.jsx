import { View, Text, SafeAreaView,Image } from 'react-native'
import React from 'react'
import CustomButton from "../../components/CustomButton";
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full " >
      <View className=" flex-row h-12 w-full mt-8 "  >
            <TouchableOpacity onPress={() => router.push("./Profile")} className="ml-2 h-12 w-12 ">
           
              <Image  className="h-10 w-10 " source={require("../assets/icons/profile.png") } />
              </TouchableOpacity>
              <TouchableOpacity  className="ml-2 h-11 w-11 " >
              <Image  className=" h-10 w-9 " source={require("../assets/Settings-L-icon.png")  } />
              </TouchableOpacity>
              <TouchableOpacity className="ml-2 h-11 w-11 ">
              <Image   className=" h-10 w-10 " source={require("../assets/msg.jpg")  } />
              </TouchableOpacity>
              <View className="ml-5 h-7 w-20 ">
                <Text className="text-blue-400">💎50</Text>
              </View>
              <View className=" ml-5 h-7 w-20 ">
                <Text className="text-blue-400">🪙 5000➕</Text>
              </View>
              </View>
              
        <View className="items-center justify-center min-h-[80vh]">
            <View className="flex-row items-center justify-center my-2 px-4">
                <View className="flex-col w-40 mx-2">
                    <CustomButton 
                    title={'Single Player'} 
                    ContainerStyles={'w-full bg-black'}
                    handlePress={() => router.push("/Ludo")}
                    textStyles={'text-lg font-pbold text-blue-400'}
                    />
                </View>
                <View className="flex-col  w-40 mx-2">
                    <CustomButton 
                    title={'2 Players'} 
                    ContainerStyles={'w-full bg-black'}
                    handlePress={() => router.push("/Ludo")}
                    textStyles={'text-lg font-pbold text-blue-400'}
                    />
                </View>
            </View>
            <View className="flex-row items-center justify-center my-2 px-4">
                <View className="flex-col w-40 mx-2">
                    <CustomButton 
                    title={'3 Players'} 
                    ContainerStyles={'w-full bg-black'}
                    handlePress={() => router.push("/Ludo")}
                    textStyles={'text-lg font-pbold text-blue-400'}
                    />
                </View>
                <View className="flex-col w-40 mx-2">
                    <CustomButton 
                    title={'4 Players'} 
                    ContainerStyles={'w-full bg-black'}
                    handlePress={() => router.push("/Ludo")}
                    textStyles={'text-lg font-pbold text-blue-400'}
                    />
                </View>
            </View>
            <View className="my-2 w-full items-center justify-center flex-row">
            <CustomButton 
                    title={'Online play'} 
                    ContainerStyles={'w-40 bg-black'}
                    handlePress={() => router.push("/Ludo")}
                    textStyles={'text-lg font-pbold text-blue-400'}
                    />
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Home