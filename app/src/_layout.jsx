import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LudoBoardScreen from "./screens/LudoBoardScreen";
// import LudoBoard from './screens/LudoBoard'
import { navigationRef } from "./helpers/NavigationUtil";
// import HomeScreen from '../../HomeScreen';
import { Provider } from "react-redux";
import { persistor, store } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef} independent={true}>
          <Stack.Navigator
            initialRouteName="LudoBoardScreen"
            screenOptions={() => ({
              headerShown: false,
            })}
          >
            <Stack.Screen
              name="LudoBoardScreen"
              options={{
                animation: "fade",
              }}
              component={LudoBoardScreen}
            />
            {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
            {/* <Stack.Screen
          name="LudoBoard"
          options={{
            animation: 'fade',
          }}
          component={LudoBoard}
        /> */}
            {/* <Stack.Screen
          name="HomeScreen"
          options={{
            animation: 'fade',
          }}
          component={HomeScreen}
        /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default Navigation;
