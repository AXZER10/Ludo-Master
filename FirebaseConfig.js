/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import * as autho from'firebase/auth';
import { View } from "react-native-animatable";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-Wo-ZTOF2AEJ0RK__zXs6MFMVM-1wqqU",
  authDomain: "ludomaster-4cb3b.firebaseapp.com",
  projectId: "ludomaster-4cb3b",
  storageBucket: "ludomaster-4cb3b.appspot.com",
  messagingSenderId: "806020108210",
  appId: "1:806020108210:web:fe70d01092d9b41a3c5eab",
  measurementId: "G-ZK520JWVPD"
};

const authenticatedScreen = ({user, handleAuthentication}) =>{
    return(
        <View>
            <Text>
                Welcome
            </Text>
            <Text>
                user.email
            </Text>
            <Button title="logout"
            onPress="handleAuthentication"
            color="white"
            />
        </View>
    )
}

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);



/////////////////////division//////////////////////////////////
/*
// firebaseConfig.js
import { getApps, initializeApp } from 'firebase/app';
import * as firebase from "firebase/app";
import 'firebase/auth';
//import { auth } from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD-Wo-ZTOF2AEJ0RK__zXs6MFMVM-1wqqU",
  authDomain: "ludomaster-4cb3b.firebaseapp.com",
  //databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "ludomaster-4cb3b",
  storageBucket: "ludomaster-4cb3b.appspot.com",
  messagingSenderId: "806020108210",
  appId: "1:806020108210:web:fe70d01092d9b41a3c5eab",
};

if (!getApps.length) {
  const app = initializeApp(firebaseConfig);
} else {
  app(); // if already initialized, use that one
}

export { firebase };
*/

import React, { useState, useEffect } from 'react';
//import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
//import FormField from '../../components/FormField'
//import CustomButton from '../../components/CustomButton';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Alert } from 'react-native';
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-Wo-ZTOF2AEJ0RK__zXs6MFMVM-1wqqU",
  authDomain: "ludomaster-4cb3b.firebaseapp.com",
  projectId: "ludomaster-4cb3b",
  storageBucket: "ludomaster-4cb3b.appspot.com",
  messagingSenderId: "806020108210",
  appId: "1:806020108210:web:fe70d01092d9b41a3c5eab",
  measurementId: "G-ZK520JWVPD"
};

export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);

export const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully!');
    router.navigate("/EmailSignIn")
  } catch (error) {
    console.error('Logout error:', error.message);
  }
};


export default app