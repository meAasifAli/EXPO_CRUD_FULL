import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useFonts } from "expo-font"
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    const [loaded, error] = useFonts({
        Amenti: require('../assets/fonts/Amenti_Regular.ttf'),
        "Amenti_Medium": require('../assets/fonts/Amenti_Medium.ttf'),
        "Amenti_Bold": require('../assets/fonts/Amenti_Bold.otf'),
        "Amenti_Black": require('../assets/fonts/Amenti_Black.otf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }
    return (
        <Stack>
            <Stack.Screen name='[userId]' options={{ headerShown: false }} />
            <Stack.Screen name='(screens)' options={{ headerShown: false }} />
            <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
    )
}

export default Layout
