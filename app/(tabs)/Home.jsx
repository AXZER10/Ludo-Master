import { View, Text, Image, ScrollView, Button, FlatList } from 'react-native'
import React from 'react'
import CustomButton from "../../components/CustomButton";
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';


const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full justify-center px-2" >
      <FlatList 
      ListHeaderComponent={() => (
        <TopBar/>
      )}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <View className="my-2 w-full flex-row">
              <View className="items-start">
                <TouchableOpacity onPress={() => router.push("../Referral")}
                activeOpacity={0.7}>
                  <Text className="text-blue-400 px-3 "> Referral </Text>
                </TouchableOpacity>
              </View>
              <View className="items-end min-w-[78%] px-3">
                <TouchableOpacity onPress={() => router.replace("../Ads")}
                activeOpacity={0.7}>
                  <Text className="text-blue-400"> Ads</Text>
                </TouchableOpacity>
              </View>          
          </View>    
          <View className="flex-row-reverse my-1">
            <TouchableOpacity className="w-10 h-10 items-center justify-center"
            onPress={() => router.push("../(leaderboard)/LeaderBoard")}
            activeOpacity={0.7}>
                  <Image source={require("../assets/icons/leaderboard.png")}
                  resizeMode='contain'
                  className="h-full w-full"
                  />
            </TouchableOpacity>
          </View>      
          <View className="flex-row-reverse my-1">
            <TouchableOpacity className="w-[40px] h-[40px] items-center justify-center"
            onPress={() => router.push("/HowToPlay")}
            activeOpacity={0.7}>
                  <Image source={require("../assets/icons/how.png")}
                  resizeMode='contain'
                  className="h-full w-full"
                  />
            </TouchableOpacity>
          </View>  

          <View className='items-center justify-center'>
            <Image source={require('../assets/Title.png')} 
            className='h-[50px] justify-center'
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
                    handlePress={() => router.replace("/Room")}
                    textStyles={'text-lg font-pbold text-blue-400'}
                    />
                </View>
              </View>
              <View className="flex-row items-center justify-center my-2 px-4">
                <View className="flex-col w-40 mx-2">
                    <CustomButton 
                    title={'3 Players'} 
                    ContainerStyles={'w-full bg-black'}
                    handlePress={() => router.push("/LudoNew")}
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
                handlePress={() => router.replace("/KYCStatus")}
                textStyles={'text-lg font-pbold text-blue-400'}
              />
          </View>
          </>
      )}
      />
    </SafeAreaView>
  )
}

export default Home