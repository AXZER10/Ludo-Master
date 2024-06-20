import { View, Text, Image, ScrollView, Button } from 'react-native'
import React from 'react'
import CustomButton from "../../components/CustomButton";
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
//import { TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from '../Ads';
const Home = () => {

    

    
  return (
    <SafeAreaView className="bg-primary h-full justify-center px-2" >
       <ScrollView>
      
      
       <View className="my-2 w-full items-center justify-center flex-row">
            <TouchableOpacity onPress={() => router.push("../Referral")}
            activeOpacity={0.7}>
                <Text> Referral Code</Text>
            </TouchableOpacity>
            </View>
         
      <View className=" flex-row-reverse items-center px-2 space-x-2">
            <TouchableOpacity onPress={() => router.push("./Profile")}
            activeOpacity={0.7}
            >
              <Image  className="h-8 w-8 mx-2" source={require("../assets/icons/profile.png") } 
              resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => router.push("./Menu")}
            activeOpacity={0.7}
            >
              <Image  className=" h-8 w-8 mr-2" source={require("../assets/Settings-L-icon.png")  } 
              resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.7}
            >
              <Image   className=" h-8 w-8 mr-2" source={require("../assets/msg.jpg")  } 
              resizeMode='contain'
              />
            </TouchableOpacity>
              <Text className="text-blue-400 font-pbold text-lg mr-2">💎50</Text>
                <Text className="text-blue-400 font-pbold text-lg mr-2">🪙 5000➕</Text>
              </View>
        <View className='items-center m-5 justify-center'>
            <Image source={require('../assets/Title.png')} 
            className='h-[50px] mt-2 justify-center'
            resizeMode="contain"
            />
            <Image source={require('../assets/Logo.jpeg')} 
            className=' grow justify-center mt-2'
            resizeMode="contain"
            />
        </View>
        <View className="items-center justify-center min-h-[30vh]">
            <View className="flex-row items-center justify-center my-2">
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
        <View className="my-2 w-full items-center justify-center flex-row">
            <TouchableOpacity onPress={() => router.push("../Ads")}
            activeOpacity={0.7}>
                <Text> Ads</Text>
            </TouchableOpacity>
            </View>
            <View className="items-center justify-center">
                <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
            </View>
           
       
        <View className="my-2 w-full items-center justify-center flex-row">
            <TouchableOpacity onPress={() => router.push("../Ads")}
            activeOpacity={0.7}>
                <Text> Ads</Text>
            </TouchableOpacity>
            </View>
         </View>
       
       
          
       </ScrollView>
    </SafeAreaView>
  )
}
  
  
export default Home