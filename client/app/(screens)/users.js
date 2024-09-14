import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient'
import useUserStore from '../../store/index'
import { router } from 'expo-router'

const UserScreen = () => {
    const { users, setUsers } = useUserStore()
    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get("https://expo-crud-server.onrender.com/api/user")
            setUsers(data?.users)
        }
        fetchUsers()
    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`https://expo-crud-server.onrender.com/api/user/delete/${id}`)
            if (res?.status === 200) {
                setUsers(users.filter((user) => user._id !== id))
                Alert.alert("User Deleted Successfully")
            }
        } catch (error) {
            Alert.alert(error.message)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
            <LinearGradient
                // Background Linear Gradient
                colors={["gray", "transparent"]}
                style={styles.background}
            />
            <View style={{ width: "100%", height: "100%" }}>
                <View style={{ width: "100%", height: "100%", paddingHorizontal: 10, marginVertical: 10 }}>
                    <FlatList
                        keyExtractor={(item) => item?.email}
                        data={users}
                        ListEmptyComponent={() => (
                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                                <Text style={{ fontFamily: "Amenti_Medium" }}>No Users Found</Text>
                            </View>
                        )}
                        renderItem={({ item }) => <View style={{ width: "100%", display: "flex", gap: 15, padding: 20, marginVertical: 10, borderRadius: 15, justifyContent: "center", alignItems: "center", backgroundColor: "#ffed", }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                <View>
                                    <Image style={{ height: 100, width: 100, borderRadius: 25 }} source={{
                                        uri: item?.profile
                                    }} />
                                </View>
                                <View style={{ display: "flex", flexDirection: "column", gap: 10, }}>
                                    <Text style={{ width: "100%", fontFamily: "Amenti_Medium", fontSize: 13 }}>Name : {item?.name}</Text>
                                    <Text style={{ width: "100%", fontFamily: "Amenti_Medium", fontSize: 13 }}>Email  : {item?.email}</Text>
                                    <Text style={{ width: "100%", fontFamily: "Amenti_Medium", fontSize: 13 }}>Phone Number : {item?.phone}</Text>
                                </View>

                            </View>
                            <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                                <TouchableOpacity onPress={() => router.replace(`/${item?._id}/edit`)} style={{
                                    flex: 1, padding: 10, borderRadius: 15, backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center"
                                }}>
                                    < Text style={{ fontFamily: "Amenti", color: "white" }}> Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(item?._id)} style={{
                                    flex: 1, padding: 10, borderRadius: 15, backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center"
                                }}>
                                    < Text style={{ fontFamily: "Amenti", color: "white" }}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}
                        ListHeaderComponent={() => {
                            return <Text style={{ fontSize: 20, fontFamily: "Amenti_Bold", textAlign: "center", paddingVertical: 10 }}>Users : {users?.length}</Text>
                        }}
                    />
                </View>
            </View >
        </SafeAreaView >
    )
}

export default UserScreen

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 500,
    },

})