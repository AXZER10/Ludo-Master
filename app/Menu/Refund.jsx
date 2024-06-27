import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { textConstants } from './constants'
const Refund = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView  className="mt-10 ">
    <View className="items-center justify-center">
      <Text className="text-blue-400 text-2xl font-psemibold">Refund and Cancellation</Text>
      
    </View>

    <View className="px-3 justify-center mt-5">
    <Text className="text-blue-400 text-2xl font-psemibold">User Refund Request</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.UserRefund}</Text>
    </View>
    <View className="px-3 justify-center">
    <Text className="text-blue-400 text-2xl font-psemibold">Account Cancellation</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.Account}</Text>
    </View>
    <View className="px-3 justify-center">
    <Text className="text-blue-400 text-2xl font-psemibold">Technical Issues</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.Technical}</Text>
    </View>
    <View className="px-3 justify-center">
    <Text className="text-blue-400 text-2xl font-psemibold">Service Disruption</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.Service}</Text>
    </View>
    <View className="px-3 justify-center">
    <Text className="text-blue-400 text-2xl font-psemibold">Failed Account Validation</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.Failed}</Text>
    </View>
    <View className="px-3 justify-center">
    <Text className="text-blue-400 text-2xl font-psemibold">Cancellation of Promotions</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.Cancellation}</Text>
    </View>
    <View className="px-3 justify-center">
    <Text className="text-blue-400 text-2xl font-psemibold">Voluntary Account Termination</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.Termination}</Text>
    </View>
    <View className="px-3 justify-center">
    <Text className="text-blue-400 text-2xl font-psemibold">Forfeiting Inactive Account</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.Inactive}</Text>
    </View>
    <View className="px-3 justify-center">
    <Text className="text-blue-400 text-2xl font-psemibold">Contact Our Support</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.Support}</Text>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Refund

const styles = StyleSheet.create({})