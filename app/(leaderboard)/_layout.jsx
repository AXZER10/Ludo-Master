import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const LeaderBoardLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='LeaderBoard'
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

export default LeaderBoardLayout