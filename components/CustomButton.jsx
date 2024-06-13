// CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, handlePress,ContainerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.6}
      className={` bg-green-300 rounded-[60px] min-h-[62px] justify-center items-center ${ContainerStyles} ${isLoading ? 'opacity-50' : ''}`} 
      disabled={isLoading} 
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`} >{title}</Text>
    </TouchableOpacity>
  );
};


export default CustomButton;
