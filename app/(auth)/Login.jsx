import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { SafeAreaView } from "react-native-safe-area-context";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useRouter,usePathname } from "expo-router";
import { UserContext } from "../UserContext";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const myContext = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);

  const pathname = usePathname();
  useEffect(() => {
    if (pathname == "/firebaseauth/link") router.back();
  }, [pathname]);

  useEffect(() => {
    // console.log(auth().currentUser);

    async function fetchMyAPI() {
      if (auth().currentUser) {
        let userData = await firestore()
          .collection("users")
          .doc(auth().currentUser?.phoneNumber)
          .get();
        setLoading(false);
        if (userData?._data?.age) {
          sentToHome(userData?._data);
        } else if (userData?._data) {
          router.replace("/Details");
        }
      } else {
        setLoading(false);
      }
    }

    fetchMyAPI();
  }, []);

  const sentToHome = (userDetails) => {
    // add userDetails in context
    // console.log("userDetails   ::: ", userDetails);
    myContext.updateUserDetails(userDetails);
    router.replace("Home");
  };
  const _signInWithPhoneNumber = async () => {
    try {
      console.log("I am here");
      setButtonLoader(true);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setButtonLoader(false);
    } catch (error) {
      setButtonLoader(false);
      console.log(error, "Error sending code ");
    }
  };

  const confirmCode = async () => {
    if (code.length > 6) {
      Alert.alert("Error", "code can not be greater than 10");
      return;
    }
    try {
      setButtonLoader(true);
      const userCredential = await confirm.confirm(code);

      let userData = await firestore()
        .collection("users")
        .doc(phoneNumber)
        .get();
      if (userData && userData?._data && userData?._data?.age) {
        setButtonLoader(false);
        sentToHome(userData?._data);
      } else if (userData && userData?._data) {
        setButtonLoader(false);
        router.replace("/Details");
      } else {
        await firestore().collection("users").doc(phoneNumber).set({
          uid: userCredential.user.uid,
          phoneNumber: phoneNumber,
          createdAt: new Date(),
        });

        setButtonLoader(false);
        router.replace("/Details");
      }
    } catch (error) {
      setButtonLoader(false);
      console.log("Invaild code", error);
    }
  };

  if (loading) {
    // add loader here
    return (
      <ImageBackground
        source={require("../assets/bg.png")}
        resizeMode="cover"
        className="h-full w-full justify-center"
      >
        <ActivityIndicator color={"#fff"} />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      resizeMode="cover"
      className="h-full w-full justify-center"
    >
      <SafeAreaView className="h-full w-full items-center justify-center px-3">
        <View className=" items-center w-full px-4">
          <Image
            source={require("../assets/Logo.jpeg")}
            className="w-40 h-40 justify-center"
            resizeMode="contain"
          />
          <Text className="text-white text-3xl font-pblack mb-10">
            Ludo Master
          </Text>
        </View>

        {!confirm ? (
          <View>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                marginBottom: 40,
                color: "white",
              }}
            >
              Please Enter Phone Number
            </Text>
            <PhoneInput
              containerStyle={{
                width: "100%",
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
              defaultValue={phoneNumber}
              defaultCode="IN"
              layout="first"
              withShadow
              // maxLength={}
              onChangeFormattedText={(text) => {
                setPhoneNumber(text);
              }}
            />

            <TouchableOpacity
              onPress={_signInWithPhoneNumber}
              disabled={buttonLoader}
              style={{
                backgroundColor: "#841584",
                padding: 10,
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 20,
                alignItems: "center",
              }}
            >
              {buttonLoader ? (
                <ActivityIndicator color={"#fff"} />
              ) : (
                <Text
                  style={{ color: "white", fontSize: 22, fontWeight: "bold" }}
                >
                  Send Code
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 18,
                color: "white",
              }}
            >
              Enter the code sent to your phone
            </Text>
            <TextInput
              style={{
                height: 50,
                width: "100%",
                borderRadius: 10,
                backgroundColor: "white",
                marginBottom: 20,
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
              disabled={buttonLoader}
              style={{
                backgroundColor: "#841584",
                padding: 10,
                borderRadius: 10,
                marginBottom: 20,
                alignItems: "center",
              }}
            >
              {buttonLoader ? (
                <ActivityIndicator color={"#fff"} />
              ) : (
                <Text
                  style={{ color: "white", fontSize: 22, fontWeight: "bold" }}
                >
                  Confirm Code
                </Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}
