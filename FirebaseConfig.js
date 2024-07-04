import React, { useState, useEffect } from 'react';
import { initializeApp, firebase } from 'firebase/app';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, getDocs, query, collection, where } from 'firebase/firestore';
import { getStorage, ref ,uploadBytes, getDownloadURL } from 'firebase/storage';
import 'firebase/storage';

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

export const firestore = getFirestore(app);
export const storage = getStorage(app);

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

export const uploadImage = async (uri, path) => {
  try {
    

    const response = await fetch(uri);

    const blob = await response.blob();

    const storageRef = ref(storage, path);

    await uploadBytes(storageRef, blob);

    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};

export const UserBalances = () => {
  const [bonusBalance, setBonusBalance] = useState(null);
  const [mainBalance, setMainBalance] = useState(null);
  const [winBalance, setWinBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBalances = async () => {
    const user = auth.currentUser;
    const db = getFirestore();
    const walletRef = collection(db, 'wallet');

    if (user) {
      const q = query(walletRef, where("uid", "==", user.uid))

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const walletbalance = doc.data().mainbalance;
        const BonusBalance = doc.data().bonusbalance;
        const WinBalance = doc.data().winningbalance;
        setBonusBalance(balanceFormatter(BonusBalance));
        setMainBalance(balanceFormatter(walletbalance));
        setWinBalance(balanceFormatter(WinBalance));
      })
    }
  };
  useEffect(() => {

    fetchBalances();
  }, []);
  const balanceFormatter = (value) => {
    return (
      Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(value)
    );
  };

  const refetch = () => { fetchBalances(); }

  return {
    bonusBalance,
    mainBalance,
    winBalance,
    refetch
  }
};

export const numberFormatter = (value) => {
  return (
    Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value)
  );
};
export default { app }