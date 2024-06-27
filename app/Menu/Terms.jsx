import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {textConstants} from './constants'
const Terms = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView  className="mt-10 ">
    <View className="items-center justify-center">
      <Text className="text-blue-400 text-2xl font-psemibold">Terms and Conditions</Text>
      <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.text1}</Text>
      <Text className="text-blue-200 text-lg px-2 my-4 items-center">{textConstants.text2}</Text>
      <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.text3}</Text>
      <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.text4}</Text>
      <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.text5}</Text>
      <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.text6}</Text>
      <Text className="text-blue-100 text-2xs px-2 my-4 items-center">{textConstants.text7}</Text>
      <Text className="text-blue-200 text-lg px-2 my-4 font-psemibold items-center">{textConstants.text8}</Text>
      <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.text9}</Text>
      <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.text10}</Text>
      
      
    </View>
    <View className=" justify-center px-3">
    <Text className="text-blue-400 text-2xl font-psemibold">1. OWNERSHIP</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.ownership}</Text>
    </View>
    <View className="px-3 justify-center">
    <Text className="text-blue-400 text-2xl font-psemibold">2. LICENSE GRANT</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.license1}</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.license2}</Text>
    </View>
    <View className="px-3 justify-center">
    <Text className="text-blue-400 text-2xl font-psemibold">3. LICENSE CONDITIONS</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.licenseCondition}</Text>
    <Text className="text-lg text-blue-200">{textConstants.licensePoint1}</Text>
    <Text className="text-lg text-blue-200">{textConstants.licensePoint2}</Text>
    <Text className="text-lg text-blue-200">{textConstants.licensePoint3}</Text>
    <Text className="text-lg text-blue-200">{textConstants.licensePoint4}</Text>
    <Text className="text-lg text-blue-200">{textConstants.licensePoint5}</Text>
    <Text className="text-lg text-blue-200">{textConstants.licensePoint6}</Text>
    <Text className="text-lg text-blue-200">{textConstants.licensePoint7}</Text>
    <Text className="text-lg text-blue-200">{textConstants.licensePoint8}</Text>
    <Text className="text-lg text-blue-200">{textConstants.licensePoint9}</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.licenseCondition2}</Text>
    <Text className="text-lg text-blue-200">{textConstants.ConditionToPoint1}</Text>
    <Text className="text-lg text-blue-200">{textConstants.ConditionToPoint2}</Text>
    <Text className="text-lg text-blue-200">{textConstants.ConditionToPoint3}</Text>
    <Text className="text-lg text-blue-200">{textConstants.ConditionToPoint4}</Text>
    <Text className="text-lg text-blue-200">{textConstants.ConditionToPoint5}</Text>
    <Text className="text-lg text-blue-200">{textConstants.ConditionToPoint6}</Text>
    <Text className="text-lg text-blue-200">{textConstants.ConditionToPoint7}</Text>
    <Text className="text-lg text-blue-200">{textConstants.ConditionToPoint8}</Text>
    <Text className="text-lg text-blue-200">{textConstants.ConditionToPoint9}</Text>
    <Text className="text-lg text-blue-200">{textConstants.ConditionToPoint10}</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.licenseLast}</Text>
    </View>
    <View className="px-3 justify-center">
    <Text className="text-blue-400 text-2xl font-psemibold">4. USAGE BY THOSE UNDER THE AGE OF 18 YEARS</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.UsAge}</Text>
     <Text className="text-lg text-blue-200">{textConstants.UsAgePoint1}</Text>
     <Text className="text-lg text-blue-200">{textConstants.UsAgePoint2}</Text>
     <Text className="text-lg text-blue-200">{textConstants.UsAgePoint3}</Text>
     <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.UsAgeLast}</Text>
    </View>

    <View className="px-3 justify-center">
    <Text className="text-blue-400 text-2xl font-psemibold">5. USERS' CONDUCT</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.UserConduct}</Text>
    <Text className="text-lg text-blue-200">{textConstants.conductPoint1}</Text>
    <Text className="text-lg text-blue-200">{textConstants.conductPoint2}</Text>
    <Text className="text-lg text-blue-200">{textConstants.conductPoint3}</Text>
    <Text className="text-lg text-blue-200">{textConstants.conductPoint4}</Text>
    <Text className="text-lg text-blue-200">{textConstants.conductPoint5}</Text>
    <Text className="text-lg text-blue-200">{textConstants.conductPoint6}</Text>
    <Text className="text-lg text-blue-200">{textConstants.conductPoint7}</Text>
    <Text className="text-lg text-blue-200">{textConstants.conductPoint8}</Text>
    <Text className="text-lg text-blue-200">{textConstants.conductPoint9}</Text>
    <Text className="text-lg text-blue-200">{textConstants.conductPoint10}</Text>
    <Text className="text-lg text-blue-200">{textConstants.conductPoint11}</Text>
    <Text className="text-lg text-blue-200">{textConstants.conductPoint12}</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.UserMid}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid1}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid2}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid3}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid4}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid5}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid6}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMi7}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid8}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid9}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid10}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid11}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid12}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid13}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid14}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid15}</Text>
    <Text className="text-lg text-blue-200">{textConstants.UserMid16}</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.UserLast1}</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.UserLast2}</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.UserLast3}</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.UserLast4}</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.UserLast5}</Text>
    <Text className="text-blue-400 text-2xl font-psemibold">PLAY RESPONSIBLY</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.Play1}</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.Play2}</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.Play3}</Text>
    <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.Play4}</Text>
     <Text className="text-lg text-blue-200">{textConstants.PlayToPoint1}</Text>
     <Text className="text-lg text-blue-200">{textConstants.PlayToPoint2}</Text>
     <Text className="text-lg text-blue-200">{textConstants.PlayToPoint3}</Text>
     <Text className="text-lg text-blue-200">{textConstants.PlayToPoint4}</Text>
     <Text className="text-lg text-blue-200">{textConstants.PlayToPoint5}</Text>
     <Text className="text-lg text-blue-200">{textConstants.PlayToPoint6}</Text>
     <Text className="text-lg text-blue-200">{textConstants.PlayToPoint7}</Text>
     <Text className="text-lg text-blue-200">{textConstants.PlayToPoint8}</Text>
     <Text className="text-lg text-blue-200">{textConstants.PlayToPoint9}</Text>
     <Text className="text-lg text-blue-200">{textConstants.PlayToPoint10}</Text>
     <Text className="text-blue-200 text-2xs px-2 my-4 items-center">{textConstants.PlayLast}</Text>
    </View>
    
    
    </ScrollView> 
    </SafeAreaView>
  )
}

export default Terms

const styles = StyleSheet.create({})