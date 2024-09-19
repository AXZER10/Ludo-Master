import React, { useState,useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import { UserContext } from "../UserContext";


export default function Details({ route, navigation }) {
  const uid = auth()?.currentUser?.uid;
  const phoneNumber = auth()?.currentUser?.phoneNumber;
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const router = useRouter();
  const [age, setAge] = useState("");
  const myContext = useContext(UserContext);
  const handleSubmit = async () => {
    console.log(uid);
    if (!name.trim()) {
      alert('Please Enter Name');
      return;
    }
    if (!age.trim()) {
      alert('Please Enter Age');
      return;
    }
    if (!gender.trim()) {
      alert('Please select Gender');
      return;
    }
    try {
      await firestore().collection("users").doc(phoneNumber).update({
        name,
        age,
        gender,
      });
      
      // add userDetails in context
      myContext.updateUserDetails({
        uid:uid,
        phoneNumber:phoneNumber,
        name,
        age,
        gender,
      })
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
        onChangeText={
          (value) => setName(value)
        }
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
        onPress={handleSubmit}
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
