import { router } from 'expo-router'
import { Image, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Index = () => {

    return (
        <SafeAreaView style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: 500, marginVertical: 10, fontFamily: "Amenti_Bold" }}>Welcome to CRUD APP</Text>
            <Text style={{ fontSize: 12, fontWeight: 300, color: "grey", marginVertical: 10, fontFamily: "Amenti_Bold", textAlign: "center", width: "70%", lineHeight: 15 }}>Your Ultimate Solution for Create, Read, Update and Delete oerations</Text>
            <Image style={{ width: 300, height: 400, objectFit: "contain", borr: 15 }} source={require("../assets/crud3.webp")} />
            <TouchableOpacity onPress={() => router.replace("/(screens)/users")} style={{ backgroundColor: "green", padding: 10, borderRadius: 15, width: "80%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 14, fontWeight: 400, marginVertical: 10, color: "white", fontFamily: "Amenti" }}>Click Here to Start</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Index
