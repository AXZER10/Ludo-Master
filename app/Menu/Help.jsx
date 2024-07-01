import React from 'react';
import {  View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const HelpDeskScreen = ({ navigation }) => {
  const sendEmail = () => {
    Linking.openURL('mailto:support@example.com?subject=Help%20Desk%20Support&body=Describe%20your%20issue%20here.');
  };

 

  return (
    <SafeAreaView  className="bg-primary flex-1 justify-center items-center ">
        <View className="mb-10 ">
        <Text className="text-blue-400 text-2xl font-psemibold  ">Help Desk</Text>
        </View>
      <View className="w-[350px] h-12 mb-80">
        <TouchableOpacity className="bg-blue-400 px-10 items-center w-full h-12 rounded-md" onPress={sendEmail}>
          <Text className="text-slate-200 text-2xl font-psemibold mt-2">Email </Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HelpDeskScreen;
