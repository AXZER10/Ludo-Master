import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";

export default function Details({ route, navigation }) {
  const  {id} = useLocalSearchParams();
  const uid = auth().currentUser.uid;
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const router = useRouter();
  const [age, setAge] = useState("");
  const saveDetails = async () => {
    console.log(uid);
    try {
      await firestore().collection("users").doc(id).update({
        name,
        age,
        gender,
      });
      
      router.replace("Home");
    } catch (error) {
      console.log("Error saving details:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "BEBDB8" }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 40,
          marginTop: 150,
        }}
      >
        Enter Your Details
      </Text>
      <TextInput
        style={{
          height: 50,
          width: "100%",
          borderColor: "black",
          borderWidth: 1,
          marginBottom: 30,
          paddingHorizontal: 10,
        }}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={{
          height: 50,
          width: "100%",
          borderColor: "black",
          borderWidth: 1,
          marginBottom: 30,
          paddingHorizontal: 10,
        }}
        placeholder="age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <Picker
        selectedValue={gender}
        style={{
          height: 50,
          width: "100%",
          borderColor: "black",
          borderWidth: 1,
          marginBottom: 30,
        }}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      <TouchableOpacity
        onPress={saveDetails}
        style={{
          backgroundColor: "#841584",
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
          Save Details
        </Text>
      </TouchableOpacity>
    </View>
  );
}
