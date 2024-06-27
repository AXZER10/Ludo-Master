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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore,doc, getDocs, query, collection, where } from 'firebase/firestore';


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

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const firestore = getFirestore(app);


//export const auth = getAuth(app);

export const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully!');
    router.replace("/EmailSignIn")
  } catch (error) {
    console.error('Logout error:', error.message);
  }
};


export const UserBalances = () => {
  const [bonusBalance, setBonusBalance] = useState(null);
  const [mainBalance, setMainBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBalances = async () => {
    const user = auth.currentUser;
    const db = getFirestore();
    const walletRef = collection(db, 'wallet');

        if(user){
          const q = query(walletRef, where("uid", "==", user.uid))
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const walletbalance = doc.data().mainbalance;
            const BonusBalance = doc.data().bonusbalance;
            setBonusBalance(BonusBalance);
            setMainBalance(walletbalance);
        })
        }
    };
    useEffect(() => {
    
    fetchBalances();
  }, []);

  const refetch = () => fetchBalances();

  return{
      bonusBalance,
      mainBalance,
      refetch
  }

};

export default {app, firestore}