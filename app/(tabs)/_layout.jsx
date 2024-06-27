import { View, Text ,Image } from 'react-native'
import React from 'react'
import { Tabs} from 'expo-router'
import {icons} from '../../constants';

const TabIcon = ({icon,color,name,focused}) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image
            source={icon}
            resizeMode='contain'
            tintColor={color}
            className="w-6 h-6"
            />
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
    tabBarActiveTintColor:'#03adfc',
    tabBarInactiveTintColor:'#CDCDE0',
    tabBarStyle:{
      backgroundColor:'#161632',
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
                icon={icons.menu}
                color={color}
                name="Menu"
                focused={focused}              
                />
            ),
          }}
        />
         <Tabs.Screen
          name="friend"
          options={{
            title: "Friends",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.friends}
                color={color}
                name="friends"
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
                icon={icons.home}
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
                icon={icons.profile}
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