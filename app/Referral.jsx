import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Clipboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

const ReferralComponent = () => {
  const [myReferralCode, setMyReferralCode] = useState('');
  const [inputReferralCode, setInputReferralCode] = useState('');

  const generateReferralCode = () => {
    // For simplicity, generating a random code here
    const code = Math.random().toString(36).substring(7).toUpperCase();
    setMyReferralCode(code);
  };

  const copyReferralCode = () => {
    Clipboard.setString(myReferralCode);
    Alert.alert('Referral Code Copied', 'Your referral code has been copied to clipboard.');
  };

  const redeemReferralCode = () => {
    if (inputReferralCode.trim() === '') {
      Alert.alert('Invalid Input', 'Please enter a valid referral code.');
      return;
    }
    // Here you can implement logic to validate and redeem the referral code
    Alert.alert('Referral Code Redeemed', `Referral code '${inputReferralCode}' has been redeemed successfully.`);
    setInputReferralCode('');
  };

  return (
    <SafeAreaView  className=" flex-1 h-full  items-center bg-primary">
      <View className="items-center mt-20 justify-center ">
      <Text className="text-3xl justify-center items-center text-blue-400 mb-4">Referral Code</Text>
      </View>
    <View className="  mt-10 justify-center  ">

      {/* Display user's referral code */}
      <View className="mb-10">
        <Text className="items-center  font-psemibold justify-center text-2xl text-blue-400 ">Your Referral Code:</Text>
        <TextInput
           className="h-12 border-slate-700 rounded-[60px] text-white-500  w-full border-2 px-8 mb-4"
          value={myReferralCode}
          editable={false}
        />
        
        {/* <Button title="Copy Code" onPress={copyReferralCode} /> */}
        <CustomButton
         title={'Copy Code'} 
         ContainerStyles={'w-full text-blue-400'}
         onPress={copyReferralCode}
         textStyles={'text-xl font-pbold '}
        />
      </View>

      {/* Input to redeem another person's referral code */}
      <View >
        <Text className="items-center font-psemibold justify-center text-xl text-blue-400 ">Enter Referral Code to Redeem:</Text>
        <TextInput 
         className="h-12 border-slate-700  text-white-100 font-psemibold text-base rounded-[60px] w-full border-2 px-8 mb-4"
          value={inputReferralCode}
          onChangeText={setInputReferralCode}
          placeholder="Enter referral code"
        />
        <CustomButton title="Redeem Code" 
         ContainerStyles={'w-full text-blue-400'}
         textStyles={'text-xl font-pbold '}
        onPress={redeemReferralCode} 
        />
      </View>
    </View>
    </SafeAreaView>

  );
};



export default ReferralComponent;


