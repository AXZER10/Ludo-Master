import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import firestore from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth';
import { useRouter } from "expo-router";
import { DateTimePicker } from "@react-native-community/datetimepicker";

export default function Details({route, navigation}){
  const uid = auth().currentUser.uid;
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender,setGender] = useState("");
  const [show, setShow]= useState("")
  const [,mode, setMode] = useState("date")
  const router = useRouter();
  const saveDetails = async () =>  {
    try{
        await firestore().collection("users").doc(uid).set({
            name,
            dob: dob.toDateString(),
            gender,
        });
        //After saving details, navigate to Dashboard
        router.replace("Home");
    }catch(error){
        console.log("Error saving details:", error)
    }
  };

  const onChange = (e, selectedDate) =>{
    const currentDate = selectedDate || dob;
    setDob(selectedDate)
    setDob(currentDate);
  }
  const showMode =(modeToshow) =>
  {
    setShow(true);
    setMode(modeToshow)
  }
  return (
    <View style={{flex:1, padding:10, backgroundColor:"BEBDB8"}}>
    <Text 
    style={{
       fontSize: 32,
       fontWeight: "bold",
       marginBottom: 40,
       marginTop: 150
    }}>
        Enter Your Details
        </Text>
        <TextInput
        style={{
            height:50,
            width: "100%",
            borderColor:"black",
            borderWidth:1,
            marginBottom:30,
            paddingHorizontal:10,
        }}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        />
         <TouchableOpacity 
         onPress={()=> showMode('date')}
         style={{
            height:50,
            width: "100%",
            borderColor:"black",
            borderWidth:1,
            marginBottom:30,
            paddingHorizontal:10,
        }}
         >
         <Text style={{ fontSize: 18 }}>
          {dob.toDateString() === new Date().toDateString() ? "Date of Birth" : dob.toDateString()}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dob}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
        {/* placeholder="Date of Brith"
        value={dob}
        onChangeText={setDob}
         */}
         <TextInput
        style={{
            height:50,
            width: "100%",
            borderColor:"black",
            borderWidth:1,
            marginBottom:30,
            paddingHorizontal:10,
        }}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
        />
         <TouchableOpacity
            onPress={saveDetails}
            style={{
                backgroundColor:"#841584",
                padding:10,
                borderRadius:5,
                marginBottom:20,
                alignItems:"center"
            }}
            >
           <Text style={{ color : "white", fontSize : 22, fontWeight: "bold"}}>
              Save Details
           </Text>
            </TouchableOpacity>
        </View>
        
  )
}

