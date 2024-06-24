import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import FormField from '../../components/FormFieldcred'
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Alert } from 'react-native';
import { app } from '../../FirebaseConfig';
import { auth } from '../../FirebaseConfig';
import { UserContext, UserProvider } from '../../components/UserContext';

//import { handleA } from '../../FirebaseConfig';


const EmailSignIn = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <SafeAreaView className="h-full bg-primary justify-center items-center px-4">
    <View className="justify-center items-center w-full mb-2">
      <Text className="text-2xl font-psemibold text-slate-300">{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      <FormField
        title={"Email"}
        value={email}
        handleChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <FormField
        title={"Password"}
        value={password}
        handleChangeText={setPassword}
        placeholder="Password"
        //secureTextEntry
      />
      <View className="justify-center items-center w-full">
        <CustomButton 
        title={isLogin ? 'Sign In' : 'Sign Up'} 
        handlePress={handleAuthentication} 
        ContainerStyles={"mt-5 w-full"} 
        //setIsLoading(false)
        />
        
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Link href={"AuthScreen"}>
        <Text style={styles.toggleText}>
          Login with OTP
        </Text>
        </Link>
      </View>
    </View>
    </SafeAreaView>
  );
}

//const auth = getAuth(app);



// Main App Component
const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.replace("/Home")
        console.log('User signed in successfully!');
        setEmail("")
        setPassword("")
        //console.log(user.email)
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        router.replace("/Home")
        console.log('User created successfully!');
      }
    } catch (error) {
      Alert.alert('Authentication error:', error.message);
    }

  };

  

  return (
    <UserProvider>
      <View>
      {
      user ? (
        router.push("../(tabs)/Home")
      ) : (
        <EmailSignIn
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </View>

    </UserProvider>
    
  );
}



// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
