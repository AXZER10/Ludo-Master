import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from "../../components/CustomButton";
import { router } from 'expo-router';

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
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