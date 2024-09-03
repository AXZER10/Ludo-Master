import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Animated, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
    const fadeAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnimation]);
    return (
        <SafeAreaView className='h-full bg-primary items-center justify-center'>
            <View>
                <Animated.View
                    style={[styles.imageContainer, { opacity: fadeAnimation }]}
                >
                    <View className=' items-center w-full px-4'>
                        <Image source={require('./assets/Logo.jpeg')}
                            className='w-40 h-40 justify-center'
                            resizeMode="contain"
                        />
                        <Text className="text-white text-3xl font-pblack mb-10">
                            Ludo Master
                        </Text>
                    </View>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 20,
        overflow: "hidden",
    },
});