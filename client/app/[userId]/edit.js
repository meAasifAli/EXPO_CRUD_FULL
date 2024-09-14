import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const EdituserScreen = () => {
    const [loading, setLoading] = useState(false)
    const { userId } = useLocalSearchParams()
    const [formVal, setFormVal] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    })

    useEffect(() => {
        const getSingleUser = async () => {
            try {
                const res = await axios.get(`https://expo-crud-server.onrender.com/api/user/single/${userId}`)
                setFormVal({
                    name: res?.data?.user?.name,
                    email: res?.data?.user?.email,
                    password: res?.data?.user?.password,
                    phone: res?.data?.user?.phone
                })

            } catch (error) {
                Alert.alert(error?.message)
            }
        }
        getSingleUser()
    }, [userId])


    const handleUpdateUser = async () => {
        try {
            setLoading(true)
            const res = await axios.put(`https://expo-crud-server.onrender.com/api/user/update/${userId}`, formVal)
            if (res?.status === 200) {
                Alert.alert("User Updated Successfully")
                router.replace("/(screens)/users")
            }
        } catch (error) {
            setLoading(false)
            Alert.alert(error?.message)
        }
        finally {
            setLoading(false)
        }
    }



    return (
        <SafeAreaView style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.5)', 'transparent']}
                style={styles.background}
            />
            <Text style={styles.heading}>Edit  User Details</Text>


            <View style={styles.formContainer}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={24} color="black" />
                            <TextInput

                                value={formVal.name}
                                onChangeText={(text) => setFormVal({ ...formVal, name: text })}
                                placeholder='Name' style={styles.input} />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail" size={24} color="black" />
                            <TextInput
                                value={formVal.email}
                                onChangeText={(text) => setFormVal({ ...formVal, email: text })}
                                placeholder='Email' style={styles.input} />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="password" size={24} color="black" />
                            <TextInput value={formVal.password}
                                onChangeText={(text) => setFormVal({ ...formVal, password: text })} secureTextEntry placeholder='password' style={styles.input} />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            <Ionicons name="call-outline" size={24} color="black" />
                            <TextInput
                                keyboardType='numeric'
                                value={formVal.phone}
                                onChangeText={(text) => setFormVal({ ...formVal, phone: text })}
                                placeholder='phone number' style={styles.input} />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                {/* <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Text style={{ color: "#000", fontFamily: "Amenti" }}>upload an image</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={handleUpdateUser} style={styles.submit}>
                    <Text style={{ color: "#fff", fontFamily: "Amenti" }}>
                        {loading ? "updating..." : " update"}
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default EdituserScreen

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 500,
    },

    heading: {
        fontSize: 20,
        lineHeight: 50,
        fontFamily: "Amenti_Bold"
    },
    formContainer: {
        marginVertical: 10,
        width: "90%",
        padding: 10,
        borderRadius: 20,
    },
    inputContainer: {
        backgroundColor: "#ffed",
        paddingHorizontal: 10,
        paddingVertical: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginBottom: 25
    },
    input: {
        padding: 15,
        flex: 1,
    },
    imagePicker: {
        borderColor: "#e91e63",
        borderRadius: 20,
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2, marginBottom: 20
    },
    submit: {
        backgroundColor: "green",
        borderRadius: 20,
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
})