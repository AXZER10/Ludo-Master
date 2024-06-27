import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { textConstants } from './constants'

const privacy = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
    <ScrollView>
    <View className="items-center justify-center">
      <Text className="text-blue-400 text-2xl font-psemibold"> Privacy Policy</Text>
    </View>
    <View className="items-center justify-center">
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Privacy}</Text>
    </View>
    <View  className="justify-center px-2">
      <Text className="text-blue-300 text-2xl font-psemibold">General Statement</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.General}</Text>
    </View>
    <View  className="justify-center px-2">
      <Text className="text-blue-300 text-2xl font-psemibold">Collection of Information</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Information}</Text>
      </View>
      <View  className="justify-center px-2">
      <Text className="text-blue-300 text-2xl font-psemibold">Use of Personal Data</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Data}</Text>
      <Text className="text-lg text-blue-200">{`\u25C9 Location`}</Text>
      <Text className="text-lg text-blue-200">{`\u25C9 Username`}</Text>
      <Text className="text-lg text-blue-200">{`\u25C9 One Time Password`}</Text>
      <Text className="text-lg text-blue-200">{`\u25C9 Email address`}</Text>
      <Text className="text-lg text-blue-200">{`\u25C9 Phone Number`}</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.DataPoint1}</Text>
      <Text className="text-lg text-blue-200">{`\u25C9 Permanent Account Number`}</Text>
      <Text className="text-lg text-blue-200">{`\u25C9 Permanent Account Number`}</Text>
      <Text  className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.DataPoint2}</Text>
      
      <Text  className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.DataPoint3}</Text>
      <Text  className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.DataPoint4}</Text>
      <Text  className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.DataPoint5}</Text>
      <Text  className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.DataPoint6}</Text>
      <Text className="text-lg text-blue-200">{`\u25C9 To conform with the law or comply with legal process served on us or the Website;`}</Text>
      <Text className="text-lg text-blue-200">{`\u25C9 To protect and defend our rights or property, the Website, or our users; and`}</Text>
      <Text className="text-lg text-blue-200">{`\u25C9 To urgently act under circumstances to protect our safety and that of our affiliates, agents and the users of the Website or the public in general.`}</Text>
      </View>
      <View  className="justify-center px-2 mt-2">
      <Text className="text-blue-300 text-2xl font-psemibold">Use of Cookies</Text>
      
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Cookies1}</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Cookies2}</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Cookies3}</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Cookies4}</Text>
      </View>
      <View  className="justify-center px-2">
      <Text className="text-blue-300 text-2xl font-psemibold">Disclosure of Data</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Discolsure1}</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Discolsure2}</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Discolsure2}</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Discolsure4}</Text>
      </View>
      <View  className="justify-center px-2">
      <Text className="text-blue-300 text-2xl font-psemibold">Links</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Links}</Text>
      </View>
      <View  className="justify-center px-2">
      <Text className="text-blue-300 text-2xl font-psemibold">Data Security</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.DataSecurity}</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.DataSecurity1}</Text>
      </View>
      <View  className="justify-center px-2">
      <Text className="text-blue-300 text-2xl font-psemibold">Advertising</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Advertising1}</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Advertising2}</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Advertising2}</Text>
      </View>
      <View  className="justify-center px-2">
      <Text className="text-blue-300 text-2xl font-psemibold">Condition of Use</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.ConditionToPoint9}</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.ConditionUse1}</Text>
      </View>
      <View  className="justify-center px-2">
      <Text className="text-blue-300 text-2xl font-psemibold">Retention of Data</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Retention}</Text>
      </View>
      <View  className="justify-center px-2">
      <Text className="text-blue-300 text-2xl font-psemibold">Applicable Law & Jurisdiction</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.Applicable}</Text>
      </View>
      <View  className="justify-center px-2">
      <Text className="text-blue-300 text-2xl font-psemibold">Updating Information</Text>
      <Text className="text-blue-200 text- px-2 my-4 items-center justify-center">{textConstants.UpdatingInfo}</Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default privacy

const styles = StyleSheet.create({})