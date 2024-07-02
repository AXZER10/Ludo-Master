
import { StyleSheet, Text, View,  } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const TDS = () => {
  return (
    <SafeAreaView className="flex-1 h-full w-full bg-primary  ">
    <View className="items-center mt-10">
      <Text className="text-blue-400 text-2xl font-psemibold ">TDS</Text>
      <Text className="text-blue-200 mt-5 px-5 text-lg">30% tax before distributing the winnings if it exceeds the threshold of ₹100.</Text>
    </View>
    </SafeAreaView>
  )
}

export default TDS

const styles = StyleSheet.create({})