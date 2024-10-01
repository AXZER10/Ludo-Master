import React, { useState, useEffect,useContext } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, TextInput,SafeAreaView,ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import firestore from "@react-native-firebase/firestore"; 
import auth from "@react-native-firebase/auth";
import TopBar from '../components/TopBar';
import { UserContext } from './UserContext';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [creatingRoom, setCreatingRoom] = useState(false);  
  const [players, setPlayers] = useState(2);
  const [bet, setBet] = useState('');
  const router = useRouter();
  const [name, setName ]= useState('')
  const uid = auth()?.currentUser?.uid
  const myContext = useContext(UserContext);

  useEffect(() => {
    // Fetching the list of rooms from Firestore
    const fetchRooms = async () => {
      const roomsCollection = await firestore().collection('twoPlayerRooms',).get();
      const roomsData = roomsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRooms(roomsData);
    };

    fetchRooms();
  }, []);

  const createNewRoom = async () => {
    if (!bet || isNaN(bet)) {
      alert('Please enter a valid bet amount');
      return;
    }

    const roomData = {
      uid:uid,
      bet: parseFloat(bet),
      name: uid.name,
      createdAt: new Date(),
    };

    const roomRef = await firestore().collection('twoPlayerRooms').add(roomData);

    router.push('Room');
  };

  if (creatingRoom) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Create a Room</Text>

        <Text style={{ marginTop: 20 }}>Choose Number of Players:</Text>
        <Button title="2 Players" onPress={() => setPlayers(2)} />
        <Button title="4 Players" onPress={() => setPlayers(4)} />

        <TextInput
          style={{ borderWidth: 1, marginTop: 20, padding: 10 }}
          placeholder="Enter bet amount (₹)"
          keyboardType="numeric"
          value={bet}
          onChangeText={setBet}
        />

        <Button title="Create Room" onPress={createNewRoom} />
        <Button title="Cancel" onPress={() => setCreatingRoom(false)} />
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full w-full justify-center items-center">
      <ImageBackground source={require("./assets/bg.png")}
                  resizeMode='cover'
                  className="h-full w-full "
                  >
     <TopBar/>
    <View style={{ flex:1,padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Room List</Text>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 10, borderBottomWidth: 1 }}
            onPress={() => router.push(`Room`)}
          >
            <Text>Room ID: {item.id}</Text>
            <Text>Players: {item.uid}</Text>
            <Text>Bet: ₹{item.bet}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Create Room" onPress={() => setCreatingRoom(true)} />
    </View>
    
    </ImageBackground>
    </SafeAreaView>
  );
};

export default RoomList;


