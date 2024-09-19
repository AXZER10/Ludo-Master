import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect,useState,useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserBalances } from '../FirebaseConfig';
import { router } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { UserContext } from '../app/UserContext';
import firestore from '@react-native-firebase/firestore';

export const TopBar = () => {
  const {bonusBalance, mainBalance, totalBalance, refetch} = UserBalances();
  const [Username, setUserName] = useState("")
  const user = auth().currentUser;
  const myContext = useContext(UserContext);
  console.log('myContext   ',myContext.userDetails)
  console.log('myContext name   ',myContext.userDetails.name)
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
      <Text className="text-white font-psemibold text- mr-2">Welcome {myContext.userDetails.name}</Text>
      
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