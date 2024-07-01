import React from 'react';
import {  View, Text, StyleSheet, ScrollView,FlatList } from 'react-native';
import ChatField from '../../components/ChatForm';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center px-10 bg-primary  ">
          
            <View className="items-center justify-center">
            <Text className="text-blue-400 text-2xl  mt-20">Chat </Text>
            </View>
     <ChatField
       placeholder={""}
       value={""}
       autoCapitalize="none"
       
       />
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatContainer: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },

});

export default ChatScreen;
