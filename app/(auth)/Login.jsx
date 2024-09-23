import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from "@react-navigation/native";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { UserContext } from "../UserContext";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const myContext = useContext(UserContext);
  const router = useRouter();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    // console.log(auth().currentUser);

    async function fetchMyAPI() {
      if(auth().currentUser){
        let userData = await firestore().collection("users").doc(auth().currentUser?.phoneNumber).get();
        setLoading(false)
        console.log(userData)
        if (userData?._data?.age) {
          sentToHome(userData?._data);
        } else if(userData?._data) {
          console.log("213 case")
          router.replace("/Details");
        }
      }
    }

    fetchMyAPI();
  }, []);


  const sentToHome = (userDetails) => {
    // add userDetails in context
    console.log("userDetails   ::: ",userDetails)
    myContext.updateUserDetails(userDetails);
    router.replace("Home");
  };

  const _signInWithPhoneNumber = async () => {
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

      let userData = await firestore().collection("users").doc(phoneNumber).get();
      console.log("userData",userData)
      if(userData && userData?._data && userData?._data?.age){
        console.log("first case")
        sentToHome(userData?._data);
      } else if(userData && userData?._data){
        console.log("2 case")
        router.replace("/Details");
      } else {
        console.log("211 case")
        await firestore().collection("users").doc(phoneNumber).set({
          uid: userCredential.user.uid,
          phoneNumber: phoneNumber,
          createdAt: new Date(),
        });
  
        router.replace("/Details");
      }

    } catch (error) {
      console.log("Invaild code", error);
    }
  };

  if(loading){
    // add loader here
    return <></>
  }

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
              height: 50,
              width: "100%",
              borderColor: "black",
              borderWidth: 1,
              marginBottom: 30,
              paddingHorizontal: 10,
            }}
            defaultValue={phoneNumber}
            defaultCode="IN"
            layout="first"
            withShadow
            autoFocus
            // maxLength={}
            onChangeFormattedText={(text) => {
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
