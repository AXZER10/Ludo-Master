import React from 'react';
import { View,  } from 'react-native';
import { AdMobBanner } from 'react-native-admob';

const Ads = () => {
  return (
    <View className={"flex-1 justify-center bg-blue-400 items-center"}>
      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test Ad Unit ID
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={(error) => console.error(error)}
      />
    </View>
  );
};



export default Ads;
