import React, { useState, useEffect } from 'react';
//import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
//import FormField from '../../components/FormField'
//import CustomButton from '../../components/CustomButton';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
//import AsyncStorage from '@react-native-async-storage/async-storage';

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

/*const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
*/

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