
import React from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const renderItem = ({ item }) => (
    <View style={styles.instructionContainer} className="bg-blue-400 mr-2">
      <Text style={styles.instructionTitle}>{item.title}</Text>
      <Image source={item.image} style={styles.instructionImage} />
      <Text style={styles.instructionDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-primary px-4 h-full items-center justify-center">
      <Text className="font-pbold px-4 mb-10 mt-5 text-blue-400 text-3xl items-center">How to Play Ludo</Text>
      <FlatList
        horizontal
        data={instructions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    paddingBottom: 20,
  },
  instructionContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    width: 300,
    maxHeight: 400,
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
    color: '#444',
  },
});

export default HowToPlayScreen;
