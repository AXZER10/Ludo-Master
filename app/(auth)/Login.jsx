import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from "@react-navigation/native";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import auth from '@react-native-firebase/auth';
import { useRouter } from "expo-router";


export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [user, setUser] = useState(null);
 
  const router = useRouter();

  useEffect(() => {
    console.log(auth().currentUser)
    if(auth().currentUser?.age){
      sentToHome(auth().currentUser)
    }else {
      router.replace({pathname :'/Details' , params:  {id : userDocument.id} })
    }
  },[])

  const sentToHome = (userDetails) => {
    // add userDetails in context
    router.replace("Home");
  }

  const _signInWithPhoneNumber = async () => {
    console.log(phoneNumber)
    console.log(auth)
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log(error, "Error sending code ");
    }
  };

  const confirmCode = async () => {
    if (code.length > 6) {
      Alert.alert("Error", "code can not be greater than 10");
      return;
    }
    try {
      const userCredential = await confirm.confirm(code);
      
      console.log('userCredential',userCredential)
      //const uid = userCredential?.user?.uid;
      const db = getFirestore()
      // check if the user is new and existing
      const userRef = collection(db, 'users')
      const userDocument =await addDoc(userRef,{
        uid: userCredential.user.uid,
        phoneNumber:phoneNumber ,
        createdAt: new Date(),
        
      })
      
      router.replace({pathname :'/Details' , params:  {id : userDocument.id} })
    } catch (error) {
      console.log("Invaild code", error);
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
        Phone Number Authentication with Firebase
      </Text>
      {!confirm ? (
        <>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 18,
            }}
          >
            Enter Your phone Number
          </Text>

           <PhoneInput
            style={{
                height:50,
                width: "100%",
                borderColor:"black",
                borderWidth:1,
                marginBottom:30,
                paddingHorizontal:10,
            }}
            defaultValue={phoneNumber}
            defaultCode="IN"
            layout="first"
            withShadow
            autoFocus
           // maxLength={}
            onChangeFormattedText={text =>{
              
                setPhoneNumber(text);
              
                
            }}
           
            /> 
       
         
          <TouchableOpacity
            onPress={_signInWithPhoneNumber}
            style={{
              backgroundColor: "#841584",
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              Send Code
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 18,
            }}
          >
            Enter the code sent to your phone:
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
            placeholder="Enter code"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
            maxLength={6}
          />
          <TouchableOpacity
            onPress={confirmCode}
            style={{
              backgroundColor: "#841584",
              padding: 10,
              borderRadius: 5,
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              Confirm Code
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}


