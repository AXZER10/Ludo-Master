import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { firestore, storage } from '../FirebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';

const KYCForm = () => {
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
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async (uri, path) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage.ref().child(path);
    await ref.put(blob);
    const url = await ref.getDownloadURL();
    return url;
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

      await firestore.collection('kyc_verifications').add({
        documentType,
        frontImageUrl,
        backImageUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Success', 'KYC submitted successfully.');
    } catch (error) {
      console.error('Error submitting KYC: ', error);
      setError('Error submitting KYC');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='w-full h-full px-2 bg-primary'>
        <View className="items-center my-4">
            <Text className="text-2xl text-blue-400 font-psemibold">
                KYC Verification
            </Text>
            <Text className="text-2xl text-blue-400 font-psemibold">
                Document Upload
            </Text>
        </View>
        <View className="border-2 border-white">
            <Text className="text-slate-200 text-lg font-pregular">Select Document Type:</Text>
            <View className="items-center">
                <Picker
                    selectedValue={documentType}
                    style={styles.picker}
                    onValueChange={(itemValue) => setDocumentType(itemValue)}
                    itemStyle={{color:'white'}}
                >
                    <Picker.Item label="Passport" value="passport"/>
                    <Picker.Item label="Driver's License" value="driverslicense" />
                    <Picker.Item label="Adhaar Card" value="adhaar" />
                    <Picker.Item label="PAN Card" value="pan" />
                    <Picker.Item label="Voter Id Card" value="voter" />
                </Picker>
            </View>

            <Text className="text-slate-200 text-lg font-pregular">Front Image:</Text>
            {frontImage && <Image source={{ uri: frontImage }} style={styles.image} />}
            <Button title="Select Front Image" onPress={() => selectImage(setFrontImage)} />

            <Text className="text-slate-200 text-lg font-pregular">Back Image:</Text>
            {backImage && <Image source={{ uri: backImage }} style={styles.image} />}
            <Button title="Select Back Image" onPress={() => selectImage(setBackImage)} />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Submit KYC" onPress={handleSubmit} />
            )}

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  picker: {
    width: '70%',
    color: 'red'
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 8,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default KYCForm;
