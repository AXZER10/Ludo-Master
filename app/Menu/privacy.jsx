import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const privacy = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
    <View className="items-center justify-center">
      <Text className="text-blue-400 text-lg font-psemibold"> Privacy Policy</Text>
    </View>
    </SafeAreaView>
  )
}

export default privacy

const styles = StyleSheet.create({})