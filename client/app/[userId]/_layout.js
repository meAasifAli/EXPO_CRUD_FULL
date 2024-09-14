import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const Layout = () => {


    return (
        <Stack>
            <Stack.Screen name='edit' options={{ headerShown: false }} />
        </Stack>
    )
}

export default Layout

const styles = StyleSheet.create({})