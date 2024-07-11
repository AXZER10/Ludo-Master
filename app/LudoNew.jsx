import React from 'react';
import { StyleSheet, Text, View,Dimensions,TouchableOpacity,Image,ImageBackground, SafeAreaView } from 'react-native';
import {FontAwesome} from '@expo/vector-icons'
import {Players,row} from './styles/forPlayers'
import {Audio} from 'expo-av'
import * as Animatable from "react-native-animatable";
soundObject = new Audio.Sound()

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
  

  const App = (props) => {
    const [positions, setPositions] = useState({
      1: [-11, -21, -31, -41],
      2: [-12, -22, -32, -42],
      3: [-13, -23, -33, -43],
      4: [-14, -24, -34, -44]
    });
    
    const [turn1, setTurn1] = useState(false);
    const [turn2, setTurn2] = useState(false);
    const [turn3, setTurn3] = useState(true);
    const [turn4, setTurn4] = useState(false);
    const [currentNumber, setCurrentNumber] = useState(0);
    const [turnMessage, setTurnMessage] = useState("");
    const [moveMessage, setMoveMessage] = useState("");
    const [whoseTurnToMove, setWhoseTurnToMove] = useState(0);
    const [isMovedBy1, setIsMovedBy1] = useState(false);
    const [isMovedBy2, setIsMovedBy2] = useState(false);
    const [isMovedBy3, setIsMovedBy3] = useState(false);
    const [isMovedBy4, setIsMovedBy4] = useState(false);
    
    const [images, setImages] = useState({
      1: require("./assets/dice1.png"),
      2: require("./assets/dice1.png"),
      3: require("./assets/dice1.png"),
      4: require("./assets/dice1.png")
    });
    const moveIcon = (player,whichOne,position) => 
    {
        switch(player)
        {
            case 1:
                if (whoseTurnToMove === 1 && !isMovedBy1) {
                switch (whichOne) {
                    case 1:
                    if (positions[1] !== "winner") {
                        if (positions[1] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 1: 1 });
                            setIsMovedBy1(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[1];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 57) {
                            if (nextPosition === 58) {
                            setPositions({ ...positions, 1: "winner" });
                            } else {
                            setMoveMessage("No, Move Other One");
                            }
                        } else {
                            if (positions[1] >= 46 && positions[1] <= 51) {
                            if (nextPosition >= 52) {
                                nextPosition += 1;
                            }
                            }
                            checkIfCutPossibleFor2(nextPosition);
                            checkIfCutPossibleFor3(nextPosition);
                            checkIfCutPossibleFor4(nextPosition);
                            setPositions({ ...positions, 1: nextPosition });
                            setIsMovedBy1(true);
                        }
                        }
                    }
                    break;
                    case 2:
                    if (positions[2] !== "winner") {
                        if (positions[2] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 2: 1 });
                            setIsMovedBy1(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[2];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 57) {
                            if (nextPosition === 58) {
                            setPositions({ ...positions, 2: "winner" });
                            } else {
                            setMoveMessage("No, Move Other One");
                            }
                        } else {
                            if (positions[2] >= 46 && positions[2] <= 51) {
                            if (nextPosition >= 52) {
                                nextPosition += 1;
                            }
                            }
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor3(nextPosition);
                            checkIfCutPossibleFor4(nextPosition);
                            setPositions({ ...positions, 2: nextPosition });
                            setIsMovedBy1(true);
                        }
                        }
                    }
                    break;
                    case 3:
                    if (positions[3] !== "winner") {
                        if (positions[3] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 3: 1 });
                            setIsMovedBy1(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[3];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 57) {
                            if (nextPosition === 58) {
                            setPositions({ ...positions, 3: "winner" });
                            } else {
                            setMoveMessage("No, Move Other One");
                            }
                        } else {
                            if (positions[3] >= 46 && positions[3] <= 51) {
                            if (nextPosition >= 52) {
                                nextPosition += 1;
                            }
                            }
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor2(nextPosition);
                            checkIfCutPossibleFor4(nextPosition);
                            setPositions({ ...positions, 3: nextPosition });
                            setIsMovedBy1(true);
                        }
                        }
                    }
                    break;
                    case 4:
                    if (positions[4] !== "winner") {
                        if (positions[4] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 4: 1 });
                            setIsMovedBy1(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[4];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 57) {
                            if (nextPosition === 58) {
                            setPositions({ ...positions, 4: "winner" });
                            } else {
                            setMoveMessage("No, Move Other One");
                            }
                        } else {
                            if (positions[4] >= 46 && positions[4] <= 51) {
                            if (nextPosition >= 52) {
                                nextPosition += 1;
                            }
                            }
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor2(nextPosition);
                            checkIfCutPossibleFor3(nextPosition);
                            setPositions({ ...positions, 4: nextPosition });
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
                }
                break;
            case 2:
                if (whoseTurnToMove === 2 && !isMovedBy2) {
                switch (whichOne) {
                    case 1:
                    if (positions[5] !== "winner") {
                        if (positions[5] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 5: 14 });
                            setIsMovedBy2(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[5];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 52 && nextPosition < 58) {
                            let extraMoves = nextPosition - 52;
                            checkIfCutPossibleFor1(extraMoves);
                            checkIfCutPossibleFor3(extraMoves);
                            checkIfCutPossibleFor4(extraMoves);
                            setPositions({ ...positions, 5: extraMoves });
                            setIsMovedBy2(true);
                        } else if (positions[5] >= 7 && positions[5] <= 12) {
                            if (nextPosition > 12) {
                            let extraMoves = nextPosition - 12;
                            let newPosition = 57 + extraMoves;
                            if (positions[5] === 12 && currentNumber === 6) {
                                setPositions({ ...positions, 5: "winner" });
                                setIsMovedBy2(true);
                            } else {
                                checkIfCutPossibleFor1(newPosition);
                                checkIfCutPossibleFor3(newPosition);
                                checkIfCutPossibleFor4(newPosition);
                                setPositions({ ...positions, 5: newPosition });
                                setIsMovedBy2(true);
                            }
                            }
                        } else if (positions[5] >= 58 && positions[5] <= 62) {
                            nextPosition = positions[5] + currentNumber;
                            if (nextPosition === 63) {
                            setPositions({ ...positions, 5: "winner" });
                            setIsMovedBy2(true);
                            } else if (nextPosition > 63) {
                            setMoveMessage("Cannot Move This One");
                            } else {
                            setPositions({ ...positions, 5: nextPosition });
                            setIsMovedBy2(true);
                            }
                        } else {
                            nextPosition = positions[5] + currentNumber;
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor3(nextPosition);
                            checkIfCutPossibleFor4(nextPosition);
                            setPositions({ ...positions, 5: nextPosition });
                            setIsMovedBy2(true);
                        }
                        }
                    }
                    break;
                    case 2:
                    if (positions[6] !== "winner") {
                        if (positions[6] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 6: 14 });
                            setIsMovedBy2(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[6];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 52 && nextPosition < 58) {
                            let extraMoves = nextPosition - 52;
                            checkIfCutPossibleFor1(extraMoves);
                            checkIfCutPossibleFor3(extraMoves);
                            checkIfCutPossibleFor4(extraMoves);
                            setPositions({ ...positions, 6: extraMoves });
                            setIsMovedBy2(true);
                        } else if (positions[6] >= 7 && positions[6] <= 12) {
                            if (nextPosition > 12) {
                            let extraMoves = nextPosition - 12;
                            let newPosition = 57 + extraMoves;
                            if (positions[6] === 12 && currentNumber === 6) {
                                setPositions({ ...positions, 6: "winner" });
                                setIsMovedBy2(true);
                            } else {
                                checkIfCutPossibleFor1(newPosition);
                                checkIfCutPossibleFor3(newPosition);
                                checkIfCutPossibleFor4(newPosition);
                                setPositions({ ...positions, 6: newPosition });
                                setIsMovedBy2(true);
                            }
                            }
                        } else if (positions[6] >= 58 && positions[6] <= 62) {
                            nextPosition = positions[6] + currentNumber;
                            if (nextPosition === 63) {
                            setPositions({ ...positions, 6: "winner" });
                            setIsMovedBy2(true);
                            } else if (nextPosition > 63) {
                            setMoveMessage("Cannot Move This One");
                            } else {
                            setPositions({ ...positions, 6: nextPosition });
                            setIsMovedBy2(true);
                            }
                        } else {
                            nextPosition = positions[6] + currentNumber;
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor3(nextPosition);
                            checkIfCutPossibleFor4(nextPosition);
                            setPositions({ ...positions, 6: nextPosition });
                            setIsMovedBy2(true);
                        }
                        }
                    }
                    break;
                    case 3:
                    if (positions[7] !== "winner") {
                        if (positions[7] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 7: 14 });
                            setIsMovedBy2(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[7];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 52 && nextPosition < 58) {
                            let extraMoves = nextPosition - 52;
                            checkIfCutPossibleFor1(extraMoves);
                            checkIfCutPossibleFor3(extraMoves);
                            checkIfCutPossibleFor4(extraMoves);
                            setPositions({ ...positions, 7: extraMoves });
                            setIsMovedBy2(true);
                        } else if (positions[7] >= 7 && positions[7] <= 12) {
                            if (nextPosition > 12) {
                            let extraMoves = nextPosition - 12;
                            let newPosition = 57 + extraMoves;
                            if (positions[7] === 12 && currentNumber === 6) {
                                setPositions({ ...positions, 7: "winner" });
                                setIsMovedBy2(true);
                            } else {
                                checkIfCutPossibleFor1(newPosition);
                                checkIfCutPossibleFor3(newPosition);
                                checkIfCutPossibleFor4(newPosition);
                                setPositions({ ...positions, 7: newPosition });
                                setIsMovedBy2(true);
                            }
                            }
                        } else if (positions[7] >= 58 && positions[7] <= 62) {
                            nextPosition = positions[7] + currentNumber;
                            if (nextPosition === 63) {
                            setPositions({ ...positions, 7: "winner" });
                            setIsMovedBy2(true);
                            } else if (nextPosition > 63) {
                            setMoveMessage("Cannot Move This One");
                            } else {
                            setPositions({ ...positions, 7: nextPosition });
                            setIsMovedBy2(true);
                            }
                        } else {
                            nextPosition = positions[7] + currentNumber;
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor3(nextPosition);
                            checkIfCutPossibleFor4(nextPosition);
                            setPositions({ ...positions, 7: nextPosition });
                            setIsMovedBy2(true);
                        }
                        }
                    }
                    break;
                    case 4:
                    if (positions[8] !== "winner") {
                        if (positions[8] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 8: 14 });
                            setIsMovedBy2(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[8];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 52 && nextPosition < 58) {
                            let extraMoves = nextPosition - 52;
                            checkIfCutPossibleFor1(extraMoves);
                            checkIfCutPossibleFor3(extraMoves);
                            checkIfCutPossibleFor4(extraMoves);
                            setPositions({ ...positions, 8: extraMoves });
                            setIsMovedBy2(true);
                        } else if (positions[8] >= 7 && positions[8] <= 12) {
                            if (nextPosition > 12) {
                            let extraMoves = nextPosition - 12;
                            let newPosition = 57 + extraMoves;
                            if (positions[8] === 12 && currentNumber === 6) {
                                setPositions({ ...positions, 8: "winner" });
                                setIsMovedBy2(true);
                            } else {
                                checkIfCutPossibleFor1(newPosition);
                                checkIfCutPossibleFor3(newPosition);
                                checkIfCutPossibleFor4(newPosition);
                                setPositions({ ...positions, 8: newPosition });
                                setIsMovedBy2(true);
                            }
                            }
                        } else if (positions[8] >= 58 && positions[8] <= 62) {
                            nextPosition = positions[8] + currentNumber;
                            if (nextPosition === 63) {
                            setPositions({ ...positions, 8: "winner" });
                            setIsMovedBy2(true);
                            } else if (nextPosition > 63) {
                            setMoveMessage("Cannot Move This One");
                            } else {
                            setPositions({ ...positions, 8: nextPosition });
                            setIsMovedBy2(true);
                            }
                        } else {
                            nextPosition = positions[8] + currentNumber;
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor3(nextPosition);
                            checkIfCutPossibleFor4(nextPosition);
                            setPositions({ ...positions, 8: nextPosition });
                            setIsMovedBy2(true);
                        }
                        }
                    }
                    break;
                    default:
                    break;
                }
                } else {
                setMoveMessage("You cannot move right now");
                }
                break;
            case 3:
                if (whoseTurnToMove === 3 && !isMovedBy3) {
                switch (whichOne) {
                    case 1:
                    if (positions[9] !== "winner") {
                        if (positions[9] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 9: 27 });
                            setIsMovedBy3(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[9];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 57) {
                            if (nextPosition === 58) {
                            setPositions({ ...positions, 9: "winner" });
                            } else {
                            setMoveMessage("No, Move Other One");
                            }
                        } else {
                            if (positions[9] >= 46 && positions[9] <= 51) {
                            if (nextPosition >= 52) {
                                nextPosition += 1;
                            }
                            }
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor2(nextPosition);
                            checkIfCutPossibleFor4(nextPosition);
                            setPositions({ ...positions, 9: nextPosition });
                            setIsMovedBy3(true);
                        }
                        }
                    }
                    break;
                    case 2:
                    if (positions[10] !== "winner") {
                        if (positions[10] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 10: 27 });
                            setIsMovedBy3(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[10];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 57) {
                            if (nextPosition === 58) {
                            setPositions({ ...positions, 10: "winner" });
                            } else {
                            setMoveMessage("No, Move Other One");
                            }
                        } else {
                            if (positions[10] >= 46 && positions[10] <= 51) {
                            if (nextPosition >= 52) {
                                nextPosition += 1;
                            }
                            }
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor2(nextPosition);
                            checkIfCutPossibleFor4(nextPosition);
                            setPositions({ ...positions, 10: nextPosition });
                            setIsMovedBy3(true);
                        }
                        }
                    }
                    break;
                    case 3:
                    if (positions[11] !== "winner") {
                        if (positions[11] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 11: 27 });
                            setIsMovedBy3(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[11];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 57) {
                            if (nextPosition === 58) {
                            setPositions({ ...positions, 11: "winner" });
                            } else {
                            setMoveMessage("No, Move Other One");
                            }
                        } else {
                            if (positions[11] >= 46 && positions[11] <= 51) {
                            if (nextPosition >= 52) {
                                nextPosition += 1;
                            }
                            }
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor2(nextPosition);
                            checkIfCutPossibleFor4(nextPosition);
                            setPositions({ ...positions, 11: nextPosition });
                            setIsMovedBy3(true);
                        }
                        }
                    }
                    break;
                    case 4:
                    if (positions[12] !== "winner") {
                        if (positions[12] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 12: 27 });
                            setIsMovedBy3(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[12];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 57) {
                            if (nextPosition === 58) {
                            setPositions({ ...positions, 12: "winner" });
                            } else {
                            setMoveMessage("No, Move Other One");
                            }
                        } else {
                            if (positions[12] >= 46 && positions[12] <= 51) {
                            if (nextPosition >= 52) {
                                nextPosition += 1;
                            }
                            }
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor2(nextPosition);
                            checkIfCutPossibleFor4(nextPosition);
                            setPositions({ ...positions, 12: nextPosition });
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
                }
                break;
            case 4:
                if (whoseTurnToMove === 4 && !isMovedBy4) {
                switch (whichOne) {
                    case 1:
                    if (positions[13] !== "winner") {
                        if (positions[13] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 13: 40 });
                            setIsMovedBy4(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[13];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 57) {
                            if (nextPosition === 58) {
                            setPositions({ ...positions, 13: "winner" });
                            } else {
                            setMoveMessage("No, Move Other One");
                            }
                        } else {
                            if (positions[13] >= 46 && positions[13] <= 51) {
                            if (nextPosition >= 52) {
                                nextPosition += 1;
                            }
                            }
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor2(nextPosition);
                            checkIfCutPossibleFor3(nextPosition);
                            setPositions({ ...positions, 13: nextPosition });
                            setIsMovedBy4(true);
                        }
                        }
                    }
                    break;
                    case 2:
                    if (positions[14] !== "winner") {
                        if (positions[14] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 14: 40 });
                            setIsMovedBy4(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[14];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 57) {
                            if (nextPosition === 58) {
                            setPositions({ ...positions, 14: "winner" });
                            } else {
                            setMoveMessage("No, Move Other One");
                            }
                        } else {
                            if (positions[14] >= 46 && positions[14] <= 51) {
                            if (nextPosition >= 52) {
                                nextPosition += 1;
                            }
                            }
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor2(nextPosition);
                            checkIfCutPossibleFor3(nextPosition);
                            setPositions({ ...positions, 14: nextPosition });
                            setIsMovedBy4(true);
                        }
                        }
                    }
                    break;
                    case 3:
                    if (positions[15] !== "winner") {
                        if (positions[15] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 15: 40 });
                            setIsMovedBy4(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[15];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 57) {
                            if (nextPosition === 58) {
                            setPositions({ ...positions, 15: "winner" });
                            } else {
                            setMoveMessage("No, Move Other One");
                            }
                        } else {
                            if (positions[15] >= 46 && positions[15] <= 51) {
                            if (nextPosition >= 52) {
                                nextPosition += 1;
                            }
                            }
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor2(nextPosition);
                            checkIfCutPossibleFor3(nextPosition);
                            setPositions({ ...positions, 15: nextPosition });
                            setIsMovedBy4(true);
                        }
                        }
                    }
                    break;
                    case 4:
                    if (positions[16] !== "winner") {
                        if (positions[16] < 0) {
                        if (currentNumber === 6) {
                            setPositions({ ...positions, 16: 40 });
                            setIsMovedBy4(true);
                        } else {
                            setMoveMessage("You Cannot Move It");
                        }
                        } else {
                        let currentPosition = positions[16];
                        let nextPosition = currentNumber + currentPosition;
                        if (nextPosition > 57) {
                            if (nextPosition === 58) {
                            setPositions({ ...positions, 16: "winner" });
                            } else {
                            setMoveMessage("No, Move Other One");
                            }
                        } else {
                            if (positions[16] >= 46 && positions[16] <= 51) {
                            if (nextPosition >= 52) {
                                nextPosition += 1;
                            }
                            }
                            checkIfCutPossibleFor1(nextPosition);
                            checkIfCutPossibleFor2(nextPosition);
                            checkIfCutPossibleFor3(nextPosition);
                            setPositions({ ...positions, 16: nextPosition });
                            setIsMovedBy4(true);
                        }
                        }
                    }
                    break;
                    default:
                    break;
                }
                } 
                else 
                {
                setMoveMessage("You cannot move right now");
                }
        }
    }
  
    const checkIfCutPossibleFor1 = (atPosition) => {
        const { position11, position12, position13, position14 } = positions;
      
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
          if (position11 === atPosition) {
            setPositions({ ...positions, 1: [-11, -21, -31, -41] });
          }
          if (position12 === atPosition) {
            setPositions({ ...positions, 2: [-12, -22, -32, -42] });
          }
          if (position13 === atPosition) {
            setPositions({ ...positions, 3: [-13, -23, -33, -43] });
          }
          if (position14 === atPosition) {
            setPositions({ ...positions, 4: [-14, -24, -34, -44] });
          }
        }
    };   
    const checkIfCutPossibleFor2 = (atPosition) => {
        const { position21, position22, position23, position24 } = positions;
      
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
          if (position21 === atPosition) {
            setPositions({ ...positions, 1: [-12, -22, -32, -42] });
          }
          if (position22 === atPosition) {
            setPositions({ ...positions, 2: [-12, -22, -32, -42] });
          }
          if (position23 === atPosition) {
            setPositions({ ...positions, 3: [-12, -22, -32, -42] });
          }
          if (position24 === atPosition) {
            setPositions({ ...positions, 4: [-12, -22, -32, -42] });
          }
        }
    };  
    const checkIfCutPossibleFor3 = (atPosition) => {
        const { position31, position32, position33, position34 } = positions;
      
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
          if (position31 === atPosition) {
            setPositions({ ...positions, 1: [-13, -23, -33, -43] });
          }
          if (position32 === atPosition) {
            setPositions({ ...positions, 2: [-13, -23, -33, -43] });
          }
          if (position33 === atPosition) {
            setPositions({ ...positions, 3: [-13, -23, -33, -43] });
          }
          if (position34 === atPosition) {
            setPositions({ ...positions, 4: [-13, -23, -33, -43] });
          }
        }
    };    
    const checkIfCutPossibleFor4 = (atPosition) => {
        const { position41, position42, position43, position44 } = positions;
      
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
          if (position41 === atPosition) {
            setPositions({ ...positions, 1: [-14, -24, -34, -44] });
          }
          if (position42 === atPosition) {
            setPositions({ ...positions, 2: [-14, -24, -34, -44] });
          }
          if (position43 === atPosition) {
            setPositions({ ...positions, 3: [-14, -24, -34, -44] });
          }
          if (position44 === atPosition) {
            setPositions({ ...positions, 4: [-14, -24, -34, -44] });
          }
        }
    };
    const checkIfAnythingOpened = (player) => {
        switch (player) {
          case 1:
            return positions[1].every(pos => pos < 0);
          case 2:
            return positions[2].every(pos => pos < 0);
          case 3:
            return positions[3].every(pos => pos < 0);
          case 4:
            return positions[4].every(pos => pos < 0);
          default:
            return false;
        }
    }   
    const generateRandomNumber = (player) => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        setTurnMessage(""); 
        setMoveMessage("");
        
        switch (player) {
          case 1:
            console.log(turn1 + "  " + isMovedBy4 + "  " + checkIfAnythingOpened(4));
            if (turn1 && (isMovedBy4 || checkIfAnythingOpened(4))) {
              setWhoseTurnToMove(1);
              setIsMovedBy1(false);
              setCurrentNumber(randomNumber);
              switch (randomNumber) {
                case 1:
                  setImages({ ...images, 1: require("./assets/dice1.png") });
                  break;
                case 2:
                  setImages({ ...images, 1: require("./assets/dice2.png") });
                  break;
                case 3:
                  setImages({ ...images, 1: require("./assets/dice3.png") });
                  break;
                case 4:
                  setImages({ ...images, 1: require("./assets/dice4.png") });
                  break;
                case 5:
                  setImages({ ...images, 1: require("./assets/dice5.png") });
                  break;
                case 6:
                  setImages({ ...images, 1: require("./assets/dice6.png") });
                  break;
                default:
                  break;
              }
              if (randomNumber !== 6) {
                setTurn1(false); 
                setTurn2(true); 
                setIsMovedBy4(false);
              } else {
                console.log("same conditions must be there");
              }
            } else {
              setTurnMessage("It's Not Your Turn");
            }
            break;
          case 2:
            console.log(turn2 + "  " + isMovedBy1 + "  " + checkIfAnythingOpened(1));
            if (turn2 && (isMovedBy1 || checkIfAnythingOpened(1))) {
              setWhoseTurnToMove(2);
              setIsMovedBy2(false);
              setCurrentNumber(randomNumber);
              switch (randomNumber) {
                case 1:
                  setImages({ ...images, 2: require("./assets/dice1.png") });
                  break;
                case 2:
                  setImages({ ...images, 2: require("./assets/dice2.png") });
                  break;
                case 3:
                  setImages({ ...images, 2: require("./assets/dice3.png") });
                  break;
                case 4:
                  setImages({ ...images, 2: require("./assets/dice4.png") });
                  break;
                case 5:
                  setImages({ ...images, 2: require("./assets/dice5.png") });
                  break;
                case 6:
                  setImages({ ...images, 2: require("./assets/dice6.png") });
                  break;
                default:
                  break;
              }
              if (randomNumber !== 6) {
                setTurn2(false); 
                setTurn3(true); 
                setIsMovedBy1(false);
              } else {
                console.log("same conditions must be there");
              }
            } else {
              setTurnMessage("It's Not Your Turn");
            }
            break;
          case 3:
            console.log(turn3 + "  " + isMovedBy2 + "  " + checkIfAnythingOpened(2));
            if (turn3 && (isMovedBy2 || checkIfAnythingOpened(2))) {
              setWhoseTurnToMove(3);
              setIsMovedBy3(false);
              setCurrentNumber(randomNumber);
              switch (randomNumber) {
                case 1:
                  setImages({ ...images, 3: require("./assets/dice1.png") });
                  break;
                case 2:
                  setImages({ ...images, 3: require("./assets/dice2.png") });
                  break;
                case 3:
                  setImages({ ...images, 3: require("./assets/dice3.png") });
                  break;
                case 4:
                  setImages({ ...images, 3: require("./assets/dice4.png") });
                  break;
                case 5:
                  setImages({ ...images, 3: require("./assets/dice5.png") });
                  break;
                case 6:
                  setImages({ ...images, 3: require("./assets/dice6.png") });
                  break;
                default:
                  break;
              }
              if (randomNumber !== 6) {
                setTurn3(false); 
                setTurn4(true); 
                setIsMovedBy2(false);
              } else {
                console.log("same conditions must be there");
              }
            } else {
              setTurnMessage("It's Not Your Turn");
            }
            break;
          case 4:
            console.log(turn4 + "  " + isMovedBy3 + "  " + checkIfAnythingOpened(3));
            if (turn4 && (isMovedBy3 || checkIfAnythingOpened(3))) {
              setWhoseTurnToMove(4);
              setIsMovedBy4(false);
              setCurrentNumber(randomNumber);
              switch (randomNumber) {
                case 1:
                  setImages({ ...images, 4: require("./assets/dice1.png") });
                  break;
                case 2:
                  setImages({ ...images, 4: require("./assets/dice2.png") });
                  break;
                case 3:
                  setImages({ ...images, 4: require("./assets/dice3.png") });
                  break;
                case 4:
                  setImages({ ...images, 4: require("./assets/dice4.png") });
                  break;
                case 5:
                  setImages({ ...images, 4: require("./assets/dice5.png") });
                  break;
                case 6:
                  setImages({ ...images, 4: require("./assets/dice6.png") });
                  break;
                default:
                  break;
              }
              if (randomNumber !== 6) {
                setTurn4(false); 
                setTurn1(true); 
                setIsMovedBy3(false);
              } else {
                console.log("same conditions must be there");
              }
            } else {
              setTurnMessage("It's Not Your Turn");
            }
            break;
          default:
            break;
        }
      };
      
    const checkPosition = (player, whichOne, position) => {
  switch (player) {
    case 1:
      switch (whichOne) {
        case 1:
          if (positions[1][0] === position) {
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
    case 2:
      switch (whichOne) {
        case 1:
          if (positions[2][0] === position) {
            return (
              <FontAwesome
                name="user"
                style={styles.icons}
                onPress={() => moveIcon(2, 1, position)}
                color="green"
                size={20}
              />
            );
          }
          break;
        case 2:
          if (positions[2][1] === position) {
            return (
              <FontAwesome
                name="user"
                style={styles.icons}
                onPress={() => moveIcon(2, 2, position)}
                color="green"
                size={20}
              />
            );
          }
          break;
        case 3:
          if (positions[2][2] === position) {
            return (
              <FontAwesome
                name="user"
                style={styles.icons}
                onPress={() => moveIcon(2, 3, position)}
                color="green"
                size={20}
              />
            );
          }
          break;
        case 4:
          if (positions[2][3] === position) {
            return (
              <FontAwesome
                name="user"
                style={styles.icons}
                onPress={() => moveIcon(2, 4, position)}
                color="green"
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
      switch (whichOne) {
        case 1:
          if (positions[3][0] === position) {
            return (
              <FontAwesome
                name="user"
                style={styles.icons}
                onPress={() => moveIcon(3, 1, position)}
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
    case 4:
      switch (whichOne) {
        case 1:
          if (positions[4][0] === position) {
            return (
              <FontAwesome
                name="user"
                style={styles.icons}
                onPress={() => moveIcon(4, 1, position)}
                color="blue"
                size={20}
              />
            );
          }
          break;
        case 2:
          if (positions[4][1] === position) {
            return (
              <FontAwesome
                name="user"
                style={styles.icons}
                onPress={() => moveIcon(4, 2, position)}
                color="blue"
                size={20}
              />
            );
          }
          break;
        case 3:
          if (positions[4][2] === position) {
            return (
              <FontAwesome
                name="user"
                style={styles.icons}
                onPress={() => moveIcon(4, 3, position)}
                color="blue"
                size={20}
              />
            );
          }
          break;
        case 4:
          if (positions[4][3] === position) {
            return (
              <FontAwesome
                name="user"
                style={styles.icons}
                onPress={() => moveIcon(4, 4, position)}
                color="blue"
                size={20}
              />
            );
          }
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
    };
  
    return (
        <SafeAreaView className="flex-1 bg-primary">
        <View className="mt-10 items-center">
        <Text className='text-2xl text-blue-400 font-psemibold'> Welcome to Ludo Master </Text>
        
        
        <View style={styles.wholeSetup}>
        {/* =============================== Upper Part ============================= */}
        
        
        <View style={row.Style}>
          <View>
    <Animatable.View
      animation={this.state.turn1 ? zoomIn : zoomOut}
      duration={500}
    >
          <TouchableOpacity  onPress={()=>{generateRandomNumber(1)}}>
            <Image style={{ width : 90,height : 70,marginLeft : 30,marginBottom : 10}} source={this.state.image1} />
          </TouchableOpacity>
     
          <View style={[Players.styles,{marginLeft : Dimensions.get("window").width/50,borderRightWidth : 1,marginTop : 2}]}>
          <ImageBackground source={require("./assets/hattori.jpeg")} style={{width: '100%', height: '100%'}}>
            <View>
              <View style={row.Style}>
                <View style={[styles.places]}>
                  <TouchableOpacity>
                  {checkPostion(1,1,-11)}
                  </TouchableOpacity>
                </View>
                <View style={[styles.places,{marginLeft : 90}]}>
                <TouchableOpacity>
                    {checkPostion(1,2,-21)}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={row.Style}>
                <View style={[styles.places,{marginTop : 90}]} >
                <TouchableOpacity>
                    {checkPostion(1,3,-31)}
                  </TouchableOpacity>
                </View>
                <View  style={[styles.places,{marginTop : 90,marginLeft : 90}]}>
                <TouchableOpacity>
                    {checkPostion(1,4,-41)}
                  </TouchableOpacity>
              </View>
              </View>
            </View>
          </ImageBackground>
          </View>
    </Animatable.View>
         
          </View>
          <View style={[row.Style,{ marginTop : 82,borderTopWidth : 0 }]}>
              <View style={[styles.first]}>
                  <View style={styles.item}>
                    {checkPostion(1,1,11)}{checkPostion(1,2,11)}{checkPostion(1,3,11)}{checkPostion(1,4,11)}
                    {checkPostion(2,1,11)}{checkPostion(2,2,11)}{checkPostion(2,3,11)}{checkPostion(2,4,11)}
                    {checkPostion(3,1,11)}{checkPostion(3,2,11)}{checkPostion(3,3,11)}{checkPostion(3,4,11)}
                    {checkPostion(4,1,11)}{checkPostion(4,2,11)}{checkPostion(4,3,11)}{checkPostion(4,4,11)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,10)}{checkPostion(1,2,10)}{checkPostion(1,3,10)}{checkPostion(1,4,10)}
                    {checkPostion(2,1,10)}{checkPostion(2,2,10)}{checkPostion(2,3,10)}{checkPostion(2,4,10)}
                    {checkPostion(3,1,10)}{checkPostion(3,2,10)}{checkPostion(3,3,10)}{checkPostion(3,4,10)}
                    {checkPostion(4,1,10)}{checkPostion(4,2,10)}{checkPostion(4,3,10)}{checkPostion(4,4,10)}
                  </View>
                  <View style={[styles.item,{backgroundColor : "#9effa5"}]}>
                    {checkPostion(1,1,9)}{checkPostion(1,2,9)}{checkPostion(1,3,9)}{checkPostion(1,4,9)}
                    {checkPostion(2,1,9)}{checkPostion(2,2,9)}{checkPostion(2,3,9)}{checkPostion(2,4,9)}
                    {checkPostion(3,1,9)}{checkPostion(3,2,9)}{checkPostion(3,3,9)}{checkPostion(3,4,9)}
                    {checkPostion(4,1,9)}{checkPostion(4,2,9)}{checkPostion(4,3,9)}{checkPostion(4,4,9)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,8)}{checkPostion(1,2,8)}{checkPostion(1,3,8)}{checkPostion(1,4,8)}
                    {checkPostion(2,1,8)}{checkPostion(2,2,8)}{checkPostion(2,3,8)}{checkPostion(2,4,8)}
                    {checkPostion(3,1,8)}{checkPostion(3,2,8)}{checkPostion(3,3,8)}{checkPostion(3,4,8)}
                    {checkPostion(4,1,8)}{checkPostion(4,2,8)}{checkPostion(4,3,8)}{checkPostion(4,4,8)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,7)}{checkPostion(1,2,7)}{checkPostion(1,3,7)}{checkPostion(1,4,7)}
                    {checkPostion(2,1,7)}{checkPostion(2,2,7)}{checkPostion(2,3,7)}{checkPostion(2,4,7)}
                    {checkPostion(3,1,7)}{checkPostion(3,2,7)}{checkPostion(3,3,7)}{checkPostion(3,4,7)}
                    {checkPostion(4,1,7)}{checkPostion(4,2,7)}{checkPostion(4,3,7)}{checkPostion(4,4,7)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,6)}{checkPostion(1,2,6)}{checkPostion(1,3,6)}{checkPostion(1,4,6)}
                    {checkPostion(2,1,6)}{checkPostion(2,2,6)}{checkPostion(2,3,6)}{checkPostion(2,4,6)}
                    {checkPostion(3,1,6)}{checkPostion(3,2,6)}{checkPostion(3,3,6)}{checkPostion(3,4,6)}
                    {checkPostion(4,1,6)}{checkPostion(4,2,6)}{checkPostion(4,3,6)}{checkPostion(4,4,6)}
                  </View>
              </View>
              <View style={[styles.second]}>
                  <View style={styles.item}>
                    {checkPostion(1,1,12)}{checkPostion(1,2,12)}{checkPostion(1,3,12)}{checkPostion(1,4,12)}
                    {checkPostion(2,1,12)}{checkPostion(2,2,12)}{checkPostion(2,3,12)}{checkPostion(2,4,12)}
                    {checkPostion(3,1,12)}{checkPostion(3,2,12)}{checkPostion(3,3,12)}{checkPostion(3,4,12)}
                    {checkPostion(4,1,12)}{checkPostion(4,2,12)}{checkPostion(4,3,12)}{checkPostion(4,4,12)}
                  </View>
                  <View style={[styles.item,styles.green]}>
                    {checkPostion(1,1,58)}{checkPostion(1,2,58)}{checkPostion(1,3,58)}{checkPostion(1,4,58)}
                    {checkPostion(2,1,58)}{checkPostion(2,2,58)}{checkPostion(2,3,58)}{checkPostion(2,4,58)}
                    {checkPostion(3,1,58)}{checkPostion(3,2,58)}{checkPostion(3,3,58)}{checkPostion(3,4,58)}
                    {checkPostion(4,1,58)}{checkPostion(4,2,58)}{checkPostion(4,3,58)}{checkPostion(4,4,58)}
                  </View>
                  <View style={[styles.item,styles.green]}>
                    {checkPostion(1,1,59)}{checkPostion(1,2,59)}{checkPostion(1,3,59)}{checkPostion(1,4,59)}
                    {checkPostion(2,1,59)}{checkPostion(2,2,59)}{checkPostion(2,3,59)}{checkPostion(2,4,59)}
                    {checkPostion(3,1,59)}{checkPostion(3,2,59)}{checkPostion(3,3,59)}{checkPostion(3,4,59)}
                    {checkPostion(4,1,59)}{checkPostion(4,2,59)}{checkPostion(4,3,59)}{checkPostion(4,4,59)}
                  </View>
                  <View style={[styles.item,styles.green]}>
                    {checkPostion(1,1,60)}{checkPostion(1,2,60)}{checkPostion(1,3,60)}{checkPostion(1,4,60)}
                    {checkPostion(2,1,60)}{checkPostion(2,2,60)}{checkPostion(2,3,60)}{checkPostion(2,4,60)}
                    {checkPostion(3,1,60)}{checkPostion(3,2,60)}{checkPostion(3,3,60)}{checkPostion(3,4,60)}
                    {checkPostion(4,1,60)}{checkPostion(4,2,60)}{checkPostion(4,3,60)}{checkPostion(4,4,60)}
                  </View>
                  <View style={[styles.item,styles.green]}>
                    {checkPostion(1,1,61)}{checkPostion(1,2,61)}{checkPostion(1,3,61)}{checkPostion(1,4,61)}
                    {checkPostion(2,1,61)}{checkPostion(2,2,61)}{checkPostion(2,3,61)}{checkPostion(2,4,61)}
                    {checkPostion(3,1,61)}{checkPostion(3,2,61)}{checkPostion(3,3,61)}{checkPostion(3,4,61)}
                    {checkPostion(4,1,61)}{checkPostion(4,2,61)}{checkPostion(4,3,61)}{checkPostion(4,4,61)}
                  </View>
                  <View style={[styles.item,styles.green]}>
                    {checkPostion(1,1,62)}{checkPostion(1,2,62)}{checkPostion(1,3,62)}{checkPostion(1,4,62)}
                    {checkPostion(2,1,62)}{checkPostion(2,2,62)}{checkPostion(2,3,62)}{checkPostion(2,4,62)}
                    {checkPostion(3,1,62)}{checkPostion(3,2,62)}{checkPostion(3,3,62)}{checkPostion(3,4,62)}
                    {checkPostion(4,1,62)}{checkPostion(4,2,62)}{checkPostion(4,3,62)}{checkPostion(4,4,62)}
                  </View>
              </View>
              <View style={[styles.third,]}>
                  <View style={styles.item}>
                    {checkPostion(1,1,13)}{checkPostion(1,2,13)}{checkPostion(1,3,13)}{checkPostion(1,4,13)}
                    {checkPostion(2,1,13)}{checkPostion(2,2,13)}{checkPostion(2,3,13)}{checkPostion(2,4,13)}
                    {checkPostion(3,1,13)}{checkPostion(3,2,13)}{checkPostion(3,3,13)}{checkPostion(3,4,13)}
                    {checkPostion(4,1,13)}{checkPostion(4,2,13)}{checkPostion(4,3,13)}{checkPostion(4,4,13)}
                  </View>
                  <View style={[styles.item,{backgroundColor : "#9effa5"}]}>
                    {checkPostion(1,1,14)}{checkPostion(1,2,14)}{checkPostion(1,3,14)}{checkPostion(1,4,14)}
                    {checkPostion(2,1,14)}{checkPostion(2,2,14)}{checkPostion(2,3,14)}{checkPostion(2,4,14)}
                    {checkPostion(3,1,14)}{checkPostion(3,2,14)}{checkPostion(3,3,14)}{checkPostion(3,4,14)}
                    {checkPostion(4,1,14)}{checkPostion(4,2,14)}{checkPostion(4,3,14)}{checkPostion(4,4,14)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,15)}{checkPostion(1,2,15)}{checkPostion(1,3,15)}{checkPostion(1,4,15)}
                    {checkPostion(2,1,15)}{checkPostion(2,2,15)}{checkPostion(2,3,15)}{checkPostion(2,4,15)}
                    {checkPostion(3,1,15)}{checkPostion(3,2,15)}{checkPostion(3,3,15)}{checkPostion(3,4,15)}
                    {checkPostion(4,1,15)}{checkPostion(4,2,15)}{checkPostion(4,3,15)}{checkPostion(4,4,15)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,16)}{checkPostion(1,2,16)}{checkPostion(1,3,16)}{checkPostion(1,4,16)}
                    {checkPostion(2,1,16)}{checkPostion(2,2,16)}{checkPostion(2,3,16)}{checkPostion(2,4,16)}
                    {checkPostion(3,1,16)}{checkPostion(3,2,16)}{checkPostion(3,3,16)}{checkPostion(3,4,16)}
                    {checkPostion(4,1,16)}{checkPostion(4,2,16)}{checkPostion(4,3,16)}{checkPostion(4,4,16)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,17)}{checkPostion(1,2,17)}{checkPostion(1,3,17)}{checkPostion(1,4,17)}
                    {checkPostion(2,1,17)}{checkPostion(2,2,17)}{checkPostion(2,3,17)}{checkPostion(2,4,17)}
                    {checkPostion(3,1,17)}{checkPostion(3,2,17)}{checkPostion(3,3,17)}{checkPostion(3,4,17)}
                    {checkPostion(4,1,17)}{checkPostion(4,2,17)}{checkPostion(4,3,17)}{checkPostion(4,4,17)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,18)}{checkPostion(1,2,18)}{checkPostion(1,3,18)}{checkPostion(1,4,18)}
                    {checkPostion(2,1,18)}{checkPostion(2,2,18)}{checkPostion(2,3,18)}{checkPostion(2,4,18)}
                    {checkPostion(3,1,18)}{checkPostion(3,2,18)}{checkPostion(3,3,18)}{checkPostion(3,4,18)}
                    {checkPostion(4,1,18)}{checkPostion(4,2,18)}{checkPostion(4,3,18)}{checkPostion(4,4,18)}
                  </View>
                  
              </View>   
              
          </View>
          <Animatable.View
      animation={this.state.turn2 ? zoomIn : zoomOut}
      duration={500}
    >
          <View>
          
          <TouchableOpacity  onPress={()=>{ generateRandomNumber(2) }}>
            <Image style={{ width : 90,height : 70,marginLeft : 30,marginBottom : 10}} source={this.state.image2} />
          </TouchableOpacity>
          <View style={[Players.styles,{borderLeftWidth : 1,marginTop : 1.7}]}>
            <ImageBackground source={require("./assets/doremon.jpg")} style={{width: '100%', height: '100%'}}>
              <View>
                  <View style={row.Style}>
                    <View style={styles.places}>
                    <TouchableOpacity>
                        {checkPostion(2,1,-12)}
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.places,{marginLeft : 90}]}>
                    <TouchableOpacity>
                        {checkPostion(2,2,-22)}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={row.Style}>
                    <View style={[styles.places,{marginTop : 90}]}>
                    <TouchableOpacity>
                        {checkPostion(2,3,-32)}
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.places,{marginLeft : 90,marginTop : 90}]}>
                    <TouchableOpacity>
                        {checkPostion(2,4,-42)}
                    </TouchableOpacity>

                  </View>
                </View>
              </View>
            </ImageBackground>
               
          </View>
          </View>
          </Animatable.View>
           </View>
           
        {/* =============================== Middle Part =============================== */}
        <View style={row.Style}>
          {/* ============================= First Triplet ============================== */}
          <View style={styles.First}>
            <View style={[row.Style,{borderLeftWidth : 2}]}>
              <View style={styles.item}>
                  {checkPostion(1,1,52)}{checkPostion(1,2,52)}{checkPostion(1,3,52)}{checkPostion(1,4,52)}
                  {checkPostion(2,1,52)}{checkPostion(2,2,52)}{checkPostion(2,3,52)}{checkPostion(2,4,52)}
                  {checkPostion(3,1,52)}{checkPostion(3,2,52)}{checkPostion(3,3,52)}{checkPostion(3,4,52)}
                  {checkPostion(4,1,52)}{checkPostion(4,2,52)}{checkPostion(4,3,52)}{checkPostion(4,4,52)}
              </View>
              <View style={[styles.item,styles.red,{backgroundColor : "#fa9daa"}]}>  
                    {checkPostion(1,1,1)}{checkPostion(1,2,1)}{checkPostion(1,3,1)}{checkPostion(1,4,1)}                   
                    {checkPostion(2,1,1)}{checkPostion(2,2,1)}{checkPostion(2,3,1)}{checkPostion(2,4,1)}
                    {checkPostion(3,1,1)}{checkPostion(3,2,1)}{checkPostion(3,3,1)}{checkPostion(3,4,1)}
                    {checkPostion(4,1,1)}{checkPostion(4,2,1)}{checkPostion(4,3,1)}{checkPostion(4,4,1)}
                </View>
              <View style={styles.item}>
                  {checkPostion(1,1,2)}{checkPostion(1,2,2)}{checkPostion(1,3,2)}{checkPostion(1,4,2)}
                  {checkPostion(2,1,2)}{checkPostion(2,2,2)}{checkPostion(2,3,2)}{checkPostion(2,4,2)}
                  {checkPostion(3,1,2)}{checkPostion(3,2,2)}{checkPostion(3,3,2)}{checkPostion(3,4,2)}
                  {checkPostion(4,1,2)}{checkPostion(4,2,2)}{checkPostion(4,3,2)}{checkPostion(4,4,2)}
              </View>
              <View style={styles.item}>
                  {checkPostion(1,1,3)}{checkPostion(1,2,3)}{checkPostion(1,3,3)}{checkPostion(1,4,3)}
                  {checkPostion(2,1,3)}{checkPostion(2,2,3)}{checkPostion(2,3,3)}{checkPostion(2,4,3)}
                  {checkPostion(3,1,3)}{checkPostion(3,2,3)}{checkPostion(3,3,3)}{checkPostion(3,4,3)}
                  {checkPostion(4,1,3)}{checkPostion(4,2,3)}{checkPostion(4,3,3)}{checkPostion(4,4,3)}
              </View>
              <View style={styles.item}>
                  {checkPostion(1,1,4)}{checkPostion(1,2,4)}{checkPostion(1,3,4)}{checkPostion(1,4,4)}
                  {checkPostion(2,1,4)}{checkPostion(2,2,4)}{checkPostion(2,3,4)}{checkPostion(2,4,4)}
                  {checkPostion(3,1,4)}{checkPostion(3,2,4)}{checkPostion(3,3,4)}{checkPostion(3,4,4)}
                  {checkPostion(4,1,4)}{checkPostion(4,2,4)}{checkPostion(4,3,4)}{checkPostion(4,4,4)}
              </View>
              <View style={styles.item}>
                    {checkPostion(1,1,5)}{checkPostion(1,2,5)}{checkPostion(1,3,5)}{checkPostion(1,4,5)}
                    {checkPostion(2,1,5)}{checkPostion(2,2,5)}{checkPostion(2,3,5)}{checkPostion(2,4,5)}
                    {checkPostion(3,1,5)}{checkPostion(3,2,5)}{checkPostion(3,3,5)}{checkPostion(3,4,5)}
                    {checkPostion(4,1,5)}{checkPostion(4,2,5)}{checkPostion(4,3,5)}{checkPostion(4,4,5)}
                </View>
            </View>
            <View style={[row.Style,{borderLeftWidth : 2}]}>
              <View style={styles.item}>
                {checkPostion(1,1,51)}{checkPostion(1,2,51)}{checkPostion(1,3,51)}{checkPostion(1,4,51)}
                {checkPostion(2,1,51)}{checkPostion(2,2,51)}{checkPostion(2,3,51)}{checkPostion(2,4,51)}
                {checkPostion(3,1,51)}{checkPostion(3,2,51)}{checkPostion(3,3,51)}{checkPostion(3,4,51)}
                {checkPostion(4,1,51)}{checkPostion(4,2,51)}{checkPostion(4,3,51)}{checkPostion(4,4,51)}
              </View>
              <View style={[styles.item,styles.red]}>
              {checkPostion(1,1,53)}{checkPostion(1,2,53)}{checkPostion(1,3,53)}{checkPostion(1,4,53)}
              {checkPostion(2,1,53)}{checkPostion(2,2,53)}{checkPostion(2,3,53)}{checkPostion(2,4,53)}
              {checkPostion(3,1,53)}{checkPostion(3,2,53)}{checkPostion(3,3,53)}{checkPostion(3,4,53)}
              {checkPostion(4,1,53)}{checkPostion(4,2,53)}{checkPostion(4,3,53)}{checkPostion(4,4,53)}           
              </View>
              <View style={[styles.item,styles.red]}>
              {checkPostion(1,1,54)}{checkPostion(1,2,54)}{checkPostion(1,3,54)}{checkPostion(1,4,54)}
              {checkPostion(2,1,54)}{checkPostion(2,2,54)}{checkPostion(2,3,54)}{checkPostion(2,4,54)}
              {checkPostion(3,1,54)}{checkPostion(3,2,54)}{checkPostion(3,3,54)}{checkPostion(3,4,54)}
              {checkPostion(4,1,54)}{checkPostion(4,2,54)}{checkPostion(4,3,54)}{checkPostion(4,4,54)}           
              </View>
              <View style={[styles.item,styles.red]}>
              {checkPostion(1,1,55)}{checkPostion(1,2,55)}{checkPostion(1,3,55)}{checkPostion(1,4,55)}
              {checkPostion(2,1,55)}{checkPostion(2,2,55)}{checkPostion(2,3,55)}{checkPostion(2,4,55)}
              {checkPostion(3,1,55)}{checkPostion(3,2,55)}{checkPostion(3,3,55)}{checkPostion(3,4,55)}
              {checkPostion(4,1,55)}{checkPostion(4,2,55)}{checkPostion(4,3,55)}{checkPostion(4,4,55)}           
              </View>
              <View style={[styles.item,styles.red]}>
                {checkPostion(1,1,56)}{checkPostion(1,2,56)}{checkPostion(1,3,56)}{checkPostion(1,4,56)}
                {checkPostion(2,1,56)}{checkPostion(2,2,56)}{checkPostion(2,3,56)}{checkPostion(2,4,56)}
                {checkPostion(3,1,56)}{checkPostion(3,2,56)}{checkPostion(3,3,56)}{checkPostion(3,4,56)}
                {checkPostion(4,1,56)}{checkPostion(4,2,56)}{checkPostion(4,3,56)}{checkPostion(4,4,56)}           
                </View>
                <View style={[styles.item,styles.red]}>
                {checkPostion(1,1,57)}{checkPostion(1,2,57)}{checkPostion(1,3,57)}{checkPostion(1,4,57)}
                {checkPostion(2,1,57)}{checkPostion(2,2,57)}{checkPostion(2,3,57)}{checkPostion(2,4,57)}
                {checkPostion(3,1,57)}{checkPostion(3,2,57)}{checkPostion(3,3,57)}{checkPostion(3,4,57)}
                {checkPostion(4,1,57)}{checkPostion(4,2,57)}{checkPostion(4,3,57)}{checkPostion(4,4,57)}           
                </View>
            </View>
            <View style={[row.Style,{borderLeftWidth : 2}]}>
              <View style={styles.item}>
                {checkPostion(1,1,50)}{checkPostion(1,2,50)}{checkPostion(1,3,50)}{checkPostion(1,4,50)}
                {checkPostion(2,1,50)}{checkPostion(2,2,50)}{checkPostion(2,3,50)}{checkPostion(2,4,50)}
                {checkPostion(3,1,50)}{checkPostion(3,2,50)}{checkPostion(3,3,50)}{checkPostion(3,4,50)}
                {checkPostion(4,1,50)}{checkPostion(4,2,50)}{checkPostion(4,3,50)}{checkPostion(4,4,50)}      
              </View>
              <View style={styles.item}>
                {checkPostion(1,1,49)}{checkPostion(1,2,49)}{checkPostion(1,3,49)}{checkPostion(1,4,49)}
                {checkPostion(2,1,49)}{checkPostion(2,2,49)}{checkPostion(2,3,49)}{checkPostion(2,4,49)}
                {checkPostion(3,1,49)}{checkPostion(3,2,49)}{checkPostion(3,3,49)}{checkPostion(3,4,49)}
                {checkPostion(4,1,49)}{checkPostion(4,2,49)}{checkPostion(4,3,49)}{checkPostion(4,4,49)} 
                </View>
                <View style={[styles.item,{backgroundColor : "#fa9daa"}]}>
                {checkPostion(1,1,48)}{checkPostion(1,2,48)}{checkPostion(1,3,48)}{checkPostion(1,4,48)}
                {checkPostion(2,1,48)}{checkPostion(2,2,48)}{checkPostion(2,3,48)}{checkPostion(2,4,48)}
                {checkPostion(3,1,48)}{checkPostion(3,2,48)}{checkPostion(3,3,48)}{checkPostion(3,4,48)}
                {checkPostion(4,1,48)}{checkPostion(4,2,48)}{checkPostion(4,3,48)}{checkPostion(4,4,48)}   
                </View>
                <View style={styles.item}>
                {checkPostion(1,1,47)}{checkPostion(1,2,47)}{checkPostion(1,3,47)}{checkPostion(1,4,47)}
                {checkPostion(2,1,47)}{checkPostion(2,2,47)}{checkPostion(2,3,47)}{checkPostion(2,4,47)}
                {checkPostion(3,1,47)}{checkPostion(3,2,47)}{checkPostion(3,3,47)}{checkPostion(3,4,47)}
                {checkPostion(4,1,47)}{checkPostion(4,2,47)}{checkPostion(4,3,47)}{checkPostion(4,4,47)}    
                </View>
                <View style={styles.item}>
                {checkPostion(1,1,46)}{checkPostion(1,2,46)}{checkPostion(1,3,46)}{checkPostion(1,4,46)}
                {checkPostion(2,1,46)}{checkPostion(2,2,46)}{checkPostion(2,3,46)}{checkPostion(2,4,46)}
                {checkPostion(3,1,46)}{checkPostion(3,2,46)}{checkPostion(3,3,46)}{checkPostion(3,4,46)}
                {checkPostion(4,1,46)}{checkPostion(4,2,46)}{checkPostion(4,3,46)}{checkPostion(4,4,46)}    
                </View>
                <View style={styles.item}>
                {checkPostion(1,1,45)}{checkPostion(1,2,45)}{checkPostion(1,3,45)}{checkPostion(1,4,45)}
                {checkPostion(2,1,45)}{checkPostion(2,2,45)}{checkPostion(2,3,45)}{checkPostion(2,4,45)}
                {checkPostion(3,1,45)}{checkPostion(3,2,45)}{checkPostion(3,3,45)}{checkPostion(3,4,45)}
                {checkPostion(4,1,45)}{checkPostion(4,2,45)}{checkPostion(4,3,45)}{checkPostion(4,4,45)}    
                </View>
            </View>
          </View>
          {/* ============================= Winner Zone =========================== */}
          <View style={styles.winnerZone}>
            <View>
              {checkPostion(1,1,"winner")}{checkPostion(2,1,"winner")}{checkPostion(3,1,"winner")}{checkPostion(4,1,"winner")}
            </View>
            <View>
              {checkPostion(2,2,"winner")}{checkPostion(1,2,"winner")}{checkPostion(3,2,"winner")}{checkPostion(4,2,"winner")}
            </View>
            <View>
              {checkPostion(3,3,"winner")}{checkPostion(1,3,"winner")}{checkPostion(2,3,"winner")}{checkPostion(4,3,"winner")}
            </View>
            <View>
              {checkPostion(4,4,"winner")}{checkPostion(1,4,"winner")}{checkPostion(2,4,"winner")}{checkPostion(3,4,"winner")}
            </View>
          </View>
          {/* ============================== Last Triplet */}
          <View style={styles.Second}>
            <View style={[row.Style,{borderRightWidth : 2}]}>
              <View style={styles.item}>
                  {checkPostion(1,1,19)}{checkPostion(1,2,19)}{checkPostion(1,3,19)}{checkPostion(1,4,19)}
                  {checkPostion(2,1,19)}{checkPostion(2,2,19)}{checkPostion(2,3,19)}{checkPostion(2,4,19)}
                  {checkPostion(3,1,19)}{checkPostion(3,2,19)}{checkPostion(3,3,19)}{checkPostion(3,4,19)}
                  {checkPostion(4,1,19)}{checkPostion(4,2,19)}{checkPostion(4,3,19)}{checkPostion(4,4,19)}
               </View>
              <View style={styles.item}>
                  {checkPostion(1,1,20)}{checkPostion(1,2,20)}{checkPostion(1,3,20)}{checkPostion(1,4,20)}
                  {checkPostion(2,1,20)}{checkPostion(2,2,20)}{checkPostion(2,3,20)}{checkPostion(2,4,20)}
                  {checkPostion(3,1,20)}{checkPostion(3,2,20)}{checkPostion(3,3,20)}{checkPostion(3,4,20)}
                  {checkPostion(4,1,20)}{checkPostion(4,2,20)}{checkPostion(4,3,20)}{checkPostion(4,4,20)}
                 </View>
              <View style={styles.item}>
                {checkPostion(1,1,21)}{checkPostion(1,2,21)}{checkPostion(1,3,21)}{checkPostion(1,4,21)}
                {checkPostion(2,1,21)}{checkPostion(2,2,21)}{checkPostion(2,3,21)}{checkPostion(2,4,21)}
                {checkPostion(3,1,21)}{checkPostion(3,2,21)}{checkPostion(3,3,21)}{checkPostion(3,4,21)}
                {checkPostion(4,1,21)}{checkPostion(4,2,21)}{checkPostion(4,3,21)}{checkPostion(4,4,21)}
                </View>
              <View style={[styles.item,{backgroundColor : "#ffcff0"}]}>
                {checkPostion(1,1,22)}{checkPostion(1,2,22)}{checkPostion(1,3,22)}{checkPostion(1,4,22)}
                {checkPostion(2,1,22)}{checkPostion(2,2,22)}{checkPostion(2,3,22)}{checkPostion(2,4,22)}
                {checkPostion(3,1,22)}{checkPostion(3,2,22)}{checkPostion(3,3,22)}{checkPostion(3,4,22)}
                {checkPostion(4,1,22)}{checkPostion(4,2,22)}{checkPostion(4,3,22)}{checkPostion(4,4,22)}
                </View>
              <View style={styles.item}>
                {checkPostion(1,1,23)}{checkPostion(1,2,23)}{checkPostion(1,3,23)}{checkPostion(1,4,23)}
                {checkPostion(2,1,23)}{checkPostion(2,2,23)}{checkPostion(2,3,23)}{checkPostion(2,4,23)}
                {checkPostion(3,1,23)}{checkPostion(3,2,23)}{checkPostion(3,3,23)}{checkPostion(3,4,23)}
                {checkPostion(4,1,23)}{checkPostion(4,2,23)}{checkPostion(4,3,23)}{checkPostion(4,4,23)}
                </View>
              <View style={styles.item}>
                  {checkPostion(1,1,24)}{checkPostion(1,2,24)}{checkPostion(1,3,24)}{checkPostion(1,4,24)}
                  {checkPostion(2,1,24)}{checkPostion(2,2,24)}{checkPostion(2,3,24)}{checkPostion(2,4,24)}
                  {checkPostion(3,1,24)}{checkPostion(3,2,24)}{checkPostion(3,3,24)}{checkPostion(3,4,24)}
                  {checkPostion(4,1,24)}{checkPostion(4,2,24)}{checkPostion(4,3,24)}{checkPostion(4,4,24)}
                 </View>
            </View>
            <View style={[row.Style,{borderRightWidth : 2}]}>
              <View style={[styles.item,styles.orange]}>
                    {checkPostion(1,1,67)}{checkPostion(1,2,67)}{checkPostion(1,3,67)}{checkPostion(1,4,67)}
                    {checkPostion(2,1,67)}{checkPostion(2,2,67)}{checkPostion(2,3,67)}{checkPostion(2,4,67)}
                    {checkPostion(3,1,67)}{checkPostion(3,2,67)}{checkPostion(3,3,67)}{checkPostion(3,4,67)}
                    {checkPostion(4,1,67)}{checkPostion(4,2,67)}{checkPostion(4,3,67)}{checkPostion(4,4,67)}
                  </View>
              <View style={[styles.item,styles.orange]}>
                    {checkPostion(1,1,66)}{checkPostion(1,2,66)}{checkPostion(1,3,66)}{checkPostion(1,4,66)}
                    {checkPostion(2,1,66)}{checkPostion(2,2,66)}{checkPostion(2,3,66)}{checkPostion(2,4,66)}
                    {checkPostion(3,1,66)}{checkPostion(3,2,66)}{checkPostion(3,3,66)}{checkPostion(3,4,66)}
                    {checkPostion(4,1,66)}{checkPostion(4,2,66)}{checkPostion(4,3,66)}{checkPostion(4,4,66)}
                  </View>
              <View style={[styles.item,styles.orange]}>
                  {checkPostion(1,1,65)}{checkPostion(1,2,65)}{checkPostion(1,3,65)}{checkPostion(1,4,65)}
                  {checkPostion(2,1,65)}{checkPostion(2,2,65)}{checkPostion(2,3,65)}{checkPostion(2,4,65)}
                  {checkPostion(3,1,65)}{checkPostion(3,2,65)}{checkPostion(3,3,65)}{checkPostion(3,4,65)}
                  {checkPostion(4,1,65)}{checkPostion(4,2,65)}{checkPostion(4,3,65)}{checkPostion(4,4,65)}
                </View>
              <View style={[styles.item,styles.orange]}>
                  {checkPostion(1,1,64)}{checkPostion(1,2,64)}{checkPostion(1,3,64)}{checkPostion(1,4,64)}
                  {checkPostion(2,1,64)}{checkPostion(2,2,64)}{checkPostion(2,3,64)}{checkPostion(2,4,64)}
                  {checkPostion(3,1,64)}{checkPostion(3,2,64)}{checkPostion(3,3,64)}{checkPostion(3,4,64)}
                  {checkPostion(4,1,64)}{checkPostion(4,2,64)}{checkPostion(4,3,64)}{checkPostion(4,4,64)}
                </View>
              <View style={[styles.item,styles.orange]}>
                  {checkPostion(1,1,63)}{checkPostion(1,2,63)}{checkPostion(1,3,63)}{checkPostion(1,4,63)}
                  {checkPostion(2,1,63)}{checkPostion(2,2,63)}{checkPostion(2,3,63)}{checkPostion(2,4,63)}
                  {checkPostion(3,1,63)}{checkPostion(3,2,63)}{checkPostion(3,3,63)}{checkPostion(3,4,63)}
                  {checkPostion(4,1,63)}{checkPostion(4,2,63)}{checkPostion(4,3,63)}{checkPostion(4,4,63)}
                </View>
              <View style={styles.item}>
                    {checkPostion(1,1,25)}{checkPostion(1,2,25)}{checkPostion(1,3,25)}{checkPostion(1,4,25)}
                    {checkPostion(2,1,25)}{checkPostion(2,2,25)}{checkPostion(2,3,25)}{checkPostion(2,4,25)}
                    {checkPostion(3,1,25)}{checkPostion(3,2,25)}{checkPostion(3,3,25)}{checkPostion(3,4,25)}
                    {checkPostion(4,1,25)}{checkPostion(4,2,25)}{checkPostion(4,3,25)}{checkPostion(4,4,25)}
                  </View>
            </View>
            <View style={[row.Style,{borderRightWidth : 2}]}>
              <View style={styles.item}>
                    {checkPostion(1,1,31)}{checkPostion(1,2,31)}{checkPostion(1,3,31)}{checkPostion(1,4,31)}
                    {checkPostion(2,1,31)}{checkPostion(2,2,31)}{checkPostion(2,3,31)}{checkPostion(2,4,31)}
                    {checkPostion(3,1,31)}{checkPostion(3,2,31)}{checkPostion(3,3,31)}{checkPostion(3,4,31)}
                    {checkPostion(4,1,31)}{checkPostion(4,2,31)}{checkPostion(4,3,31)}{checkPostion(4,4,31)}
                 </View>
              <View style={styles.item}>
                    {checkPostion(1,1,30)}{checkPostion(1,2,30)}{checkPostion(1,3,30)}{checkPostion(1,4,30)}
                    {checkPostion(2,1,30)}{checkPostion(2,2,30)}{checkPostion(2,3,30)}{checkPostion(2,4,30)}
                    {checkPostion(3,1,30)}{checkPostion(3,2,30)}{checkPostion(3,3,30)}{checkPostion(3,4,30)}
                    {checkPostion(4,1,30)}{checkPostion(4,2,30)}{checkPostion(4,3,30)}{checkPostion(4,4,30)}
                   </View>
              <View style={styles.item}>
                  {checkPostion(1,1,29)}{checkPostion(1,2,29)}{checkPostion(1,3,29)}{checkPostion(1,4,29)}
                  {checkPostion(2,1,29)}{checkPostion(2,2,29)}{checkPostion(2,3,29)}{checkPostion(2,4,29)}
                  {checkPostion(3,1,29)}{checkPostion(3,2,29)}{checkPostion(3,3,29)}{checkPostion(3,4,29)}
                  {checkPostion(4,1,29)}{checkPostion(4,2,29)}{checkPostion(4,3,29)}{checkPostion(4,4,29)}
                  </View>
              <View style={styles.item}>
                  {checkPostion(1,1,28)}{checkPostion(1,2,28)}{checkPostion(1,3,28)}{checkPostion(1,4,28)}
                  {checkPostion(2,1,28)}{checkPostion(2,2,28)}{checkPostion(2,3,28)}{checkPostion(2,4,28)}
                  {checkPostion(3,1,28)}{checkPostion(3,2,28)}{checkPostion(3,3,28)}{checkPostion(3,4,28)}
                  {checkPostion(4,1,28)}{checkPostion(4,2,28)}{checkPostion(4,3,28)}{checkPostion(4,4,28)}
                  </View>
              <View style={[styles.item,styles.orange,{backgroundColor : "#ffcff0"}]}>
                  {checkPostion(1,1,27)}{checkPostion(1,2,27)}{checkPostion(1,3,27)}{checkPostion(1,4,27)}
                  {checkPostion(2,1,27)}{checkPostion(2,2,27)}{checkPostion(2,3,27)}{checkPostion(2,4,27)}
                  {checkPostion(3,1,27)}{checkPostion(3,2,27)}{checkPostion(3,3,27)}{checkPostion(3,4,27)}
                  {checkPostion(4,1,27)}{checkPostion(4,2,27)}{checkPostion(4,3,27)}{checkPostion(4,4,27)}
                  </View>
              <View style={styles.item}>
                    {checkPostion(1,1,26)}{checkPostion(1,2,26)}{checkPostion(1,3,26)}{checkPostion(1,4,26)}
                    {checkPostion(2,1,26)}{checkPostion(2,2,26)}{checkPostion(2,3,26)}{checkPostion(2,4,26)}
                    {checkPostion(3,1,26)}{checkPostion(3,2,26)}{checkPostion(3,3,26)}{checkPostion(3,4,26)}
                    {checkPostion(4,1,26)}{checkPostion(4,2,26)}{checkPostion(4,3,26)}{checkPostion(4,4,26)}
                   </View>
            </View>
          </View>   
        </View>
        {/* =============================== Lowest Part ============================= */}
        <View style={row.Style}>
          <View>
          <Animatable.View
      animation={this.state.turn4 ? zoomIn : zoomOut}
      duration={500}
    >
          <View style={[Players.styles,{marginLeft : Dimensions.get("window").width/50,borderRightWidth : 1}]}>
          
          <ImageBackground source={require("./assets/tomJerry.png")} style={{width: '100%', height: '100%'}}>
            <View>
            <View style={row.Style}>
                <View style={styles.places}>
                <TouchableOpacity >
                    {checkPostion(4,1,-14)}
                  </TouchableOpacity>
                </View>
                <View style={[styles.places,{marginLeft : 90}]}>
                <TouchableOpacity >
                    {checkPostion(4,2,-24)}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={row.Style}>
                <View style={[styles.places,{marginTop : 90}]}>
                <TouchableOpacity >
                    {checkPostion(4,3,-34)}
                  </TouchableOpacity>
                </View>
                <View style={[styles.places,{marginLeft : 90,marginTop : 90}]}>
                <TouchableOpacity >
                    {checkPostion(4,4,-44)}
                  </TouchableOpacity>
              </View>
              </View>
            </View>
          </ImageBackground>
          
          </View>
          <TouchableOpacity  onPress={()=>{generateRandomNumber(4)}}>
            <Image style={{ width : 90,height : 70,marginLeft : 30,marginTop : 10}} source={this.state.image4} />
          </TouchableOpacity>
          </Animatable.View>
          </View>
         <View style={row.Style}>
              <View style={styles.first}>
                  <View style={styles.item}>
                    {checkPostion(1,1,44)}{checkPostion(1,2,44)}{checkPostion(1,3,44)}{checkPostion(1,4,44)}
                    {checkPostion(2,1,44)}{checkPostion(2,2,44)}{checkPostion(2,3,44)}{checkPostion(2,4,44)}
                    {checkPostion(3,1,44)}{checkPostion(3,2,44)}{checkPostion(3,3,44)}{checkPostion(3,4,44)}
                    {checkPostion(4,1,44)}{checkPostion(4,2,44)}{checkPostion(4,3,44)}{checkPostion(4,4,44)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,43)}{checkPostion(1,2,43)}{checkPostion(1,3,43)}{checkPostion(1,4,43)}
                    {checkPostion(2,1,43)}{checkPostion(2,2,43)}{checkPostion(2,3,43)}{checkPostion(2,4,43)}
                    {checkPostion(3,1,43)}{checkPostion(3,2,43)}{checkPostion(3,3,43)}{checkPostion(3,4,43)}
                    {checkPostion(4,1,43)}{checkPostion(4,2,43)}{checkPostion(4,3,43)}{checkPostion(4,4,43)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,42)}{checkPostion(1,2,42)}{checkPostion(1,3,42)}{checkPostion(1,4,42)}
                    {checkPostion(2,1,42)}{checkPostion(2,2,42)}{checkPostion(2,3,42)}{checkPostion(2,4,42)}
                    {checkPostion(3,1,42)}{checkPostion(3,2,42)}{checkPostion(3,3,42)}{checkPostion(3,4,42)}
                    {checkPostion(4,1,42)}{checkPostion(4,2,42)}{checkPostion(4,3,42)}{checkPostion(4,4,42)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,41)}{checkPostion(1,2,41)}{checkPostion(1,3,41)}{checkPostion(1,4,41)}
                    {checkPostion(2,1,41)}{checkPostion(2,2,41)}{checkPostion(2,3,41)}{checkPostion(2,4,41)}
                    {checkPostion(3,1,41)}{checkPostion(3,2,41)}{checkPostion(3,3,41)}{checkPostion(3,4,41)}
                    {checkPostion(4,1,41)}{checkPostion(4,2,41)}{checkPostion(4,3,41)}{checkPostion(4,4,41)}
                  </View>
                  <View style={[styles.item,styles.blue,{backgroundColor : "#67E6DC"}]}>
                    {checkPostion(1,1,40)}{checkPostion(1,2,40)}{checkPostion(1,3,40)}{checkPostion(1,4,40)}
                    {checkPostion(2,1,40)}{checkPostion(2,2,40)}{checkPostion(2,3,40)}{checkPostion(2,4,40)}
                    {checkPostion(3,1,40)}{checkPostion(3,2,40)}{checkPostion(3,3,40)}{checkPostion(3,4,40)}
                    {checkPostion(4,1,40)}{checkPostion(4,2,40)}{checkPostion(4,3,40)}{checkPostion(4,4,40)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,39)}{checkPostion(1,2,39)}{checkPostion(1,3,39)}{checkPostion(1,4,39)}
                    {checkPostion(2,1,39)}{checkPostion(2,2,39)}{checkPostion(2,3,39)}{checkPostion(2,4,39)}
                    {checkPostion(3,1,39)}{checkPostion(3,2,39)}{checkPostion(3,3,39)}{checkPostion(3,4,39)}
                    {checkPostion(4,1,39)}{checkPostion(4,2,39)}{checkPostion(4,3,39)}{checkPostion(4,4,39)}
                  </View>
              </View>
              <View style={styles.second}>
                  <View style={[styles.item,styles.blue]}>
                    {checkPostion(1,1,72)}{checkPostion(1,2,72)}{checkPostion(1,3,72)}{checkPostion(1,4,72)}
                    {checkPostion(2,1,72)}{checkPostion(2,2,72)}{checkPostion(2,3,72)}{checkPostion(2,4,72)}
                    {checkPostion(3,1,72)}{checkPostion(3,2,72)}{checkPostion(3,3,72)}{checkPostion(3,4,72)}
                    {checkPostion(4,1,72)}{checkPostion(4,2,72)}{checkPostion(4,3,72)}{checkPostion(4,4,72)}
                  </View>
                  <View style={[styles.item,styles.blue]}>
                    {checkPostion(1,1,71)}{checkPostion(1,2,71)}{checkPostion(1,3,71)}{checkPostion(1,4,71)}
                    {checkPostion(2,1,71)}{checkPostion(2,2,71)}{checkPostion(2,3,71)}{checkPostion(2,4,71)}
                    {checkPostion(3,1,71)}{checkPostion(3,2,71)}{checkPostion(3,3,71)}{checkPostion(3,4,71)}
                    {checkPostion(4,1,71)}{checkPostion(4,2,71)}{checkPostion(4,3,71)}{checkPostion(4,4,71)}
                  </View>
                  <View style={[styles.item,styles.blue]}>
                    {checkPostion(1,1,70)}{checkPostion(1,2,70)}{checkPostion(1,3,70)}{checkPostion(1,4,70)}
                    {checkPostion(2,1,70)}{checkPostion(2,2,70)}{checkPostion(2,3,70)}{checkPostion(2,4,70)}
                    {checkPostion(3,1,70)}{checkPostion(3,2,70)}{checkPostion(3,3,70)}{checkPostion(3,4,70)}
                    {checkPostion(4,1,70)}{checkPostion(4,2,70)}{checkPostion(4,3,70)}{checkPostion(4,4,70)}
                  </View>
                  <View style={[styles.item,styles.blue]}>
                    {checkPostion(1,1,69)}{checkPostion(1,2,69)}{checkPostion(1,3,69)}{checkPostion(1,4,69)}
                    {checkPostion(2,1,69)}{checkPostion(2,2,69)}{checkPostion(2,3,69)}{checkPostion(2,4,69)}
                    {checkPostion(3,1,69)}{checkPostion(3,2,69)}{checkPostion(3,3,69)}{checkPostion(3,4,69)}
                    {checkPostion(4,1,69)}{checkPostion(4,2,69)}{checkPostion(4,3,69)}{checkPostion(4,4,69)}
                  </View>
                  <View style={[styles.item,styles.blue]}>
                    {checkPostion(1,1,68)}{checkPostion(1,2,68)}{checkPostion(1,3,68)}{checkPostion(1,4,68)}
                    {checkPostion(2,1,68)}{checkPostion(2,2,68)}{checkPostion(2,3,68)}{checkPostion(2,4,68)}
                    {checkPostion(3,1,68)}{checkPostion(3,2,68)}{checkPostion(3,3,68)}{checkPostion(3,4,68)}
                    {checkPostion(4,1,68)}{checkPostion(4,2,68)}{checkPostion(4,3,68)}{checkPostion(4,4,68)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,38)}{checkPostion(1,2,38)}{checkPostion(1,3,38)}{checkPostion(1,4,38)}
                    {checkPostion(2,1,38)}{checkPostion(2,2,38)}{checkPostion(2,3,38)}{checkPostion(2,4,38)}
                    {checkPostion(3,1,38)}{checkPostion(3,2,38)}{checkPostion(3,3,38)}{checkPostion(3,4,38)}
                    {checkPostion(4,1,38)}{checkPostion(4,2,38)}{checkPostion(4,3,38)}{checkPostion(4,4,38)}
                  </View>
              </View>
              <View style={styles.third}>
                  <View style={styles.item}>
                    {checkPostion(1,1,32)}{checkPostion(1,2,32)}{checkPostion(1,3,32)}{checkPostion(1,4,32)}
                    {checkPostion(2,1,32)}{checkPostion(2,2,32)}{checkPostion(2,3,32)}{checkPostion(2,4,32)}
                    {checkPostion(3,1,32)}{checkPostion(3,2,32)}{checkPostion(3,3,32)}{checkPostion(3,4,32)}
                    {checkPostion(4,1,32)}{checkPostion(4,2,32)}{checkPostion(4,3,32)}{checkPostion(4,4,32)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,33)}{checkPostion(1,2,33)}{checkPostion(1,3,33)}{checkPostion(1,4,33)}
                    {checkPostion(2,1,33)}{checkPostion(2,2,33)}{checkPostion(2,3,33)}{checkPostion(2,4,33)}
                    {checkPostion(3,1,33)}{checkPostion(3,2,33)}{checkPostion(3,3,33)}{checkPostion(3,4,33)}
                    {checkPostion(4,1,33)}{checkPostion(4,2,33)}{checkPostion(4,3,33)}{checkPostion(4,4,33)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,34)}{checkPostion(1,2,34)}{checkPostion(1,3,34)}{checkPostion(1,4,34)}
                    {checkPostion(2,1,34)}{checkPostion(2,2,34)}{checkPostion(2,3,34)}{checkPostion(2,4,34)}
                    {checkPostion(3,1,34)}{checkPostion(3,2,34)}{checkPostion(3,3,34)}{checkPostion(3,4,34)}
                    {checkPostion(4,1,34)}{checkPostion(4,2,34)}{checkPostion(4,3,34)}{checkPostion(4,4,34)}
                  </View>
                  <View style={[styles.item,{backgroundColor : "#67E6DC"}]}>
                    {checkPostion(1,1,35)}{checkPostion(1,2,35)}{checkPostion(1,3,35)}{checkPostion(1,4,35)}
                    {checkPostion(2,1,35)}{checkPostion(2,2,35)}{checkPostion(2,3,35)}{checkPostion(2,4,35)}
                    {checkPostion(3,1,35)}{checkPostion(3,2,35)}{checkPostion(3,3,35)}{checkPostion(3,4,35)}
                    {checkPostion(4,1,35)}{checkPostion(4,2,35)}{checkPostion(4,3,35)}{checkPostion(4,4,35)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,36)}{checkPostion(1,2,36)}{checkPostion(1,3,36)}{checkPostion(1,4,36)}
                    {checkPostion(2,1,36)}{checkPostion(2,2,36)}{checkPostion(2,3,36)}{checkPostion(2,4,36)}
                    {checkPostion(3,1,36)}{checkPostion(3,2,36)}{checkPostion(3,3,36)}{checkPostion(3,4,36)}
                    {checkPostion(4,1,36)}{checkPostion(4,2,36)}{checkPostion(4,3,36)}{checkPostion(4,4,36)}
                  </View>
                  <View style={styles.item}>
                    {checkPostion(1,1,37)}{checkPostion(1,2,37)}{checkPostion(1,3,37)}{checkPostion(1,4,37)}
                    {checkPostion(2,1,37)}{checkPostion(2,2,37)}{checkPostion(2,3,37)}{checkPostion(2,4,37)}
                    {checkPostion(3,1,37)}{checkPostion(3,2,37)}{checkPostion(3,3,37)}{checkPostion(3,4,37)}
                    {checkPostion(4,1,37)}{checkPostion(4,2,37)}{checkPostion(4,3,37)}{checkPostion(4,4,37)}
                  </View>
              </View>
          </View>
          <Animatable.View
      //animation={this.state.turn3 ? zoomIn : (c?zoomIn:zoomOut)}
      animation={this.state.turn3 || this.state.whoseTurnToMove==3? zoomIn:zoomOut}
      duration={500}
      //this.state.whoseTurnToMove==
    >   
          <View>
            <View style={[Players.styles,{borderLeftWidth : 1}]}>
            
            <ImageBackground source={require("./assets/ben10.jpeg")} style={{width: '100%', height: '100%'}}>
              <View>
                  <View style={row.Style}>
                    <View style={styles.places}>
                    <TouchableOpacity >
                        {checkPostion(3,1,-13)}
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.places,{marginLeft : 90}]}>
                    <TouchableOpacity >
                        {checkPostion(3,2,-23)}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={row.Style}>
                    <View style={[styles.places,{marginTop : 90}]}>
                    <TouchableOpacity >
                        {checkPostion(3,3,-33)}
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.places,{marginLeft : 90,marginTop : 90}]}>
                    <TouchableOpacity activeOpacity='70'>
                        {checkPostion(3,4,-43)}
                      </TouchableOpacity>
                  </View>
                </View>
            </View>
              </ImageBackground>
            </View>
          <TouchableOpacity  onPress={()=>{generateRandomNumber(3)}}>
            <Image style={{ width : 90,height : 70,marginLeft : 30,marginTop : 10}} source={this.state.image3} />
          </TouchableOpacity>
          
          </View>
          </Animatable.View>
        </View>
        <View style={styles.message}>
          <Text style={{color : "red",fontSize : 30,marginLeft : 60,marginTop : 20}}> {this.state.turnMessage} {this.state.moveMessage} </Text>
          
        </View>
        </View>
      </View>
    </SafeAreaView>
      
    );
  }

export default App


const styles = StyleSheet.create({
  red : {
    backgroundColor : "#fa9daa"
  },  
  green : {
    backgroundColor : "#9effa5",
  },
  orange : {
    backgroundColor : "#ffcff0"
  },
  blue : {
    backgroundColor : "#67E6DC"
  },
  item : {
    alignItems:'center',
    borderWidth : 1,borderColor : "#03adfc",width : Dimensions.get("window").width*6.4/100,height : Dimensions.get("window").width*6.4/100
  },
  First : {
    flexDirection : "column",marginLeft : Dimensions.get("window").width/50, 
  },
  wholeSetup : {
    marginTop : 70
  },
  winnerZone : {
    borderWidth : 4,borderLeftColor : "red",borderTopColor : "green",borderRightColor : "orange",borderBottomColor : "blue",width : Dimensions.get("window").width*19.2/100,height : Dimensions.get("window").width*19.2/100
    ,flexDirection : "row", backgroundColor: '#161622'
  },
  
  places : {
    backgroundColor : "black",borderWidth : 2,width : 30,height : 30,borderRadius : 30
  },
  icons : {
    marginLeft : 6,marginTop : 2
  }
});