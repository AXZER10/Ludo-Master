
import React from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PopupScreen = ({  }) => {
  

  return (
    <SafeAreaView className=" w-full h-full  jsutify-center items-center flex-row-reverse bg-blue-400">
    <TouchableOpacity onPress={() => router.push("../Home")}
    activeOpacity={0.7}>
        <Image className="w-8  h-8 mr-5 mt-10  " source={require("../app/assets/cross.png")}/>
        <View className="h-full w-full justify-center items-center  " >
            
            
        </View >
      
    </TouchableOpacity>
   
    </SafeAreaView>
  )
};

export default PopupScreen;