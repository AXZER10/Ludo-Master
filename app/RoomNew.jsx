import React, { useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity, Image, Text } from 'react-native';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { auth } from '../FirebaseConfig';
import { router } from 'expo-router';
import icons from '../constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Room = () => {
  const [roomId, setRoomId] = useState('');
  const [playerUid, setPlayerUid] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [positions, setPositions] = useState({
    1: [-11, -21, -31, -41],
    3: [-13, -23, -33, -43],
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (user
    ) {
      if(playerUid == ''){
        setPlayerUid(user.uid);
        checkRoomsAndJoin(user.uid);
      }
      if(countdown == 0){
        // router.setParams({roomId : roomId})
        // console.log("roomId roomIdroomIdroomIdroomId ", roomId)
        
      } 
    } else {
      Alert.alert("User Not Found");
    }

  }, [countdown]);
  
  const checkRoomsAndJoin = async (uid) => {
    const db = getFirestore();
    const roomRef = collection(db, 'twoPlayerRooms');
    try {
      const q = query(roomRef, where('uid2', '==', ''), where('uid1', '!=', uid));
      const querySnapshot = await getDocs(q);
      const filteredRooms = querySnapshot.docs.filter(doc => doc.data().uid1 !== uid && doc.data().uid1 !== '');
      if (filteredRooms.length > 0) {
        const roomDoc = filteredRooms[0];
        const roomId = roomDoc.id;
        await joinRoom(roomId, uid);
      } else {
        await createRoom(uid);
      }
    } catch (error) {
      Alert.alert('Error checking rooms:', error.message);
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
        uid1: {
          position: positions[1],
          uid,
          dice:0,
          turn:true
        },
        uid2: '',
        
      });
      if(roomId && roomId != ""){
      } else {
        setRoomId(createRef.id); // Store the created room ID
      }
      
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
        uid2: {
          position: positions[3],
          uid,
          dice:0,
          turn:false
        },
        gameState: "Started"
      });

      startGame(roomId);
    } catch (error) {
      Alert.alert('Error joining room:', error.message);
    }
  };

    const startGame = async(roomId) => {
      const db = getFirestore();
      const roomRef = doc(db, 'twoPlayerRooms', roomId);
      const initiateCountdown = () => {
        setCountdown(5);
        const interval = setInterval(() => {
          setCountdown(prev => {
            if (prev === 1) {
              clearInterval(interval);
            }
            return prev - 1;
          });
        }, 1000);
      }
      const unsubscribe = onSnapshot(roomRef, (doc) => {
        if (doc.exists()) {
          const gameState = doc.data().gameState;
          if (gameState === "Started") {
            router.setParams({roomId : roomId});
            router.replace({pathname :'/OnlineNew' , params:  {roomId} })
            initiateCountdown();
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

  const Cancel = async() => {
    const db = getFirestore();
    try {
      const roomRef = doc(db, 'twoPlayerRooms', roomId);
      await updateDoc(roomRef, {
        uid1: '',
        uid2: '',
        gameState: "Cancelled"
      });

      router.replace('/Home')
    } catch (error) {
      Alert.alert('Error exiting room:', error.message);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      
      {countdown === null && (
        <>
        <View className="flex-col w-10 h-10 mx-2">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => Cancel()}
        >
         <Image source={icons.back}
           resizeMode='contain'
           className="w-10 h-10"
         />
        </TouchableOpacity>
       </View>

        <View className="flex-col w-full h-full justify-center items-center">
          <Text className="text-5xl font-pbold text-slate-400">
            Waiting For Players to Join
          </Text>
        </View>
        </>
      )}
      {countdown !== null && (
        <View className="flex-col w-full h-full justify-center items-center">
          <Text className="text-5xl font-pbold text-slate-400">Game starts in {countdown}...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Room;
