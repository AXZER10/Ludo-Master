import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {auth} from '../../FirebaseConfig'
import { collection, addDoc, getFirestore } from 'firebase/firestore';

const FeedbackScreen = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const user = auth.currentUser;

  const handleSubmit = async () => {
    if (name && feedback) {

      try{
        const db = getFirestore();

        const userRef = collection(db, 'feedback'); // Reference to users collection
        const feedbackRef = await addDoc(userRef, {
          uid: user.uid,
          feedback: feedback,
          createdAt: new Date(),
        });

        Alert.alert('Feedback Submitted', `Thank you, ${name}, for your feedback!`);
        // Here you can also add the logic to send the feedback to your server or API
        setName('');
        setFeedback('');
        
      }catch(error){
        Alert.alert('Error', error);
      }
     
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
    
  };

  return (
    <SafeAreaView style={styles.container} className="bg-primary">
      <Text style={styles.header} className="text-blue-400">Feedback </Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="bg-slate-200 px-2 mx-5 mb-10 w-full h-60 rounded-sm"
        placeholder="Your Feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline={true}
        numberOfLines={4}
      />
      <Button title="Submit Feedback" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  textArea: {
    height: '50%',
  },
});

export default FeedbackScreen;
