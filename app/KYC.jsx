import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { firestore, auth, uploadImage } from '../FirebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import icons from '../constants/icons';
import { router } from 'expo-router';


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
        <View style={styles.header}>
        <Text style={styles.headerText}>KYC Verification</Text>
        <Text style={styles.headerText}>Document Upload</Text>
      </View>
        </>
      )}
      renderItem={null}
      ListFooterComponent={() => (
        <>
        <View style={styles.form}>
        <Text style={styles.label}>Select Document Type:</Text>
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

        <Text style={styles.label}>Front Image:</Text>
        {frontImage && <Image source={{ uri: frontImage }} style={styles.image} />}
        <Button title="Select Front Image" onPress={() => selectImage(setFrontImage)} />

        <Text style={styles.label}>Back Image:</Text>
        {backImage && <Image source={{ uri: backImage }} style={styles.image} />}
        <Button title="Select Back Image" onPress={() => selectImage(setBackImage)} />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Submit KYC" onPress={handleSubmit} />
        )}

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
        </>
      )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#1a202c', // Adjust the background color as needed
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#4a90e2',
    fontWeight: 'bold',
  },
  form: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: '#d1d5db',
    marginVertical: 8,
  },
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
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default KYCForm;
