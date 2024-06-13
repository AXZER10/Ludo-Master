import { View, Text ,Image } from 'react-native'
import React from 'react'
import { Tabs,Redirect } from 'expo-router'
import iconSet from '@expo/vector-icons/build/Fontisto'
//import {icons} from '../../constants';

const TabIcon = ({icon,color,name,focused}) => {
    return (
        <View className="items-center justify-center gap-2">
          <Text className= {`${focused ? 'font-psemibold' : 'font-pregular'}text-xs`}
          style={{color:color}}
          >
          {name}
          </Text>

        </View>
    )
}

const TabsLayout = () => {
  return (
   <Tabs
   screenOptions={{tabBarShowLabel:false,
    tabBarActiveTintColor:'green',
    tabBarInactiveTintColor:'#CDCDE0',
    tabBarStyle:{
      backgroundColor:'#161622',
      borderTopWidth:1,
      borderTopColor:'#232533',
      height:100,
    }
   }}>
    <Tabs.Screen
          name="Menu"
          options={{
            title: "Menu",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                //icon={icons.bookmark}
                color={color}
                name="Menu"
                focused={focused}
              />
            ),
          }}
        />
   <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                //icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                //icon={icons.bookmark}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
   </Tabs>
  )
}

export default TabsLayout