import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'

const InputField = ({ val, setVal, placeholder, secure }) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={val}
                        onChangeText={setVal}
                        placeholder={placeholder} style={styles.input}
                        secureTextEntry={secure}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default InputField

const styles = StyleSheet.create({
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
})