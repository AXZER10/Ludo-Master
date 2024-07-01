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

    if (!result.canceled) {
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

// import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
// import React, { useState } from 'react';
// import { SafeAreaView } from "react-native-safe-area-context";
// import FormField from '@/components/FormField';
// import { Video, ResizeMode } from 'expo-av';
// import { icons } from '../../constants';
// import CustomButton from '../../components/CustomButton';
// import * as DocumentPicker from 'expo-document-picker';
// import { router } from 'expo-router';
// import { createVideo } from '../../lib/appwrite';
// import { useGlobalContext } from "../../context/GlobalProvider";
// import { auth } from '../../FirebaseConfig';


// const Create = () => {
    
//     const user = auth.currentUser;
//     const [frontImage, setFrontImage] = useState(null);
//     const [backImage, setBackImage] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [upLoading, setUploading] = useState(false);
//     const [form, setForm] = useState({
//         title: '',
//         video: null,
//         thumbnail: null,
//         prompt: '',
//     });

//     const openPicker = async (selectType) => {
//         const result = await DocumentPicker.getDocumentAsync({
//             type: selectType === 'image'
//                 ? ['image/png', 'image/jpg']
//                 : ['video/mp4', 'video/gif']
//         });

//         if (!result.canceled) {
//             if (selectType === 'image') {
//                 setForm({ ...form, thumbnail: result.assets[0] });
//             }
//             if (selectType === 'video') {
//                 setForm({ ...form, video: result.assets[0] });
//             }
//         }
//     }

//     const submit = async () => {
//         if (form.prompt === '' || form.title === '' || !form.thumbnail || !form.video) {
//             return Alert.alert("Please fill all fields");
//         }
//         setUploading(true);

//         try {
//             await createVideo({ ...form, userId: user.$id });
//             Alert.alert('Success', "Uploaded successfully");
//             router.push('/Home');
//         } catch (error) {
//             Alert.alert('Error', error.message);
//         } finally {
//             setForm({
//                 title: '',
//                 video: null,
//                 thumbnail: null,
//                 prompt: ''
//             });
//             setUploading(false);
//         }
//     }

//     return (
//         <SafeAreaView className='bg-primary'>
//             <ScrollView className="px-4 my-6 h-full">
//                 <Text className='text-2xl text-white font-psemibold'>
//                     Upload Video
//                 </Text>
//                 <FormField
//                     title="Video Title"
//                     value={form.title}
//                     placeholder="Give your video a catchy title..."
//                     handleChangeText={(e) => setForm({ ...form, title: e })}
//                     otherStyles="mt-10"
//                 />
//                 <View className="mt-5 space-y-2">
//                     <Text className="text-base text-gray-100 font-pmedium">
//                         Upload Video
//                     </Text>
//                     <TouchableOpacity activeOpacity={0.6}
//                         onPress={() => openPicker("video")}
//                     >
//                         {form.video ? (
//                             <Video
//                                 source={{ uri: form.video.uri }}
//                                 className="w-full h-64 rounded-2xl"
//                                 useNativeControls
//                                 resizeMode={ResizeMode.COVER}
//                                 isLooping
//                             />
//                         ) : (
//                             <View className="w-full h-40 bg-black-100 rounded-2xl justify-center items-center">
//                                 <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
//                                     <Image source={icons.upload}
//                                         className="h-1/2 w-1/2"
//                                         resizeMode='contain' />
//                                 </View>
//                             </View>
//                         )}
//                     </TouchableOpacity>
//                 </View>
//                 <View className='mt-5 space-y-2'>
//                     <Text className="text-base text-gray-100 font-pmedium">
//                         Thumbnail Image
//                     </Text>
//                     <TouchableOpacity activeOpacity={0.6}
//                         onPress={() => openPicker("image")}
//                     >
//                         {form.thumbnail ? (
//                             <Image
//                                 source={{ uri: form.thumbnail.uri }}
//                                 resizeMode='cover'
//                                 className="w-full h-64 rounded-2xl"
//                             />
//                         ) : (
//                             <View className="w-full h-16 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
//                                 <Image source={icons.upload}
//                                     className="h-5 w-5"
//                                     resizeMode='contain' />
//                                 <Text className="text-sm text-gray-100 font-pmedium">
//                                     Choose a file to upload
//                                 </Text>
//                             </View>
//                         )}
//                     </TouchableOpacity>
//                 </View>
//                 <FormField
//                     title="Prompt"
//                     value={form.prompt}
//                     placeholder="Give your video a catchy title..."
//                     handleChangeText={(e) => setForm({ ...form, prompt: e })}
//                     otherStyles="mt-5"
//                 />
//                 <View className="mt-5 w-full">
//                     <CustomButton
//                         title="Submit and Publish"
//                         handlePress={submit}
//                         isLoading={upLoading}
//                     />
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// export default Create;
