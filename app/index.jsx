import { Image, SafeAreaView, Text, View } from "react-native";
import { Link, router } from "expo-router";
import CustomButton from "../components/CustomButton";

export default function Index() {
  return (
    <SafeAreaView className='h-full bg-black'>
      <View className=' items-center w-full px-4'>
        <Image source={require('./assets/Logo.jpeg')} 
        className='w-40 h-40 justify-center'
        resizeMode="contain"
        />
        <Text className="text-white text-3xl font-psemibold">
          Ludo Master
        </Text>
      </View>
    <View className="flex-column mt-20 items-center px-4 justify-center">
      <Link href='/Ludo'>
      <Text className="text-3xl text-white">Go To Game</Text>
      </Link>
      <View>

      </View>
      <View className=' w-full my-8 items-center'>
        <CustomButton 
        title={'Play'} 
        ContainerStyles={'w-40'}
        handlePress={() => router.push("/Ludo")}
        />
      </View>
    </View>
    </SafeAreaView>
  );
}
