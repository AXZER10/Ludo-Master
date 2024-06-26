import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import FormField from '../../components/FormFieldcred';
import CustomButton from '../../components/CustomButton';
import { auth, firestore } from '../../FirebaseConfig';
import { UserProvider } from '../../components/UserContext';
import Profile from '../(tabs)/Profile';
import { collection, addDoc, getFirestore } from 'firebase/firestore';

const EmailSignIn = ({ username, setUsername, email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <SafeAreaView className="h-full bg-primary justify-center items-center px-4">
      <View className="justify-center items-center w-full mb-2">
        <Text className="text-2xl font-psemibold text-slate-300">{isLogin ? 'Sign In' : 'Sign Up'}</Text>
        {!isLogin && (
          <FormField
            title={"Username"}
            value={username}
            handleChangeText={setUsername}
            placeholder="Username"
          />
        )}
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
          secureTextEntry
        />
        <View className="justify-center items-center w-full">
          <CustomButton 
            title={isLogin ? 'Sign In' : 'Sign Up'} 
            handlePress={handleAuthentication} 
            ContainerStyles={"mt-5 w-full"} 
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

const App = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        router.replace("/Home");
        const db = getFirestore();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.replace("/Home");
        console.log('User signed in successfully!');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });

        const db = getFirestore();

        const userRef = collection(db, 'users'); // Reference to users collection
        const signupRef = await addDoc(userRef, {
          uid: userCredential.user.uid,
          username: username,
          email: email,
          createdAt: new Date(),
        });
        
        //WalletSignUpBonus
        const walletRef = collection(db, 'wallet'); // Reference to wallet collection
        const signupbonusref = await addDoc(walletRef, {
          uid: userCredential.user.uid,
          mainbalance: 0,
          bonusbalance: 5,
          createdAt: new Date(),
        });

        console.log('User created successfully and data stored in Firestore!', signupRef.id);
        console.log('Bonus Added successfully and wallet created in Firestore!', signupbonusref.id);


        router.replace("/Home");
        console.log('User created successfully!');
      }
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      Alert.alert('Authentication error:', error.message);
    }
  };

  return (
    <UserProvider>
      <View>
        {user ? (
          <>
          <Profile user={user} setUser={setUser}/>
          <Text>Loading...</Text>
          </>
          
        ) : (
          <EmailSignIn
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleAuthentication={handleAuthentication}
            user={user}
            setUser={setUser}
          />
        )} 
      </View>
      <Profile user={user} setUser={setUser}/>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
});

export default App;
