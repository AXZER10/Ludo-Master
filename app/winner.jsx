import React from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';
import { router } from 'expo-router';

const WinningScreen = () => {
  return (
    <View className="bg-primary h-full" style={styles.container}>
      <Text  className="text-5xl font-pbold text-slate-400" style={styles.congratulations}>Congratulations!</Text>
      <View className="flex-column justify-center space-y-2 items-center">
        <Image className="w-100 h-100 mb-5" source={require("../app/assets/winner.jpg")} 
        resizeMode='contain'
        />
        </View>
      <Text  className="text-5xl font-pbold text-slate-400" style={styles.winnerText}>{} Wins!</Text>
      <Button title="Play Again" onPress={() => router.push('../Room')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  congratulations: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  winnerText: {
    fontSize: 20,
    marginBottom: 40,
  },
});

export default WinningScreen;