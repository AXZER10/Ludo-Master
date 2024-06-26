import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
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
        />
      </Stack>
      <StatusBar
      style='light'
      />
    </>
  )
}

export default AuthLayout