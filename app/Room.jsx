// GameScreen.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

// const GameScreen = () => {
//   const [roomId, setRoomId] = useState('');
//   const [playerUid, setPlayerUid] = useState('');
//   const [gameStarted, setGameStarted] = useState(false);
//   const [players, setPlayers] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const unsubscribeAuth = auth().onAuthStateChanged(user => {
//       if (user) {
//         setPlayerUid(user.uid);
//         checkRoomsAndJoin(user.uid);
//       } else {
//         // Redirect to login screen or handle not logged in state
//       }
//     });

//     return () => unsubscribeAuth();
//   }, []);

//   const checkRoomsAndJoin = async (uid) => {
//     try {
//       const roomsRef = await firestore().collection('twoPlayerRooms')
//         .where('uid2', '==', '')
//         .limit(1)
//         .get();

//       if (!roomsRef.empty) {
//         const roomDoc = roomsRef.docs[0];
//         const roomId = roomDoc.id;
//         await joinRoom(roomId, uid);
//       } else {
//         await createRoom(uid);
//       }
//     } catch (error) {
//       console.error('Error checking rooms:', error);
//       setErrorMessage('Failed to check rooms');
//     }
//   };

//   const createRoom = async (roomId, uid) => {
//     try {
//       const roomRef = firestore().collection('twoPlayerRooms').doc(roomId);
  
//       await roomRef.set({
//         uid: firestore().doc(`users/${uid}`),
//         gameStarted: false,
//         dice1: 0,
//         dice2: 0,
//         turnStatus1: 'active',
//         turnStatus2: 'inactive',
//         count: 0,
//       });
  
//       setRoomId(roomId);
//       setPlayers([{ uid, displayName: '' }]);
//     } catch (error) {
//       console.error('Error creating room:', error);
//       setErrorMessage('Failed to create room');
//     }
//   };
  

//   const joinRoom = async (roomId, uid) => {
//     try {
//       const roomRef = firestore().collection('twoPlayerRooms').doc(roomId);

//       await roomRef.update({
//         uid2: firestore().doc(`users/${uid}`),
//       });

//       const updatedDoc = await roomRef.get();
//       const { uid: player1Uid, uid2, gameStarted, dice1, dice2, turnStatus1, turnStatus2, count } = updatedDoc.data();
//       setRoomId(roomId);
//       setPlayers([{ uid: player1Uid }, { uid: uid }]);
//       setGameStarted(gameStarted);
//     } catch (error) {
//       console.error('Error joining room:', error);
//       setErrorMessage('Failed to join room');
//     }
//   };

//   const startGame = async () => {
//     try {
//       const roomRef = firestore().collection('twoPlayerRooms').doc(roomId);
//       await roomRef.update({
//         gameStarted: true,
//       });
//       setGameStarted(true);
//       // Additional game initialization logic can go here
//     } catch (error) {
//       console.error('Error starting game:', error);
//       setErrorMessage('Failed to start game');
//     }
//   };

//   const rollDice = async () => {
//     try {
//       // Simulate dice roll (replace with actual game logic)
//       const diceValue = Math.floor(Math.random() * 6) + 1;

//       const roomRef = firestore().collection('twoPlayerRooms').doc(roomId);
//       const playerTurn = players.find(player => player.uid === playerUid);

//       if (!playerTurn) {
//         console.error('Player not found in room.');
//         return;
//       }

//       const playerIndex = players.indexOf(playerTurn);
//       const otherPlayerIndex = playerIndex === 0 ? 1 : 0;

//       await roomRef.update({
//         [`dice${playerIndex + 1}`]: diceValue,
//         [`turnStatus${playerIndex + 1}`]: 'inactive',
//         [`turnStatus${otherPlayerIndex + 1}`]: 'active',
//         count: count + 1,
//       });

//       // Additional game logic based on dice roll
//     } catch (error) {
//       console.error('Error rolling dice:', error);
//       setErrorMessage('Failed to roll dice');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Ludo Game</Text>
//       {roomId ? (
//         <View style={styles.roomContainer}>
//           <Text style={styles.roomText}>Room ID: {roomId}</Text>
//           {players.length > 0 && (
//             <View style={styles.playersContainer}>
//               <Text style={styles.playersHeader}>Players:</Text>
//               {players.map((player, index) => (
//                 <Text key={index} style={styles.playerText}>
//                   {player.displayName || `Player ${index + 1}`}
//                 </Text>
//               ))}
//             </View>
//           )}
//           {!gameStarted && players.length === 2 && (
//             <Button title="Start Game" onPress={startGame} />
//           )}
//           {gameStarted && (
//             <View style={styles.gameContainer}>
//               <Text style={styles.gameInfo}>Current Player: {players[0].displayName}</Text>
//               <Button title="Roll Dice" onPress={rollDice} />
//             </View>
//           )}
//           {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
//         </View>
//       ) : (
//         <Text style={styles.loading}>Loading...</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   roomContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   roomText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   playersContainer: {
//     marginTop: 20,
//   },
//   playersHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   playerText: {
//     fontSize: 16,
//   },
//   loading: {
//     fontSize: 18,
//     marginTop: 20,
//   },
//   errorMessage: {
//     color: 'red',
//     marginTop: 10,
//   },
//   gameContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   gameInfo: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
// });

// export default GameScreen;


import React from 'react';
import { TouchableOpacity, Text, Alert, View, StyleSheet } from 'react-native';
import {getFirestore,collection, addDoc} from 'firebase/firestore';
import { router } from 'expo-router';
import CustomButton from "../components/CustomButton";
const LudoTwoPlayer = () => {

  const createRoom = async () => {
    const db = getFirestore();
    try {
      const roomRef =  collection(db, 'twoPlayerRooms') 
      const createRef = await addDoc(roomRef,{
          createdAt: new Date(), // Timestamp of creation
          players: [], // Initialize with an empty array of players
          gameState: 'waiting', // Initial game state
          // Any other data specific to your game room
        });

      
      Alert.alert('Room Created', `Room ID: ${roomRef.id}`);
      // You can use roomRef.id as your game room ID in your application logic
    } catch (error) {
      console.error('Error creating room:', error);
      Alert.alert('Error', 'Could not create room. Please try again.');
    }
  };

  return (
    <View className="flex-col  w-40 mx-2">
    <CustomButton 
    title={'2 Players'} 
    ContainerStyles={'w-full bg-black'}
    handlePress={ createRoom}
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
