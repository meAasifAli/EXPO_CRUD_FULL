import { StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: '#fff' },
            headerShown: false
        }}>
            <Tabs.Screen name="users" options={{
                tabBarLabel: "Users",
                tabBarIcon: ({ color }) => (
                    <FontAwesome6 name="users" size={24} color={color} />
                ),

            }} />
            <Tabs.Screen name="create" options={{
                tabBarLabel: "create",
                headerShown: false, tabBarIcon: ({ color }) => (
                    <AntDesign name="adduser" size={24} color={color} />
                ),

            }} />
        </Tabs>
    )
}

export default TabsLayout

const styles = StyleSheet.create({})