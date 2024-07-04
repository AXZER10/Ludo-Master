import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Alert, View, StyleSheet } from 'react-native';
import {getFirestore,collection, addDoc, query, where, getDocs, updateDoc, doc} from 'firebase/firestore';
import { router } from 'expo-router';
import { auth } from '../FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import CustomButton from "../components/CustomButton";

const LudoTwoPlayer = () => {
     const [roomId, setRoomId] = useState('');
     const [playerUid, setPlayerUid] = useState('');
     const [gameStarted, setGameStarted] = useState(false);
    const [user, setPlayers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
            const unsubscribe = onAuthStateChanged( auth, (user) => {
              if (user) {
                setPlayerUid(user.uid);
                checkRoomsAndJoin(user.uid);
              } else {
                // Redirect to login screen or handle not logged in state
              }
            });
        
            return () => unsubscribe();
          }, []);
        
          const checkRoomsAndJoin = async ( user) => {
            const db = getFirestore();
            const roomRef = collection(db, 'twoPlayerRooms')
            try {
              const q = query (roomRef,where('uid', '==', ''))
                
                
                const querySnapshot = await getDocs(q);
        
              if (!querySnapshot.empty) {
                const roomDoc = querySnapshot.docs[0];
                const roomId = roomDoc.id;
                await joinRoom(roomId, user.uid);
              } else {
                await createRoom(user.uid);
              }
            } catch (error) {
              console.error('Error checking rooms:', error);
              setErrorMessage('Failed to check rooms');
            }
          };
        

  const createRoom = async () => {
    const db = getFirestore();
    try {
      const roomRef =  collection(db, 'twoPlayerRooms') 
      const createRef = await addDoc(roomRef,{
          createdAt: new Date(), // Timestamp of creation
          players: [], // Initialize with an empty array of players
          gameState: 'waiting', // Initial game state
          uid1: '',// Any other data specific to your game room
          uid2: ''
        });

        

      Alert.alert('Room Created', `Room ID: ${roomRef.id}`);
      // You can use roomRef.id as your game room ID in your application logic
    } catch (error) {
      
      Alert.alert('Error', 'Could not create room. Please try again.');
     
             
            }
    }
  };
  const joinRoom = async (roomId, uid) => {
    const db = getFirestore();
        try {
          const roomRef = doc( db, 'twoPlayerRooms', roomId);
    
          await updateDoc( roomRef,{
            uid2: uid
          });
    
          const updatedDoc = await getDocs(roomRef);
          const { uid1, uid2, gameStarted, players } = updatedDoc.data();
          setRoomId(roomId);
          setPlayers([{ uid: uid1 }, { uid: uid2 }]);
          setGameStarted(gameStarted);
        } catch (error) {
          console.error('Error joining room:', error);
          setErrorMessage('Failed to join room');
        }
      
    

  return (
    <View className="flex-col  w-40 mx-2">
    <CustomButton 
    title={'2 Players'} 
    ContainerStyles={'w-full bg-black'}
    handlePress={() => checkRoomsAndJoin(playerUid)}
    textStyles={'text-lg font-pbold text-blue-400'}
    /> 
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
