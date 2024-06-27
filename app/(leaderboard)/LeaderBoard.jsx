// LeaderboardScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import TopBar from '../../components/TopBar';

const LeaderboardScreen = ({ route }) => {
  //const { period } = route.params;

  // Static data for demonstration
  const data = {
    daily: [
      { id: '1', rank: 1, name: 'Alice', matches: 10, amountWon: '$100' },
      { id: '2', rank: 2, name: 'Bob', matches: 8, amountWon: '$80' },
      { id: '3', rank: 3, name: 'Charlie', matches: 7, amountWon: '$70' },
    ]
  };

  const leaderboardData = data['daily'];
  const[refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    //await refetch();    
    setRefreshing(false);
  }

  const renderItem = ({ item }) => (
      <>
        <View className="flex-row p-2 border-b border-white w-full justify-center items-center">
          <Text style={styles.rank} className="text-slate-100 text-2xl font-psemibold">{item.rank}</Text>
          <Text style={styles.name} className="text-slate-100 text-2xl font-psemibold">{item.name}</Text>
          <Text style={styles.matches} className="text-slate-100 text-2xl font-psemibold">{item.matches}</Text>
          <Text style={styles.amount} className="text-slate-100 text-2xl font-psemibold">{item.amountWon}</Text>
        </View>
      </>
  );

  return (
    <SafeAreaView className="bg-primary w-full h-full px-4 justify-center">
      <TopBar/>
      <FlatList
      ListHeaderComponent={() => (
        <>
        <View className="my-5 px-4 items-center justify-center">
        <Text className="text-blue-400 text-3xl font-pbold">
           Daily LeaderBoard
        </Text>
      </View>
      <View className="border-t border-white">
        </View>
        </>
      )}
      data={leaderboardData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      refreshControl={<RefreshControl refreshing={refreshing}
        tintColor="lightblue"
        />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rank: {
    width: 50,
    color: "white",
  },
  name: {
    flexDirection: 'row',
    minWidth: 150,
    color: "white"
  },
  matches: {
    width: 50,
    color: "white"
  },
  amount: {
    width: 100,
    color: "white"
  },
});

export default LeaderboardScreen;
