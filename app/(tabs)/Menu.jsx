import { View, Text, SafeAreaView,Switch, StyleSheet, Linking, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { handleLogout } from '../../FirebaseConfig';

const Menu = () => {

  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [isVibrateEnabled, setIsVibrateEnabled] = useState(false);


  const handleQuit = () => {
    // Handle quit logic here
    Alert.alert("Quit", "App will be closed.");
  };

  const handleLinkPress = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };
  return (
    <SafeAreaView className ="justify-center  bg-primary items-center h-full w-full">
      <ScrollView className="mt-5 w-full h-full px-4">
        <View className="px-4 jsutify-center items-center">
          <Text className=" text-blue-400 text-2xl font-psemibold">Menu</Text>
        </View>
        <View className="flex-row items-center py-2 space-x-6">
          <View className="justify-space-between items-centerborder border-white" >
            <Text className=" text-slate-400 text-lg font-psemibold">Sound</Text>
          </View>
          <View className="pl-20">
            <Switch className="ml-[155px] " value={isSoundEnabled} onValueChange={setIsSoundEnabled} />
          </View>
        </View>
        <View className="flex-row items-center py-2space-x-6">
          <View className="justify-space-between items-centerborder border-white" >
            <Text className=" text-slate-400 text-lg font-psemibold">Music</Text>
          </View>
          <View className="pl-20">
            <Switch className="ml-[155px] " value={isSoundEnabled} onValueChange={setIsSoundEnabled} />
          </View>
        </View>
        <View className="flex-row items-center py-2 space-x-6">
          <View className="justify-space-between items-center" >
            <Text className=" text-slate-400 text-lg font-psemibold">Vibrate</Text>
          </View>
          <View className=" pl-20">
            <Switch className="ml-[155px] " value={isSoundEnabled} onValueChange={setIsSoundEnabled} />
          </View>
        </View>
        

        <TouchableOpacity  className=" mt-5" onPress={() => router.push('../Menu/About')}>
          <Text className=" text-slate-400 text-lg font-psemibold">About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => router.push('../Menu/privacy')}>
          <Text className=" text-slate-400 mt-2 text-lg font-psemibold ">Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => router.push('../Menu/Terms')}>
          <Text className="text-slate-400 mt-2 text-lg font-psemibold">Terms and Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('../Menu/Refund')}>
          <Text className=" text-slate-400 mt-2 text-lg font-psemibold">Refund and Cancellation</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={handleLogout}>
          <Text className=" text-slate-400 mt-2 text-lg font-psemibold">Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={handleQuit}>
          <Text className=" text-slate-400 mt-2 text-lg font-psemibold">Quit</Text>
        </TouchableOpacity>

        <Text className="text-3xl font-pbold mt-8 mb-5 text-blue-400">Follow Us</Text>

        <View className="flex-row justify-space-around">
          <TouchableOpacity className="ml-2" onPress={() => handleLinkPress('https://youtube.com')}>
            <Ionicons  name="logo-youtube" size={32} color="red" />
          </TouchableOpacity>
          <TouchableOpacity className="ml-2" onPress={() => handleLinkPress('https://instagram.com')}>
            <Ionicons name="logo-instagram" size={32} color="#C13584" />
          </TouchableOpacity>
          <TouchableOpacity className="ml-2" onPress={() => handleLinkPress('https://facebook.com')}>
            <Ionicons name="logo-facebook" size={32} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity className="ml-2" onPress={() => handleLinkPress('https://twitter.com')}>
            <Ionicons name="logo-twitter" size={32} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity className="ml-2" onPress={() => handleLinkPress('https://sharechat.com')}>
            <Ionicons name="chatbox-ellipses" size={32} color="#FFCC00" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu