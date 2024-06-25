import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleLogout } from '../../FirebaseConfig';
import { auth, firebase } from '../../FirebaseConfig';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set current user state
    });
    return () => unsubscribe();
  }, []);

  if (currentUser !== null) 
    Username = currentUser.displayName;
  else
    UserName = "";
  return (
    <SafeAreaView className="h-full justify-center items-center bg-primary">
      <View className="flex-column justify-center space-y-2 items-center">
        <Image className="w-24 h-24 mb-5" source={require("../assets/profile.png")} />
        <Text className="items-center font-psemibold justify-center text-2xl text-blue-400 "> {Username}</Text>
        <Image className="w-14 h-14" source={require("../assets/india.png")} />
        <Text className="items-center font-psemibold justify-center text-2xl text-blue-400"> 🪙2563 </Text>
        <Text className="items-center font-psemibold justify-center text-2xl text-blue-400"> 💎50 </Text>
      </View>
      <View className="items-center justify-center">
        <Button title="Logout" onPress={() => handleLogout(setCurrentUser)} color="#e74c3c" />
      </View>
    </SafeAreaView>
  );
}

export default Profile;
