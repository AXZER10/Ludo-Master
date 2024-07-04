import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, ReferralCode } from '../FirebaseConfig';
import CustomButton from '../components/CustomButton';
import * as Clipboard from 'expo-clipboard';

const ReferralComponent = () => {
  const { Code, refetch } = ReferralCode();
  const [myReferralCode, setMyReferralCode] = useState('');
  const [inputReferralCode, setInputReferralCode] = useState('');

  useEffect(() => {
    setMyReferralCode(Code);
  }, [Code]);

  const user = auth.currentUser;

  const copyReferralCode = () => {
    Clipboard.setStringAsync(myReferralCode);
    Alert.alert('Referral Code Copied', 'Your referral code has been copied to clipboard.');
  };

  const redeemReferralCode = () => {
    if (inputReferralCode.trim() === '') {
      Alert.alert('Invalid Input', 'Please enter a valid referral code.');
      return;
    }
    Alert.alert('Referral Code Redeemed', `Referral code '${inputReferralCode}' has been redeemed successfully.`);
    setInputReferralCode('');
  };

  return (
    <SafeAreaView className="flex-1 h-full items-center bg-primary">
      <View className="items-center mt-20 justify-center ">
        <Text className="text-3xl justify-center items-center text-blue-400 mb-4 font-pbold">Referral Code</Text>
      </View>
      <View className="mt-10 justify-center">
        {/* User's referral code */}
        <View className="mb-10">
          <Text className="items-center font-psemibold justify-center text-xl text-blue-400 my-2">Your Referral Code:</Text>
          <TextInput
            className="h-12 border-slate-700 rounded-[60px] text-white w-full border-2 px-8 mb-4 font-psemibold"
            value={myReferralCode}
            editable={false}
          />
          <CustomButton
            title="Copy Code"
            ContainerStyles="w-full text-blue-400"
            onPress={copyReferralCode}
            textStyles="text-xl font-pbold"
          />
        </View>
        {/* Redeem Referral Code */}
        <View className='items-center'>
          <Text className="items-center font-psemibold justify-center text-xl text-blue-400 my-2">Enter Referral Code to Redeem:</Text>
          <TextInput
            className="h-12 border-slate-700 text-white font-psemibold text-s rounded-[60px] w-full border-2 px-8 mb-4"
            value={inputReferralCode}
            onChangeText={setInputReferralCode}
            placeholder="Enter referral code"
            placeholderTextColor={'white'}
          />
          <CustomButton
            title="Redeem Code"
            ContainerStyles="w-full text-blue-400"
            textStyles="text-xl font-pbold"
            onPress={redeemReferralCode}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReferralComponent;
