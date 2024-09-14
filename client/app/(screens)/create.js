import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import { router } from 'expo-router';
import useUserStore from '../../store';
import InputField from '../../components/InputField';


const CreateScreen = () => {
    const { users, setUsers } = useUserStore()
    const [loading, setLoading] = useState(false)
    const [formVal, setFormVal] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    })



    // console.log(image);

    const handleCreate = async () => {
        try {
            if (!formVal.name || !formVal.email || !formVal.password || !formVal.phone) {
                Alert.alert("Please fill all the fields")
                return
            }
            setLoading(true)
            const res = await axios.post("https://expo-crud-server.onrender.com/api/user/create", {
                name: formVal.name,
                email: formVal.email,
                password: formVal.password,
                phone: formVal.phone,
                profile: "https://avatar.iran.liara.run/public/boy"
            }
            )

            if (res?.status === 201) {
                Alert.alert("User Created Successfully")
                setFormVal({
                    name: "",
                    email: "",
                    password: "",
                    phone: "",
                })
                router.replace("/(screens)/users")
                setUsers([...users, res?.data?.user])
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            Alert.alert(error?.message);

        }
        finally {
            setLoading(false)
        }
    }

    return (

        <SafeAreaView style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <LinearGradient
                // Background Linear Gradient
                colors={['gray', 'transparent']}
                style={styles.background}
            />
            <Text style={styles.heading}>Create a New User</Text>
            <View style={styles.formContainer}>
                <InputField
                    // Icon={<Ionicons name='person-outline' size={24} color="black" />}
                    placeholder={"Name"}
                    val={formVal.name}
                    setVal={(text) => setFormVal({ ...formVal, name: text })}
                />
                <InputField
                    // Icon={<Ionicons name='person-outline' size={24} color="black" />}
                    placeholder={"Email"}
                    val={formVal.email}
                    setVal={(text) => setFormVal({ ...formVal, email: text })}
                />
                <InputField
                    // Icon={<Ionicons name='person-outline' size={24} color="black" />}
                    placeholder={"Password"}
                    val={formVal.password}
                    setVal={(text) => setFormVal({ ...formVal, password: text })}
                    secure={true}
                />
                <InputField
                    // Icon={<Ionicons name='person-outline' size={24} color="black" />}
                    placeholder={"Phone"}
                    val={formVal.phone}
                    setVal={(text) => setFormVal({ ...formVal, phone: text })}
                />

                {/* <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Text style={{ color: "#000", fontFamily: "Amenti" }}>upload an image</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={handleCreate} style={styles.submit}>
                    <Text style={{ color: "#fff", fontFamily: "Amenti" }}>
                        {
                            loading ? "creating..." : "Create"
                        }
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    )
}

export default CreateScreen

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