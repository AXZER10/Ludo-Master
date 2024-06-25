import { View, Text, SafeAreaView,Switch, StyleSheet, Linking, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { router } from 'expo-router';

const Menu = () => {

  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [isVibrateEnabled, setIsVibrateEnabled] = useState(false);

  const handleLogout = () => {
    // Handle logout logic here
    Alert.alert("Logout", "You have been logged out.");
  };

  const handleQuit = () => {
    // Handle quit logic here
    Alert.alert("Quit", "App will be closed.");
  };

  const handleLinkPress = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };
  return (
    <SafeAreaView className ="justify-center  bg-primary items-center flex-1">
       <ScrollView className="mt-5 mr-32">
      <View className="px-4 mt-5 jsutify-center items-center">
      <Text className=" text-blue-400 text-lg font-psemibold">Menu</Text>
    </View>
    <View className="flex-row justify-space-between items-center  " >
        <Text className=" text-blue-400 text-lg font-psemibold ">Sound</Text>
        <Switch className="ml-20" value={isSoundEnabled} onValueChange={setIsSoundEnabled} />
      </View>
      
      <View className="flex-row justify-space-between items-center  ">
        <Text className=" text-blue-400 text-lg font-psemibold">Music</Text>
        <Switch className="ml-20" value={isMusicEnabled} onValueChange={setIsMusicEnabled} />
      </View>
      
      <View className="flex-row justify-space-between items-center  ">
        <Text className=" text-blue-400 text-lg font-psemibold">Vibrate</Text>
        <Switch className="ml-20" value={isVibrateEnabled} onValueChange={setIsVibrateEnabled} />
      </View>

      <TouchableOpacity  className=" mt-5" onPress={() => router.push('../Menu/About')}>
        <Text className=" text-blue-400 text-lg font-psemibold">About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={() => router.push('../Menu/privacy')}>
        <Text className=" text-blue-400 mt-2 text-lg font-psemibold ">Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={() => router.push('../Menu/Terms')}>
        <Text className="text-blue-400 mt-2 text-lg font-psemibold">Terms and Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('../Menu/Refund')}>
        <Text className=" text-blue-400 mt-2 text-lg font-psemibold">Refund and Cancellation</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={handleLogout}>
        <Text className=" text-blue-400 mt-2 text-lg font-psemibold">Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={handleQuit}>
        <Text className=" text-blue-400 mt-2 text-lg font-psemibold">Quit</Text>
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
   
    
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   subTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   setting: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   link: {
//     marginVertical: 10,
//   },
//   socialMediaContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//   },
// });

export default Menu