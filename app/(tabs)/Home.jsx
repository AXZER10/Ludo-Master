import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from "../../components/CustomButton";
import { router } from 'expo-router';

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <View className="items-center justify-center min-h-[80vh]">
            <View className="flex-row border-2 items-center justify-center my-2 px-4">
                <View className="flex-col border-2 w-40 mx-2">
                    <CustomButton 
                    title={'Play'} 
                    ContainerStyles={'w-full bg-black'}
                    handlePress={() => router.push("/Ludo")}
                    textStyles={'text-3xl font-pbold text-green-600'}
                    />
                </View>
                <View className="flex-col border-2 w-40 mx-2">
                    <CustomButton 
                    title={'Play'} 
                    ContainerStyles={'w-full bg-black'}
                    handlePress={() => router.push("/Ludo")}
                    textStyles={'text-3xl font-pbold text-green-600'}
                    />
                </View>
            </View>
            <View className="flex-row border-2 items-center justify-center my-2 px-4">
                <View className="flex-col border-2 w-40 mx-2">
                    <CustomButton 
                    title={'Play'} 
                    ContainerStyles={'w-full bg-black'}
                    handlePress={() => router.push("/Ludo")}
                    textStyles={'text-3xl font-pbold text-green-600'}
                    />
                </View>
                <View className="flex-col border-2 w-40 mx-2">
                    <CustomButton 
                    title={'Play'} 
                    ContainerStyles={'w-full bg-black'}
                    handlePress={() => router.push("/Ludo")}
                    textStyles={'text-3xl font-pbold text-green-600'}
                    />
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Home