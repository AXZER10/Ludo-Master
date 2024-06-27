import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
const About = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary ">
      <ScrollView className="mt-10 ">
    <View className="items-center justify-center">
      <Text className="text-blue-400 text-2xl font-psemibold">About Us</Text>
    </View>
    <View className="items-center justify-center">
      <Text className="text-blue-200 text-lg px-6 my-4 items-center">
      Ludo Empire is India's fastest-growing Ludo real cash online game. This win-cash Ludo game brings forth the classic, timeless game of Ludo and combines it with the joy of winning real money prizes.This Ludo app also brings multiple different games for players to enjoy and play at their comfort.

Ludo Empire gives players the opportunity to play their childhood favourite game of Ludo with the added twist and thrill of earning money with their gaming skills.

With an easy-to-do Ludo download process, you can play Ludo game online with more than 1.25 Crore players from anywhere and any time across India.

At Ludo Empire, if you play smartly, you can win greatly!
      </Text>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default About

const styles = StyleSheet.create({})