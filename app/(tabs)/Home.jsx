import { View, Text, Image, ScrollView, Button } from 'react-native'
import React from 'react'
import CustomButton from "../../components/CustomButton";
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
//import { TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleLogout } from '../../FirebaseConfig';
import SplashScreen from '../Ads';
import ReferralComponent from '../Referral'
import { UserBalances } from '../../FirebaseConfig';

const Home = () => {

  const {bonusBalance, mainBalance} = UserBalances();
    
  return (
    <SafeAreaView className="bg-primary h-full justify-center px-2 position-relative" >
      <ScrollView>
        <View className=" flex-row-reverse items-center px-2 space-x-2">
            <TouchableOpacity
            onPress={() => router.replace("./Menu")}
            activeOpacity={0.7}
            >
              <Image  className=" h-8 w-8 mx-2" source={require("../assets/Settings-L-icon.png")  } 
              resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace("./Profile")}
            activeOpacity={0.7}
            >
              <Image  className="h-8 w-8 mx-2" source={require("../assets/icons/profile.png") } 
              resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.7}
            >
              <Image   className=" h-8 w-8" source={require("../assets/msg.jpg")  } 
              resizeMode='contain'
              />
            </TouchableOpacity>
              <Text className="text-blue-400 font-psemibold text-lg mr-2">Bonus-₹{bonusBalance}</Text>
                <Text className="text-blue-400 font-psemibold text-lg mr-2">Main-₹{mainBalance}</Text>
              </View>

              <View className="my-2  w-full items-center justify-center flex-row">
              <View className="w-full flex-row-reverse">
              <TouchableOpacity onPress={() => router.push("../Referral")}
            activeOpacity={0.7}>
              <Text className="text-blue-400 ml-60 px-4 "> Referral </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.replace("../Ads")}
            activeOpacity={0.7}>
              <Text className="text-blue-400  px-7 "> Ads</Text>
              </TouchableOpacity>
              </View>
               
            
          </View>
           
            <View className="  w-full    justify-center ">
            <TouchableOpacity onPress={() => router.push("../HowToPlay")}
            activeOpacity={0.7}>
              <View className=" h-10 w-full  flex-row-reverse">
              <Text className="text-blue-400 text-2xl  ">❔</Text>
              </View>
              </TouchableOpacity>
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
            <CustomButton 
                title={'kyc verifications'} 
                ContainerStyles={'w-40 bg-black'}
                handlePress={() => router.push("/KYC")}
                textStyles={'text-lg font-pbold text-blue-400'}
              />
          </View>
       </ScrollView>
    </SafeAreaView>
  )
}

export default Home