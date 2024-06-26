import React from 'react';
import { View, Text, Image, Button, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleLogout } from '../../FirebaseConfig';
import { auth, firebase } from '../../FirebaseConfig';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { UserBalances } from '../../FirebaseConfig';

const Profile = () => {

  const {bonusBalance, mainBalance, refetch} = UserBalances();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set current user state
    });
    return () => unsubscribe();
  }, []);
  
  const [Username, setUserName] = useState("")
  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.displayName);
    }
  }, [currentUser]);
  
  const[refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();    
    setRefreshing(false);
  }
  return (
    <SafeAreaView className="h-full justify-center items-center bg-primary">
      <FlatList 
        ListHeaderComponent={() => (
          <>
            <View className="flex-column justify-center space-y-2 items-center">
        <Image className="w-24 h-24 mb-5" source={require("../assets/profile.png")} />
        <Text className="items-center font-psemibold justify-center text-2xl text-blue-400 "> {Username}</Text>
        <Image className="w-14 h-14" source={require("../assets/india.png")} />
        <Text className="items-center font-psemibold justify-center text-2xl text-blue-400">Main Balance: ₹{mainBalance} </Text>
        <Text className="items-center font-psemibold justify-center text-2xl text-blue-400"> Bonus Balance: ₹{bonusBalance} </Text>
      </View>
      <View className="items-center justify-center">
        <Button title="Logout" onPress={() => handleLogout(setCurrentUser)} color="#e74c3c" />
      </View>
          </>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
        tintColor="lightblue"
        />}
      />
      
    </SafeAreaView>
  );
}

export default Profile;
