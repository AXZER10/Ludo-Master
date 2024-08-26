import { Image, SafeAreaView, Text, View } from "react-native";
import { Link, router } from "expo-router";
import CustomButton from "../components/CustomButton";

export default function TitleScreen() {
  return (
    <SafeAreaView className='h-full bg-primary'>
      <View className=' items-center w-full px-4'>
        <Image source={require('./assets/Logo.jpeg')} 
        className='w-40 h-40 justify-center'
        resizeMode="contain"
        />
        <Text className="text-white text-3xl font-pblack mb-10">
          Ludo Master
        </Text>
      </View>
    <View className="flex-column mt-20 items-center px-4 justify-center">
      <Text className="text-3xl text-white font-psemibold">Go To Game</Text>
      <View>

      </View>
      <View className=' w-full my-8 items-center'>
        <CustomButton 
        title={'Play'} 
        ContainerStyles={'w-full'}
        handlePress={() => router.replace("/(auth)/EmailSignIn")}
        textStyles={'text-3xl font-pbold'}
        />
      </View>
    </View>
    </SafeAreaView>
  );
}
