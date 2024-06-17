import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const friend = () => {
  return (
    <SafeAreaView className="  h-full justify-center items-center bg-primary">
    <View className="flex-column justify-center space-y-2 items-center">
      <Text className="items-center font-psemibold justify-center text-2xl text-blue-400">
        CHALLENGES
      </Text>
      <Text className="items-center font-psemibold justify-center text-2xl text-blue-400">
        Buddy  CHALLENGES
      </Text>
      <Text className="items-center font-psemibold justify-center text-2xl text-blue-400">
       Facebook friends
      </Text>
    </View>
    </SafeAreaView>
  )
}

export default friend

const styles = StyleSheet.create({})