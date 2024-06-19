import { View, Text } from 'react-native'
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
      </Stack>
      <StatusBar backgroundColor='#1611622'
      style='dark'
      />
    </>
  )
}

export default AuthLayout