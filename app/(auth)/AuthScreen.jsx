/*
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
//import auth from '@react-native-firebase/auth';


const AuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const handleSendCode = async () => {
    try {
      const phoneProvider = new auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        // This callback is called if verification is successful
        (verificationId) => {
          setVerificationId(verificationId);
        }
      );
      console.log('Verification code sent to your phone');
    } catch (error) {
      console.error('Error sending verification code:', error.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        confirmCode
      );
      await auth().signInWithCredential(credential);
      console.log('Phone authentication successful!');
      // You can navigate to the next screen or perform any other action upon successful authentication
    } catch (error) {
      console.error('Error verifying code:', error.message);
    }
  };

  return (
    <SafeAreaView className='h-full bg-primary px-2'>
        <View className="flex-1 justify-center items-center px-2">
        <Text className="text-xl text-white font-psemibold mb-2">Enter your phone number:</Text>
        <TextInput
            className="text-white border border-white w-full h-10 px-5 mb-5 rounded-3xl"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
        />
        <CustomButton
            title="Send Code"
            handlePress={handleSendCode}
            ContainerStyles={"w-40 mb-2"}
        />
        <Text className="text-xl text-white font-pbold mb-2">Enter verification code:</Text>
        <TextInput
            className="text-white border border-white w-full h-10 px-5 mb-5 rounded-3xl"
            value={confirmCode}
            onChangeText={setConfirmCode}
            keyboardType="numeric"
        />
        <CustomButton
            title="Verify Code"
            handlePress={handleVerifyCode}
            ContainerStyles={"w-40"}
        />
<View className="my-2">
<CustomButton
            title="Home"
            handlePress={() => router.push("/(tabs)/Home")}
            ContainerStyles={"w-40"}
        />
    
</View>
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default AuthScreen;
*/
//??????????????????????????????????????????????????????????????//
// App.js
/*
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { firebase } from '../../FirebaseConfig'; // Ensure this path is correct
import { router } from 'expo-router';

const AuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const handleSendCode = async () => {
    try {
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved - will proceed with submit
        }
      });

      const confirmation = await firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
      setVerificationId(confirmation.verificationId);
      console.log('Verification code sent to your phone');
    } catch (error) {
      console.error('Error sending verification code:', error.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, confirmCode);
      await firebase.auth().signInWithCredential(credential);
      console.log('Phone authentication successful!');
      // You can navigate to the next screen or perform any other action upon successful authentication
    } catch (error) {
      console.error('Error verifying code:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-1 justify-center items-center px-2">
        <Text className="text-xl text-white font-psemibold mb-2">Enter your phone number:</Text>
        <TextInput
          className="text-white border border-white w-full h-10 px-5 mb-5 rounded-3xl"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <CustomButton
          title="Send Code"
          handlePress={handleSendCode}
          ContainerStyles={"w-40 mb-2"}
        />
        <Text className="text-xl text-white font-pbold mb-2">Enter verification code:</Text>
        <TextInput
          className="text-white border border-white w-full h-10 px-5 mb-5 rounded-3xl"
          value={confirmCode}
          onChangeText={setConfirmCode}
          keyboardType="numeric"
        />
        <CustomButton
          title="Verify Code"
          handlePress={handleVerifyCode}
          ContainerStyles={"w-40"}
        />
        <View className="my-2">
          <CustomButton
            title="Home"
            handlePress={() => router.push("/(tabs)/Home")}
            ContainerStyles={"w-40"}
          />
        </View>
      </View>
      <View id="recaptcha-container" />
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
});

export default AuthScreen;
*/
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { PhoneAuthProvider, signInWithCredential, verifyPhoneNumber, RecaptchaVerifier, setPersistence, browserLocalPersistence, onAuthStateChanged, getReactNativePersistence } from 'firebase/auth';
import { auth } from "../../FirebaseConfig"; // Import from firebase.config.js

const AuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, navigate to the appropriate screen
        console.log('User is signed in!');
      }
    });

    return unsubscribe;
  }, []);

  const handleSendCode = async () => {
    try {
      // Set browserLocalPersistence for session-based verification
      await setPersistence(auth, browserLocalPersistence);

      const recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, 'recaptcha-verify');
      const confirmationResult = await verifyPhoneNumber(phoneNumber, recaptchaVerifier);
      setConfirmationResult(confirmationResult);
    } catch (error) {
      console.error('Error sending verification code:', error.message);
      Alert.alert('Error', 'An error occurred while sending the verification code.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, verificationCode);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;
      console.log('User verified successfully:', user);
      // Handle successful verification and navigate to the desired screen
    } catch (error) {
      console.error('Error verifying code:', error.message);
      Alert.alert('Error', 'Invalid verification code.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <View style={styles.recaptchaContainer} id="recaptcha-container"></View>
      <Button title="Send Verification Code" onPress={handleSendCode} disabled={!phoneNumber} />
      {confirmationResult && (
        <>
          <TextInput
            style={styles.textInput}
            placeholder="Enter verification code"
            keyboardType="numeric"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
          <Button title="Verify Code" onPress={handleVerifyCode} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
  },
  recaptchaContainer: {
    margin: 10,
    width: '100%',
  },
});

export default AuthScreen;
