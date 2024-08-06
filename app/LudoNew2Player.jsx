import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ImageBackground, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { Players, row } from './styles/forPlayers'
import { Audio } from 'expo-av'
import * as Animatable from "react-native-animatable";
import icons from '../constants/icons'
import { router } from 'expo-router';
import { auth } from '../FirebaseConfig';
import { collection, getFirestore, doc, query, where, getDocs, updateDoc, onSnapshot, documentId, getDoc, docs } from 'firebase/firestore';
import { Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';


soundObject = new Audio.Sound();

const zoomIn = {
  0: {
    scale: 0.7,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.7,
  },
};

const LudoNew2Player = () => {
  const { roomId } = useLocalSearchParams()
  // console.log("location.state  location.statelocation.state ", roomId)

  const [positions, setPositions] = useState({
    1: [-11, -21, -31, -41],
    3: [-13, -23, -33, -43],
  });
  if (positions[1][0] === 'winner' && positions[1][1] === 'winner' && positions[1][2] === 'winner' && positions[1][3] === 'winner') {
    Alert.alert("Game Over", "Player 1 Wins")
  }
  if (positions[3][0] === 'winner' && positions[3][1] === 'winner' && positions[3][2] === 'winner' && positions[3][3] === 'winner') {
    Alert.alert("Game Over", "Player 2 Wins")
  }
  const [turn1, setTurn1] = useState(true);
  const [turn3, setTurn3] = useState(false);
  const [currentNumber1, setCurrentNumber1] = useState(0);
  // let currentNumber1 = 0;
  // let currentNumber2 = 0;
  const [currentNumber2, setCurrentNumber2] = useState(0);
  const [turnMessage, setTurnMessage] = useState("");
  const [moveMessage, setMoveMessage] = useState("");
  const [whoseTurnToMove, setWhoseTurnToMove] = useState(0);
  const [isMovedBy1, setIsMovedBy1] = useState(false);
  const [isMovedBy3, setIsMovedBy3] = useState(false);
  const [room, setRoom] = useState(undefined);
  const [User, setUser] = useState(auth.currentUser);
  const [User1, setUser1] = useState({});
  const [User2, setUser2] = useState({});

  const [snapCreated, onSnapCreated] = useState(false)

  const [image1, setImage1] = useState(require("./assets/dice1.png"));
  const [image3, setImage3] = useState(require("./assets/dice1.png"));


  const CurrentRoom = async () => {
    let user = auth.currentUser;
    console.log("roomId roomId ", roomId);
    try {
      const db = getFirestore();
      const roomRef = collection(db, 'twoPlayerRooms');
      const q = query(roomRef, where(documentId(), '==', roomId));
      const querySnapshot = await getDocs(q);

      setUser(user);
      let room = { ...{ id: roomId }, ...querySnapshot?.docs[0].data() };

      if (room) {
        let DataUid1 = room?.uid1?.uid;
        if (DataUid1 == User?.uid) {
          setUser1(DataUid1)
          setUser2(room?.uid2?.uid)
        } else {
          setUser1(room?.uid2?.uid)
          setUser2(DataUid1)
        }
        console.log('set Room', room)
        setRoom(room);
      }
    } catch (error) {
      Alert.alert('Error checking rooms:', error.message);
    }
  };
  Cancel = async () => {
    // const roomId = room?.id;
    const roomID = room?.id;
    console.log('room: ', roomID);
    const db = getFirestore();
    try {
      const roomRef = doc(db, 'twoPlayerRooms', roomID);
      await updateDoc(roomRef, {
        gameState: "Cancelled"
      });

      router.replace('/Home');
    } catch (error) {
    }
  };

  const updateTurn = () => {

  }

  const moveIcon = async (player, whichOne, position) => {
    switch (player) {
      case 1:
        console.log("whoseTurnToMove: ", whoseTurnToMove)
        console.log("isMovedBy1: ", isMovedBy1)
        console.log("Whichone: ", whichOne)
        // console.log("currentNumber2: ", currentNumber2)
        // var currentNumber1 = 0
        console.log("currentNumber1: ", currentNumber1)
        if (whoseTurnToMove === 1 && !isMovedBy1) {
          switch (whichOne) {
            case 1:
              if (positions[1][0] !== "winner") {
                if (currentNumber1 === 6) {
                  setTurn1(true)
                  updateTurn();
                }
                if (positions[1][0] < 0) {
                  if (currentNumber1 === 6) {
                    let temparr = positions[1];
                    temparr[0] = 1;
                    setPositions(positions);
                    setIsMovedBy1(true);
                  } else {
                    setMoveMessage("You Cannot Move It");
                  }
                } else if (positions[1][0] === 51 && currentNumber1 === 6) {
                  let temparr = positions[1];
                  temparr[0] = "winner";
                  setPositions(positions);
                  setIsMovedBy1(true);
                } else {
                  let currentPosition = positions[1][0];
                  let nextPosition = currentNumber1 + currentPosition;
                  if (nextPosition > 57) {
                    if (nextPosition === 58) {
                      let temparr = positions[1];
                      temparr[0] = "winner";
                      setPositions(positions);
                      setIsMovedBy1(true);
                    } else {
                      if (
                        (positions[1][1] > 0 && positions[1][1] !== "winner") ||
                        (positions[1][2] > 0 && positions[1][2] !== "winner") ||
                        (positions[1][3] > 0 && positions[1][3] !== "winner")
                      ) {
                        setMoveMessage("No, Move Other One");
                      } else {
                        setIsMovedBy1(true);
                      }
                    }
                  } else {
                    if (positions[1][0] >= 46 && positions[1][0] <= 51) {
                      if (nextPosition >= 52) {
                        nextPosition += 1;
                      }
                    }
                    checkIfCutPossibleFor3(nextPosition);
                    let temparr = positions[1];
                    temparr[0] = nextPosition;
                    setPositions(positions);
                    setIsMovedBy1(true);
                  }
                }
              }
              else {
                if (
                  (positions[1][1] > 0 && positions[1][1] !== "winner") ||
                  (positions[1][2] > 0 && positions[1][2] !== "winner") ||
                  (positions[1][3] > 0 && positions[1][3] !== "winner")
                ) {
                  setMoveMessage("No, Move Other One");
                } else {
                  setIsMovedBy1(true);
                }
              }
              const roomId = room?.id;
                  let UID = User.uid;
                  console.log("UID: ", UID)
                  const db = getFirestore();
                  const roomRef = doc(db, 'twoPlayerRooms', roomId);
                  if (room?.uid1?.uid == UID) {
                    let updatedRoom = {
                      id: room?.id,
                      uid1: {
                        position1: positions[1],
                        dice: room?.uid1?.dice,
                        turn: room?.uid1?.turn,
                        uid: room?.uid1?.uid
                      },
                      uid2: {
                        position2: positions[3],
                        dice: room?.uid2?.dice,
                        turn: room?.uid2?.turn,
                        uid: room?.uid2?.uid
                      },
                      gameState: "InProgress"
                    }
                    console.log(updatedRoom)
                    await updateDoc(roomRef, updatedRoom);
                  } else {
                    let updatedRoom = {
                      id: room?.id,
                      uid1: {
                        position: positions[3],
                        dice: room?.uid1?.dice,
                        turn: room?.uid1?.turn,
                        uid: room?.uid1?.uid
                      },
                      uid2: {
                        position: positions[1],
                        dice: room?.uid2?.dice,
                        turn: room?.uid2?.turn,
                        uid: room?.uid2?.uid
                      },
                      gameState: "InProgress"
                    }
                    await updateDoc(roomRef, updatedRoom);
                  }
              break;
            case 2:
              if (positions[1][1] !== "winner") {
                if (currentNumber1 === 6) {
                  setTurn1(true)
                  updateTurn();
                }
                if (positions[1][1] < 0) {
                  if (currentNumber1 === 6) {
                    let temparr = positions[1];
                    temparr[1] = 1;
                    setPositions(positions);
                    setIsMovedBy1(true);
                  } else {
                    setMoveMessage("You Cannot Move It");
                  }
                } else if (positions[1][1] === 51 && currentNumber1 === 6) {
                  let temparr = positions[1];
                  temparr[1] = "winner";
                  setPositions(positions);
                  setIsMovedBy1(true);
                } else {
                  let currentPosition = positions[1][1];
                  let nextPosition = currentNumber1 + currentPosition;
                  if (nextPosition > 57) {
                    if (nextPosition === 58) {
                      let temparr = positions[1];
                      temparr[1] = "winner";
                      setPositions(positions);
                      setIsMovedBy1(true);
                    } else {
                      if (
                        (positions[1][0] > 0 && positions[1][0] !== "winner") ||
                        (positions[1][2] > 0 && positions[1][2] !== "winner") ||
                        (positions[1][3] > 0 && positions[1][3] !== "winner")
                      ) {
                        setMoveMessage("No, Move Other One");
                      } else {
                        setIsMovedBy1(true);
                      }
                    }
                  } else {
                    if (positions[1][1] >= 46 && positions[1][1] <= 51) {
                      if (nextPosition >= 52) {
                        nextPosition += 1;
                      }
                    }
                    checkIfCutPossibleFor3(nextPosition);
                    let temparr = positions[1];
                    temparr[1] = nextPosition;
                    setPositions(positions);
                    setIsMovedBy1(true);
                  }
                }
              }
              break;
            case 3:
              if (positions[1][2] !== "winner") {
                if (currentNumber1 === 6) {
                  setTurn1(true)
                  updateTurn();
                }
                if (positions[1][2] < 0) {
                  if (currentNumber1 === 6) {
                    let temparr = positions[1];
                    temparr[2] = 1;
                    setPositions(positions);
                    setIsMovedBy1(true);
                  } else {
                    setMoveMessage("You Cannot Move It");
                  }
                } else if (positions[1][2] === 51 && currentNumber1 === 6) {
                  let temparr = positions[1];
                  temparr[2] = "winner";
                  setPositions(positions);
                  setIsMovedBy1(true);
                } else {
                  let currentPosition = positions[1][2];
                  let nextPosition = currentNumber1 + currentPosition;
                  if (nextPosition > 57) {
                    if (nextPosition === 58) {
                      let temparr = positions[1];
                      temparr[2] = "winner";
                      setPositions(positions);
                      setIsMovedBy1(true);
                    } else {
                      if (
                        (positions[1][0] > 0 && positions[1][0] !== "winner") ||
                        (positions[1][1] > 0 && positions[1][1] !== "winner") ||
                        (positions[1][3] > 0 && positions[1][3] !== "winner")
                      ) {
                        setMoveMessage("No, Move Other One");
                      } else {
                        setIsMovedBy1(true);
                      }
                    }
                  } else {
                    if (positions[1][2] >= 46 && positions[1][2] <= 51) {
                      if (nextPosition >= 52) {
                        nextPosition += 1;
                      }
                    }
                    checkIfCutPossibleFor3(nextPosition);
                    let temparr = positions[1];
                    temparr[2] = nextPosition;
                    setPositions(positions);
                    setIsMovedBy1(true);
                  }
                }
              }
              break;
            case 4:
              if (positions[1][3] !== "winner") {
                if (currentNumber1 === 6) {
                  setTurn1(true)
                  updateTurn();
                }
                if (positions[1][3] < 0) {
                  if (currentNumber1 === 6) {
                    let temparr = positions[1];
                    temparr[3] = 1;
                    setPositions(positions);
                    setIsMovedBy1(true);
                  } else {
                    setMoveMessage("You Cannot Move It");
                  }
                } else if (positions[1][3] === 51 && currentNumber1 === 6) {
                  let temparr = positions[1];
                  temparr[3] = "winner";
                  setPositions(positions);
                  setIsMovedBy1(true);
                } else {
                  let currentPosition = positions[1][3];
                  let nextPosition = currentNumber1 + currentPosition;
                  if (nextPosition > 57) {
                    if (nextPosition === 58) {
                      let temparr = positions[1];
                      temparr[3] = "winner";
                      setPositions(positions);
                      setIsMovedBy1(true);
                    } else {
                      if (
                        (positions[1][0] > 0 && positions[1][0] !== "winner") ||
                        (positions[1][1] > 0 && positions[1][1] !== "winner") ||
                        (positions[1][2] > 0 && positions[1][2] !== "winner")
                      ) {
                        setMoveMessage("No, Move Other One");
                      } else {
                        setIsMovedBy1(true);
                      }
                    }
                  } else {
                    if (positions[1][3] >= 46 && positions[1][3] <= 51) {
                      if (nextPosition >= 52) {
                        nextPosition += 1;
                      }
                    }
                    checkIfCutPossibleFor3(nextPosition);
                    let temparr = positions[1];
                    temparr[3] = nextPosition;
                    setPositions(positions);
                    setIsMovedBy1(true);
                  }
                }
              }
              break;
            default:
              break;
          }
        } else {
          setMoveMessage("You cannot move right now");
          setIsMovedBy1(true);
        }
        break;
      case 3:

        if (whoseTurnToMove === 3 && !isMovedBy3) {
          if (currentNumber2 === 6) {
            setTurn3(true)
            updateTurn();

          }
          switch (whichOne) {
            case 1:
              if (positions[3][0] !== "winner") {
                if (positions[3][0] < 0) {
                  if (currentNumber2 === 6) {
                    let temparr = positions[3];
                    temparr[0] = 27;
                    setPositions(positions);
                    setIsMovedBy3(true);
                  } else {
                    setMoveMessage("You Cannot Move It");
                  }
                } else {
                  let currentPosition = positions[3][0];
                  let nextPosition = currentNumber2 + currentPosition;
                  if (nextPosition > 52 && nextPosition <= 58) {
                    let extraMoves = nextPosition - 52;
                    checkIfCutPossibleFor1(extraMoves);
                    let temparr = positions[3];
                    temparr[0] = extraMoves;
                    setPositions(positions);
                    setIsMovedBy3(true);
                  } else if (positions[3][0] >= 20 && positions[3][0] <= 25) {
                    if (nextPosition > 25) {
                      let extraMoves = nextPosition - 25;
                      let newPosition = 62 + extraMoves;
                      if (positions[3][0] === 25 && currentNumber2 === 6) {
                        let temparr = positions[3];
                        temparr[0] = "winner";
                        setPositions(positions);
                        setIsMovedBy3(true);
                      } else {
                        checkIfCutPossibleFor1(newPosition);
                        let temparr = positions[3];
                        temparr[0] = newPosition;
                        setPositions(positions);
                        setIsMovedBy3(true);
                      }
                    } else {
                      nextPosition = positions[3][0] + currentNumber2;
                      checkIfCutPossibleFor1(nextPosition);
                      let temparr = positions[3];
                      temparr[0] = nextPosition;
                      setPositions(positions);
                      setIsMovedBy3(true);
                    }
                  } else if (positions[3][0] >= 63 && positions[3][0] <= 67) {
                    nextPosition = positions[3][0] + currentNumber2;
                    if (nextPosition == 68) {
                      let temparr = positions[3];
                      temparr[0] = "winner";
                      setPositions(positions);
                      setIsMovedBy3(true);
                    } else if (nextPosition > 68) {
                      if (
                        (positions[3][1] > 0 && positions[3][1] !== "winner") ||
                        (positions[3][2] > 0 && positions[3][2] !== "winner") ||
                        (positions[3][3] > 0 && positions[3][3] !== "winner")
                      ) {
                        setMoveMessage("Cannot Move This One");
                      } else {
                        setIsMovedBy3(true);
                      }
                    } else {
                      let temparr = positions[3];
                      temparr[0] = nextPosition;
                      setPositions(positions);
                      setIsMovedBy3(true);
                    }
                  } else {
                    nextPosition = positions[3][0] + currentNumber2;
                    checkIfCutPossibleFor1(nextPosition);
                    let temparr = positions[3];
                    temparr[0] = nextPosition;
                    setPositions(positions);
                    setIsMovedBy3(true);
                  }
                }
              }
              break;
            case 2:
              if (positions[3][1] !== "winner") {
                if (currentNumber2 === 6) {
                  setTurn3(true)
                  updateTurn();
                }
                if (positions[3][1] < 0) {
                  if (currentNumber2 === 6) {
                    let temparr = positions[3];
                    temparr[1] = 27;
                    setPositions(positions);
                    setIsMovedBy3(true);
                  } else {
                    setMoveMessage("You Cannot Move It");
                  }
                } else {
                  let currentPosition = positions[3][1];
                  let nextPosition = currentNumber2 + currentPosition;
                  if (nextPosition > 52 && nextPosition <= 58) {
                    let extraMoves = nextPosition - 52;
                    checkIfCutPossibleFor1(extraMoves);
                    let temparr = positions[3];
                    temparr[1] = extraMoves;
                    setPositions(positions);
                    setIsMovedBy3(true);
                  } else if (positions[3][1] >= 20 && positions[3][1] <= 25) {
                    if (nextPosition > 25) {
                      let extraMoves = nextPosition - 25;
                      let newPosition = 62 + extraMoves;
                      if (positions[3][1] === 25 && currentNumber2 === 6) {
                        let temparr = positions[3];
                        temparr[1] = "winner";
                        setPositions(positions);
                        setIsMovedBy3(true);
                      } else {
                        checkIfCutPossibleFor1(newPosition);
                        let temparr = positions[3];
                        temparr[1] = newPosition;
                        setPositions(positions);
                        setIsMovedBy3(true);
                      }
                    } else {
                      nextPosition = positions[3][1] + currentNumber2;
                      checkIfCutPossibleFor1(nextPosition);
                      let temparr = positions[3];
                      temparr[1] = nextPosition;
                      setPositions(positions);
                      setIsMovedBy3(true);
                    }
                  } else if (positions[3][1] >= 63 && positions[3][1] <= 67) {
                    nextPosition = positions[3][1] + currentNumber2;
                    if (nextPosition == 68) {
                      let temparr = positions[3];
                      temparr[1] = "winner";
                      setPositions(positions);
                      setIsMovedBy3(true);
                    } else if (nextPosition > 68) {
                      if (
                        (positions[3][0] > 0 && positions[3][0] !== "winner") ||
                        (positions[3][2] > 0 && positions[3][2] !== "winner") ||
                        (positions[3][3] > 0 && positions[3][3] !== "winner")
                      ) {
                        setMoveMessage("Cannot Move This One");
                      } else {
                        setIsMovedBy3(true);
                      }
                    } else {
                      let temparr = positions[3];
                      temparr[1] = nextPosition;
                      setPositions(positions);
                      setIsMovedBy3(true);
                    }
                  } else {
                    nextPosition = positions[3][1] + currentNumber2;
                    checkIfCutPossibleFor1(nextPosition);
                    let temparr = positions[3];
                    temparr[1] = nextPosition;
                    setPositions(positions);
                    setIsMovedBy3(true);
                  }
                }
              }
              break;
            case 3:
              if (positions[3][2] !== "winner") {
                if (currentNumber2 === 6) {
                  setTurn3(true)
                  updateTurn();
                }
                if (positions[3][2] < 0) {
                  if (currentNumber2 === 6) {
                    let temparr = positions[3];
                    temparr[2] = 27;
                    setPositions(positions);
                    setIsMovedBy3(true);
                  } else {
                    setMoveMessage("You Cannot Move It");
                  }
                } else {
                  let currentPosition = positions[3][2];
                  let nextPosition = currentNumber2 + currentPosition;
                  if (nextPosition > 52 && nextPosition <= 58) {
                    let extraMoves = nextPosition - 52;
                    checkIfCutPossibleFor1(extraMoves);
                    let temparr = positions[3];
                    temparr[2] = extraMoves;
                    setPositions(positions);
                    setIsMovedBy3(true);
                  } else if (positions[3][2] >= 20 && positions[3][2] <= 25) {
                    if (nextPosition > 25) {
                      let extraMoves = nextPosition - 25;
                      let newPosition = 62 + extraMoves;
                      if (positions[3][2] === 25 && currentNumber2 === 6) {
                        let temparr = positions[3];
                        temparr[2] = "winner";
                        setPositions(positions);
                        setIsMovedBy3(true);
                      } else {
                        checkIfCutPossibleFor1(newPosition);
                        let temparr = positions[3];
                        temparr[2] = newPosition;
                        setPositions(positions);
                        setIsMovedBy3(true);
                      }
                    } else {
                      nextPosition = positions[3][2] + currentNumber2;
                      checkIfCutPossibleFor1(nextPosition);
                      let temparr = positions[3];
                      temparr[2] = nextPosition;
                      setPositions(positions);
                      setIsMovedBy3(true);
                    }
                  } else if (positions[3][2] >= 63 && positions[3][2] <= 67) {
                    nextPosition = positions[3][2] + currentNumber2;
                    if (nextPosition == 68) {
                      let temparr = positions[3];
                      temparr[2] = "winner";
                      setPositions(positions);
                      setIsMovedBy3(true);
                    } else if (nextPosition > 68) {
                      if (
                        (positions[3][0] > 0 && positions[3][0] !== "winner") ||
                        (positions[3][1] > 0 && positions[3][1] !== "winner") ||
                        (positions[3][3] > 0 && positions[3][3] !== "winner")
                      ) {
                        setMoveMessage("Cannot Move This One");
                      } else {
                        setIsMovedBy3(true);
                      }
                    } else {
                      let temparr = positions[3];
                      temparr[2] = nextPosition;
                      setPositions(positions);
                      setIsMovedBy3(true);
                    }
                  } else {
                    nextPosition = positions[3][2] + currentNumber2;
                    checkIfCutPossibleFor1(nextPosition);
                    let temparr = positions[3];
                    temparr[2] = nextPosition;
                    setPositions(positions);
                    setIsMovedBy3(true);
                  }
                }
              }
              break;
            case 4:
              if (positions[3][3] !== "winner") {
                if (currentNumber2 === 6) {
                  setTurn3(true)
                  updateTurn();
                }
                if (positions[3][3] < 0) {
                  if (currentNumber2 === 6) {
                    let temparr = positions[3];
                    temparr[3] = 27;
                    setPositions(positions);
                    setIsMovedBy3(true);
                  } else {
                    setMoveMessage("You Cannot Move It");
                  }
                } else {
                  let currentPosition = positions[3][3];
                  let nextPosition = currentNumber2 + currentPosition;
                  if (nextPosition > 52 && nextPosition <= 58) {
                    let extraMoves = nextPosition - 52;
                    checkIfCutPossibleFor1(extraMoves);
                    let temparr = positions[3];
                    temparr[3] = extraMoves;
                    setPositions(positions);
                    setIsMovedBy3(true);
                  } else if (positions[3][3] >= 20 && positions[3][3] <= 25) {
                    if (nextPosition > 25) {
                      let extraMoves = nextPosition - 25;
                      let newPosition = 62 + extraMoves;
                      if (positions[3][3] === 25 && currentNumber2 === 6) {
                        let temparr = positions[3];
                        temparr[3] = "winner";
                        setPositions(positions);
                        setIsMovedBy3(true);
                      } else {
                        checkIfCutPossibleFor1(newPosition);
                        let temparr = positions[3];
                        temparr[3] = newPosition;
                        setPositions(positions);
                        setIsMovedBy3(true);
                      }
                    } else {
                      nextPosition = positions[3][3] + currentNumber2;
                      checkIfCutPossibleFor1(nextPosition);
                      let temparr = positions[3];
                      temparr[3] = nextPosition;
                      setPositions(positions);
                      setIsMovedBy3(true);
                    }
                  } else if (positions[3][3] >= 63 && positions[3][3] <= 67) {
                    nextPosition = positions[3][3] + currentNumber2;
                    if (nextPosition == 68) {
                      let temparr = positions[3];
                      temparr[3] = "winner";
                      setPositions(positions);
                      setIsMovedBy3(true);
                    } else if (nextPosition > 68) {
                      if (
                        (positions[3][0] > 0 && positions[3][0] !== "winner") ||
                        (positions[3][1] > 0 && positions[3][1] !== "winner") ||
                        (positions[3][2] > 0 && positions[3][2] !== "winner")
                      ) {
                        setMoveMessage("Cannot Move This One");
                      } else {
                        setIsMovedBy3(true);
                      }
                    } else {
                      let temparr = positions[3];
                      temparr[3] = nextPosition;
                      setPositions(positions);
                      setIsMovedBy3(true);
                    }
                  } else {
                    nextPosition = positions[3][3] + currentNumber2;
                    checkIfCutPossibleFor1(nextPosition);
                    let temparr = positions[3];
                    temparr[3] = nextPosition;
                    setPositions(positions);
                    setIsMovedBy3(true);
                  }
                }
              }
              break;
            default:
              break;
          }
        } else {
          setMoveMessage("You cannot move right now");
          setIsMovedBy3(true);
        }
        break;
    }
  };

  const checkIfCutPossibleFor1 = (atPosition) => {
    if (
      atPosition !== 1 &&
      atPosition !== 9 &&
      atPosition !== 14 &&
      atPosition !== 22 &&
      atPosition !== 27 &&
      atPosition !== 35 &&
      atPosition !== 40 &&
      atPosition !== 48
    ) {
      if (positions[1][0] === atPosition) {
        let temparr = positions[1];
        temparr[0] = -11;
        setPositions(positions);
      }
      if (positions[1][1] === atPosition) {
        let temparr = positions[1];
        temparr[1] = -21;
        setPositions(positions);
      }
      if (positions[1][2] === atPosition) {
        let temparr = positions[1];
        temparr[2] = -31;
        setPositions(positions);
      }
      if (positions[1][3] === atPosition) {
        let temparr = positions[1];
        temparr[3] = -41;
        setPositions(positions);
      }
    }
  };
  const checkIfCutPossibleFor3 = (atPosition) => {
    if (
      atPosition !== 1 &&
      atPosition !== 9 &&
      atPosition !== 14 &&
      atPosition !== 22 &&
      atPosition !== 27 &&
      atPosition !== 35 &&
      atPosition !== 40 &&
      atPosition !== 48
    ) {
      if (positions[3][0] === atPosition) {
        let temparr = positions[3];
        temparr[0] = -13;
        setPositions(positions);
      }
      if (positions[3][1] === atPosition) {
        let temparr = positions[3];
        temparr[1] = -23;
        setPositions(positions);
      }
      if (positions[3][2] === atPosition) {
        let temparr = positions[3];
        temparr[2] = -33;
        setPositions(positions);
      }
      if (positions[3][3] === atPosition) {
        let temparr = positions[3];
        temparr[3] = -43;
        setPositions(positions);
      }
    }
  };

  const checkIfAnythingOpened = (player) => {
    switch (player) {
      case 1:
        return positions[1].every((pos) => pos < 0);
      case 3:
        return positions[3].every((pos) => pos < 0);
      default:
        return false;
    }
  };

  const updateDice1 = async (Dice,) => {
    const roomId = room?.id;
    let UID = User.uid;
    console.log("UID: ", UID)
    const db = getFirestore();
    try {
      const roomRef = doc(db, 'twoPlayerRooms', roomId);
      if (room?.uid1?.uid == UID) {
        let updatedRoom = {
          id: room?.id,
          uid1: {
            dice: Dice,
            turn: false,
            uid: room?.uid1?.uid
          },
          uid2: {
            dice: room?.uid2?.dice,
            turn: true,
            uid: room?.uid2?.uid
          },
          gameState: "InProgress"
        }
        console.log(updatedRoom)
        await updateDoc(roomRef, updatedRoom);
      } else {
        let updatedRoom = {
          id: room?.id,
          uid1: {
            dice: room?.uid1?.dice,
            turn: true,
            uid: room?.uid1?.uid
          },
          uid2: {
            dice: Dice,
            turn: false,
            uid: room?.uid2?.uid
          },
          gameState: "InProgress"
        }
        await updateDoc(roomRef, updatedRoom);
        // setCurrentNumber1(Dice)
        // currentNumber1 = Dice;
        console.log("currentNumber1 in Update Dice: ", currentNumber1)
      }

    } catch (error) {
      Alert.alert('Error Updating Dice', error.message)
    }
  }

  const UpdateDice2 = async (dice) => {
    // setCurrentNumber2(dice)
    // currentNumber2 = dice;
    console.log("UpdateDice2" + "  " +
      turn3 + "  " + isMovedBy1 + "  " + checkIfAnythingOpened(1)
    );
    switch (dice) {
      case 1:
        setImage3(require("./assets/dice1.png"));
        break;
      case 2:
        setImage3(require("./assets/dice2.png"));
        break;
      case 3:
        setImage3(require("./assets/dice3.png"));
        break;
      case 4:
        setImage3(require("./assets/dice4.png"));
        break;
      case 5:
        setImage3(require("./assets/dice5.png"));
        break;
      case 6:
        setImage3(require("./assets/dice6.png"));
        break;
      default:
        break;
    }
    if (dice !== 6) {
      setTurn3(false);
      setTurn1(true);
      setIsMovedBy1(false);
    } else {
      console.log("same conditions must be there");
      setTurn3(false);
    }
  };

  const getDataFromDb = async () => {
    try {
      const db = getFirestore();
      let UID = User.uid;
      const roomRef = doc(db, 'twoPlayerRooms', room?.id);
      const unsubscribe = onSnapshot(roomRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data?.uid1?.uid == UID) {
            if (data?.uid1?.turn == true) {
              UpdateDice2(data?.uid2?.dice);
              // currentNumber1 = data?.uid1?.dice
              // currentNumber2 = data?.uid2?.dice
            }
          } else {
            if (data?.uid2?.turn == true) {
              UpdateDice2(data?.uid1?.dice);
              // currentNumber1 = data?.uid2?.dice
              // currentNumber2 = data?.uid1?.dice
            }
          }

          let room = { ...{ id: roomId }, ...doc.data() };
          setRoom(room)
        } else {
          console.log('No Turn');
        }
      });
      onSnapCreated(true);
      return () => unsubscribe();
    } catch (error) {

    }
  }

  useEffect(() => {
    async function getRoom() {
      await CurrentRoom();
    }
    if (!room) getRoom();
    if (room && !snapCreated) getDataFromDb();
  }, [room])

  const generateRandomNumber = async () => {

    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setTurnMessage("");
    setMoveMessage("");
    console.log("UpdateDice1" + "  " + turn3 + "  " + isMovedBy1 + "  " + checkIfAnythingOpened(1))
    if (turn1 && (isMovedBy3 || checkIfAnythingOpened(3))) {
      setWhoseTurnToMove(1);
      setIsMovedBy1(false);
      switch (randomNumber) {
        case 1:
          setImage1(require("./assets/dice1.png"));
          break;
        case 2:
          setImage1(require("./assets/dice2.png"));
          break;
        case 3:
          setImage1(require("./assets/dice3.png"));
          break;
        case 4:
          setImage1(require("./assets/dice4.png"));
          break;
        case 5:
          setImage1(require("./assets/dice5.png"));
          break;
        case 6:
          setImage1(require("./assets/dice6.png"));
          break;
        default:
          break;
      }
      await updateDice1(randomNumber)
      setCurrentNumber1(randomNumber)
      if (randomNumber !== 6) {
        setTurn1(false);
        setTurn3(true);
        setIsMovedBy3(false);
      }
      else {
        console.log("same conditions must be there");
        setTurn1(false);
      }
    } else {
      setTurnMessage("It's Not Your Turn");
    }

  };

  const checkPosition = (player, whichOne, position) => {
    switch (player) {
      case 1:
        switch (whichOne) {
          case 1:
            if (positions[1][0] === position) {
              //Update Database with position
              return (
                <FontAwesome
                  name="user"
                  style={styles.icons}
                  onPress={() => moveIcon(1, 1, position)}
                  color="red"
                  size={20}
                />
              );
            }
            break;
          case 2:
            if (positions[1][1] === position) {
              //Update Database with position
              return (
                <FontAwesome
                  name="user"
                  style={styles.icons}
                  onPress={() => moveIcon(1, 2, position)}
                  color="red"
                  size={20}
                />
              );
            }
            break;
          case 3:
            if (positions[1][2] === position) {
              //Update Database with position
              return (
                <FontAwesome
                  name="user"
                  style={styles.icons}
                  onPress={() => moveIcon(1, 3, position)}
                  color="red"
                  size={20}
                />
              );
            }
            break;
          case 4:
            if (positions[1][3] === position) {
              //Update Database with position
              return (
                <FontAwesome
                  name="user"
                  style={styles.icons}
                  onPress={() => moveIcon(1, 4, position)}
                  color="red"
                  size={20}
                />
              );
            }
            break;
          default:
            break;
        }
        break;
      case 3:
        //OnSnapshot
        const fetchData = async () => {
          try {
            const db = getFirestore();
            let UID = User.uid
            const roomRef = doc(db, 'twoPlayerRooms', room?.id);
            const unsubscribe = onSnapshot(roomRef, (doc) => {
              if (doc.exists()) {
                const data = doc.data();
                if (data?.uid1?.uid == UID) {
                  if (data?.uid1?.turn == true) {
                    UpdateDice2(data?.uid1?.dice);
                  }
                } else {
                  if (data?.uid2?.turn == true) {
                    UpdateDice2(data?.uid1?.dice);
                  }
                }
                let room = { ...{ id: roomId }, ...doc.data() };
                setRoom(room)
              } else {
                console.log('No Turn');
              }
            });
            onSnapCreated(true);
            return () => unsubscribe();

          } catch (error) {
            console.error('Error fetching player turn:', error);
            Alert.alert('Error PlayerTurn', error.message);
          }
        }
        switch (whichOne) {
          case 1:
            if (positions[3][0] === position) {
              useEffect(() => {
                async function getRoom() {
                  await CurrentRoom();
                }
                if (!room) getRoom();
                if (room && !snapCreated) fetchData();
                moveIcon(3, 1, position)
              }, [position.database])



              return (
                <FontAwesome
                  name="user"
                  style={styles.icons}
                  //onPress={() => moveIcon(3, 1, position) }
                  color="#ed24ae"
                  size={20}
                />
              );
            }
            break;
          case 2:
            if (positions[3][1] === position) {
              return (
                <FontAwesome
                  name="user"
                  style={styles.icons}
                  onPress={() => moveIcon(3, 2, position)}
                  color="#ed24ae"
                  size={20}
                />
              );
            }
            break;
          case 3:
            if (positions[3][2] === position) {
              return (
                <FontAwesome
                  name="user"
                  style={styles.icons}
                  onPress={() => moveIcon(3, 3, position)}
                  color="#ed24ae"
                  size={20}
                />
              );
            }
            break;
          case 4:
            if (positions[3][3] === position) {
              return (
                <FontAwesome
                  name="user"
                  style={styles.icons}
                  onPress={() => moveIcon(3, 4, position)}
                  color="#ed24ae"
                  size={20}
                />
              );
            }
            break;
          default:
            break;
        }
        break;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-col w-10 h-10 mx-2">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.Cancel()}
        >
          <Image source={icons.back}
            resizeMode='contain'
            className="w-10 h-10"
          />
        </TouchableOpacity>
      </View>
      <View className="mt-10 items-center">
        <Text className='text-2xl text-blue-400 font-psemibold'> Welcome to Ludo Master </Text>

        <View style={styles.wholeSetup}>
          {/* =============================== Upper Part ============================= */}

          <View style={row.Style}>
            <View>
              <Animatable.View
                animation={turn1 ? zoomIn : zoomOut}
                duration={500}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (turn1) {
                      if (room) {
                        console.log(room);
                        if (room?.uid1?.uid == User1 && room?.uid1?.turn == true) {
                          generateRandomNumber();
                        } else {
                          if (room?.uid2?.turn == true) {
                            generateRandomNumber();
                          }
                        }
                      }

                    }
                    // updateTurn();
                  }}
                >
                  <Image
                    style={{
                      width: 90,
                      height: 70,
                      marginLeft: 30,
                      marginBottom: 10,
                    }}
                    source={image1}
                  />
                </TouchableOpacity>

                <View
                  style={[
                    Players.styles,
                    {
                      marginLeft: Dimensions.get("window").width / 50,
                      borderRightWidth: 1,
                      marginTop: 2,
                    },
                  ]}
                >
                  <ImageBackground
                    source={require("./assets/hattori.jpeg")}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <View>
                      <View style={row.Style}>
                        <View style={[styles.places]}>
                          <TouchableOpacity>
                            {checkPosition(1, 1, -11)}
                          </TouchableOpacity>
                        </View>
                        <View style={[styles.places, { marginLeft: 90 }]}>
                          <TouchableOpacity>
                            {checkPosition(1, 2, -21)}
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={row.Style}>
                        <View style={[styles.places, { marginTop: 90 }]}>
                          <TouchableOpacity>
                            {checkPosition(1, 3, -31)}
                          </TouchableOpacity>
                        </View>
                        <View
                          style={[
                            styles.places,
                            { marginTop: 90, marginLeft: 90 },
                          ]}
                        >
                          <TouchableOpacity>
                            {checkPosition(1, 4, -41)}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </Animatable.View>
            </View>
            <View style={[row.Style, { marginTop: 82, borderTopWidth: 0 }]}>
              <View style={[styles.first]}>
                <View style={styles.item}>
                  {checkPosition(1, 1, 11)}
                  {checkPosition(1, 2, 11)}
                  {checkPosition(1, 3, 11)}
                  {checkPosition(1, 4, 11)}
                  {checkPosition(2, 1, 11)}
                  {checkPosition(2, 2, 11)}
                  {checkPosition(2, 3, 11)}
                  {checkPosition(2, 4, 11)}
                  {checkPosition(3, 1, 11)}
                  {checkPosition(3, 2, 11)}
                  {checkPosition(3, 3, 11)}
                  {checkPosition(3, 4, 11)}
                  {checkPosition(4, 1, 11)}
                  {checkPosition(4, 2, 11)}
                  {checkPosition(4, 3, 11)}
                  {checkPosition(4, 4, 11)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 10)}
                  {checkPosition(1, 2, 10)}
                  {checkPosition(1, 3, 10)}
                  {checkPosition(1, 4, 10)}
                  {checkPosition(2, 1, 10)}
                  {checkPosition(2, 2, 10)}
                  {checkPosition(2, 3, 10)}
                  {checkPosition(2, 4, 10)}
                  {checkPosition(3, 1, 10)}
                  {checkPosition(3, 2, 10)}
                  {checkPosition(3, 3, 10)}
                  {checkPosition(3, 4, 10)}
                  {checkPosition(4, 1, 10)}
                  {checkPosition(4, 2, 10)}
                  {checkPosition(4, 3, 10)}
                  {checkPosition(4, 4, 10)}
                </View>
                <View style={[styles.item, { backgroundColor: "#9effa5" }]}>
                  {checkPosition(1, 1, 9)}
                  {checkPosition(1, 2, 9)}
                  {checkPosition(1, 3, 9)}
                  {checkPosition(1, 4, 9)}
                  {checkPosition(2, 1, 9)}
                  {checkPosition(2, 2, 9)}
                  {checkPosition(2, 3, 9)}
                  {checkPosition(2, 4, 9)}
                  {checkPosition(3, 1, 9)}
                  {checkPosition(3, 2, 9)}
                  {checkPosition(3, 3, 9)}
                  {checkPosition(3, 4, 9)}
                  {checkPosition(4, 1, 9)}
                  {checkPosition(4, 2, 9)}
                  {checkPosition(4, 3, 9)}
                  {checkPosition(4, 4, 9)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 8)}
                  {checkPosition(1, 2, 8)}
                  {checkPosition(1, 3, 8)}
                  {checkPosition(1, 4, 8)}
                  {checkPosition(2, 1, 8)}
                  {checkPosition(2, 2, 8)}
                  {checkPosition(2, 3, 8)}
                  {checkPosition(2, 4, 8)}
                  {checkPosition(3, 1, 8)}
                  {checkPosition(3, 2, 8)}
                  {checkPosition(3, 3, 8)}
                  {checkPosition(3, 4, 8)}
                  {checkPosition(4, 1, 8)}
                  {checkPosition(4, 2, 8)}
                  {checkPosition(4, 3, 8)}
                  {checkPosition(4, 4, 8)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 7)}
                  {checkPosition(1, 2, 7)}
                  {checkPosition(1, 3, 7)}
                  {checkPosition(1, 4, 7)}
                  {checkPosition(2, 1, 7)}
                  {checkPosition(2, 2, 7)}
                  {checkPosition(2, 3, 7)}
                  {checkPosition(2, 4, 7)}
                  {checkPosition(3, 1, 7)}
                  {checkPosition(3, 2, 7)}
                  {checkPosition(3, 3, 7)}
                  {checkPosition(3, 4, 7)}
                  {checkPosition(4, 1, 7)}
                  {checkPosition(4, 2, 7)}
                  {checkPosition(4, 3, 7)}
                  {checkPosition(4, 4, 7)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 6)}
                  {checkPosition(1, 2, 6)}
                  {checkPosition(1, 3, 6)}
                  {checkPosition(1, 4, 6)}
                  {checkPosition(2, 1, 6)}
                  {checkPosition(2, 2, 6)}
                  {checkPosition(2, 3, 6)}
                  {checkPosition(2, 4, 6)}
                  {checkPosition(3, 1, 6)}
                  {checkPosition(3, 2, 6)}
                  {checkPosition(3, 3, 6)}
                  {checkPosition(3, 4, 6)}
                  {checkPosition(4, 1, 6)}
                  {checkPosition(4, 2, 6)}
                  {checkPosition(4, 3, 6)}
                  {checkPosition(4, 4, 6)}
                </View>
              </View>
              <View style={[styles.second]}>
                <View style={styles.item}>
                  {checkPosition(1, 1, 12)}
                  {checkPosition(1, 2, 12)}
                  {checkPosition(1, 3, 12)}
                  {checkPosition(1, 4, 12)}
                  {checkPosition(2, 1, 12)}
                  {checkPosition(2, 2, 12)}
                  {checkPosition(2, 3, 12)}
                  {checkPosition(2, 4, 12)}
                  {checkPosition(3, 1, 12)}
                  {checkPosition(3, 2, 12)}
                  {checkPosition(3, 3, 12)}
                  {checkPosition(3, 4, 12)}
                  {checkPosition(4, 1, 12)}
                  {checkPosition(4, 2, 12)}
                  {checkPosition(4, 3, 12)}
                  {checkPosition(4, 4, 12)}
                </View>
                <View style={[styles.item, styles.green]}>
                  {checkPosition(1, 1, 58)}
                  {checkPosition(1, 2, 58)}
                  {checkPosition(1, 3, 58)}
                  {checkPosition(1, 4, 58)}
                  {checkPosition(2, 1, 58)}
                  {checkPosition(2, 2, 58)}
                  {checkPosition(2, 3, 58)}
                  {checkPosition(2, 4, 58)}
                  {checkPosition(3, 1, 58)}
                  {checkPosition(3, 2, 58)}
                  {checkPosition(3, 3, 58)}
                  {checkPosition(3, 4, 58)}
                  {checkPosition(4, 1, 58)}
                  {checkPosition(4, 2, 58)}
                  {checkPosition(4, 3, 58)}
                  {checkPosition(4, 4, 58)}
                </View>
                <View style={[styles.item, styles.green]}>
                  {checkPosition(1, 1, 59)}
                  {checkPosition(1, 2, 59)}
                  {checkPosition(1, 3, 59)}
                  {checkPosition(1, 4, 59)}
                  {checkPosition(2, 1, 59)}
                  {checkPosition(2, 2, 59)}
                  {checkPosition(2, 3, 59)}
                  {checkPosition(2, 4, 59)}
                  {checkPosition(3, 1, 59)}
                  {checkPosition(3, 2, 59)}
                  {checkPosition(3, 3, 59)}
                  {checkPosition(3, 4, 59)}
                  {checkPosition(4, 1, 59)}
                  {checkPosition(4, 2, 59)}
                  {checkPosition(4, 3, 59)}
                  {checkPosition(4, 4, 59)}
                </View>
                <View style={[styles.item, styles.green]}>
                  {checkPosition(1, 1, 60)}
                  {checkPosition(1, 2, 60)}
                  {checkPosition(1, 3, 60)}
                  {checkPosition(1, 4, 60)}
                  {checkPosition(2, 1, 60)}
                  {checkPosition(2, 2, 60)}
                  {checkPosition(2, 3, 60)}
                  {checkPosition(2, 4, 60)}
                  {checkPosition(3, 1, 60)}
                  {checkPosition(3, 2, 60)}
                  {checkPosition(3, 3, 60)}
                  {checkPosition(3, 4, 60)}
                  {checkPosition(4, 1, 60)}
                  {checkPosition(4, 2, 60)}
                  {checkPosition(4, 3, 60)}
                  {checkPosition(4, 4, 60)}
                </View>
                <View style={[styles.item, styles.green]}>
                  {checkPosition(1, 1, 61)}
                  {checkPosition(1, 2, 61)}
                  {checkPosition(1, 3, 61)}
                  {checkPosition(1, 4, 61)}
                  {checkPosition(2, 1, 61)}
                  {checkPosition(2, 2, 61)}
                  {checkPosition(2, 3, 61)}
                  {checkPosition(2, 4, 61)}
                  {checkPosition(3, 1, 61)}
                  {checkPosition(3, 2, 61)}
                  {checkPosition(3, 3, 61)}
                  {checkPosition(3, 4, 61)}
                  {checkPosition(4, 1, 61)}
                  {checkPosition(4, 2, 61)}
                  {checkPosition(4, 3, 61)}
                  {checkPosition(4, 4, 61)}
                </View>
                <View style={[styles.item, styles.green]}>
                  {checkPosition(1, 1, 62)}
                  {checkPosition(1, 2, 62)}
                  {checkPosition(1, 3, 62)}
                  {checkPosition(1, 4, 62)}
                  {checkPosition(2, 1, 62)}
                  {checkPosition(2, 2, 62)}
                  {checkPosition(2, 3, 62)}
                  {checkPosition(2, 4, 62)}
                  {checkPosition(3, 1, 62)}
                  {checkPosition(3, 2, 62)}
                  {checkPosition(3, 3, 62)}
                  {checkPosition(3, 4, 62)}
                  {checkPosition(4, 1, 62)}
                  {checkPosition(4, 2, 62)}
                  {checkPosition(4, 3, 62)}
                  {checkPosition(4, 4, 62)}
                </View>
              </View>
              <View style={[styles.third]}>
                <View style={styles.item}>
                  {checkPosition(1, 1, 13)}
                  {checkPosition(1, 2, 13)}
                  {checkPosition(1, 3, 13)}
                  {checkPosition(1, 4, 13)}
                  {checkPosition(2, 1, 13)}
                  {checkPosition(2, 2, 13)}
                  {checkPosition(2, 3, 13)}
                  {checkPosition(2, 4, 13)}
                  {checkPosition(3, 1, 13)}
                  {checkPosition(3, 2, 13)}
                  {checkPosition(3, 3, 13)}
                  {checkPosition(3, 4, 13)}
                  {checkPosition(4, 1, 13)}
                  {checkPosition(4, 2, 13)}
                  {checkPosition(4, 3, 13)}
                  {checkPosition(4, 4, 13)}
                </View>
                <View style={[styles.item, { backgroundColor: "#9effa5" }]}>
                  {checkPosition(1, 1, 14)}
                  {checkPosition(1, 2, 14)}
                  {checkPosition(1, 3, 14)}
                  {checkPosition(1, 4, 14)}
                  {checkPosition(2, 1, 14)}
                  {checkPosition(2, 2, 14)}
                  {checkPosition(2, 3, 14)}
                  {checkPosition(2, 4, 14)}
                  {checkPosition(3, 1, 14)}
                  {checkPosition(3, 2, 14)}
                  {checkPosition(3, 3, 14)}
                  {checkPosition(3, 4, 14)}
                  {checkPosition(4, 1, 14)}
                  {checkPosition(4, 2, 14)}
                  {checkPosition(4, 3, 14)}
                  {checkPosition(4, 4, 14)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 15)}
                  {checkPosition(1, 2, 15)}
                  {checkPosition(1, 3, 15)}
                  {checkPosition(1, 4, 15)}
                  {checkPosition(2, 1, 15)}
                  {checkPosition(2, 2, 15)}
                  {checkPosition(2, 3, 15)}
                  {checkPosition(2, 4, 15)}
                  {checkPosition(3, 1, 15)}
                  {checkPosition(3, 2, 15)}
                  {checkPosition(3, 3, 15)}
                  {checkPosition(3, 4, 15)}
                  {checkPosition(4, 1, 15)}
                  {checkPosition(4, 2, 15)}
                  {checkPosition(4, 3, 15)}
                  {checkPosition(4, 4, 15)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 16)}
                  {checkPosition(1, 2, 16)}
                  {checkPosition(1, 3, 16)}
                  {checkPosition(1, 4, 16)}
                  {checkPosition(2, 1, 16)}
                  {checkPosition(2, 2, 16)}
                  {checkPosition(2, 3, 16)}
                  {checkPosition(2, 4, 16)}
                  {checkPosition(3, 1, 16)}
                  {checkPosition(3, 2, 16)}
                  {checkPosition(3, 3, 16)}
                  {checkPosition(3, 4, 16)}
                  {checkPosition(4, 1, 16)}
                  {checkPosition(4, 2, 16)}
                  {checkPosition(4, 3, 16)}
                  {checkPosition(4, 4, 16)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 17)}
                  {checkPosition(1, 2, 17)}
                  {checkPosition(1, 3, 17)}
                  {checkPosition(1, 4, 17)}
                  {checkPosition(2, 1, 17)}
                  {checkPosition(2, 2, 17)}
                  {checkPosition(2, 3, 17)}
                  {checkPosition(2, 4, 17)}
                  {checkPosition(3, 1, 17)}
                  {checkPosition(3, 2, 17)}
                  {checkPosition(3, 3, 17)}
                  {checkPosition(3, 4, 17)}
                  {checkPosition(4, 1, 17)}
                  {checkPosition(4, 2, 17)}
                  {checkPosition(4, 3, 17)}
                  {checkPosition(4, 4, 17)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 18)}
                  {checkPosition(1, 2, 18)}
                  {checkPosition(1, 3, 18)}
                  {checkPosition(1, 4, 18)}
                  {checkPosition(2, 1, 18)}
                  {checkPosition(2, 2, 18)}
                  {checkPosition(2, 3, 18)}
                  {checkPosition(2, 4, 18)}
                  {checkPosition(3, 1, 18)}
                  {checkPosition(3, 2, 18)}
                  {checkPosition(3, 3, 18)}
                  {checkPosition(3, 4, 18)}
                  {checkPosition(4, 1, 18)}
                  {checkPosition(4, 2, 18)}
                  {checkPosition(4, 3, 18)}
                  {checkPosition(4, 4, 18)}
                </View>
              </View>
              <View>
                <View
                  style={[
                    Players.styles,
                    {
                      marginLeft: Dimensions.get("window").width / 50,
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  <ImageBackground
                    source={require("./assets/tomJerry.png")}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <View>
                      <View style={row.Style}>
                        <View style={styles.places}>
                          <TouchableOpacity>
                            {checkPosition(4, 1, -14)}
                          </TouchableOpacity>
                        </View>
                        <View style={[styles.places, { marginLeft: 90 }]}>
                          <TouchableOpacity>
                            {checkPosition(4, 2, -24)}
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={row.Style}>
                        <View style={[styles.places, { marginTop: 90 }]}>
                          <TouchableOpacity>
                            {checkPosition(4, 3, -34)}
                          </TouchableOpacity>
                        </View>
                        <View
                          style={[
                            styles.places,
                            { marginLeft: 90, marginTop: 90 },
                          ]}
                        >
                          <TouchableOpacity>
                            {checkPosition(4, 4, -44)}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </View>
            </View>
          </View>
          {/* =============================== Middle Part =============================== */}
          <View style={row.Style}>
            {/* ============================= First Triplet ============================== */}
            <View style={styles.First}>
              <View style={[row.Style, { borderLeftWidth: 2 }]}>
                <View style={styles.item}>
                  {checkPosition(1, 1, 52)}
                  {checkPosition(1, 2, 52)}
                  {checkPosition(1, 3, 52)}
                  {checkPosition(1, 4, 52)}
                  {checkPosition(2, 1, 52)}
                  {checkPosition(2, 2, 52)}
                  {checkPosition(2, 3, 52)}
                  {checkPosition(2, 4, 52)}
                  {checkPosition(3, 1, 52)}
                  {checkPosition(3, 2, 52)}
                  {checkPosition(3, 3, 52)}
                  {checkPosition(3, 4, 52)}
                  {checkPosition(4, 1, 52)}
                  {checkPosition(4, 2, 52)}
                  {checkPosition(4, 3, 52)}
                  {checkPosition(4, 4, 52)}
                </View>
                <View
                  style={[
                    styles.item,
                    styles.red,
                    { backgroundColor: "#fa9daa" },
                  ]}
                >
                  {checkPosition(1, 1, 1)}
                  {checkPosition(1, 2, 1)}
                  {checkPosition(1, 3, 1)}
                  {checkPosition(1, 4, 1)}
                  {checkPosition(2, 1, 1)}
                  {checkPosition(2, 2, 1)}
                  {checkPosition(2, 3, 1)}
                  {checkPosition(2, 4, 1)}
                  {checkPosition(3, 1, 1)}
                  {checkPosition(3, 2, 1)}
                  {checkPosition(3, 3, 1)}
                  {checkPosition(3, 4, 1)}
                  {checkPosition(4, 1, 1)}
                  {checkPosition(4, 2, 1)}
                  {checkPosition(4, 3, 1)}
                  {checkPosition(4, 4, 1)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 2)}
                  {checkPosition(1, 2, 2)}
                  {checkPosition(1, 3, 2)}
                  {checkPosition(1, 4, 2)}
                  {checkPosition(2, 1, 2)}
                  {checkPosition(2, 2, 2)}
                  {checkPosition(2, 3, 2)}
                  {checkPosition(2, 4, 2)}
                  {checkPosition(3, 1, 2)}
                  {checkPosition(3, 2, 2)}
                  {checkPosition(3, 3, 2)}
                  {checkPosition(3, 4, 2)}
                  {checkPosition(4, 1, 2)}
                  {checkPosition(4, 2, 2)}
                  {checkPosition(4, 3, 2)}
                  {checkPosition(4, 4, 2)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 3)}
                  {checkPosition(1, 2, 3)}
                  {checkPosition(1, 3, 3)}
                  {checkPosition(1, 4, 3)}
                  {checkPosition(2, 1, 3)}
                  {checkPosition(2, 2, 3)}
                  {checkPosition(2, 3, 3)}
                  {checkPosition(2, 4, 3)}
                  {checkPosition(3, 1, 3)}
                  {checkPosition(3, 2, 3)}
                  {checkPosition(3, 3, 3)}
                  {checkPosition(3, 4, 3)}
                  {checkPosition(4, 1, 3)}
                  {checkPosition(4, 2, 3)}
                  {checkPosition(4, 3, 3)}
                  {checkPosition(4, 4, 3)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 4)}
                  {checkPosition(1, 2, 4)}
                  {checkPosition(1, 3, 4)}
                  {checkPosition(1, 4, 4)}
                  {checkPosition(2, 1, 4)}
                  {checkPosition(2, 2, 4)}
                  {checkPosition(2, 3, 4)}
                  {checkPosition(2, 4, 4)}
                  {checkPosition(3, 1, 4)}
                  {checkPosition(3, 2, 4)}
                  {checkPosition(3, 3, 4)}
                  {checkPosition(3, 4, 4)}
                  {checkPosition(4, 1, 4)}
                  {checkPosition(4, 2, 4)}
                  {checkPosition(4, 3, 4)}
                  {checkPosition(4, 4, 4)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 5)}
                  {checkPosition(1, 2, 5)}
                  {checkPosition(1, 3, 5)}
                  {checkPosition(1, 4, 5)}
                  {checkPosition(2, 1, 5)}
                  {checkPosition(2, 2, 5)}
                  {checkPosition(2, 3, 5)}
                  {checkPosition(2, 4, 5)}
                  {checkPosition(3, 1, 5)}
                  {checkPosition(3, 2, 5)}
                  {checkPosition(3, 3, 5)}
                  {checkPosition(3, 4, 5)}
                  {checkPosition(4, 1, 5)}
                  {checkPosition(4, 2, 5)}
                  {checkPosition(4, 3, 5)}
                  {checkPosition(4, 4, 5)}
                </View>
              </View>
              <View style={[row.Style, { borderLeftWidth: 2 }]}>
                <View style={styles.item}>
                  {checkPosition(1, 1, 51)}
                  {checkPosition(1, 2, 51)}
                  {checkPosition(1, 3, 51)}
                  {checkPosition(1, 4, 51)}
                  {checkPosition(2, 1, 51)}
                  {checkPosition(2, 2, 51)}
                  {checkPosition(2, 3, 51)}
                  {checkPosition(2, 4, 51)}
                  {checkPosition(3, 1, 51)}
                  {checkPosition(3, 2, 51)}
                  {checkPosition(3, 3, 51)}
                  {checkPosition(3, 4, 51)}
                  {checkPosition(4, 1, 51)}
                  {checkPosition(4, 2, 51)}
                  {checkPosition(4, 3, 51)}
                  {checkPosition(4, 4, 51)}
                </View>
                <View style={[styles.item, styles.red]}>
                  {checkPosition(1, 1, 53)}
                  {checkPosition(1, 2, 53)}
                  {checkPosition(1, 3, 53)}
                  {checkPosition(1, 4, 53)}
                  {checkPosition(2, 1, 53)}
                  {checkPosition(2, 2, 53)}
                  {checkPosition(2, 3, 53)}
                  {checkPosition(2, 4, 53)}
                  {checkPosition(3, 1, 53)}
                  {checkPosition(3, 2, 53)}
                  {checkPosition(3, 3, 53)}
                  {checkPosition(3, 4, 53)}
                  {checkPosition(4, 1, 53)}
                  {checkPosition(4, 2, 53)}
                  {checkPosition(4, 3, 53)}
                  {checkPosition(4, 4, 53)}
                </View>
                <View style={[styles.item, styles.red]}>
                  {checkPosition(1, 1, 54)}
                  {checkPosition(1, 2, 54)}
                  {checkPosition(1, 3, 54)}
                  {checkPosition(1, 4, 54)}
                  {checkPosition(2, 1, 54)}
                  {checkPosition(2, 2, 54)}
                  {checkPosition(2, 3, 54)}
                  {checkPosition(2, 4, 54)}
                  {checkPosition(3, 1, 54)}
                  {checkPosition(3, 2, 54)}
                  {checkPosition(3, 3, 54)}
                  {checkPosition(3, 4, 54)}
                  {checkPosition(4, 1, 54)}
                  {checkPosition(4, 2, 54)}
                  {checkPosition(4, 3, 54)}
                  {checkPosition(4, 4, 54)}
                </View>
                <View style={[styles.item, styles.red]}>
                  {checkPosition(1, 1, 55)}
                  {checkPosition(1, 2, 55)}
                  {checkPosition(1, 3, 55)}
                  {checkPosition(1, 4, 55)}
                  {checkPosition(2, 1, 55)}
                  {checkPosition(2, 2, 55)}
                  {checkPosition(2, 3, 55)}
                  {checkPosition(2, 4, 55)}
                  {checkPosition(3, 1, 55)}
                  {checkPosition(3, 2, 55)}
                  {checkPosition(3, 3, 55)}
                  {checkPosition(3, 4, 55)}
                  {checkPosition(4, 1, 55)}
                  {checkPosition(4, 2, 55)}
                  {checkPosition(4, 3, 55)}
                  {checkPosition(4, 4, 55)}
                </View>
                <View style={[styles.item, styles.red]}>
                  {checkPosition(1, 1, 56)}
                  {checkPosition(1, 2, 56)}
                  {checkPosition(1, 3, 56)}
                  {checkPosition(1, 4, 56)}
                  {checkPosition(2, 1, 56)}
                  {checkPosition(2, 2, 56)}
                  {checkPosition(2, 3, 56)}
                  {checkPosition(2, 4, 56)}
                  {checkPosition(3, 1, 56)}
                  {checkPosition(3, 2, 56)}
                  {checkPosition(3, 3, 56)}
                  {checkPosition(3, 4, 56)}
                  {checkPosition(4, 1, 56)}
                  {checkPosition(4, 2, 56)}
                  {checkPosition(4, 3, 56)}
                  {checkPosition(4, 4, 56)}
                </View>
                <View style={[styles.item, styles.red]}>
                  {checkPosition(1, 1, 57)}
                  {checkPosition(1, 2, 57)}
                  {checkPosition(1, 3, 57)}
                  {checkPosition(1, 4, 57)}
                  {checkPosition(2, 1, 57)}
                  {checkPosition(2, 2, 57)}
                  {checkPosition(2, 3, 57)}
                  {checkPosition(2, 4, 57)}
                  {checkPosition(3, 1, 57)}
                  {checkPosition(3, 2, 57)}
                  {checkPosition(3, 3, 57)}
                  {checkPosition(3, 4, 57)}
                  {checkPosition(4, 1, 57)}
                  {checkPosition(4, 2, 57)}
                  {checkPosition(4, 3, 57)}
                  {checkPosition(4, 4, 57)}
                </View>
              </View>
              <View style={[row.Style, { borderLeftWidth: 2 }]}>
                <View style={styles.item}>
                  {checkPosition(1, 1, 50)}
                  {checkPosition(1, 2, 50)}
                  {checkPosition(1, 3, 50)}
                  {checkPosition(1, 4, 50)}
                  {checkPosition(2, 1, 50)}
                  {checkPosition(2, 2, 50)}
                  {checkPosition(2, 3, 50)}
                  {checkPosition(2, 4, 50)}
                  {checkPosition(3, 1, 50)}
                  {checkPosition(3, 2, 50)}
                  {checkPosition(3, 3, 50)}
                  {checkPosition(3, 4, 50)}
                  {checkPosition(4, 1, 50)}
                  {checkPosition(4, 2, 50)}
                  {checkPosition(4, 3, 50)}
                  {checkPosition(4, 4, 50)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 49)}
                  {checkPosition(1, 2, 49)}
                  {checkPosition(1, 3, 49)}
                  {checkPosition(1, 4, 49)}
                  {checkPosition(2, 1, 49)}
                  {checkPosition(2, 2, 49)}
                  {checkPosition(2, 3, 49)}
                  {checkPosition(2, 4, 49)}
                  {checkPosition(3, 1, 49)}
                  {checkPosition(3, 2, 49)}
                  {checkPosition(3, 3, 49)}
                  {checkPosition(3, 4, 49)}
                  {checkPosition(4, 1, 49)}
                  {checkPosition(4, 2, 49)}
                  {checkPosition(4, 3, 49)}
                  {checkPosition(4, 4, 49)}
                </View>
                <View style={[styles.item, { backgroundColor: "#fa9daa" }]}>
                  {checkPosition(1, 1, 48)}
                  {checkPosition(1, 2, 48)}
                  {checkPosition(1, 3, 48)}
                  {checkPosition(1, 4, 48)}
                  {checkPosition(2, 1, 48)}
                  {checkPosition(2, 2, 48)}
                  {checkPosition(2, 3, 48)}
                  {checkPosition(2, 4, 48)}
                  {checkPosition(3, 1, 48)}
                  {checkPosition(3, 2, 48)}
                  {checkPosition(3, 3, 48)}
                  {checkPosition(3, 4, 48)}
                  {checkPosition(4, 1, 48)}
                  {checkPosition(4, 2, 48)}
                  {checkPosition(4, 3, 48)}
                  {checkPosition(4, 4, 48)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 47)}
                  {checkPosition(1, 2, 47)}
                  {checkPosition(1, 3, 47)}
                  {checkPosition(1, 4, 47)}
                  {checkPosition(2, 1, 47)}
                  {checkPosition(2, 2, 47)}
                  {checkPosition(2, 3, 47)}
                  {checkPosition(2, 4, 47)}
                  {checkPosition(3, 1, 47)}
                  {checkPosition(3, 2, 47)}
                  {checkPosition(3, 3, 47)}
                  {checkPosition(3, 4, 47)}
                  {checkPosition(4, 1, 47)}
                  {checkPosition(4, 2, 47)}
                  {checkPosition(4, 3, 47)}
                  {checkPosition(4, 4, 47)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 46)}
                  {checkPosition(1, 2, 46)}
                  {checkPosition(1, 3, 46)}
                  {checkPosition(1, 4, 46)}
                  {checkPosition(2, 1, 46)}
                  {checkPosition(2, 2, 46)}
                  {checkPosition(2, 3, 46)}
                  {checkPosition(2, 4, 46)}
                  {checkPosition(3, 1, 46)}
                  {checkPosition(3, 2, 46)}
                  {checkPosition(3, 3, 46)}
                  {checkPosition(3, 4, 46)}
                  {checkPosition(4, 1, 46)}
                  {checkPosition(4, 2, 46)}
                  {checkPosition(4, 3, 46)}
                  {checkPosition(4, 4, 46)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 45)}
                  {checkPosition(1, 2, 45)}
                  {checkPosition(1, 3, 45)}
                  {checkPosition(1, 4, 45)}
                  {checkPosition(2, 1, 45)}
                  {checkPosition(2, 2, 45)}
                  {checkPosition(2, 3, 45)}
                  {checkPosition(2, 4, 45)}
                  {checkPosition(3, 1, 45)}
                  {checkPosition(3, 2, 45)}
                  {checkPosition(3, 3, 45)}
                  {checkPosition(3, 4, 45)}
                  {checkPosition(4, 1, 45)}
                  {checkPosition(4, 2, 45)}
                  {checkPosition(4, 3, 45)}
                  {checkPosition(4, 4, 45)}
                </View>
              </View>
            </View>
            {/* ============================= Winner Zone =========================== */}
            <View style={styles.winnerZone}>
              <View>
                {checkPosition(1, 1, "winner")}
                {checkPosition(2, 1, "winner")}
                {checkPosition(3, 1, "winner")}
                {checkPosition(4, 1, "winner")}
              </View>
              <View>
                {checkPosition(2, 2, "winner")}
                {checkPosition(1, 2, "winner")}
                {checkPosition(3, 2, "winner")}
                {checkPosition(4, 2, "winner")}
              </View>
              <View>
                {checkPosition(3, 3, "winner")}
                {checkPosition(1, 3, "winner")}
                {checkPosition(2, 3, "winner")}
                {checkPosition(4, 3, "winner")}
              </View>
              <View>
                {checkPosition(4, 4, "winner")}
                {checkPosition(1, 4, "winner")}
                {checkPosition(2, 4, "winner")}
                {checkPosition(3, 4, "winner")}
              </View>
            </View>
            {/* ============================== Last Triplet */}
            <View style={styles.Second}>
              <View style={[row.Style, { borderRightWidth: 2 }]}>
                <View style={styles.item}>
                  {checkPosition(1, 1, 19)}
                  {checkPosition(1, 2, 19)}
                  {checkPosition(1, 3, 19)}
                  {checkPosition(1, 4, 19)}
                  {checkPosition(2, 1, 19)}
                  {checkPosition(2, 2, 19)}
                  {checkPosition(2, 3, 19)}
                  {checkPosition(2, 4, 19)}
                  {checkPosition(3, 1, 19)}
                  {checkPosition(3, 2, 19)}
                  {checkPosition(3, 3, 19)}
                  {checkPosition(3, 4, 19)}
                  {checkPosition(4, 1, 19)}
                  {checkPosition(4, 2, 19)}
                  {checkPosition(4, 3, 19)}
                  {checkPosition(4, 4, 19)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 20)}
                  {checkPosition(1, 2, 20)}
                  {checkPosition(1, 3, 20)}
                  {checkPosition(1, 4, 20)}
                  {checkPosition(2, 1, 20)}
                  {checkPosition(2, 2, 20)}
                  {checkPosition(2, 3, 20)}
                  {checkPosition(2, 4, 20)}
                  {checkPosition(3, 1, 20)}
                  {checkPosition(3, 2, 20)}
                  {checkPosition(3, 3, 20)}
                  {checkPosition(3, 4, 20)}
                  {checkPosition(4, 1, 20)}
                  {checkPosition(4, 2, 20)}
                  {checkPosition(4, 3, 20)}
                  {checkPosition(4, 4, 20)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 21)}
                  {checkPosition(1, 2, 21)}
                  {checkPosition(1, 3, 21)}
                  {checkPosition(1, 4, 21)}
                  {checkPosition(2, 1, 21)}
                  {checkPosition(2, 2, 21)}
                  {checkPosition(2, 3, 21)}
                  {checkPosition(2, 4, 21)}
                  {checkPosition(3, 1, 21)}
                  {checkPosition(3, 2, 21)}
                  {checkPosition(3, 3, 21)}
                  {checkPosition(3, 4, 21)}
                  {checkPosition(4, 1, 21)}
                  {checkPosition(4, 2, 21)}
                  {checkPosition(4, 3, 21)}
                  {checkPosition(4, 4, 21)}
                </View>
                <View style={[styles.item, { backgroundColor: "#ffcff0" }]}>
                  {checkPosition(1, 1, 22)}
                  {checkPosition(1, 2, 22)}
                  {checkPosition(1, 3, 22)}
                  {checkPosition(1, 4, 22)}
                  {checkPosition(2, 1, 22)}
                  {checkPosition(2, 2, 22)}
                  {checkPosition(2, 3, 22)}
                  {checkPosition(2, 4, 22)}
                  {checkPosition(3, 1, 22)}
                  {checkPosition(3, 2, 22)}
                  {checkPosition(3, 3, 22)}
                  {checkPosition(3, 4, 22)}
                  {checkPosition(4, 1, 22)}
                  {checkPosition(4, 2, 22)}
                  {checkPosition(4, 3, 22)}
                  {checkPosition(4, 4, 22)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 23)}
                  {checkPosition(1, 2, 23)}
                  {checkPosition(1, 3, 23)}
                  {checkPosition(1, 4, 23)}
                  {checkPosition(2, 1, 23)}
                  {checkPosition(2, 2, 23)}
                  {checkPosition(2, 3, 23)}
                  {checkPosition(2, 4, 23)}
                  {checkPosition(3, 1, 23)}
                  {checkPosition(3, 2, 23)}
                  {checkPosition(3, 3, 23)}
                  {checkPosition(3, 4, 23)}
                  {checkPosition(4, 1, 23)}
                  {checkPosition(4, 2, 23)}
                  {checkPosition(4, 3, 23)}
                  {checkPosition(4, 4, 23)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 24)}
                  {checkPosition(1, 2, 24)}
                  {checkPosition(1, 3, 24)}
                  {checkPosition(1, 4, 24)}
                  {checkPosition(2, 1, 24)}
                  {checkPosition(2, 2, 24)}
                  {checkPosition(2, 3, 24)}
                  {checkPosition(2, 4, 24)}
                  {checkPosition(3, 1, 24)}
                  {checkPosition(3, 2, 24)}
                  {checkPosition(3, 3, 24)}
                  {checkPosition(3, 4, 24)}
                  {checkPosition(4, 1, 24)}
                  {checkPosition(4, 2, 24)}
                  {checkPosition(4, 3, 24)}
                  {checkPosition(4, 4, 24)}
                </View>
              </View>
              <View style={[row.Style, { borderRightWidth: 2 }]}>
                <View style={[styles.item, styles.orange]}>
                  {checkPosition(1, 1, 67)}
                  {checkPosition(1, 2, 67)}
                  {checkPosition(1, 3, 67)}
                  {checkPosition(1, 4, 67)}
                  {checkPosition(2, 1, 67)}
                  {checkPosition(2, 2, 67)}
                  {checkPosition(2, 3, 67)}
                  {checkPosition(2, 4, 67)}
                  {checkPosition(3, 1, 67)}
                  {checkPosition(3, 2, 67)}
                  {checkPosition(3, 3, 67)}
                  {checkPosition(3, 4, 67)}
                  {checkPosition(4, 1, 67)}
                  {checkPosition(4, 2, 67)}
                  {checkPosition(4, 3, 67)}
                  {checkPosition(4, 4, 67)}
                </View>
                <View style={[styles.item, styles.orange]}>
                  {checkPosition(1, 1, 66)}
                  {checkPosition(1, 2, 66)}
                  {checkPosition(1, 3, 66)}
                  {checkPosition(1, 4, 66)}
                  {checkPosition(2, 1, 66)}
                  {checkPosition(2, 2, 66)}
                  {checkPosition(2, 3, 66)}
                  {checkPosition(2, 4, 66)}
                  {checkPosition(3, 1, 66)}
                  {checkPosition(3, 2, 66)}
                  {checkPosition(3, 3, 66)}
                  {checkPosition(3, 4, 66)}
                  {checkPosition(4, 1, 66)}
                  {checkPosition(4, 2, 66)}
                  {checkPosition(4, 3, 66)}
                  {checkPosition(4, 4, 66)}
                </View>
                <View style={[styles.item, styles.orange]}>
                  {checkPosition(1, 1, 65)}
                  {checkPosition(1, 2, 65)}
                  {checkPosition(1, 3, 65)}
                  {checkPosition(1, 4, 65)}
                  {checkPosition(2, 1, 65)}
                  {checkPosition(2, 2, 65)}
                  {checkPosition(2, 3, 65)}
                  {checkPosition(2, 4, 65)}
                  {checkPosition(3, 1, 65)}
                  {checkPosition(3, 2, 65)}
                  {checkPosition(3, 3, 65)}
                  {checkPosition(3, 4, 65)}
                  {checkPosition(4, 1, 65)}
                  {checkPosition(4, 2, 65)}
                  {checkPosition(4, 3, 65)}
                  {checkPosition(4, 4, 65)}
                </View>
                <View style={[styles.item, styles.orange]}>
                  {checkPosition(1, 1, 64)}
                  {checkPosition(1, 2, 64)}
                  {checkPosition(1, 3, 64)}
                  {checkPosition(1, 4, 64)}
                  {checkPosition(2, 1, 64)}
                  {checkPosition(2, 2, 64)}
                  {checkPosition(2, 3, 64)}
                  {checkPosition(2, 4, 64)}
                  {checkPosition(3, 1, 64)}
                  {checkPosition(3, 2, 64)}
                  {checkPosition(3, 3, 64)}
                  {checkPosition(3, 4, 64)}
                  {checkPosition(4, 1, 64)}
                  {checkPosition(4, 2, 64)}
                  {checkPosition(4, 3, 64)}
                  {checkPosition(4, 4, 64)}
                </View>
                <View style={[styles.item, styles.orange]}>
                  {checkPosition(1, 1, 63)}
                  {checkPosition(1, 2, 63)}
                  {checkPosition(1, 3, 63)}
                  {checkPosition(1, 4, 63)}
                  {checkPosition(2, 1, 63)}
                  {checkPosition(2, 2, 63)}
                  {checkPosition(2, 3, 63)}
                  {checkPosition(2, 4, 63)}
                  {checkPosition(3, 1, 63)}
                  {checkPosition(3, 2, 63)}
                  {checkPosition(3, 3, 63)}
                  {checkPosition(3, 4, 63)}
                  {checkPosition(4, 1, 63)}
                  {checkPosition(4, 2, 63)}
                  {checkPosition(4, 3, 63)}
                  {checkPosition(4, 4, 63)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 25)}
                  {checkPosition(1, 2, 25)}
                  {checkPosition(1, 3, 25)}
                  {checkPosition(1, 4, 25)}
                  {checkPosition(2, 1, 25)}
                  {checkPosition(2, 2, 25)}
                  {checkPosition(2, 3, 25)}
                  {checkPosition(2, 4, 25)}
                  {checkPosition(3, 1, 25)}
                  {checkPosition(3, 2, 25)}
                  {checkPosition(3, 3, 25)}
                  {checkPosition(3, 4, 25)}
                  {checkPosition(4, 1, 25)}
                  {checkPosition(4, 2, 25)}
                  {checkPosition(4, 3, 25)}
                  {checkPosition(4, 4, 25)}
                </View>
              </View>
              <View style={[row.Style, { borderRightWidth: 2 }]}>
                <View style={styles.item}>
                  {checkPosition(1, 1, 31)}
                  {checkPosition(1, 2, 31)}
                  {checkPosition(1, 3, 31)}
                  {checkPosition(1, 4, 31)}
                  {checkPosition(2, 1, 31)}
                  {checkPosition(2, 2, 31)}
                  {checkPosition(2, 3, 31)}
                  {checkPosition(2, 4, 31)}
                  {checkPosition(3, 1, 31)}
                  {checkPosition(3, 2, 31)}
                  {checkPosition(3, 3, 31)}
                  {checkPosition(3, 4, 31)}
                  {checkPosition(4, 1, 31)}
                  {checkPosition(4, 2, 31)}
                  {checkPosition(4, 3, 31)}
                  {checkPosition(4, 4, 31)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 30)}
                  {checkPosition(1, 2, 30)}
                  {checkPosition(1, 3, 30)}
                  {checkPosition(1, 4, 30)}
                  {checkPosition(2, 1, 30)}
                  {checkPosition(2, 2, 30)}
                  {checkPosition(2, 3, 30)}
                  {checkPosition(2, 4, 30)}
                  {checkPosition(3, 1, 30)}
                  {checkPosition(3, 2, 30)}
                  {checkPosition(3, 3, 30)}
                  {checkPosition(3, 4, 30)}
                  {checkPosition(4, 1, 30)}
                  {checkPosition(4, 2, 30)}
                  {checkPosition(4, 3, 30)}
                  {checkPosition(4, 4, 30)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 29)}
                  {checkPosition(1, 2, 29)}
                  {checkPosition(1, 3, 29)}
                  {checkPosition(1, 4, 29)}
                  {checkPosition(2, 1, 29)}
                  {checkPosition(2, 2, 29)}
                  {checkPosition(2, 3, 29)}
                  {checkPosition(2, 4, 29)}
                  {checkPosition(3, 1, 29)}
                  {checkPosition(3, 2, 29)}
                  {checkPosition(3, 3, 29)}
                  {checkPosition(3, 4, 29)}
                  {checkPosition(4, 1, 29)}
                  {checkPosition(4, 2, 29)}
                  {checkPosition(4, 3, 29)}
                  {checkPosition(4, 4, 29)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 28)}
                  {checkPosition(1, 2, 28)}
                  {checkPosition(1, 3, 28)}
                  {checkPosition(1, 4, 28)}
                  {checkPosition(2, 1, 28)}
                  {checkPosition(2, 2, 28)}
                  {checkPosition(2, 3, 28)}
                  {checkPosition(2, 4, 28)}
                  {checkPosition(3, 1, 28)}
                  {checkPosition(3, 2, 28)}
                  {checkPosition(3, 3, 28)}
                  {checkPosition(3, 4, 28)}
                  {checkPosition(4, 1, 28)}
                  {checkPosition(4, 2, 28)}
                  {checkPosition(4, 3, 28)}
                  {checkPosition(4, 4, 28)}
                </View>
                <View
                  style={[
                    styles.item,
                    styles.orange,
                    { backgroundColor: "#ffcff0" },
                  ]}
                >
                  {checkPosition(1, 1, 27)}
                  {checkPosition(1, 2, 27)}
                  {checkPosition(1, 3, 27)}
                  {checkPosition(1, 4, 27)}
                  {checkPosition(2, 1, 27)}
                  {checkPosition(2, 2, 27)}
                  {checkPosition(2, 3, 27)}
                  {checkPosition(2, 4, 27)}
                  {checkPosition(3, 1, 27)}
                  {checkPosition(3, 2, 27)}
                  {checkPosition(3, 3, 27)}
                  {checkPosition(3, 4, 27)}
                  {checkPosition(4, 1, 27)}
                  {checkPosition(4, 2, 27)}
                  {checkPosition(4, 3, 27)}
                  {checkPosition(4, 4, 27)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 26)}
                  {checkPosition(1, 2, 26)}
                  {checkPosition(1, 3, 26)}
                  {checkPosition(1, 4, 26)}
                  {checkPosition(2, 1, 26)}
                  {checkPosition(2, 2, 26)}
                  {checkPosition(2, 3, 26)}
                  {checkPosition(2, 4, 26)}
                  {checkPosition(3, 1, 26)}
                  {checkPosition(3, 2, 26)}
                  {checkPosition(3, 3, 26)}
                  {checkPosition(3, 4, 26)}
                  {checkPosition(4, 1, 26)}
                  {checkPosition(4, 2, 26)}
                  {checkPosition(4, 3, 26)}
                  {checkPosition(4, 4, 26)}
                </View>
              </View>
            </View>
          </View>
          {/* =============================== Lowest Part ============================= */}
          <View style={row.Style}>
            <View>
              <View
                style={[
                  Players.styles,
                  {
                    marginLeft: Dimensions.get("window").width / 50,
                    borderRightWidth: 1,
                  },
                ]}
              >
                <ImageBackground
                  source={require("./assets/tomJerry.png")}
                  style={{ width: "100%", height: "100%" }}
                >
                  <View>
                    <View style={row.Style}>
                      <View style={styles.places}>
                        <TouchableOpacity>
                          {checkPosition(4, 1, -14)}
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.places, { marginLeft: 90 }]}>
                        <TouchableOpacity>
                          {checkPosition(4, 2, -24)}
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={row.Style}>
                      <View style={[styles.places, { marginTop: 90 }]}>
                        <TouchableOpacity>
                          {checkPosition(4, 3, -34)}
                        </TouchableOpacity>
                      </View>
                      <View
                        style={[
                          styles.places,
                          { marginLeft: 90, marginTop: 90 },
                        ]}
                      >
                        <TouchableOpacity>
                          {checkPosition(4, 4, -44)}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </View>
            <View style={row.Style}>
              <View style={styles.first}>
                <View style={styles.item}>
                  {checkPosition(1, 1, 44)}
                  {checkPosition(1, 2, 44)}
                  {checkPosition(1, 3, 44)}
                  {checkPosition(1, 4, 44)}
                  {checkPosition(2, 1, 44)}
                  {checkPosition(2, 2, 44)}
                  {checkPosition(2, 3, 44)}
                  {checkPosition(2, 4, 44)}
                  {checkPosition(3, 1, 44)}
                  {checkPosition(3, 2, 44)}
                  {checkPosition(3, 3, 44)}
                  {checkPosition(3, 4, 44)}
                  {checkPosition(4, 1, 44)}
                  {checkPosition(4, 2, 44)}
                  {checkPosition(4, 3, 44)}
                  {checkPosition(4, 4, 44)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 43)}
                  {checkPosition(1, 2, 43)}
                  {checkPosition(1, 3, 43)}
                  {checkPosition(1, 4, 43)}
                  {checkPosition(2, 1, 43)}
                  {checkPosition(2, 2, 43)}
                  {checkPosition(2, 3, 43)}
                  {checkPosition(2, 4, 43)}
                  {checkPosition(3, 1, 43)}
                  {checkPosition(3, 2, 43)}
                  {checkPosition(3, 3, 43)}
                  {checkPosition(3, 4, 43)}
                  {checkPosition(4, 1, 43)}
                  {checkPosition(4, 2, 43)}
                  {checkPosition(4, 3, 43)}
                  {checkPosition(4, 4, 43)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 42)}
                  {checkPosition(1, 2, 42)}
                  {checkPosition(1, 3, 42)}
                  {checkPosition(1, 4, 42)}
                  {checkPosition(2, 1, 42)}
                  {checkPosition(2, 2, 42)}
                  {checkPosition(2, 3, 42)}
                  {checkPosition(2, 4, 42)}
                  {checkPosition(3, 1, 42)}
                  {checkPosition(3, 2, 42)}
                  {checkPosition(3, 3, 42)}
                  {checkPosition(3, 4, 42)}
                  {checkPosition(4, 1, 42)}
                  {checkPosition(4, 2, 42)}
                  {checkPosition(4, 3, 42)}
                  {checkPosition(4, 4, 42)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 41)}
                  {checkPosition(1, 2, 41)}
                  {checkPosition(1, 3, 41)}
                  {checkPosition(1, 4, 41)}
                  {checkPosition(2, 1, 41)}
                  {checkPosition(2, 2, 41)}
                  {checkPosition(2, 3, 41)}
                  {checkPosition(2, 4, 41)}
                  {checkPosition(3, 1, 41)}
                  {checkPosition(3, 2, 41)}
                  {checkPosition(3, 3, 41)}
                  {checkPosition(3, 4, 41)}
                  {checkPosition(4, 1, 41)}
                  {checkPosition(4, 2, 41)}
                  {checkPosition(4, 3, 41)}
                  {checkPosition(4, 4, 41)}
                </View>
                <View
                  style={[
                    styles.item,
                    styles.blue,
                    { backgroundColor: "#67E6DC" },
                  ]}
                >
                  {checkPosition(1, 1, 40)}
                  {checkPosition(1, 2, 40)}
                  {checkPosition(1, 3, 40)}
                  {checkPosition(1, 4, 40)}
                  {checkPosition(2, 1, 40)}
                  {checkPosition(2, 2, 40)}
                  {checkPosition(2, 3, 40)}
                  {checkPosition(2, 4, 40)}
                  {checkPosition(3, 1, 40)}
                  {checkPosition(3, 2, 40)}
                  {checkPosition(3, 3, 40)}
                  {checkPosition(3, 4, 40)}
                  {checkPosition(4, 1, 40)}
                  {checkPosition(4, 2, 40)}
                  {checkPosition(4, 3, 40)}
                  {checkPosition(4, 4, 40)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 39)}
                  {checkPosition(1, 2, 39)}
                  {checkPosition(1, 3, 39)}
                  {checkPosition(1, 4, 39)}
                  {checkPosition(2, 1, 39)}
                  {checkPosition(2, 2, 39)}
                  {checkPosition(2, 3, 39)}
                  {checkPosition(2, 4, 39)}
                  {checkPosition(3, 1, 39)}
                  {checkPosition(3, 2, 39)}
                  {checkPosition(3, 3, 39)}
                  {checkPosition(3, 4, 39)}
                  {checkPosition(4, 1, 39)}
                  {checkPosition(4, 2, 39)}
                  {checkPosition(4, 3, 39)}
                  {checkPosition(4, 4, 39)}
                </View>
              </View>
              <View style={styles.second}>
                <View style={[styles.item, styles.blue]}>
                  {checkPosition(1, 1, 72)}
                  {checkPosition(1, 2, 72)}
                  {checkPosition(1, 3, 72)}
                  {checkPosition(1, 4, 72)}
                  {checkPosition(2, 1, 72)}
                  {checkPosition(2, 2, 72)}
                  {checkPosition(2, 3, 72)}
                  {checkPosition(2, 4, 72)}
                  {checkPosition(3, 1, 72)}
                  {checkPosition(3, 2, 72)}
                  {checkPosition(3, 3, 72)}
                  {checkPosition(3, 4, 72)}
                  {checkPosition(4, 1, 72)}
                  {checkPosition(4, 2, 72)}
                  {checkPosition(4, 3, 72)}
                  {checkPosition(4, 4, 72)}
                </View>
                <View style={[styles.item, styles.blue]}>
                  {checkPosition(1, 1, 71)}
                  {checkPosition(1, 2, 71)}
                  {checkPosition(1, 3, 71)}
                  {checkPosition(1, 4, 71)}
                  {checkPosition(2, 1, 71)}
                  {checkPosition(2, 2, 71)}
                  {checkPosition(2, 3, 71)}
                  {checkPosition(2, 4, 71)}
                  {checkPosition(3, 1, 71)}
                  {checkPosition(3, 2, 71)}
                  {checkPosition(3, 3, 71)}
                  {checkPosition(3, 4, 71)}
                  {checkPosition(4, 1, 71)}
                  {checkPosition(4, 2, 71)}
                  {checkPosition(4, 3, 71)}
                  {checkPosition(4, 4, 71)}
                </View>
                <View style={[styles.item, styles.blue]}>
                  {checkPosition(1, 1, 70)}
                  {checkPosition(1, 2, 70)}
                  {checkPosition(1, 3, 70)}
                  {checkPosition(1, 4, 70)}
                  {checkPosition(2, 1, 70)}
                  {checkPosition(2, 2, 70)}
                  {checkPosition(2, 3, 70)}
                  {checkPosition(2, 4, 70)}
                  {checkPosition(3, 1, 70)}
                  {checkPosition(3, 2, 70)}
                  {checkPosition(3, 3, 70)}
                  {checkPosition(3, 4, 70)}
                  {checkPosition(4, 1, 70)}
                  {checkPosition(4, 2, 70)}
                  {checkPosition(4, 3, 70)}
                  {checkPosition(4, 4, 70)}
                </View>
                <View style={[styles.item, styles.blue]}>
                  {checkPosition(1, 1, 69)}
                  {checkPosition(1, 2, 69)}
                  {checkPosition(1, 3, 69)}
                  {checkPosition(1, 4, 69)}
                  {checkPosition(2, 1, 69)}
                  {checkPosition(2, 2, 69)}
                  {checkPosition(2, 3, 69)}
                  {checkPosition(2, 4, 69)}
                  {checkPosition(3, 1, 69)}
                  {checkPosition(3, 2, 69)}
                  {checkPosition(3, 3, 69)}
                  {checkPosition(3, 4, 69)}
                  {checkPosition(4, 1, 69)}
                  {checkPosition(4, 2, 69)}
                  {checkPosition(4, 3, 69)}
                  {checkPosition(4, 4, 69)}
                </View>
                <View style={[styles.item, styles.blue]}>
                  {checkPosition(1, 1, 68)}
                  {checkPosition(1, 2, 68)}
                  {checkPosition(1, 3, 68)}
                  {checkPosition(1, 4, 68)}
                  {checkPosition(2, 1, 68)}
                  {checkPosition(2, 2, 68)}
                  {checkPosition(2, 3, 68)}
                  {checkPosition(2, 4, 68)}
                  {checkPosition(3, 1, 68)}
                  {checkPosition(3, 2, 68)}
                  {checkPosition(3, 3, 68)}
                  {checkPosition(3, 4, 68)}
                  {checkPosition(4, 1, 68)}
                  {checkPosition(4, 2, 68)}
                  {checkPosition(4, 3, 68)}
                  {checkPosition(4, 4, 68)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 38)}
                  {checkPosition(1, 2, 38)}
                  {checkPosition(1, 3, 38)}
                  {checkPosition(1, 4, 38)}
                  {checkPosition(2, 1, 38)}
                  {checkPosition(2, 2, 38)}
                  {checkPosition(2, 3, 38)}
                  {checkPosition(2, 4, 38)}
                  {checkPosition(3, 1, 38)}
                  {checkPosition(3, 2, 38)}
                  {checkPosition(3, 3, 38)}
                  {checkPosition(3, 4, 38)}
                  {checkPosition(4, 1, 38)}
                  {checkPosition(4, 2, 38)}
                  {checkPosition(4, 3, 38)}
                  {checkPosition(4, 4, 38)}
                </View>
              </View>
              <View style={styles.third}>
                <View style={styles.item}>
                  {checkPosition(1, 1, 32)}
                  {checkPosition(1, 2, 32)}
                  {checkPosition(1, 3, 32)}
                  {checkPosition(1, 4, 32)}
                  {checkPosition(2, 1, 32)}
                  {checkPosition(2, 2, 32)}
                  {checkPosition(2, 3, 32)}
                  {checkPosition(2, 4, 32)}
                  {checkPosition(3, 1, 32)}
                  {checkPosition(3, 2, 32)}
                  {checkPosition(3, 3, 32)}
                  {checkPosition(3, 4, 32)}
                  {checkPosition(4, 1, 32)}
                  {checkPosition(4, 2, 32)}
                  {checkPosition(4, 3, 32)}
                  {checkPosition(4, 4, 32)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 33)}
                  {checkPosition(1, 2, 33)}
                  {checkPosition(1, 3, 33)}
                  {checkPosition(1, 4, 33)}
                  {checkPosition(2, 1, 33)}
                  {checkPosition(2, 2, 33)}
                  {checkPosition(2, 3, 33)}
                  {checkPosition(2, 4, 33)}
                  {checkPosition(3, 1, 33)}
                  {checkPosition(3, 2, 33)}
                  {checkPosition(3, 3, 33)}
                  {checkPosition(3, 4, 33)}
                  {checkPosition(4, 1, 33)}
                  {checkPosition(4, 2, 33)}
                  {checkPosition(4, 3, 33)}
                  {checkPosition(4, 4, 33)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 34)}
                  {checkPosition(1, 2, 34)}
                  {checkPosition(1, 3, 34)}
                  {checkPosition(1, 4, 34)}
                  {checkPosition(2, 1, 34)}
                  {checkPosition(2, 2, 34)}
                  {checkPosition(2, 3, 34)}
                  {checkPosition(2, 4, 34)}
                  {checkPosition(3, 1, 34)}
                  {checkPosition(3, 2, 34)}
                  {checkPosition(3, 3, 34)}
                  {checkPosition(3, 4, 34)}
                  {checkPosition(4, 1, 34)}
                  {checkPosition(4, 2, 34)}
                  {checkPosition(4, 3, 34)}
                  {checkPosition(4, 4, 34)}
                </View>
                <View style={[styles.item, { backgroundColor: "#67E6DC" }]}>
                  {checkPosition(1, 1, 35)}
                  {checkPosition(1, 2, 35)}
                  {checkPosition(1, 3, 35)}
                  {checkPosition(1, 4, 35)}
                  {checkPosition(2, 1, 35)}
                  {checkPosition(2, 2, 35)}
                  {checkPosition(2, 3, 35)}
                  {checkPosition(2, 4, 35)}
                  {checkPosition(3, 1, 35)}
                  {checkPosition(3, 2, 35)}
                  {checkPosition(3, 3, 35)}
                  {checkPosition(3, 4, 35)}
                  {checkPosition(4, 1, 35)}
                  {checkPosition(4, 2, 35)}
                  {checkPosition(4, 3, 35)}
                  {checkPosition(4, 4, 35)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 36)}
                  {checkPosition(1, 2, 36)}
                  {checkPosition(1, 3, 36)}
                  {checkPosition(1, 4, 36)}
                  {checkPosition(2, 1, 36)}
                  {checkPosition(2, 2, 36)}
                  {checkPosition(2, 3, 36)}
                  {checkPosition(2, 4, 36)}
                  {checkPosition(3, 1, 36)}
                  {checkPosition(3, 2, 36)}
                  {checkPosition(3, 3, 36)}
                  {checkPosition(3, 4, 36)}
                  {checkPosition(4, 1, 36)}
                  {checkPosition(4, 2, 36)}
                  {checkPosition(4, 3, 36)}
                  {checkPosition(4, 4, 36)}
                </View>
                <View style={styles.item}>
                  {checkPosition(1, 1, 37)}
                  {checkPosition(1, 2, 37)}
                  {checkPosition(1, 3, 37)}
                  {checkPosition(1, 4, 37)}
                  {checkPosition(2, 1, 37)}
                  {checkPosition(2, 2, 37)}
                  {checkPosition(2, 3, 37)}
                  {checkPosition(2, 4, 37)}
                  {checkPosition(3, 1, 37)}
                  {checkPosition(3, 2, 37)}
                  {checkPosition(3, 3, 37)}
                  {checkPosition(3, 4, 37)}
                  {checkPosition(4, 1, 37)}
                  {checkPosition(4, 2, 37)}
                  {checkPosition(4, 3, 37)}
                  {checkPosition(4, 4, 37)}
                </View>
              </View>
            </View>
            <Animatable.View
              //animation={turn3 ? zoomIn : (c?zoomIn:zoomOut)}
              //animation={turn3 || whoseTurnToMove == 3 ? zoomIn : zoomOut}
              animation={turn3 ? zoomIn : zoomOut}
              duration={500}
            //whoseTurnToMove==
            >
              <View>
                <View style={[Players.styles, { borderLeftWidth: 1 }]}>
                  <ImageBackground
                    source={require("./assets/ben10.jpeg")}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <View>
                      <View style={row.Style}>
                        <View style={styles.places}>
                          <TouchableOpacity>
                            {checkPosition(3, 1, -13)}
                          </TouchableOpacity>
                        </View>
                        <View style={[styles.places, { marginLeft: 90 }]}>
                          <TouchableOpacity>
                            {checkPosition(3, 2, -23)}
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={row.Style}>
                        <View style={[styles.places, { marginTop: 90 }]}>
                          <TouchableOpacity>
                            {checkPosition(3, 3, -33)}
                          </TouchableOpacity>
                        </View>
                        <View
                          style={[
                            styles.places,
                            { marginLeft: 90, marginTop: 90 },
                          ]}
                        >
                          <TouchableOpacity activeOpacity="70">
                            {checkPosition(3, 4, -43)}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
                <Image
                  style={{
                    width: 90,
                    height: 70,
                    marginLeft: 30,
                    marginTop: 10,
                  }}
                  source={image3}
                />
              </View>
            </Animatable.View>
          </View>
          <View className="items-center">
            <Text className="text-red-600 text-lg font-psemibold">
              {" "}
              {turnMessage} {moveMessage}{" "}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  red: {
    backgroundColor: "#fa9daa",
  },
  green: {
    backgroundColor: "#9effa5",
  },
  orange: {
    backgroundColor: "#ffcff0",
  },
  blue: {
    backgroundColor: "#67E6DC",
  },
  item: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#03adfc",
    width: (Dimensions.get("window").width * 6.4) / 100,
    height: (Dimensions.get("window").width * 6.4) / 100,
  },
  First: {
    flexDirection: "column",
    marginLeft: Dimensions.get("window").width / 50,
  },
  wholeSetup: {
    marginTop: 70,
  },
  winnerZone: {
    borderWidth: 4,
    borderLeftColor: "red",
    borderTopColor: "green",
    borderRightColor: "orange",
    borderBottomColor: "blue",
    width: (Dimensions.get("window").width * 19.2) / 100,
    height: (Dimensions.get("window").width * 19.2) / 100,
    flexDirection: "row",
    backgroundColor: "#161622",
  },

  places: {
    backgroundColor: "black",
    borderWidth: 2,
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  icons: {
    marginLeft: 6,
    marginTop: 2,
  },
});
export default LudoNew2Player;