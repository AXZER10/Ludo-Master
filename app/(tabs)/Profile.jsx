import React from 'react';
import { View, Text, Image, Button, FlatList, RefreshControl, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {  UserBalances } from '../../FirebaseConfig';
import { useState, useEffect } from 'react';
import icons from '../../constants/icons';
import CustomButton from "../../components/CustomButton";
import auth from '@react-native-firebase/auth';

const Profile = () => {

  const {bonusBalance, mainBalance, winBalance, totalBalance, refetch} = UserBalances();
  const [currentUser, setCurrentUser] = useState(null);
  const user = auth().currentUser;
  
  const [Username, setUserName] = useState("")

  const handleLogout = () => {
    auth()
    .signOut()
    .then(() => {
      router.replace("/Login")
      console.log('User signed out!')
    });
  }

  useEffect(() => {
    if (user) {
      setUserName(user.displayName);
    }
    else{
      setUserName("Guest")
    }
  }, [user]);
  
  const[refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();    
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="h-full w-full justify-center items-center ">
      <ImageBackground source={require("../assets/bg.png")}
                  resizeMode='cover'
                  className="h-full w-full "
                  >
      <FlatList 
        ListHeaderComponent={() => (
          <>
          <View className="w-full items-end">
          <TouchableOpacity className="items-end"
            onPress={handleLogout}
            >
              <Image source={icons.logout}
              resizeMode='contain'
              className="w-6 h-6"/>
            </TouchableOpacity>
          </View>
            <View className="flex-column justify-center space-y-2 items-center">
        <Image className="w-24 h-24 mb-5" source={require("../assets/profile.png")} 
        resizeMode='contain'
        />
        <View className="flex-row">
          <Text className="items-center font-psemibold justify-center text-2xl text-blue-400 mx-2"> {Username}</Text>
          <Image className="w-[50] h-[30]" source={require("../assets/india.png")} />
        </View>
        <Text className="items-center font-psemibold justify-center text-2xl text-blue-400">Main Balance: {mainBalance} </Text>
        <Text className="items-center font-psemibold justify-center text-2xl text-blue-400"> Bonus Balance: {bonusBalance} </Text>
        <Text className="items-center font-psemibold justify-center text-2xl text-blue-400"> Total Available Balance: {totalBalance} </Text>
        <Text className="items-center font-psemibold justify-center text-2xl text-blue-400"> Total Winnings: {winBalance} </Text>
      </View>
      <View className="flex-row items-center justify-center my-2">
      <View className=" w-40 mx-2">
            <CustomButton 
                title={' Update Kyc'} 
                ContainerStyles={'w-40 bg-black'}
                handlePress={() => router.replace("/KYCStatus")}
                textStyles={'text-lg font-pbold text-white'}
              />
              </View>
              </View>
          </>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
        tintColor="lightblue"
        />}
      />
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Profile;
