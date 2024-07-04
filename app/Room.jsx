import React, { useState, useEffect } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { auth } from '../FirebaseConfig';
import CustomButton from "../components/CustomButton";
import { useRouter } from 'expo-router';

const LudoTwoPlayer = () => {
  const [roomId, setRoomId] = useState('');
  const [playerUid, setPlayerUid] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setPlayerUid(user.uid);
      checkRoomsAndJoin(user.uid);
    } else {
      Alert.alert("User Not Found");
    }
  }, []);
  
  const checkRoomsAndJoin = async (uid) => {
    const db = getFirestore();
    const roomRef = collection(db, 'twoPlayerRooms');
    try {
      const q = query(roomRef, where('uid2', '==', ''));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const roomDoc = querySnapshot.docs[0];
        const roomId = roomDoc.id;
        await joinRoom(roomId, uid);
      } else {
        await createRoom(uid);
      }
    } catch (error) {
      Alert.alert('Error checking rooms:', error);
    }
  };

  const createRoom = async (uid) => {
    const db = getFirestore();
    try {
      const roomRef = collection(db, 'twoPlayerRooms');
      const createRef = await addDoc(roomRef, {
        createdAt: new Date(),
        players: [],
        gameState: 'waiting',
        uid1: uid,
        uid2: ''
      });
      setRoomId(createRef.id); // Store the created room ID
      Alert.alert('Room Created', `Room ID: ${createRef.id}`);
      
      setTimeout(() => {
        startGame(createRef.id);
      }, 1000);

    } catch (error) {
      Alert.alert('Error', 'Could not create room. Please try again.');
    }
  };

  const joinRoom = async (roomId, uid) => {
    const db = getFirestore();
    try {
      const roomRef = doc(db, 'twoPlayerRooms', roomId);
      await updateDoc(roomRef, {
        uid2: uid,
        gameState: "Started"
      });

      startGame(roomId);
    } catch (error) {
      Alert.alert('Error joining room:', error);
    }
  };

  const startGame = (roomId) => {
    const db = getFirestore();
    const roomRef = doc(db, 'twoPlayerRooms', roomId);
    const unsubscribe = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        const gameState = doc.data().gameState;
        if (gameState === "Started") {
          console.log('Match found. Starting in 5 seconds');
          setTimeout(() => {
            router.push('/LudoTwoPlayer');
          }, 5000);
        }
      } else {
        Alert.alert('Document not found');
      }
    }, (error) => {
      Alert.alert("Error starting game", error.message);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  };

  return (
    <View className="flex-col w-40 mx-2">
       
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LudoTwoPlayer;
