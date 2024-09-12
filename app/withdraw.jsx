import React, { useState } from 'react';
import {View,Text, TextInput, Button, Alert,ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Withdraw = () => {
  const [balance, setBalance] = useState(1000); 
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [minLimit, setMinLimit] = useState(50); 
  const [maxLimit, setMaxLimit] = useState(500); 

  const handleWithdraw = () => {
    const amount = (withdrawAmount);

   
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    
    if (amount < minLimit) {
      Alert.alert('Minimum Limit Exceeded', `You must withdraw at least ₹${minLimit}.`);
      return;
    }

   
    if (amount > maxLimit) {
      Alert.alert('Maximum Limit Exceeded', `You can only withdraw up to ₹${maxLimit}.`);
      return;
    }

 
    if (amount > balance) {
      Alert.alert('Insufficient Balance', 'You do not have enough balance.');
      return;
    }

    
    setBalance(balance - amount);
    setWithdrawAmount('');
    Alert.alert('Success', `You have withdrawn ₹${amount}.`);
  };

  return (
    <SafeAreaView className="h-full w-full justify-center items-center">
       <ImageBackground source={require("./assets/bg.png")}
                  resizeMode='cover'
                  className="h-full w-full "
                  >
      <Text className="text-2xl font-psemibold mb-6 text-center" >Withdraw Money</Text>
      <Text className="text-xl mb-4 text-center">Available Balance: ₹{balance}</Text>

      <TextInput
        className="h-12 border-black border-2 rounded-full px-5 text-xl mb-3 w-4/5"
        placeholder="Enter amount to withdraw"
        keyboardType="numeric"
        value={withdrawAmount}
        onChangeText={setWithdrawAmount}
      />

      <Text className="text-base text-white mb-2 text-center" >
        Minimum Withdraw: ₹{minLimit} | Maximum Withdraw: ₹{maxLimit}
      </Text>

      <Button  title="Withdraw" onPress={handleWithdraw} />

      <Text className="mt-5 text-center text-white" >
        Note: You can only withdraw between ₹{minLimit} and ₹{maxLimit} at a time.
      </Text>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Withdraw;