import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import {BackgroundImage} from '../helpers/GetIcons';
import {
  enableCellSelection,
  enablePileSelection,
  updateDiceNo,
  updatePlayerChance,
} from '../redux/reducers/gameSlice';
import Arrow from '../assets/images/arrow.png';
import LottieView from 'lottie-react-native';
import DiceRoll from '../assets/animation/diceroll.json';
import {playSound} from '../helpers/SoundUtility';
import {
  selectCurrentPlayerChance,
  selectDiceNo,
  selectDiceRolled,
} from '../redux/reducers/gameSelectors';
import auth from '@react-native-firebase/auth';

const Dice = React.memo(({color, rotate, player, data}) => {
  const dispatch = useDispatch();
  const currentPlayerChance = useSelector(selectCurrentPlayerChance);
  const isDiceRolled = useSelector(selectDiceRolled);
  const diceNo = useSelector(selectDiceNo);
  const playerPieces = useSelector(
    state => state.game[`player${currentPlayerChance}`],
  );
  const pileIcon = BackgroundImage.GetImage(color);
  const diceIcon = BackgroundImage.GetImage(diceNo);
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const [playerUid,setPlayerUid] = useState('');
  // Create animated values
  const arrowAnim = useRef(new Animated.Value(0)).current;
  const [room, setRoom] = useState(undefined);
  const [diceRolling, setDiceRolling] = useState(false);
  const user = auth().currentUser
  
useEffect(() =>{
  GetRoomId();
},[user]);
  useEffect(() => {
  
    const animateArrow = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(arrowAnim, {
            toValue: 10,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(arrowAnim, {
            toValue: -10,
            duration: 400,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };
    animateArrow();
  }, [currentPlayerChance, isDiceRolled]);

  const GetRoomId = async ()=>{
    const db = getFirestore();
    const roomRef = doc(db, 'twoPlayerRooms',)
    try{
      const q = query(roomRef, where('uid2', '==', ''), where('uid1', '!=', user.uid));
      const querySnapshot = await getDocs(q);
      const filteredRooms = querySnapshot.docs.filter(doc => doc.data().uid1 !== user.uid && doc.data().uid1 !== '');
      if(filteredRooms.length>0){
        const roomDoc = filteredRooms[0];
        setRoom (roomDoc.id);
      }else{
        console.log('Room does not exist ')
      }
    }catch(error){
      console.log(error)
    }
  }
  const updateDice = async (diceNo) =>{
    let UID = user.uid;
    console.log("UID: ", UID);
    const db = getFirestore();
    try {
      const roomRef = doc(db, "twoPlayerRooms", room);
        if (room?.uid1?.UID == player) {
          let updatedRoom = {
            id: room?.id,
            turn : chancePlayer,
            uid1: {
              position: room?.uid1?.position,
              dice: diceNo,
              uid: room?.uid1?.UID,
            },
            uid2: {
              position: room?.uid2?.position,
              dice: room?.uid2?.dice,
              uid: room?.uid2?.uid,
            },
            gameState: "InProgress",
          };
          await updateDoc(roomRef, updatedRoom);
        }
          if (room?.uid2?.UID == player) {
            let updatedRoom = {
              id: room?.id,
              turn : chancePlayer,
              uid1: {
                position: room?.uid1?.position,
                dice: room?.uid1?.dice,
                uid: room?.uid1?.UID,
              },
              uid2: {
                position: room?.uid2?.position,
                dice: diceNo,
                uid: room?.uid2?.uid,
              },
              gameState: "InProgress",
            };
            await updateDoc(roomRef, updatedRoom);
          }
        }
        catch(error){
        console.log(error);
        }
  }
  const handleDicePress = async () => {
    updateDice(diceNo);
    //const newDiceNo = Math.floor(Math.random() * 6) + 1;
     const newDiceNo = 2;
    playSound('dice_roll');
    setDiceRolling(true);
    await delay(800);
    dispatch(updateDiceNo({diceNo: newDiceNo}));
    setDiceRolling(false);

    const isAnyPieceAlive = data?.findIndex(i => i.pos != 0 && i.pos != 57);
    const isAnyPieceLocked = data?.findIndex(i => i.pos == 0);

    if (isAnyPieceAlive == -1) {
      if (newDiceNo == 6) {
        dispatch(enablePileSelection({playerNo: player}));
      } else {
        // chanage here for two playerGame dice roll
        let chancePlayer = player + 1;
        if (chancePlayer == 2) {
          chancePlayer = 3;
        }
        if (chancePlayer == 4) {
          chancePlayer = 1;
        }
        await delay(600);
        dispatch(updatePlayerChance({chancePlayer: chancePlayer}));
      }
    } else {
      const canMove = playerPieces.some(
        pile => pile.travelCount + newDiceNo <= 57 && pile.pos != 0,
      );
      if (
        (!canMove && newDiceNo == 6 && isAnyPieceLocked == -1) ||
        (!canMove && newDiceNo != 6 && isAnyPieceLocked != -1) ||
        (!canMove && newDiceNo != 6 && isAnyPieceLocked == -1)
      ) {
        let chancePlayer = player + 1;
        if (chancePlayer == 2) {
          chancePlayer = 3;
        }
        if (chancePlayer == 4) {
          chancePlayer = 1;
        }
        await delay(600);
        dispatch(updatePlayerChance({chancePlayer: chancePlayer}));
        return;
      }

      if (newDiceNo == 6) {
        dispatch(enablePileSelection({playerNo: player}));
      }
      dispatch(enableCellSelection({playerNo: player}));
    }
  };

  return (
    <View style={[styles.flexRow, {transform: [{scaleX: rotate ? -1 : 1}]}]}>
      <View style={styles.border1}>
        <LinearGradient
          style={styles.linearGradient}
          colors={['#0052be', '#5f9fcb', '#97c6c9']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}>
          <View style={styles.pileContainer}>
            <Image source={pileIcon} style={styles.pileIcon} />
          </View>
        </LinearGradient>
      </View>
      <View style={styles.border2}>
        <LinearGradient
          style={styles.diceGradient}
          colors={['#aac8ab', '#aac8ab', '#aac8ab']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}>
          <View style={styles.diceContainer}>
            {currentPlayerChance == player ? (
              <>
                {diceRolling ? null : (
                  <TouchableOpacity
                    disabled={isDiceRolled}
                    activeOpacity={0.4}
                    onPress={handleDicePress}>
                    <Image source={diceIcon} style={styles.dice} />
                  </TouchableOpacity>
                )}
              </>
            ) : null}
          </View>
        </LinearGradient>
      </View>
      {currentPlayerChance === player && !isDiceRolled ? (
        <Animated.View style={{transform: [{translateX: arrowAnim}]}}>
          <Image source={Arrow} style={{width: 50, height: 30}} />
        </Animated.View>
      ) : null}
      {currentPlayerChance === player && diceRolling ? (
        <LottieView
          source={DiceRoll}
          style={styles.rollingDice}
          loop={false}
          autoPlay
          cacheComposition={true}
          hardwareAccelerationAndroid
        />
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pileIcon: {
    width: 35,
    height: 35,
  },
  diceContainer: {
    backgroundColor: '#e8c0c1',
    borderWidth: 1,
    borderRadius: 5,
    width: 55,
    height: 55,
    paddingHorizontal: 8,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pileContainer: {
    paddingHorizontal: 3,
  },
  linearGradient: {
    padding: 1,
    borderWidth: 3,
    borderRightWidth: 0,
    borderColor: '#f0ce2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dice: {
    height: 45,
    width: 45,
  },
  rollingDice: {
    height: 80,
    width: 80,
    zIndex: 99,
    top: -25,
    position: 'absolute',
  },
  diceGradient: {
    borderWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#f0ce2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border1: {
    borderWidth: 3,
    borderRightWidth: 0,
    borderColor: '#f0ce2c',
  },
  border2: {
    borderWidth: 3,
    padding: 1,
    backgroundColor: '#aac8ab',
    borderRadius: 10,
    borderLeftWidth: 3,
    borderColor: '#aac8ab',
  },
});

export default Dice;
 