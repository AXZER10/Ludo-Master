import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, query, where,addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth } from '../FirebaseConfig';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [playerUid, setPlayerUid] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setPlayerUid(user.uid);
      fetchRooms(); 
    } else {
      Alert.alert("User Not Found");
    }
  }, []);

 
  const fetchRooms = async () => {
    const db = getFirestore();
    const roomRef = collection(db, 'twoPlayerRooms');
    const q = query(roomRef, where('uid2', '==', '')); 
    const querySnapshot = await getDocs(q);
    const roomsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRooms(roomsList);
  };


  const createRoom = async () => {
    const db = getFirestore();
    const user = auth.currentUser;
    try {
      const roomRef = collection(db, 'twoPlayerRooms');
      const createRef = await addDoc(roomRef, {
        createdAt: new Date(),
        uid1: {
          uid: playerUid,
          displayName: user.displayName || 'Anonymous', 
          dice: 0,
          turn: true,
        },
        uid2: '',
        gameState: 'waiting',
      });

      
      router.replace({ pathname: '/Room', params: { roomId: createRef.id } });

    } catch (error) {
      Alert.alert('Error', 'Could not create room. Please try again.');
    }
  };

  
  const joinRoom = async (roomId) => {
    const db = getFirestore();
    try {
      const roomRef = doc(db, 'twoPlayerRooms', roomId);
      await updateDoc(roomRef, {
        uid2: {
          uid: playerUid,
          dice: 0,
          turn: false,
        },
        gameState: 'Started',
      });

      
      router.replace({ pathname: '/Room', params: { roomId } });
    } catch (error) {
      Alert.alert('Error', 'Could not join the room. Please try again.');
    }
  };

  
  const renderRoom = ({ item }) => (
    <View
      style={{
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Text>Room ID: {item.id}</Text>
      <Text>Host: {item.uid1.displayName || item.uid1.uid}</Text> {/* Display the user's name */}
      <Text>Status: {item.uid2 === '' ? 'Waiting for player to join' : 'Full'}</Text>
      {item.uid2 === '' && (
        <TouchableOpacity
          onPress={() => joinRoom(item.id)}
          style={{
            padding: 10,
            backgroundColor: '#4CAF50',
            marginTop: 10,
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Join Room</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      {/* Button to Create Room */}
      <TouchableOpacity
        onPress={createRoom}
        style={{
          padding: 15,
          backgroundColor: '#2196F3',
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Create New Room</Text>
      </TouchableOpacity>

      {/* List of Available Rooms */}
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={renderRoom}
        ListEmptyComponent={<Text></Text>}
      />
    </SafeAreaView>
  );
};

export default RoomList;

