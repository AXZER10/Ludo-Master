import { SafeAreaView, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView className='h-full bg-black'>
      <View className="flex-1 justify-center items-center"
      /*style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}*/
    >
      <Link href='/Ludo'>
      <Text className="text-3xl text-white">Go To Game</Text>
      </Link>
    </View>
    </SafeAreaView>
  );
}
