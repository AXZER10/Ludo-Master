import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { firestore, auth, uploadImage } from '../FirebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import icons from '../constants/icons';
import { router } from 'expo-router';
import CustomButton from '../components/CustomButton'

const KYCForm = () => {
  const user = auth.currentUser;
  const [documentType, setDocumentType] = useState('passport');
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  const handleSubmit = async () => {
    if (!frontImage || !backImage) {
      Alert.alert('Error', 'Please select both front and back images.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const frontImageUrl = await uploadImage(frontImage, `kyc/front_${Date.now()}`);
      const backImageUrl = await uploadImage(backImage, `kyc/back_${Date.now()}`);

      await addDoc(collection(firestore, 'kyc'), {
        userid: user.uid,
        documentType,
        frontImageUrl,
        backImageUrl,
        createdAt: serverTimestamp(),
        docsUploaded: true
      });
      await addDoc(collection(firestore, 'kycStatus'), {
        userid: user.uid,
        docsUploaded: true,
        createdAt: serverTimestamp(),
        kycStatus: false
      });

      Alert.alert('Success', 'KYC submitted successfully.');
    } catch (error) {
      Alert.alert('Error submitting KYC: ', error);
      setError('Error submitting KYC');
    } finally {
      setLoading(false);
      setFrontImage(null)
      setBackImage(null)
      setDocumentType("Passport")

    }
  };

  return (
    <SafeAreaView className='h-full bg-primary'>
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
        <View className="items-center">
        <Text className="text-blue-400 text-3xl font-pbold">KYC Verification</Text>
        <Text className="text-blue-400 text-xl font-psemibold">Document Upload</Text>
      </View>
        </>
      )}
      renderItem={null}
      ListFooterComponent={() => (
        <>
        <View className="p-4">
        <Text className="text-slate-400 text-lg my-3">Select Document Type:</Text>
        <Picker
          selectedValue={documentType}
          style={styles.picker}
          onValueChange={(itemValue) => setDocumentType(itemValue)}
        >
          <Picker.Item label="Passport" value="passport" />
          <Picker.Item label="Driver's License" value="driverslicense" />
          <Picker.Item label="Adhaar Card" value="adhaar" />
          <Picker.Item label="PAN Card" value="pan" />
          <Picker.Item label="Voter Id Card" value="voter" />
        </Picker>

        <Text className="text-slate-400 text-lg my-3">Front Image:</Text>
        {frontImage && <Image source={{ uri: frontImage }} style={styles.image} />}
        <Button title="Select Front Image" onPress={() => selectImage(setFrontImage)} />

        <Text className="text-slate-400 text-lg my-3">Back Image:</Text>
        {backImage && <Image source={{ uri: backImage }} style={styles.image} />}
        <View className="mb-5">
          <Button title="Select Back Image" onPress={() => selectImage(setBackImage)} />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <CustomButton title="Submit KYC" handlePress={handleSubmit} />
        )}

      </View>
        </>
      )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  picker: {
    borderRadius: 40,
    width: '80%',
    color: '#ffffff',
    backgroundColor: '#2d3748', // Adjust the background color as needed
  },
  image: {
    width: 150,
    height: 100,
    marginVertical: 8,
  },
});

export default KYCForm;
