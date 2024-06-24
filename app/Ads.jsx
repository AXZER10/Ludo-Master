
import React from 'react';

import { View, Text, Button, StyleSheet,Image, Alert,Clipboard } from 'react-native';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//import firestore from '@react-native-firebase/firestore';

const PopupScreen = ({ userUid }) => {
    
  return (
    <SafeAreaView className=" w-full h-full  jsutify-center items-center flex-1 bg-blue-400">
    <TouchableOpacity onPress={() => router.push("../Home")}
    activeOpacity={0.7}>
        <View className=" ml-80 w-full  w-flex-row-reverse">
        <Image className="w-8  h-8 mr-5 mt-10  " source={require("../app/assets/cross.png")}/>
        </View>
       
        <View className=" justify-center items-center mt -10 " >
        <Image className="w-full  h-80 mt-10 "  source={require("../app/assets/ads.jpg")}/>
            </View >
            
      
    </TouchableOpacity>
   
    </SafeAreaView>
  )
};

export default PopupScreen;