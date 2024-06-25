import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
const Terms = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
    <View className="items-center justify-center">
      <Text className="text-blue-400 text-lg font-psemibold">Terms and Conditions</Text>
    </View>
    </SafeAreaView>
  )
}

export default Terms

const styles = StyleSheet.create({})