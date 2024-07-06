import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../FirebaseConfig';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../constants/icons';
import { router } from 'expo-router';
import CustomButton from '../components/CustomButton'

const KYCStatus = () => {
  const user = auth.currentUser;
  const db = getFirestore();
  const KycRef = collection(db, 'kyc');
  const KycStatRef = collection(db, 'kycStatus');

  const [status, setStatus] = useState(null);
  const [docStatus, setDocStatus] = useState(null);
  const [userId, setUserId] = useState(null);
  const [docId, setDocId] = useState(null);
  const [frontImageUri, setFrontImageUri] = useState(null);
  const [backImageUri, setBackImageUri] = useState(null);

  useEffect(() => {
    if (user) {
      fetchDocs();
      fetchStatus();
      setUserId(user.uid)
    }
  }, [user]);

  const fetchDocs = async () => {
    try {
      const q = query(KycRef, where('userid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setFrontImageUri(doc.data().frontImageUrl);
          setBackImageUri(doc.data().backImageUrl);
        });
      }
    } catch (error) {
      Alert.alert('Error fetching documents:', error);
    }
  };

  const fetchStatus = async () => {
    try {
      const q = query(KycStatRef, where('userid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setDocId(doc.id);
        setStatus(doc.data().kycStatus);
        setUserId(doc.data().userid);
        setDocStatus(doc.data().docsUploaded);
      }
    } catch (error) {
      Alert.alert('Error fetching status:', error);
    }
  };

  return (
    <SafeAreaView className="w-full h-full border bg-primary">
      <FlatList
      ListHeaderComponent={() => (
        <>
        <View className="flex-col w-10 h-10 mx-2">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.replace('/Home')}
        >
         <Image source={icons.back}
           resizeMode='contain'
           className="w-10 h-10"
         />
        </TouchableOpacity>
       </View>
      <View className="flex-1 p-2 space-y-2 mt-10 mx-2">
        <Text className="font-semibold text-white">UserId: {userId}</Text>
        <Text className="font-semibold text-white">KYC Status: {status ? 'Yes' : 'No'}</Text>
        <Text className="font-semibold text-white mb-2">Documents Uploaded: {docStatus ? 'Yes' : 'No'}</Text>
        {docStatus && (
          <>
            <Text className="font-semibold text-white">Front Image:</Text>
            {frontImageUri ? (
              <Image source={{ uri: frontImageUri }} className="w-60 h-40 my-2" />
            ) : (
              <Text className="font-semibold text-white">No front image found</Text>
            )}
            <Text className="font-semibold text-white">Back Image:</Text>
            {backImageUri ? (
              <Image source={{ uri: backImageUri }} className="w-60 h-40 my-2" />
            ) : (
              <Text className="font-semibold text-white">No back image found</Text>
            )}
          </>
        )}
        {!docStatus && (
          <View className="w-80 mt-4">
            <CustomButton 
                title={'Upload Documents'} 
                ContainerStyles={'w-full bg-black'}
                handlePress={() => router.replace("/KYC")}
                textStyles={'text-lg font-pbold text-blue-400'}
              />
          </View>
        )}
      </View>
      </>
      )}
      />
    </SafeAreaView>
  );
};

export default KYCStatus;
