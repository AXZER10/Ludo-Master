import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Dashboard from "../(auth)/Dashboard";
import Details from "../(auth)/Details";
import Login from "../(auth)/Login";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        {/* <Stack.Screen
          name='EmailSignIn'
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name='AuthScreen'
          options={{
            headerShown:false
          }}
        /> */}
       <Stack>
<Stack.Screen
name = "Login"
component={Login}
options={{headerShown:false}}
/>
<Stack.Screen
name = "Details"
component={Details}
options={{headerShown:false}}
/>
 
</Stack>
      
      
      </Stack>
      <StatusBar
      style='light'
      />
    </>
  )
}

export default AuthLayout