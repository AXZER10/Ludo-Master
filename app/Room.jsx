import React, { useState, useEffect } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { auth } from '../FirebaseConfig';
import CustomButton from "../components/CustomButton";

const LudoTwoPlayer = () => {
  const [roomId, setRoomId] = useState('');
  const [playerUid, setPlayerUid] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [users, setPlayers] = useState([]);

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
    } catch (error) {
      Alert.alert('Error', 'Could not create room. Please try again.');
    }
  };

  const joinRoom = async (roomId, uid) => {
    const db = getFirestore();
    try {
      const roomRef = doc(db, 'twoPlayerRooms', roomId);
      await updateDoc(roomRef, {
        uid2: uid
      });
      const updatedDoc = await getDoc(roomRef);
      const { uid1, uid2, gameStarted, players } = updatedDoc.data();
      setRoomId(roomId);
      setPlayers([{ uid1 }, { uid2 }]);
      setGameStarted(gameStarted);
    } catch (error) {
      Alert.alert('Error joining room:', error);
    }
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
