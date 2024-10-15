import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Details from "../(auth)/Details";
import Login from "../(auth)/Login";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{ headerShown: false }}
          />
        </Stack>
      </Stack>
      <StatusBar style="light" />
    </>
  );
};

export default AuthLayout;
