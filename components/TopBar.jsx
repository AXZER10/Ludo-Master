import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect,useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserBalances } from '../FirebaseConfig';
import { router } from 'expo-router';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const TopBar = () => {
  const {bonusBalance, mainBalance, totalBalance, refetch} = UserBalances();
  const [Username, setUserName] = useState("")
  const user = auth().currentUser;
  useEffect(() => {
    if (user) {
      setUserName(user.displayName);
    }
    else{
      setUserName("Guest")
    }
    refetch();
  }, [user]);
  
  return (
    <View className=" flex-row items-center bg-purple-700 h-12 px-2 space-x-2">
      <Text className="text-white font-psemibold text- mr-2">Welcome Nikki</Text>
      
      <TouchableOpacity onPress={() => router.replace("./wallet")}
            activeOpacity={0.7}
            >
              <Image  className="h-8 w-8 mx-56" source={require("../app/assets/icons/home.png") } 
              resizeMode='contain'
              />
             
            </TouchableOpacity>
            <Text className="text-white font-psemibold">₹{100}</Text>
            {/* <TouchableOpacity
            onPress={() => router.replace("./Menu")}
            activeOpacity={0.7}
            >
              <Image  className=" h-8 w-8 mx-2" source={require("../app/assets/Settings-L-icon.png")  } 
              resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace("./Profile")}
            activeOpacity={0.7}
            >
              <Image  className="h-8 w-8 mx-2" source={require("../app/assets/icons/profile.png") } 
              resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.7}
            >
              <Image   className=" h-8 w-8" source={require("../app/assets/msg.jpg")  } 
              resizeMode='contain'
              />
            </TouchableOpacity> */}
              {/* <Text className="text-blue-400 font-psemibold text-s mr-2">Bonus-{bonusBalance}</Text> */}
              {/* <Text className="text-blue-400 font-psemibold text- mr-2">Main-{mainBalance}</Text> */}
              {/* <Text className="text-blue-400 font-psemibold text- mr-2">Balance-{totalBalance}</Text> */}
              </View>
  )
}

export default TopBar