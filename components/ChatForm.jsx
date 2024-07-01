
import { View, Text,TextInput, Image } from 'react-native'
import React, { useState } from 'react'

import { TouchableOpacity } from 'react-native'

const ChatField = ({title,value,placeholder,handleChangeText,otherStyles,...props}) => {
  const[showPass,setShowPass]=useState(false)
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium '>{title}</Text>
      <View className='border-2 border-black-200 w-full h-[700px] px-4 mt-10 mb-10 bg-slate-200
      focus:border-blue-400 flex-row items-center'>
        
        <TextInput
            className='flex-1 text-white font-psemibold text-base'
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            autoCapitalize='none'
            
        />
       
       
      </View>
    </View>
  )
}

export default ChatField