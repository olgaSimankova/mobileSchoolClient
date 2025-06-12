import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { Colors } from '../shared/tokens';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const insets = useSafeAreaInsets();
    const [loaded, error] = useFonts({
        FiraSans: require('../assets/fonts/FiraSans-Regular.ttf'),
        FiraSansSemiBold: require('../assets/fonts/FiraSans-SemiBold.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) return null;
    return (
        <SafeAreaProvider>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    contentStyle: {
                        backgroundColor: Colors.black,
                        paddingTop: insets.top,
                    },
                    headerShown: false,
                }}
            >
                <Stack.Screen name="login" />
                <Stack.Screen name="restore" options={{ presentation: 'modal' }} />
            </Stack>
        </SafeAreaProvider>
    );
}
