
import React from 'react';

import { View, Text, Button, StyleSheet,Image, Alert,Clipboard } from 'react-native';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//import firestore from '@react-native-firebase/firestore';

const PopupScreen = ({ userUid }) => {
    
  return (
  <SafeAreaView className="bg-primary items-center h-full">
    <View className="flex-row-reverse w-full">
     <TouchableOpacity onPress={() => router.replace("../Home")}
    activeOpacity={0.7}>
        <Image className="mt-4 w-10 h-8 mx-4" source={require("../app/assets/cross.png")}/>
      </TouchableOpacity>
    </View>
        <View className="w-full justify-center items-center   h-full" >
        <Image className="w-[400px] h-[800px]"
        resizeMode='contain' source={require("../app/assets/ads2.png")}/>
            </View >
  </SafeAreaView>
    
  )
};

export default PopupScreen;