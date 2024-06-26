import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const HowToPlayScreen = () => {
  const instructions = [
    {
      title: 'Objective',
      description: 'The objective of the game is to move all four of your tokens from the starting point to the home area before your opponents do.',
      image: require('../app/assets/objective.png'),
    },
    {
      title: 'Setup',
      description: 'Each player chooses one of the four colors (red, blue, green, yellow) and places their four tokens in their respective starting areas.',
      image: require('../app/assets/setup.jpg'),
    },
    {
      title: 'Game Play',
      description: 'Players take turns rolling a single die to move their tokens. A roll of six allows a player to bring a token onto the board and roll again. Tokens move clockwise around the board.',
      image: require('../app/assets/gameplay.jpg'),
    },
    
    {
      title: 'Winning the Game',
      description: 'The first player to move all four of their tokens to their home area wins the game.',
      image: require('../app/assets/winning.jpg'),
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-10 bg-primary">
      <ScrollView>
        <Text className="font-psemibold mb-10 items-center">How to Play Ludo</Text>
        {instructions.map((instruction, index) => (
          <View key={index} style={styles.instructionContainer} className="bg-blue-400">
            <Text style={styles.instructionTitle}>{instruction.title}</Text>
            <Image source={instruction.image} style={styles.instructionImage} />
            <Text style={styles.instructionDescription}>{instruction.description}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionContainer: {
    marginBottom: 20,
    padding: 15,
    
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructionImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  instructionDescription: {
    fontSize: 16,
    color: '#555',
  },
});

export default HowToPlayScreen;
